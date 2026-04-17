import { Inject, Injectable } from '@nestjs/common';

import type { SupportedLocale } from '../../../../common/constants/locale.constants';
import { getLocalizedText } from '../../../../common/helpers/get-localized-text.helper';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import type { GalleryRepository } from '../../../galleries/domain/repositories/gallery.repository.interface';
import { GALLERIES_TOKENS } from '../../../galleries/galleries.tokens';
import { ProjectNotFoundError } from '../../domain/errors/project-not-found.error';
import type { ProjectRepository } from '../../domain/repositories/project.repository.interface';
import { PROJECTS_TOKENS } from '../../projects.tokens';
import type { PublicProjectOutput } from '../dto/public-project.output';
import { ProjectPublicCacheService } from '../services/project-public-cache.service';
import { ProjectPublicOutputFactory } from '../services/project-public-output.factory';

type GetPublicProjectInput = {
  id: string;
  locale: SupportedLocale;
};

@Injectable()
export class GetPublicProjectUseCase implements UseCase<
  GetPublicProjectInput,
  PublicProjectOutput
> {
  constructor(
    @Inject(PROJECTS_TOKENS.ProjectRepository)
    private readonly projectRepository: ProjectRepository,
    @Inject(GALLERIES_TOKENS.GalleryRepository)
    private readonly galleryRepository: GalleryRepository,
    private readonly projectPublicCacheService: ProjectPublicCacheService,
    private readonly projectPublicOutputFactory: ProjectPublicOutputFactory,
  ) {}

  async execute(input: GetPublicProjectInput): Promise<PublicProjectOutput> {
    const cached = await this.projectPublicCacheService.getPublicDetail({
      projectId: input.id,
      locale: input.locale,
    });

    if (cached) {
      if (!cached.gallery) {
        return cached;
      }

      const gallery = await this.galleryRepository.findById(cached.gallery.id);
      const localizedGalleryName =
        gallery && gallery.isActive && !gallery.deletedAt
          ? getLocalizedText(gallery.name.toObject(), input.locale)
          : null;

      if (localizedGalleryName && localizedGalleryName === cached.gallery.name) {
        return cached;
      }
    }

    const project = await this.projectRepository.findPublicById(input.id);

    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    const output = await this.projectPublicOutputFactory.createPublicDetail(project, input.locale);
    await this.projectPublicCacheService.setPublicDetail(
      { projectId: input.id, locale: input.locale },
      output,
    );
    return output;
  }
}
