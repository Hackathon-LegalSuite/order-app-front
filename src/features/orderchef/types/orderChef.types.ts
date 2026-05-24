export type PedidoEstadoChef = 'EN_ESPERA' | 'EN_PROGRESO' | 'LISTO' | 'ENTREGADO'

export type IngredienteChef = {
  id: number
  nombre: string
  obligatorio: boolean
}

export type PedidoItemChef = {
  itemId: number
  pedidoId: number
  platoId: number
  platoNombre: string
  precio: number
  imagenUrl: string
  ingredientes: IngredienteChef[]
  ingredientesExcluidos: string[]
  estado: PedidoEstadoChef
  mesa: number
  mesero: string
}
