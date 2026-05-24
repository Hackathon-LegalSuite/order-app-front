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
