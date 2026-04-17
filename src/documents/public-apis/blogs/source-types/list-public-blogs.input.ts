import type { SupportedLocale } from '../../../../common/constants/locale.constants';

export type ListPublicBlogsInput = {
  locale: SupportedLocale;
  page?: number;
  limit?: number;
};
