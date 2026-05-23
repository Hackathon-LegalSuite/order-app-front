import { http } from '@/services/http.ts'
import type { Category } from '@/shared/types/Categoy.types.ts'
import type { Product, Ingredient } from '@/features/products/types/products.types.ts'

type ApiIngredient = {
  id: number
  nombre: string
  obligatorio: boolean
}

type ApiProduct = {
  id: number
  nombre: string
  descripcion: string
  categoria: Category
  precio: number
  imagenUrl?: string
  preparada?: boolean
  ingredientes: ApiIngredient[]
}

const toIngredient = (i: ApiIngredient): Ingredient => ({
  id: i.id,
  label: i.nombre,
  required: i.obligatorio,
})

const toProduct = (p: ApiProduct): Product => ({
  id: p.id,
  name: p.nombre,
  price: p.precio,
  category: p.categoria,
  img: p.imagenUrl ?? '',
  ingredients: p.ingredientes.map(toIngredient),
})

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await http.get<ApiProduct[]>('/platos')
  return data.map(toProduct)
}
