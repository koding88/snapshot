import type { OrderCustomerInfo, OrderDiscoverySource, OrderMoney } from '../../orders.types';

export type SubmitOrderRequestInput = Omit<OrderCustomerInfo, 'phoneNumber'> & {
  phoneNumber: string;
  galleryId: string;
  packageId?: string;
  budget?: OrderMoney;
  discoverySource: OrderDiscoverySource;
  personalStory: string;
};
