export type PedidoEstadoChef = 'EN_ESPERA' | 'EN_PROGRESO' | 'LISTO' | 'ENTREGADO'

export type PedidoItemChef = {
  itemId: number
  platoId: number
  platoNombre: string
  precio: number
  imagenUrl: string
  ingredientesExcluidos: string[]
  estado: PedidoEstadoChef
  mesa: number
  mesero: string
}
