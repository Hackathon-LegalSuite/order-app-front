import { httpChef } from '@/services/http.ts'
import type { PedidoItemChef } from '@/features/orderchef/types/orderChef.types.ts'

export const fetchOrdersChef = async (): Promise<PedidoItemChef[]> => {
  const { data } = await httpChef.get<PedidoItemChef[]>('/pedido')
  return data
}

export const updateOrderItemEstado = async (itemId: number): Promise<string> => {
  const { data } = await httpChef.patch<{ mensaje: string }>(`/pedido/item/${itemId}/estado`)
  return data.mensaje
}
