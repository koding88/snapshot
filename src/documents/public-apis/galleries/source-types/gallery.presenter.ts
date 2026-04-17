import { Injectable } from '@nestjs/common';

import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import type { GalleryOutput } from '../../application/dto/gallery.output';
import type { PaginatedPublicGalleryOutput } from '../../application/dto/public-gallery-item.output';
import { GalleryListResponse, GalleryResponse } from './dto/gallery.response';
import { PublicGalleryListResponse } from './dto/public-gallery.response';

@Injectable()
export class GalleryPresenter {
  present(output: GalleryOutput): GalleryResponse {
    return {
      id: output.id,
      name: {
        en: output.name.en,
        vi: output.name.vi,
        cn: output.name.cn,
      },
      createdBy: {
        id: output.createdBy.id,
        name: output.createdBy.name,
      },
      isActive: output.isActive,
      deletedAt: output.deletedAt,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }

  presentMany(outputs: PaginatedResult<GalleryOutput>): GalleryListResponse {
    return {
      items: outputs.items.map((output) => this.present(output)),
      meta: outputs.meta,
    };
  }

  presentPublicMany(outputs: PaginatedPublicGalleryOutput): PublicGalleryListResponse {
    return {
      items: outputs.items.map((output) => ({
        id: output.id,
        name: output.name,
      })),
      meta: outputs.meta,
    };
  }
}
