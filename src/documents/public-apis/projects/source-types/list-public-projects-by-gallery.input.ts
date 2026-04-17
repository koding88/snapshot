import type { SupportedLocale } from '../../../../common/constants/locale.constants';

export type ListPublicProjectsByGalleryInput = {
  galleryId: string;
  page?: number;
  limit?: number;
  locale: SupportedLocale;
};
