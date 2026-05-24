import { http } from '@/services/http.ts'
import type { OrderRequest, OrderResponse, PedidoItem } from '@/features/ordersclient/types/order.types.ts'

export const submitOrder = async (payload: OrderRequest): Promise<OrderResponse> => {
  const { data } = await http.post<OrderResponse>('/pedido', payload)
  return data
}

export const fetchOrders = async (): Promise<PedidoItem[]> => {
  const { data } = await http.get<PedidoItem[]>('/pedido')
  return data
}

export const deleteOrderItem = async (pedidoId: number, itemId: number): Promise<void> => {
  await http.delete(`/pedido/${pedidoId}/item/${itemId}`)
}
