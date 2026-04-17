import type { LocalizedText } from '../../../../../common/interfaces/localized-text.interface';
import type { PaginatedResult } from '../../../../../core/application/common/pagination.interface';
import type { OrderDiscoverySource, OrderPaymentStatus, OrderStatus } from '../../../orders.types';

export class OrderMoneyResponse {
  amount!: number;
  currency!: string;
}

export class OrderCustomerInfoResponse {
  name!: string;
  email!: string;
  countryCode!: string;
  phoneNumber!: string | null;
}

export class OrderGallerySnapshotResponse {
  id!: string;
  name!: LocalizedText;
}

export class OrderPackageSnapshotResponse {
  id!: string;
  name!: LocalizedText;
  bestFor!: LocalizedText;
  duration!: number;
  photoCount!: number;
  pricing!: OrderMoneyResponse;
}

export class OrderItemResponse {
  type!: 'package' | 'custom';
  galleryId!: string;
  gallerySnapshot!: OrderGallerySnapshotResponse;
  packageId!: string | null;
  packageSnapshot!: OrderPackageSnapshotResponse | null;
  pricing!: OrderMoneyResponse | null;
  budget!: OrderMoneyResponse | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class OrderResponse {
  id!: string;
  requestDraftId!: string | null;
  orderNumber!: string;
  userId!: string | null;
  customerInfo!: OrderCustomerInfoResponse;
  status!: OrderStatus;
  paymentStatus!: OrderPaymentStatus;
  discoverySource!: OrderDiscoverySource;
  personalStory!: string;
  items!: OrderItemResponse[];
  createdAt!: Date;
  updatedAt!: Date;
}

export class OrderListResponse implements PaginatedResult<OrderResponse> {
  items!: OrderResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
