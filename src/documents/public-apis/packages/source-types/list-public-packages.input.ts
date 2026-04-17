import type { SupportedLocale } from '../../../../common/constants/locale.constants';
import type { PaginationQuery } from '../../../../core/application/common/pagination.interface';

export type ListPublicPackagesInput = PaginationQuery & {
  locale: SupportedLocale;
};
