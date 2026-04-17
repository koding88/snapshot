import { apiClient } from './client';
import type { ApiResponse, PaginatedData, PaginationParams, Package } from '@/types';

export const packagesApi = {
  getPublic: (params?: PaginationParams) =>
    apiClient<ApiResponse<PaginatedData<Package>>>('/api/v1/packages/public', { params }),
};
