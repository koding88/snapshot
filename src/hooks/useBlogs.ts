import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { PaginationParams } from '@/types';

export function usePublicBlogs(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.blogs.public(params),
    queryFn: () => blogsApi.getPublic(params),
    select: (res) => res.data,
  });
}

export function usePublicBlog(id: string) {
  return useQuery({
    queryKey: queryKeys.blogs.publicDetail(id),
    queryFn: () => blogsApi.getPublicById(id),
    select: (res) => res.data,
    enabled: Boolean(id),
  });
}
