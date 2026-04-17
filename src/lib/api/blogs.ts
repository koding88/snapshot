import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedData,
  PaginationParams,
  BlogListItem,
  BlogDetail,
} from '@/types';

export const blogsApi = {
  getPublic: (params?: PaginationParams) =>
    apiClient<ApiResponse<PaginatedData<BlogListItem>>>('/api/v1/blogs/public', {
      params: params ? { ...params } : undefined,
    }),

  getPublicById: (id: string) =>
    apiClient<ApiResponse<BlogDetail>>(`/api/v1/blogs/public/${id}`),
};
