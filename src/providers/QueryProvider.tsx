"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { useCacheRefresh } from "@/hooks/useCacheRefresh";

function CacheRefreshHandler() {
  useCacheRefresh();
  return null;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes (default)
            retry: 1,
            refetchOnWindowFocus: false, // Disable default refetch on focus
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CacheRefreshHandler />
      {children}
    </QueryClientProvider>
  );
}
