import { http } from '@/services/http.ts'
import type { OrderRequest, OrderResponse } from '@/features/ordersclient/types/order.types.ts'

export const submitOrder = async (payload: OrderRequest): Promise<OrderResponse> => {
  const { data } = await http.post<OrderResponse>('/pedido', payload)
  return data
}
