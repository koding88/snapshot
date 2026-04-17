import { Injectable } from '@nestjs/common';

import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import type { BlogOutput } from '../../application/dto/blog.output';
import type {
  PublicBlogItemOutput,
  PublicBlogOutput,
} from '../../application/dto/public-blog.output';
import { BlogListResponse, BlogResponse } from './dto/blog.response';
import {
  PublicBlogItemResponse,
  PublicBlogListResponse,
  PublicBlogResponse,
} from './dto/public-blog.response';

@Injectable()
export class BlogPresenter {
  present(output: BlogOutput): BlogResponse {
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
      content: output.content,
      isPinned: output.isPinned,
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

  presentMany(outputs: PaginatedResult<BlogOutput>): BlogListResponse {
    return {
      items: outputs.items.map((output) => this.present(output)),
      meta: outputs.meta,
    };
  }

  presentPublicItem(output: PublicBlogItemOutput): PublicBlogItemResponse {
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

  presentPublicMany(outputs: PaginatedResult<PublicBlogItemOutput>): PublicBlogListResponse {
    return {
      items: outputs.items.map((output) => this.presentPublicItem(output)),
      meta: outputs.meta,
    };
  }

  presentPublic(output: PublicBlogOutput): PublicBlogResponse {
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
      content: output.content,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
