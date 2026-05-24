export type OrderItem = {
  platoId: number
  ingredientesExcluidos?: number[]
}

export type OrderRequest = {
  items: OrderItem[]
}

export type OrderResponse = {
  id: number
  estado: string
  createdAt: string
}

export type PedidoEstado = 'EN_ESPERA' | 'EN_PREPARACION' | 'LISTO' | 'ENTREGADO'

export type PedidoItem = {
  itemId: number
  platoId: number
  platoNombre: string
  precio: number
  imagenUrl: string
  ingredientesExcluidos: string[]
  estado: PedidoEstado
}
