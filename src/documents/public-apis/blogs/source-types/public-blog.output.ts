import type { EditorJsOutputData } from '../../blogs.types';
import type { SupportedLocale } from '../../../../common/constants/locale.constants';

export type PublicBlogCoverImageOutput = {
  id: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string | null;
};

export type PublicBlogItemOutput = {
  id: string;
  name: string;
  coverImage: PublicBlogCoverImageOutput;
};

export type PublicBlogOutput = {
  id: string;
  name: string;
  coverImage: PublicBlogCoverImageOutput;
  content: EditorJsOutputData;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedPublicBlogsOutput = {
  items: PublicBlogItemOutput[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type GetPublicBlogInput = {
  id: string;
  locale: SupportedLocale;
};
