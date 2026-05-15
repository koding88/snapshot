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
            staleTime: 1000 * 60 * 60 * 5, // 5 hours
            gcTime: 1000 * 60 * 60 * 5, // 5 hours
            retry: 1,
            refetchOnWindowFocus: false,
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
