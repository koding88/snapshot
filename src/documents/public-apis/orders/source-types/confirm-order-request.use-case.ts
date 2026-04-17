import { Inject, Injectable } from '@nestjs/common';

import { hashOpaqueToken } from '../../../../common/helpers/hash-opaque-token.helper';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { ApplicationEventBus } from '../../../../core/application/ports/event-bus.port';
import { UniqueId } from '../../../../core/domain/shared/unique-id';
import { APPLICATION_EVENT_BUS } from '../../../../infrastructure/events/events.tokens';
import { EnsureCustomerUserService } from '../../../users/application/services/ensure-customer-user.service';
import { OrderEntity } from '../../domain/entities/order.entity';
import { InvalidOrderRequestTokenError } from '../../domain/errors/invalid-order-request-token.error';
import { OrderRequestDraftAlreadyUsedError } from '../../domain/errors/order-request-draft-already-used.error';
import type { OrderRepository } from '../../domain/repositories/order.repository.interface';
import {
  ORDER_DEFAULT_PAYMENT_STATUS,
  ORDER_DEFAULT_STATUS,
  ORDER_REQUEST_DRAFT_TTL_SECONDS,
} from '../../orders.constants';
import { ORDERS_TOKENS } from '../../orders.tokens';
import type { ConfirmOrderRequestInput } from '../dto/confirm-order-request.input';
import type { OrderOutput } from '../dto/order.output';
import type { OrderConfirmedEventPayload } from '../events/order-confirmed.event';
import { ORDER_EVENT_NAMES } from '../events/order-event-names.constants';
import { OrderNumberService } from '../services/order-number.service';
import { OrderOutputFactory } from '../services/order-output.factory';
import type { OrderRequestDraftStore } from '../services/order-request-draft.service';
import { OrderSnapshotFactory } from '../services/order-snapshot.factory';
import { OrderWriteInvalidationService } from '../services/order-write-invalidation.service';

@Injectable()
export class ConfirmOrderRequestUseCase implements UseCase<ConfirmOrderRequestInput, OrderOutput> {
  constructor(
    @Inject(ORDERS_TOKENS.OrderRepository)
    private readonly orderRepository: OrderRepository,
    @Inject(ORDERS_TOKENS.OrderRequestDraftStore)
    private readonly orderRequestDraftStore: OrderRequestDraftStore,
    private readonly ensureCustomerUserService: EnsureCustomerUserService,
    private readonly orderSnapshotFactory: OrderSnapshotFactory,
    private readonly orderNumberService: OrderNumberService,
    private readonly orderOutputFactory: OrderOutputFactory,
    private readonly orderWriteInvalidationService: OrderWriteInvalidationService,
    @Inject(APPLICATION_EVENT_BUS)
    private readonly applicationEventBus: ApplicationEventBus,
  ) {}

  async execute(input: ConfirmOrderRequestInput): Promise<OrderOutput> {
    const tokenHash = hashOpaqueToken(input.token.trim());
    const draft = await this.orderRequestDraftStore.get(tokenHash);

    if (!draft) {
      throw new InvalidOrderRequestTokenError();
    }

    if (draft.orderId) {
      const existingByOrderId = await this.orderRepository.findById(draft.orderId);

      if (existingByOrderId) {
        return this.orderOutputFactory.createOne(existingByOrderId);
      }
    }

    const existingByDraft = await this.orderRepository.findByRequestDraftId(draft.requestDraftId);

    if (existingByDraft) {
      await this.orderRequestDraftStore.markConsumed({
        tokenHash,
        orderId: existingByDraft.id,
        ttlSeconds: this.calculateConsumedDraftTtlSeconds(draft.createdAt),
      });
      return this.orderOutputFactory.createOne(existingByDraft);
    }

    const { user } = await this.ensureCustomerUserService.ensure({
      name: draft.customerInfo.name,
      email: draft.customerInfo.email,
      countryCode: draft.customerInfo.countryCode,
    });

    const item = await this.orderSnapshotFactory.buildItemSnapshot({
      galleryId: draft.galleryId,
      packageId: draft.packageId,
      budget: draft.budget,
    });
    const now = new Date();

    const order = new OrderEntity(
      UniqueId.generate(),
      draft.requestDraftId,
      this.orderNumberService.generate(now),
      user.id,
      {
        name: draft.customerInfo.name,
        email: draft.customerInfo.email,
        countryCode: draft.customerInfo.countryCode,
      },
      ORDER_DEFAULT_STATUS,
      ORDER_DEFAULT_PAYMENT_STATUS,
      draft.discoverySource,
      draft.personalStory,
      [item],
      now,
      now,
    );
    let created: OrderEntity;
    try {
      created = await this.orderRepository.create(order);
    } catch (error) {
      if (error instanceof OrderRequestDraftAlreadyUsedError) {
        const existing = await this.orderRepository.findByRequestDraftId(draft.requestDraftId);

        if (existing) {
          await this.orderRequestDraftStore.markConsumed({
            tokenHash,
            orderId: existing.id,
            ttlSeconds: this.calculateConsumedDraftTtlSeconds(draft.createdAt),
          });
          return this.orderOutputFactory.createOne(existing);
        }
      }

      throw error;
    }

    await this.orderRequestDraftStore.markConsumed({
      tokenHash,
      orderId: created.id,
      ttlSeconds: this.calculateConsumedDraftTtlSeconds(draft.createdAt),
    });
    await this.orderWriteInvalidationService.invalidateAfterOrderWrite();
    await this.applicationEventBus.publish({
      name: ORDER_EVENT_NAMES.OrderConfirmed,
      payload: this.buildOrderConfirmedEventPayload(created),
    });

    return this.orderOutputFactory.createOne(created);
  }

  private calculateConsumedDraftTtlSeconds(createdAtIso: string): number {
    const createdAtMs = Date.parse(createdAtIso);

    if (Number.isNaN(createdAtMs)) {
      return ORDER_REQUEST_DRAFT_TTL_SECONDS;
    }

    const elapsedSeconds = Math.floor((Date.now() - createdAtMs) / 1000);
    const remaining = ORDER_REQUEST_DRAFT_TTL_SECONDS - elapsedSeconds;

    return Math.max(60, remaining);
  }

  private buildOrderConfirmedEventPayload(order: OrderEntity): OrderConfirmedEventPayload {
    const item = order.items[0];

    return {
      email: order.customerInfo.email,
      name: order.customerInfo.name,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt.toISOString(),
      status: order.status,
      galleryName: this.getPreferredLocalizedText(item?.gallerySnapshot.name),
      packageName: item?.packageSnapshot
        ? this.getPreferredLocalizedText(item.packageSnapshot.name)
        : null,
      pricing: item?.pricing ?? null,
      budget: item?.budget ?? null,
    };
  }

  private getPreferredLocalizedText(
    value:
      | {
          vi: string;
          en: string;
          cn: string;
        }
      | undefined,
  ): string {
    if (!value) {
      return '';
    }

    return value.en || value.vi || value.cn;
  }
}
