import type { PaginatedResult } from '../../../../../core/application/common/pagination.interface';
import type { EditorJsOutputData } from '../../../blogs.types';

export class PublicBlogCoverImageResponse {
  id!: string;
  url!: string;
  mimeType!: string;
  size!: number;
  originalName!: string | null;
}

export class PublicBlogItemResponse {
  id!: string;
  name!: string;
  coverImage!: PublicBlogCoverImageResponse;
}

export class PublicBlogResponse {
  id!: string;
  name!: string;
  coverImage!: PublicBlogCoverImageResponse;
  content!: EditorJsOutputData;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PublicBlogListResponse implements PaginatedResult<PublicBlogItemResponse> {
  items!: PublicBlogItemResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
