import { apiClient } from './client';
import type { ApiResponse } from '@/types';
import type { SiteSettings } from '@/types/site-settings';

export const siteSettingsApi = {
  getPublic: () =>
    apiClient<ApiResponse<SiteSettings>>('/api/v1/site-settings/public'),
};