import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { PaginationParams } from '@/types';

interface UsePublicProjectsParams extends PaginationParams {
  galleryId: string;
}

export function usePublicProjects(params: UsePublicProjectsParams) {
  return useQuery({
    queryKey: queryKeys.projects.public(params),
    queryFn: () => projectsApi.getPublic(params),
    select: (res) => res.data,
    enabled: Boolean(params.galleryId),
  });
}

export function usePublicProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.publicDetail(id),
    queryFn: () => projectsApi.getPublicById(id),
    select: (res) => res.data,
    enabled: Boolean(id),
  });
}
