import { Inject, Injectable } from '@nestjs/common';

import { PAGINATION_DEFAULTS } from '../../../../common/constants/query.constants';
import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { PackageRepository } from '../../domain/repositories/package.repository.interface';
import { PACKAGES_TOKENS } from '../../packages.tokens';
import type { ListPublicPackagesInput } from '../dto/list-public-packages.input';
import type { PublicPackageOutput } from '../dto/public-package.output';
import { PackagePublicCacheService } from '../services/package-public-cache.service';
import { PackagePublicOutputFactory } from '../services/package-public-output.factory';

@Injectable()
export class ListPublicPackagesUseCase implements UseCase<
  ListPublicPackagesInput,
  PaginatedResult<PublicPackageOutput>
> {
  constructor(
    @Inject(PACKAGES_TOKENS.PackageRepository)
    private readonly packageRepository: PackageRepository,
    private readonly packagePublicCacheService: PackagePublicCacheService,
    private readonly packagePublicOutputFactory: PackagePublicOutputFactory,
  ) {}

  async execute(input: ListPublicPackagesInput): Promise<PaginatedResult<PublicPackageOutput>> {
    const page = input.page && input.page > 0 ? input.page : PAGINATION_DEFAULTS.PAGE;
    const limit = input.limit && input.limit > 0 ? input.limit : PAGINATION_DEFAULTS.LIMIT;

    const cached = await this.packagePublicCacheService.getPublicList({
      locale: input.locale,
      page,
      limit,
    });

    if (cached) {
      return cached;
    }

    const { items, total } = await this.packageRepository.findPublic({ page, limit });
    const outputs = await this.packagePublicOutputFactory.createMany(items, input.locale);
    const result: PaginatedResult<PublicPackageOutput> = {
      items: outputs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };

    await this.packagePublicCacheService.setPublicList(
      { locale: input.locale, page, limit },
      result,
    );

    return result;
  }
}
