import { randomBytes } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { hashOpaqueToken } from '../../../../common/helpers/hash-opaque-token.helper';
import { normalizePhoneNumberInput } from '../../../../common/helpers/normalize-phone-number.helper';
import mailConfig from '../../../../config/mail.config';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { ApplicationEventBus } from '../../../../core/application/ports/event-bus.port';
import { UniqueId } from '../../../../core/domain/shared/unique-id';
import { APPLICATION_EVENT_BUS } from '../../../../infrastructure/events/events.tokens';
import { InvalidOrderDiscoverySourceError } from '../../domain/errors/invalid-order-discovery-source.error';
import { InvalidOrderRequestError } from '../../domain/errors/invalid-order-request.error';
import { OrderMoneyVo } from '../../domain/value-objects/order-money.vo';
import {
  ORDER_CONFIRMATION_LINK_PATH,
  ORDER_DISCOVERY_SOURCE_VALUES,
  ORDER_REQUEST_DRAFT_TTL_SECONDS,
} from '../../orders.constants';
import { ORDERS_TOKENS } from '../../orders.tokens';
import type { SubmitOrderRequestInput } from '../dto/submit-order-request.input';
import { ORDER_EVENT_NAMES } from '../events/order-event-names.constants';
import type { OrderRequestConfirmationRequestedEventPayload } from '../events/order-request-confirmation-requested.event';
import type { OrderRequestDraftStore } from '../services/order-request-draft.service';
import { OrderSnapshotFactory } from '../services/order-snapshot.factory';

@Injectable()
export class SubmitOrderRequestUseCase implements UseCase<
  SubmitOrderRequestInput,
  { requested: true }
> {
  constructor(
    @Inject(ORDERS_TOKENS.OrderRequestDraftStore)
    private readonly orderRequestDraftStore: OrderRequestDraftStore,
    @Inject(APPLICATION_EVENT_BUS)
    private readonly applicationEventBus: ApplicationEventBus,
    @Inject(mailConfig.KEY)
    private readonly config: ConfigType<typeof mailConfig>,
    private readonly orderSnapshotFactory: OrderSnapshotFactory,
  ) {}

  async execute(input: SubmitOrderRequestInput): Promise<{ requested: true }> {
    if (!ORDER_DISCOVERY_SOURCE_VALUES.includes(input.discoverySource)) {
      throw new InvalidOrderDiscoverySourceError(input.discoverySource);
    }

    const hasPackage = Boolean(input.packageId?.trim());

    if (!hasPackage && !input.budget) {
      throw new InvalidOrderRequestError('Budget is required for custom request');
    }

    if (hasPackage && input.budget) {
      throw new InvalidOrderRequestError('Budget must not be sent when package is selected');
    }

    const normalizedPackageId = hasPackage ? input.packageId!.trim() : null;
    const normalizedBudget = input.budget
      ? OrderMoneyVo.from(input.budget, 'budget').toObject()
      : null;
    let normalizedPhoneNumber: string;

    try {
      normalizedPhoneNumber = normalizePhoneNumberInput(input.phoneNumber, input.countryCode);
    } catch {
      throw new InvalidOrderRequestError('Phone number is invalid');
    }

    // Validate references early at draft-submit time.
    // Confirm flow will re-check again before creating the order.
    await this.orderSnapshotFactory.buildItemSnapshot({
      galleryId: input.galleryId,
      packageId: normalizedPackageId,
      budget: normalizedBudget,
    });

    const rawToken = randomBytes(48).toString('hex');
    const tokenHash = hashOpaqueToken(rawToken);
    const requestDraftId = UniqueId.generate();

    await this.orderRequestDraftStore.save({
      tokenHash,
      ttlSeconds: ORDER_REQUEST_DRAFT_TTL_SECONDS,
      value: {
        requestDraftId,
        customerInfo: {
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          countryCode: input.countryCode.trim().toUpperCase(),
          phoneNumber: normalizedPhoneNumber,
        },
        galleryId: input.galleryId,
        packageId: normalizedPackageId,
        budget: normalizedBudget,
        discoverySource: input.discoverySource,
        personalStory: input.personalStory.trim(),
      },
    });

    const payload: OrderRequestConfirmationRequestedEventPayload = {
      email: input.email.trim().toLowerCase(),
      name: input.name.trim(),
      confirmUrl: this.buildConfirmUrl(rawToken),
      expiresInMinutes: Math.ceil(ORDER_REQUEST_DRAFT_TTL_SECONDS / 60),
    };

    await this.applicationEventBus.publish({
      name: ORDER_EVENT_NAMES.OrderRequestConfirmationRequested,
      payload,
    });

    return { requested: true };
  }

  private buildConfirmUrl(rawToken: string): string {
    return `${this.config.clientUrl}${ORDER_CONFIRMATION_LINK_PATH}?token=${encodeURIComponent(rawToken)}`;
  }
}
