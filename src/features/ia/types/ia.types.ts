export type IaIngrediente = {
  id: number
  nombre: string
}

export type IaIngredientePlato = {
  id: number
  nombre: string
  obligatorio: boolean
}

export type IaPlato = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagenUrl: string
  ingredientes: IaIngredientePlato[]
  preparada?: boolean
}

export type IaResponse = {
  mensaje: string
  ingredientesExcluir?: IaIngrediente[]
  platos: IaPlato[]
}

export type IaRequest = {
  prompt: string
}
