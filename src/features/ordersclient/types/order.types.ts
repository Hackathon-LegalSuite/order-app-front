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

export type PedidoEstado = 'EN_ESPERA' | 'EN_PROGRESO' | 'LISTO' | 'ENTREGADO'

export type IngredienteItem = {
  id: number
  nombre: string
  obligatorio: boolean
}

export type PedidoItem = {
  itemId: number
  pedidoId: number
  platoId: number
  platoNombre: string
  precio: number
  imagenUrl: string
  ingredientes: IngredienteItem[]
  ingredientesExcluidos: string[]
  estado: PedidoEstado
}
