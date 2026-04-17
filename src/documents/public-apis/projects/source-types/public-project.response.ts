import type { PaginatedResult } from '../../../../../core/application/common/pagination.interface';
import type { EditorJsOutputData } from '../../../projects.types';

export class PublicProjectCoverImageResponse {
  id!: string;
  url!: string;
  mimeType!: string;
  size!: number;
  originalName!: string | null;
}

export class PublicProjectItemResponse {
  id!: string;
  name!: string;
  coverImage!: PublicProjectCoverImageResponse;
}

export class PublicProjectGalleryResponse {
  id!: string;
  name!: string;
}

export class PublicProjectResponse {
  id!: string;
  gallery!: PublicProjectGalleryResponse | null;
  name!: string;
  coverImage!: PublicProjectCoverImageResponse;
  content!: EditorJsOutputData;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PublicProjectListResponse implements PaginatedResult<PublicProjectItemResponse> {
  items!: PublicProjectItemResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
