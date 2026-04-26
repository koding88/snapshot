'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, type ReactNode } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes (default)
            retry: 1,
            // cacheTime: 1000 * 60 * 60 * 24, // 1 ngày cho toàn bộ queries
          },
        },
      })
  );

  // Prefetch site settings on app load (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/api/site-settings').then(({ siteSettingsApi }) => {
        import('@/lib/queryKeys').then(({ queryKeys }) => {
          queryClient.prefetchQuery({
            queryKey: queryKeys.siteSettings.public(),
            queryFn: async () => {
              const res = await siteSettingsApi.getPublic();
              return res.data;
            },
            staleTime: 1000 * 60 * 60 * 24,
          });
        });
      });
    }
  }, [queryClient]);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
