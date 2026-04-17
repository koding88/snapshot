import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Public } from '../../../../common/decorators/public.decorator';
import { ResponseMessage } from '../../../../common/decorators/response-message.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { ROLE_KEYS } from '../../../roles/roles.constants';
import type { ConfirmOrderRequestInput } from '../../application/dto/confirm-order-request.input';
import type { ListOrdersInput } from '../../application/dto/list-orders.input';
import type { SubmitOrderRequestInput } from '../../application/dto/submit-order-request.input';
import type { UpdateOrderInput } from '../../application/dto/update-order.input';
import { ConfirmOrderRequestUseCase } from '../../application/use-cases/confirm-order-request.use-case';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { SubmitOrderRequestUseCase } from '../../application/use-cases/submit-order-request.use-case';
import { UpdateOrderUseCase } from '../../application/use-cases/update-order.use-case';
import { ConfirmOrderRequest } from './dto/confirm-order-request.request';
import { ListOrdersQuery } from './dto/list-orders.query';
import { SubmitOrderRequest } from './dto/submit-order-request.request';
import { UpdateOrderRequest } from './dto/update-order.request';
import { OrderPresenter } from './order.presenter';

@Controller({ path: 'orders', version: '1' })
@Roles(ROLE_KEYS.ADMIN)
export class OrderController {
  constructor(
    private readonly submitOrderRequestUseCase: SubmitOrderRequestUseCase,
    private readonly confirmOrderRequestUseCase: ConfirmOrderRequestUseCase,
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly orderPresenter: OrderPresenter,
  ) {}

  @Post('public/request')
  @Public()
  @ResponseMessage('Order request submitted successfully')
  async submitPublicRequest(@Body() body: SubmitOrderRequest) {
    const input: SubmitOrderRequestInput = {
      name: body.name,
      email: body.email,
      countryCode: body.countryCode,
      galleryId: body.galleryId,
      packageId: body.packageId,
      budget: body.budget,
      discoverySource: body.discoverySource,
      personalStory: body.personalStory,
    };

    return this.submitOrderRequestUseCase.execute(input);
  }

  @Post('public/confirm')
  @Public()
  @ResponseMessage('Order request confirmed successfully')
  async confirmPublicRequest(@Body() body: ConfirmOrderRequest) {
    const input: ConfirmOrderRequestInput = {
      token: body.token,
    };
    const output = await this.confirmOrderRequestUseCase.execute(input);
    return this.orderPresenter.present(output);
  }

  @Get()
  @ResponseMessage('Orders fetched successfully')
  async findAll(@Query() query: ListOrdersQuery) {
    const input: ListOrdersInput = {
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      status: query.status,
      paymentStatus: query.paymentStatus,
      discoverySource: query.discoverySource,
    };
    const output = await this.listOrdersUseCase.execute(input);
    return this.orderPresenter.presentMany(output);
  }

  @Get(':id')
  @ResponseMessage('Order fetched successfully')
  async findById(@Param('id') id: string) {
    const output = await this.getOrderUseCase.execute(id);
    return this.orderPresenter.present(output);
  }

  @Patch(':id')
  @ResponseMessage('Order updated successfully')
  async update(@Param('id') id: string, @Body() body: UpdateOrderRequest) {
    const input: UpdateOrderInput = {
      id,
      status: body.status,
      paymentStatus: body.paymentStatus,
    };
    const output = await this.updateOrderUseCase.execute(input);
    return this.orderPresenter.present(output);
  }
}
