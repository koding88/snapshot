import { useQuery } from '@tanstack/react-query';
import { packagesApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { PaginationParams } from '@/types';

export function usePublicPackages(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.packages.public(params),
    queryFn: () => packagesApi.getPublic(params),
    select: (res) => res.data,
  });
}
