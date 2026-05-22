import type { Category } from '@/shared/types/Categoy.types.ts'

export type Ingredient = {
  id: number
  label: string
}

export type Product = {
  id: number
  name: string
  price: number
  category: Category
  img: string
  ingredients: Ingredient[]
}

const baseIngredients: Ingredient[] = [
  { id: 1, label: 'Platano' },
  { id: 2, label: 'Lentejas' },
  { id: 3, label: 'Carne Molida' },
  { id: 4, label: 'Tomate' },
  { id: 5, label: 'Pico de gallo' },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Hamburguesa Clasica',
    price: 100000,
    category: 'fuerte',
    img: 'https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png',
    ingredients: baseIngredients,
  },
  {
    id: 2,
    name: 'Hamburguesa Doble',
    price: 120000,
    category: 'fuerte',
    img: 'https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png',
    ingredients: baseIngredients,
  },
  {
    id: 3,
    name: 'Hamburguesa BBQ',
    price: 110000,
    category: 'fuerte',
    img: 'https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png',
    ingredients: baseIngredients,
  },
]

export const getProductById = (id: number) =>
  products.find((product) => product.id === id)
