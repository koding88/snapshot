import type { PaginatedResult } from '../../../../../core/application/common/pagination.interface';

export class PublicGalleryResponse {
  id!: string;
  name!: string;
}

export class PublicGalleryListResponse implements PaginatedResult<PublicGalleryResponse> {
  items!: PublicGalleryResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
