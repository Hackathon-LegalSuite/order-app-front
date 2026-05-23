import type { Category } from '@/shared/types/Categoy.types.ts'

export type Ingredient = {
  id: number
  label: string
  required: boolean
}

export type Product = {
  id: number
  name: string
  price: number
  category: Category
  img: string
  ingredients: Ingredient[]
}