import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Public } from '../../../../common/decorators/public.decorator';
import { ResponseMessage } from '../../../../common/decorators/response-message.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { ROLE_KEYS } from '../../../roles/roles.constants';
import type { CreateBlogInput } from '../../application/dto/create-blog.input';
import type { ListBlogsInput } from '../../application/dto/list-blogs.input';
import type { UpdateBlogInput } from '../../application/dto/update-blog.input';
import { CreateBlogUseCase } from '../../application/use-cases/create-blog.use-case';
import { DeleteBlogUseCase } from '../../application/use-cases/delete-blog.use-case';
import { GetBlogUseCase } from '../../application/use-cases/get-blog.use-case';
import { GetPublicBlogUseCase } from '../../application/use-cases/get-public-blog.use-case';
import { ListBlogsUseCase } from '../../application/use-cases/list-blogs.use-case';
import { ListPublicBlogsUseCase } from '../../application/use-cases/list-public-blogs.use-case';
import { RestoreBlogUseCase } from '../../application/use-cases/restore-blog.use-case';
import { UpdateBlogUseCase } from '../../application/use-cases/update-blog.use-case';
import { BlogPresenter } from './blog.presenter';
import { CreateBlogRequest } from './dto/create-blog.request';
import { ListBlogsQuery } from './dto/list-blogs.query';
import { ListPublicBlogsQuery } from './dto/list-public-blogs.query';
import { UpdateBlogRequest } from './dto/update-blog.request';

@Controller({ path: 'blogs', version: '1' })
@Roles(ROLE_KEYS.ADMIN)
export class BlogController {
  constructor(
    private readonly createBlogUseCase: CreateBlogUseCase,
    private readonly listBlogsUseCase: ListBlogsUseCase,
    private readonly getBlogUseCase: GetBlogUseCase,
    private readonly listPublicBlogsUseCase: ListPublicBlogsUseCase,
    private readonly getPublicBlogUseCase: GetPublicBlogUseCase,
    private readonly updateBlogUseCase: UpdateBlogUseCase,
    private readonly deleteBlogUseCase: DeleteBlogUseCase,
    private readonly restoreBlogUseCase: RestoreBlogUseCase,
    private readonly blogPresenter: BlogPresenter,
  ) {}

  @Post()
  @ResponseMessage('Blog created successfully')
  async create(@CurrentUser() user: { userId: string }, @Body() body: CreateBlogRequest) {
    const input: CreateBlogInput = {
      name: body.name,
      coverImageUploadToken: body.coverImageUploadToken,
      content: body.content as any,
      isPinned: body.isPinned,
      isPublished: body.isPublished,
      createdBy: user.userId,
    };

    const output = await this.createBlogUseCase.execute(input);
    return this.blogPresenter.present(output);
  }

  @Get()
  @ResponseMessage('Blogs fetched successfully')
  async findAll(@Query() query: ListBlogsQuery) {
    const input: ListBlogsInput = {
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      isActive: query.isActive,
      isPublished: query.isPublished,
      isPinned: query.isPinned,
    };

    const output = await this.listBlogsUseCase.execute(input);
    return this.blogPresenter.presentMany(output);
  }

  @Get('public')
  @Public()
  @ResponseMessage('Blogs fetched successfully')
  async findPublic(@Query() query: ListPublicBlogsQuery) {
    const output = await this.listPublicBlogsUseCase.execute({
      page: query.page,
      limit: query.limit,
    });

    return this.blogPresenter.presentPublicMany(output);
  }

  @Get('public/:id')
  @Public()
  @ResponseMessage('Blog fetched successfully')
  async findPublicById(@Param('id') id: string) {
    const output = await this.getPublicBlogUseCase.execute(id);
    return this.blogPresenter.presentPublic(output);
  }

  @Get(':id')
  @ResponseMessage('Blog fetched successfully')
  async findById(@Param('id') id: string) {
    const output = await this.getBlogUseCase.execute(id);
    return this.blogPresenter.present(output);
  }

  @Patch(':id')
  @ResponseMessage('Blog updated successfully')
  async update(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() body: UpdateBlogRequest,
  ) {
    const input: UpdateBlogInput = {
      id,
      name: body.name,
      coverImageUploadToken: body.coverImageUploadToken,
      content: body.content as any,
      isPinned: body.isPinned,
      isPublished: body.isPublished,
      updatedBy: user.userId,
    };

    const output = await this.updateBlogUseCase.execute(input);
    return this.blogPresenter.present(output);
  }

  @Delete(':id')
  @ResponseMessage('Blog deleted successfully')
  async softDelete(@Param('id') id: string) {
    await this.deleteBlogUseCase.execute(id);
    return { message: 'Blog deleted successfully' };
  }

  @Patch(':id/restore')
  @ResponseMessage('Blog restored successfully')
  async restore(@Param('id') id: string) {
    const output = await this.restoreBlogUseCase.execute(id);
    return this.blogPresenter.present(output);
  }
}
