import { apiClient } from './client';
import type { ApiResponse, Gallery, PaginatedData, PaginationParams } from '@/types';

export const galleriesApi = {
  getPublic: (params?: PaginationParams) =>
    apiClient<ApiResponse<PaginatedData<Gallery>>>('/api/v1/galleries/public', {
      params: params ? { ...params } : undefined,
    }),
};
