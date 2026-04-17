import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import type { SupportedLocale } from '../../../../common/constants/locale.constants';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Public } from '../../../../common/decorators/public.decorator';
import { RequestLocale } from '../../../../common/decorators/request-locale.decorator';
import { ResponseMessage } from '../../../../common/decorators/response-message.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { ROLE_KEYS } from '../../../roles/roles.constants';
import { CreateGalleryInput } from '../../application/dto/create-gallery.input';
import { ListGalleriesInput } from '../../application/dto/list-galleries.input';
import { UpdateGalleryInput } from '../../application/dto/update-gallery.input';
import { CreateGalleryUseCase } from '../../application/use-cases/create-gallery.use-case';
import { DeleteGalleryUseCase } from '../../application/use-cases/delete-gallery.use-case';
import { GetGalleryUseCase } from '../../application/use-cases/get-gallery.use-case';
import { ListGalleriesUseCase } from '../../application/use-cases/list-galleries.use-case';
import { ListPublicGalleriesUseCase } from '../../application/use-cases/list-public-galleries.use-case';
import { RestoreGalleryUseCase } from '../../application/use-cases/restore-gallery.use-case';
import { UpdateGalleryUseCase } from '../../application/use-cases/update-gallery.use-case';
import { CreateGalleryRequest } from './dto/create-gallery.request';
import { ListGalleriesQuery } from './dto/list-galleries.query';
import { ListPublicGalleriesQuery } from './dto/list-public-galleries.query';
import { UpdateGalleryRequest } from './dto/update-gallery.request';
import { GalleryPresenter } from './gallery.presenter';

@Controller({ path: 'galleries', version: '1' })
@Roles(ROLE_KEYS.ADMIN)
export class GalleryController {
  constructor(
    private readonly createGalleryUseCase: CreateGalleryUseCase,
    private readonly getGalleryUseCase: GetGalleryUseCase,
    private readonly listGalleriesUseCase: ListGalleriesUseCase,
    private readonly listPublicGalleriesUseCase: ListPublicGalleriesUseCase,
    private readonly updateGalleryUseCase: UpdateGalleryUseCase,
    private readonly deleteGalleryUseCase: DeleteGalleryUseCase,
    private readonly restoreGalleryUseCase: RestoreGalleryUseCase,
    private readonly galleryPresenter: GalleryPresenter,
  ) {}

  @Post()
  @ResponseMessage('Gallery created successfully')
  async create(@CurrentUser() user: { userId: string }, @Body() body: CreateGalleryRequest) {
    const input: CreateGalleryInput = {
      name: body.name,
      createdBy: user.userId,
    };

    const output = await this.createGalleryUseCase.execute(input);
    return this.galleryPresenter.present(output);
  }

  @Get()
  @ResponseMessage('Galleries fetched successfully')
  async findAll(@Query() query: ListGalleriesQuery) {
    const input: ListGalleriesInput = {
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      isActive: query.isActive,
    };

    const output = await this.listGalleriesUseCase.execute(input);
    return this.galleryPresenter.presentMany(output);
  }

  @Get('public')
  @Public()
  @ResponseMessage('Galleries fetched successfully')
  async findPublic(
    @RequestLocale() locale: SupportedLocale,
    @Query() query: ListPublicGalleriesQuery,
  ) {
    const output = await this.listPublicGalleriesUseCase.execute({
      locale,
      page: query.page,
      limit: query.limit,
    });
    return this.galleryPresenter.presentPublicMany(output);
  }

  @Get(':id')
  @ResponseMessage('Gallery fetched successfully')
  async findById(@Param('id') id: string) {
    const output = await this.getGalleryUseCase.execute(id);
    return this.galleryPresenter.present(output);
  }

  @Patch(':id')
  @ResponseMessage('Gallery updated successfully')
  async update(@Param('id') id: string, @Body() body: UpdateGalleryRequest) {
    const input: UpdateGalleryInput = {
      id,
      name: body.name,
    };

    const output = await this.updateGalleryUseCase.execute(input);
    return this.galleryPresenter.present(output);
  }

  @Delete(':id')
  @ResponseMessage('Gallery deleted successfully')
  async softDelete(@Param('id') id: string) {
    await this.deleteGalleryUseCase.execute(id);
    return { message: 'Gallery deleted successfully' };
  }

  @Patch(':id/restore')
  @ResponseMessage('Gallery restored successfully')
  async restore(@Param('id') id: string) {
    const output = await this.restoreGalleryUseCase.execute(id);
    return this.galleryPresenter.present(output);
  }
}
