import { useQuery } from "@tanstack/react-query";
import { galleriesApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { cacheManager } from "@/lib/cache-manager";
import type { PaginationParams } from "@/types";

export function usePublicGalleries(params?: PaginationParams) {
  const cachedData =
    cacheManager.getGalleriesData<
      Awaited<ReturnType<typeof galleriesApi.getPublic>>["data"]
    >();
  const shouldFetch = cacheManager.shouldFetchGalleries();

  return useQuery({
    queryKey: queryKeys.galleries.public(params),
    queryFn: async () => {
      const res = await galleriesApi.getPublic(params);
      cacheManager.setGalleriesData(res.data);
      return res.data;
    },
    initialData: cachedData ?? undefined,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    enabled: shouldFetch || !cachedData,
    refetchOnWindowFocus: false,
  });
}
