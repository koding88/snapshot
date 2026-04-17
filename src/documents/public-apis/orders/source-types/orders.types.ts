import type { LocalizedText } from '../../common/interfaces/localized-text.interface';

export const ORDER_ITEM_TYPES = ['package', 'custom'] as const;
export type OrderItemType = (typeof ORDER_ITEM_TYPES)[number];

export const ORDER_STATUSES = [
  'pending',
  'contacted',
  'confirmed',
  'completed',
  'cancelled',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_PAYMENT_STATUSES = ['unpaid', 'partiallyPaid', 'paid', 'refunded'] as const;
export type OrderPaymentStatus = (typeof ORDER_PAYMENT_STATUSES)[number];

export const ORDER_DISCOVERY_SOURCES = [
  'instagram',
  'facebook',
  'tiktok',
  'google',
  'friend',
  'other',
] as const;
export type OrderDiscoverySource = (typeof ORDER_DISCOVERY_SOURCES)[number];

export type OrderMoney = {
  amount: number;
  currency: string;
};

export type OrderCustomerInfo = {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber?: string | null;
};

export type OrderGallerySnapshot = {
  id: string;
  name: LocalizedText;
};

export type OrderPackageSnapshot = {
  id: string;
  name: LocalizedText;
  bestFor: LocalizedText;
  duration: number;
  photoCount: number;
  pricing: OrderMoney;
};

export type OrderItemSnapshot = {
  type: OrderItemType;
  galleryId: string;
  gallerySnapshot: OrderGallerySnapshot;
  packageId: string | null;
  packageSnapshot: OrderPackageSnapshot | null;
  pricing: OrderMoney | null;
  budget: OrderMoney | null;
  createdAt: Date;
  updatedAt: Date;
};
