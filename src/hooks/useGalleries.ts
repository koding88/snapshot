import { useQuery } from '@tanstack/react-query';
import { galleriesApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { PaginationParams } from '@/types';

export function usePublicGalleries(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.galleries.public(params),
    queryFn: () => galleriesApi.getPublic(params),
    select: (res) => res.data,
  });
}
