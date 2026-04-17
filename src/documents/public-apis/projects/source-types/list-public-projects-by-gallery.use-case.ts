import { Inject, Injectable } from '@nestjs/common';

import { PAGINATION_DEFAULTS } from '../../../../common/constants/query.constants';
import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { GalleryRepository } from '../../../galleries/domain/repositories/gallery.repository.interface';
import { GALLERIES_TOKENS } from '../../../galleries/galleries.tokens';
import { InvalidProjectGalleryError } from '../../domain/errors/invalid-project-gallery.error';
import type { ProjectRepository } from '../../domain/repositories/project.repository.interface';
import { PROJECTS_TOKENS } from '../../projects.tokens';
import type { ListPublicProjectsByGalleryInput } from '../dto/list-public-projects-by-gallery.input';
import type { PublicProjectItemOutput } from '../dto/public-project.output';
import { ProjectPublicCacheService } from '../services/project-public-cache.service';
import { ProjectPublicOutputFactory } from '../services/project-public-output.factory';

@Injectable()
export class ListPublicProjectsByGalleryUseCase implements UseCase<
  ListPublicProjectsByGalleryInput,
  PaginatedResult<PublicProjectItemOutput>
> {
  constructor(
    @Inject(PROJECTS_TOKENS.ProjectRepository)
    private readonly projectRepository: ProjectRepository,
    @Inject(GALLERIES_TOKENS.GalleryRepository)
    private readonly galleryRepository: GalleryRepository,
    private readonly projectPublicCacheService: ProjectPublicCacheService,
    private readonly projectPublicOutputFactory: ProjectPublicOutputFactory,
  ) {}

  async execute(
    input: ListPublicProjectsByGalleryInput,
  ): Promise<PaginatedResult<PublicProjectItemOutput>> {
    const page = input.page && input.page > 0 ? input.page : PAGINATION_DEFAULTS.PAGE;
    const limit = input.limit && input.limit > 0 ? input.limit : PAGINATION_DEFAULTS.LIMIT;

    const gallery = await this.galleryRepository.findById(input.galleryId);

    if (!gallery || !gallery.isActive || gallery.deletedAt) {
      throw new InvalidProjectGalleryError(input.galleryId);
    }

    const cached = await this.projectPublicCacheService.getPublicListByGallery({
      galleryId: input.galleryId,
      locale: input.locale,
      page,
      limit,
    });

    if (cached) {
      return cached;
    }

    const { items, total } = await this.projectRepository.findPublicByGallery({
      galleryId: input.galleryId,
      page,
      limit,
    });

    const outputs = await this.projectPublicOutputFactory.createPublicItems(items, input.locale);
    const result: PaginatedResult<PublicProjectItemOutput> = {
      items: outputs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };

    await this.projectPublicCacheService.setPublicListByGallery(
      { galleryId: input.galleryId, locale: input.locale, page, limit },
      result,
    );

    return result;
  }
}
