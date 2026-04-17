import { useMutation } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import type { OrderRequestBody, OrderConfirmBody } from '@/types';

export function useRequestOrder() {
  return useMutation({
    mutationFn: (body: OrderRequestBody) => ordersApi.request(body),
  });
}

export function useConfirmOrder() {
  return useMutation({
    mutationFn: (body: OrderConfirmBody) => ordersApi.confirm(body),
  });
}
