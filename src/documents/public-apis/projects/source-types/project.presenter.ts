import { Injectable } from '@nestjs/common';

import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import type { ProjectOutput } from '../../application/dto/project.output';
import type {
  PublicProjectItemOutput,
  PublicProjectOutput,
} from '../../application/dto/public-project.output';
import { ProjectListResponse, ProjectResponse } from './dto/project.response';
import { PublicProjectListResponse, PublicProjectResponse } from './dto/public-project.response';

@Injectable()
export class ProjectPresenter {
  present(output: ProjectOutput): ProjectResponse {
    return {
      id: output.id,
      gallery: output.gallery
        ? {
            id: output.gallery.id,
            name: output.gallery.name,
          }
        : undefined,
      name: {
        en: output.name.en,
        vi: output.name.vi,
        cn: output.name.cn,
      },
      coverImage: {
        id: output.coverImage.id,
        url: output.coverImage.url,
        mimeType: output.coverImage.mimeType,
        size: output.coverImage.size,
        originalName: output.coverImage.originalName,
      },
      content: output.content,
      isPublished: output.isPublished,
      isActive: output.isActive,
      deletedAt: output.deletedAt,
      createdBy: {
        id: output.createdBy.id,
        name: output.createdBy.name,
      },
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }

  presentMany(outputs: PaginatedResult<ProjectOutput>): ProjectListResponse {
    return {
      items: outputs.items.map((output) => this.present(output)),
      meta: outputs.meta,
    };
  }

  presentPublicItem(output: PublicProjectItemOutput) {
    return {
      id: output.id,
      name: output.name,
      coverImage: {
        id: output.coverImage.id,
        url: output.coverImage.url,
        mimeType: output.coverImage.mimeType,
        size: output.coverImage.size,
        originalName: output.coverImage.originalName,
      },
    };
  }

  presentPublicMany(outputs: PaginatedResult<PublicProjectItemOutput>): PublicProjectListResponse {
    return {
      items: outputs.items.map((output) => this.presentPublicItem(output)),
      meta: outputs.meta,
    };
  }

  presentPublic(output: PublicProjectOutput): PublicProjectResponse {
    return {
      id: output.id,
      gallery: output.gallery
        ? {
            id: output.gallery.id,
            name: output.gallery.name,
          }
        : null,
      name: output.name,
      coverImage: {
        id: output.coverImage.id,
        url: output.coverImage.url,
        mimeType: output.coverImage.mimeType,
        size: output.coverImage.size,
        originalName: output.coverImage.originalName,
      },
      content: output.content,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
