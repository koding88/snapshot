import { useQuery } from "@tanstack/react-query";
import { siteSettingsApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { cacheManager } from "@/lib/cache-manager";
import type { SiteSettings } from "@/types/site-settings";

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  socialLinks: {
    facebookUrl: "https://www.facebook.com/",
    pinterestUrl: "https://www.pinterest.com/Snaphanoi/",
    instagramUrl: "https://www.instagram.com/snaphanoi.photo/",
    whatsappUrl: "https://wa.me/84944659659",
  },
  contactInfo: {
    contactEmail: "contact@snaphanoi.com",
    officeAddress: "Hanoi, Vietnam",
  },
};

export function usePublicSiteSettings() {
  const cachedData = cacheManager.getSiteSettingsData<SiteSettings>();
  const shouldFetch = cacheManager.shouldFetchSiteSettings();

  return useQuery<SiteSettings>({
    queryKey: queryKeys.siteSettings.public(),
    queryFn: async () => {
      const res = await siteSettingsApi.getPublic();
      cacheManager.setSiteSettingsData(res.data);
      return res.data;
    },
    initialData: cachedData ?? undefined,
    placeholderData: cachedData ?? FALLBACK_SITE_SETTINGS,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 6,
    enabled: shouldFetch || !cachedData,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
