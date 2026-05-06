import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { cacheManager } from "@/lib/cache-manager";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Hook to handle cache refresh on visibility change (tab switch)
 * Checks if cache is expired and refetches if needed
 */
export function useCacheRefresh() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const locale = document.documentElement.lang?.split("-")[0] || "en";

      if (cacheManager.shouldFetchGalleries(locale)) {
        queryClient.refetchQueries({
          queryKey: queryKeys.galleries.public(locale),
          type: "active",
        });
      }

      if (cacheManager.shouldFetchSiteSettings()) {
        queryClient.refetchQueries({
          queryKey: queryKeys.siteSettings.public(),
          type: "active",
        });
      }
    };

    // Listen to visibility change events
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryClient]);
}
