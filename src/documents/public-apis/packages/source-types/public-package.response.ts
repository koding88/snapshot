import type { PaginatedResult } from '../../../../../core/application/common/pagination.interface';

export class PublicPackageCoverImageResponse {
  id!: string;
  url!: string;
  mimeType!: string;
  size!: number;
  originalName!: string | null;
}

export class PublicPackagePricingResponse {
  amount!: number;
  currency!: string;
}

export class PublicPackageResponse {
  id!: string;
  name!: string;
  bestFor!: string;
  duration!: number;
  photoCount!: number;
  pricing!: PublicPackagePricingResponse;
  coverImage!: PublicPackageCoverImageResponse;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PublicPackageListResponse implements PaginatedResult<PublicPackageResponse> {
  items!: PublicPackageResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
