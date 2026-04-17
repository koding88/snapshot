import { Injectable } from '@nestjs/common';

import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import type { PackageOutput } from '../../application/dto/package.output';
import type { PublicPackageOutput } from '../../application/dto/public-package.output';
import { PackageListResponse, PackageResponse } from './dto/package.response';
import { PublicPackageListResponse, PublicPackageResponse } from './dto/public-package.response';

@Injectable()
export class PackagePresenter {
  present(output: PackageOutput): PackageResponse {
    return {
      id: output.id,
      name: {
        en: output.name.en,
        vi: output.name.vi,
        cn: output.name.cn,
      },
      bestFor: {
        en: output.bestFor.en,
        vi: output.bestFor.vi,
        cn: output.bestFor.cn,
      },
      duration: output.duration,
      photoCount: output.photoCount,
      pricing: {
        amount: output.pricing.amount,
        currency: output.pricing.currency,
      },
      coverImage: {
        id: output.coverImage.id,
        url: output.coverImage.url,
        mimeType: output.coverImage.mimeType,
        size: output.coverImage.size,
        originalName: output.coverImage.originalName,
      },
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

  presentMany(outputs: PaginatedResult<PackageOutput>): PackageListResponse {
    return {
      items: outputs.items.map((output) => this.present(output)),
      meta: outputs.meta,
    };
  }

  presentPublicMany(outputs: PaginatedResult<PublicPackageOutput>): PublicPackageListResponse {
    return {
      items: outputs.items.map((output) => this.presentPublic(output)),
      meta: outputs.meta,
    };
  }

  presentPublic(output: PublicPackageOutput): PublicPackageResponse {
    return {
      id: output.id,
      name: output.name,
      bestFor: output.bestFor,
      duration: output.duration,
      photoCount: output.photoCount,
      pricing: {
        amount: output.pricing.amount,
        currency: output.pricing.currency,
      },
      coverImage: {
        id: output.coverImage.id,
        url: output.coverImage.url,
        mimeType: output.coverImage.mimeType,
        size: output.coverImage.size,
        originalName: output.coverImage.originalName,
      },
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
