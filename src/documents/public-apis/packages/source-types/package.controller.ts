import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import type { SupportedLocale } from '../../../../common/constants/locale.constants';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Public } from '../../../../common/decorators/public.decorator';
import { RequestLocale } from '../../../../common/decorators/request-locale.decorator';
import { ResponseMessage } from '../../../../common/decorators/response-message.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { ROLE_KEYS } from '../../../roles/roles.constants';
import type { CreatePackageInput } from '../../application/dto/create-package.input';
import type { ListPackagesInput } from '../../application/dto/list-packages.input';
import type { UpdatePackageInput } from '../../application/dto/update-package.input';
import { CreatePackageUseCase } from '../../application/use-cases/create-package.use-case';
import { DeletePackageUseCase } from '../../application/use-cases/delete-package.use-case';
import { GetPackageUseCase } from '../../application/use-cases/get-package.use-case';
import { ListPackagesUseCase } from '../../application/use-cases/list-packages.use-case';
import { ListPublicPackagesUseCase } from '../../application/use-cases/list-public-packages.use-case';
import { RestorePackageUseCase } from '../../application/use-cases/restore-package.use-case';
import { UpdatePackageUseCase } from '../../application/use-cases/update-package.use-case';
import { CreatePackageRequest } from './dto/create-package.request';
import { ListPackagesQuery } from './dto/list-packages.query';
import { ListPublicPackagesQuery } from './dto/list-public-packages.query';
import { UpdatePackageRequest } from './dto/update-package.request';
import { PackagePresenter } from './package.presenter';

@Controller({ path: 'packages', version: '1' })
@Roles(ROLE_KEYS.ADMIN)
export class PackageController {
  constructor(
    private readonly createPackageUseCase: CreatePackageUseCase,
    private readonly listPackagesUseCase: ListPackagesUseCase,
    private readonly getPackageUseCase: GetPackageUseCase,
    private readonly listPublicPackagesUseCase: ListPublicPackagesUseCase,
    private readonly updatePackageUseCase: UpdatePackageUseCase,
    private readonly deletePackageUseCase: DeletePackageUseCase,
    private readonly restorePackageUseCase: RestorePackageUseCase,
    private readonly packagePresenter: PackagePresenter,
  ) {}

  @Post()
  @ResponseMessage('Package created successfully')
  async create(@CurrentUser() user: { userId: string }, @Body() body: CreatePackageRequest) {
    const input: CreatePackageInput = {
      name: body.name,
      bestFor: body.bestFor,
      duration: body.duration,
      photoCount: body.photoCount,
      pricing: body.pricing,
      coverImageUploadToken: body.coverImageUploadToken,
      createdBy: user.userId,
    };

    const output = await this.createPackageUseCase.execute(input);
    return this.packagePresenter.present(output);
  }

  @Get()
  @ResponseMessage('Packages fetched successfully')
  async findAll(@Query() query: ListPackagesQuery) {
    const input: ListPackagesInput = {
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      isActive: query.isActive,
    };

    const output = await this.listPackagesUseCase.execute(input);
    return this.packagePresenter.presentMany(output);
  }

  @Get('public')
  @Public()
  @ResponseMessage('Packages fetched successfully')
  async findPublic(
    @RequestLocale() locale: SupportedLocale,
    @Query() query: ListPublicPackagesQuery,
  ) {
    const output = await this.listPublicPackagesUseCase.execute({
      locale,
      page: query.page,
      limit: query.limit,
    });

    return this.packagePresenter.presentPublicMany(output);
  }

  @Get(':id')
  @ResponseMessage('Package fetched successfully')
  async findById(@Param('id') id: string) {
    const output = await this.getPackageUseCase.execute(id);
    return this.packagePresenter.present(output);
  }

  @Patch(':id')
  @ResponseMessage('Package updated successfully')
  async update(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() body: UpdatePackageRequest,
  ) {
    const input: UpdatePackageInput = {
      id,
      name: body.name,
      bestFor: body.bestFor,
      duration: body.duration,
      photoCount: body.photoCount,
      pricing: body.pricing,
      coverImageUploadToken: body.coverImageUploadToken,
      updatedBy: user.userId,
    };

    const output = await this.updatePackageUseCase.execute(input);
    return this.packagePresenter.present(output);
  }

  @Delete(':id')
  @ResponseMessage('Package deleted successfully')
  async softDelete(@Param('id') id: string) {
    await this.deletePackageUseCase.execute(id);
    return { message: 'Package deleted successfully' };
  }

  @Patch(':id/restore')
  @ResponseMessage('Package restored successfully')
  async restore(@Param('id') id: string) {
    const output = await this.restorePackageUseCase.execute(id);
    return this.packagePresenter.present(output);
  }
}
