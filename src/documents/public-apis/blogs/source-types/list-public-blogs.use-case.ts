import { Inject, Injectable } from '@nestjs/common';

import { PAGINATION_DEFAULTS } from '../../../../common/constants/query.constants';
import type { PaginatedResult } from '../../../../core/application/common/pagination.interface';
import { UseCase } from '../../../../core/application/common/use-case.interface';
import { BLOGS_TOKENS } from '../../blogs.tokens';
import type { BlogRepository } from '../../domain/repositories/blog.repository.interface';
import type { ListPublicBlogsInput } from '../dto/list-public-blogs.input';
import type { PublicBlogItemOutput } from '../dto/public-blog.output';
import { BlogPublicCacheService } from '../services/blog-public-cache.service';
import { BlogPublicOutputFactory } from '../services/blog-public-output.factory';

@Injectable()
export class ListPublicBlogsUseCase implements UseCase<
  ListPublicBlogsInput,
  PaginatedResult<PublicBlogItemOutput>
> {
  constructor(
    @Inject(BLOGS_TOKENS.BlogRepository)
    private readonly blogRepository: BlogRepository,
    private readonly blogPublicCacheService: BlogPublicCacheService,
    private readonly blogPublicOutputFactory: BlogPublicOutputFactory,
  ) {}

  async execute(input: ListPublicBlogsInput): Promise<PaginatedResult<PublicBlogItemOutput>> {
    const page = input.page && input.page > 0 ? input.page : PAGINATION_DEFAULTS.PAGE;
    const limit = input.limit && input.limit > 0 ? input.limit : PAGINATION_DEFAULTS.LIMIT;

    const cached = await this.blogPublicCacheService.getPublicList({ page, limit });

    if (cached) {
      return cached;
    }

    const { items, total } = await this.blogRepository.findPublic({ page, limit });
    const outputs = await this.blogPublicOutputFactory.createPublicItems(items);
    const result: PaginatedResult<PublicBlogItemOutput> = {
      items: outputs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };

    await this.blogPublicCacheService.setPublicList({ page, limit }, result);
    return result;
  }
}
