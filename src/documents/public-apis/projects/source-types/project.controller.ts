import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import type { SupportedLocale } from '../../../../common/constants/locale.constants';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Public } from '../../../../common/decorators/public.decorator';
import { RequestLocale } from '../../../../common/decorators/request-locale.decorator';
import { ResponseMessage } from '../../../../common/decorators/response-message.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { ROLE_KEYS } from '../../../roles/roles.constants';
import type { CreateProjectInput } from '../../application/dto/create-project.input';
import type { ListProjectsInput } from '../../application/dto/list-projects.input';
import type { UpdateProjectInput } from '../../application/dto/update-project.input';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { GetPublicProjectUseCase } from '../../application/use-cases/get-public-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/list-projects.use-case';
import { ListPublicProjectsByGalleryUseCase } from '../../application/use-cases/list-public-projects-by-gallery.use-case';
import { RestoreProjectUseCase } from '../../application/use-cases/restore-project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { CreateProjectRequest } from './dto/create-project.request';
import { ListProjectsQuery } from './dto/list-projects.query';
import { ListPublicProjectsQuery } from './dto/list-public-projects.query';
import { UpdateProjectRequest } from './dto/update-project.request';
import { ProjectPresenter } from './project.presenter';

@Controller({ path: 'projects', version: '1' })
@Roles(ROLE_KEYS.ADMIN)
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly listProjectsUseCase: ListProjectsUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly listPublicProjectsByGalleryUseCase: ListPublicProjectsByGalleryUseCase,
    private readonly getPublicProjectUseCase: GetPublicProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly restoreProjectUseCase: RestoreProjectUseCase,
    private readonly projectPresenter: ProjectPresenter,
  ) {}

  @Post()
  @ResponseMessage('Project created successfully')
  async create(
    @CurrentUser() user: { userId: string },
    @RequestLocale() locale: SupportedLocale,
    @Body() body: CreateProjectRequest,
  ) {
    const input: CreateProjectInput = {
      galleryId: body.galleryId,
      name: body.name,
      coverImageUploadToken: body.coverImageUploadToken,
      content: body.content as any,
      isPublished: body.isPublished,
      createdBy: user.userId,
      locale,
    };

    const output = await this.createProjectUseCase.execute(input);
    return this.projectPresenter.present(output);
  }

  @Get()
  @ResponseMessage('Projects fetched successfully')
  async findAll(@RequestLocale() locale: SupportedLocale, @Query() query: ListProjectsQuery) {
    const input: ListProjectsInput = {
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      isActive: query.isActive,
      isPublished: query.isPublished,
      locale,
    };

    const output = await this.listProjectsUseCase.execute(input);
    return this.projectPresenter.presentMany(output);
  }

  @Get('public')
  @Public()
  @ResponseMessage('Projects fetched successfully')
  async findPublic(
    @RequestLocale() locale: SupportedLocale,
    @Query() query: ListPublicProjectsQuery,
  ) {
    const output = await this.listPublicProjectsByGalleryUseCase.execute({
      galleryId: query.galleryId,
      page: query.page,
      limit: query.limit,
      locale,
    });

    return this.projectPresenter.presentPublicMany(output);
  }

  @Get('public/:id')
  @Public()
  @ResponseMessage('Project fetched successfully')
  async findPublicById(@RequestLocale() locale: SupportedLocale, @Param('id') id: string) {
    const output = await this.getPublicProjectUseCase.execute({ id, locale });
    return this.projectPresenter.presentPublic(output);
  }

  @Get(':id')
  @ResponseMessage('Project fetched successfully')
  async findById(@RequestLocale() locale: SupportedLocale, @Param('id') id: string) {
    const output = await this.getProjectUseCase.execute({ id, locale });
    return this.projectPresenter.present(output);
  }

  @Patch(':id')
  @ResponseMessage('Project updated successfully')
  async update(
    @CurrentUser() user: { userId: string },
    @RequestLocale() locale: SupportedLocale,
    @Param('id') id: string,
    @Body() body: UpdateProjectRequest,
  ) {
    const input: UpdateProjectInput = {
      id,
      galleryId: body.galleryId,
      name: body.name,
      coverImageUploadToken: body.coverImageUploadToken,
      content: body.content as any,
      isPublished: body.isPublished,
      updatedBy: user.userId,
      locale,
    };

    const output = await this.updateProjectUseCase.execute(input);
    return this.projectPresenter.present(output);
  }

  @Delete(':id')
  @ResponseMessage('Project deleted successfully')
  async softDelete(@Param('id') id: string) {
    await this.deleteProjectUseCase.execute(id);
    return { message: 'Project deleted successfully' };
  }

  @Patch(':id/restore')
  @ResponseMessage('Project restored successfully')
  async restore(@RequestLocale() locale: SupportedLocale, @Param('id') id: string) {
    const output = await this.restoreProjectUseCase.execute({ id, locale });
    return this.projectPresenter.present(output);
  }
}
