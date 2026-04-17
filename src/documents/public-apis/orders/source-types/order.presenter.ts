import { Injectable } from '@nestjs/common';

import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import type { OrderOutput } from '../../application/dto/order.output';
import { OrderListResponse, OrderResponse } from './dto/order.response';

@Injectable()
export class OrderPresenter {
  present(output: OrderOutput): OrderResponse {
    return {
      id: output.id,
      requestDraftId: output.requestDraftId,
      orderNumber: output.orderNumber,
      userId: output.userId,
      customerInfo: {
        name: output.customerInfo.name,
        email: output.customerInfo.email,
        countryCode: output.customerInfo.countryCode,
      },
      status: output.status,
      paymentStatus: output.paymentStatus,
      discoverySource: output.discoverySource,
      personalStory: output.personalStory,
      items: output.items.map((item) => ({
        type: item.type,
        galleryId: item.galleryId,
        gallerySnapshot: {
          id: item.gallerySnapshot.id,
          name: {
            en: item.gallerySnapshot.name.en,
            vi: item.gallerySnapshot.name.vi,
            cn: item.gallerySnapshot.name.cn,
          },
        },
        packageId: item.packageId,
        packageSnapshot: item.packageSnapshot
          ? {
              id: item.packageSnapshot.id,
              name: {
                en: item.packageSnapshot.name.en,
                vi: item.packageSnapshot.name.vi,
                cn: item.packageSnapshot.name.cn,
              },
              bestFor: {
                en: item.packageSnapshot.bestFor.en,
                vi: item.packageSnapshot.bestFor.vi,
                cn: item.packageSnapshot.bestFor.cn,
              },
              duration: item.packageSnapshot.duration,
              photoCount: item.packageSnapshot.photoCount,
              pricing: {
                amount: item.packageSnapshot.pricing.amount,
                currency: item.packageSnapshot.pricing.currency,
              },
            }
          : null,
        pricing: item.pricing
          ? {
              amount: item.pricing.amount,
              currency: item.pricing.currency,
            }
          : null,
        budget: item.budget
          ? {
              amount: item.budget.amount,
              currency: item.budget.currency,
            }
          : null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }

  presentMany(output: PaginatedResult<OrderOutput>): OrderListResponse {
    return {
      items: output.items.map((item) => this.present(item)),
      meta: output.meta,
    };
  }
}
