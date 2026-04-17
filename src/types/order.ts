export interface OrderRequestBody {
  name: string;
  email: string;
  countryCode: string;
  galleryId: string;
  packageId: string;
  discoverySource: string;
  personalStory?: string;
  phoneNumber?: string;
}

export interface OrderConfirmBody {
  token: string;
}

export interface OrderRequested {
  requested: true;
}
