import type {
  OrderCustomerInfo,
  OrderDiscoverySource,
  OrderItemSnapshot,
  OrderPaymentStatus,
  OrderStatus,
} from '../../orders.types';

export class OrderOutput {
  id!: string;
  requestDraftId!: string | null;
  orderNumber!: string;
  userId!: string | null;
  customerInfo!: OrderCustomerInfo;
  status!: OrderStatus;
  paymentStatus!: OrderPaymentStatus;
  discoverySource!: OrderDiscoverySource;
  personalStory!: string;
  items!: OrderItemSnapshot[];
  createdAt!: Date;
  updatedAt!: Date;
}
