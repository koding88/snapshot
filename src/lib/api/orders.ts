import { apiClient } from './client';
import type { ApiResponse, OrderRequestBody, OrderConfirmBody, OrderRequested } from '@/types';

export const ordersApi = {
  request: (body: OrderRequestBody) =>
    apiClient<ApiResponse<OrderRequested>>('/api/v1/orders/public/request', {
      method: 'POST',
      body,
    }),

  confirm: (body: OrderConfirmBody) =>
    apiClient<ApiResponse<unknown>>('/api/v1/orders/public/confirm', {
      method: 'POST',
      body,
    }),
};
