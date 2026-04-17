import { Inject, Injectable } from '@nestjs/common';

import { UseCase } from '../../../../core/application/common/use-case.interface';
import { BLOGS_TOKENS } from '../../blogs.tokens';
import { BlogNotFoundError } from '../../domain/errors/blog-not-found.error';
import type { BlogRepository } from '../../domain/repositories/blog.repository.interface';
import type { GetPublicBlogInput, PublicBlogOutput } from '../dto/public-blog.output';
import { BlogPublicCacheService } from '../services/blog-public-cache.service';
import { BlogPublicOutputFactory } from '../services/blog-public-output.factory';

@Injectable()
export class GetPublicBlogUseCase implements UseCase<GetPublicBlogInput, PublicBlogOutput> {
  constructor(
    @Inject(BLOGS_TOKENS.BlogRepository)
    private readonly blogRepository: BlogRepository,
    private readonly blogPublicCacheService: BlogPublicCacheService,
    private readonly blogPublicOutputFactory: BlogPublicOutputFactory,
  ) {}

  async execute(input: GetPublicBlogInput): Promise<PublicBlogOutput> {
    const cached = await this.blogPublicCacheService.getPublicDetail({
      blogId: input.id,
      locale: input.locale,
    });

    if (cached) {
      return cached;
    }

    const blog = await this.blogRepository.findPublicById(input.id);

    if (!blog) {
      throw new BlogNotFoundError(input.id);
    }

    const output = await this.blogPublicOutputFactory.createPublicDetail(blog, input.locale);
    await this.blogPublicCacheService.setPublicDetail(
      { blogId: input.id, locale: input.locale },
      output,
    );
    return output;
  }
}
