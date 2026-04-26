import { useQuery } from '@tanstack/react-query';
import { siteSettingsApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { SiteSettings } from '@/types/site-settings';

export function usePublicSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: queryKeys.siteSettings.public(),
    queryFn: async () => {
      const res = await siteSettingsApi.getPublic();
      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 ngày
  });
}
