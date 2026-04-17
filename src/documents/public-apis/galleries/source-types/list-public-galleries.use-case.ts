import { Inject, Injectable } from '@nestjs/common';

import { PAGINATION_DEFAULTS } from '../../../../common/constants/query.constants';
import { getLocalizedText } from '../../../../common/helpers/get-localized-text.helper';
import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { GalleryRepository } from '../../domain/repositories/gallery.repository.interface';
import { GALLERIES_TOKENS } from '../../galleries.tokens';
import type { ListPublicGalleriesInput } from '../dto/list-public-galleries.input';
import type {
  PaginatedPublicGalleryOutput,
  PublicGalleryItemOutput,
} from '../dto/public-gallery-item.output';
import { GalleryPublicCacheService } from '../services/gallery-public-cache.service';

@Injectable()
export class ListPublicGalleriesUseCase implements UseCase<
  ListPublicGalleriesInput,
  PaginatedResult<PublicGalleryItemOutput>
> {
  constructor(
    @Inject(GALLERIES_TOKENS.GalleryRepository)
    private readonly galleryRepository: GalleryRepository,
    private readonly galleryPublicCacheService: GalleryPublicCacheService,
  ) {}

  async execute(input: ListPublicGalleriesInput): Promise<PaginatedPublicGalleryOutput> {
    const page = input.page && input.page > 0 ? input.page : PAGINATION_DEFAULTS.PAGE;
    const limit = input.limit && input.limit > 0 ? input.limit : PAGINATION_DEFAULTS.LIMIT;

    const cached = await this.galleryPublicCacheService.getPublicList({
      locale: input.locale,
      page,
      limit,
    });

    if (cached) {
      return cached;
    }

    const { items, total } = await this.galleryRepository.findPublic({ page, limit });
    const outputs = items.map((gallery) => ({
      id: gallery.id,
      name: getLocalizedText(gallery.name.toObject(), input.locale),
    }));
    const result: PaginatedPublicGalleryOutput = {
      items: outputs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };

    await this.galleryPublicCacheService.setPublicList(
      { locale: input.locale, page, limit },
      result,
    );
    return result;
  }
}
