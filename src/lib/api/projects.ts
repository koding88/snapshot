import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedData,
  PaginationParams,
  ProjectListItem,
  ProjectDetail,
} from '@/types';

interface GetProjectsParams extends PaginationParams {
  galleryId: string;
}

export const projectsApi = {
  getPublic: (params: GetProjectsParams) =>
    apiClient<ApiResponse<PaginatedData<ProjectListItem>>>('/api/v1/projects/public', {
      params: params ? { ...params } : undefined,
    }),

  getPublicById: (id: string) =>
    apiClient<ApiResponse<ProjectDetail>>(`/api/v1/projects/public/${id}`),
};
