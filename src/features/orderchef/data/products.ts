import { V } from "node_modules/react-router/dist/development/index-react-server-client-BS5F89FR.js"

export interface Ingredient {
  name: string
  available: boolean
}

export interface Product {
  id: number
  title: string
  image?: string
  table: number
  plates: number
  category: string
  ingredients: Ingredient[]
  status: 'waiting' | 'in-progress' | 'done'
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Lomo Saltado',
    table: 3,
    plates: 2,
    category: 'Fondo',
    status: 'waiting',
    ingredients: [
      { name: 'Lomo de res', available: true },
      { name: 'Tomate', available: true },
      { name: 'Cebolla roja', available: true },
      { name: 'Ají amarillo', available: false },
      { name: 'Papas fritas', available: true },
      { name: 'Sillao', available: true },
    ],
  },
  {
    id: 2,
    title: 'Ceviche Clásico',
    table: 1,
    plates: 3,
    category: 'Entrada',
    status: 'in-progress',
    ingredients: [
      { name: 'Pescado blanco', available: true },
      { name: 'Limón', available: true },
      { name: 'Cebolla morada', available: true },
      { name: 'Ají limo', available: true },
      { name: 'Cilantro', available: false },
      { name: 'Choclo', available: true },
    ],
  },
  {
    id: 3,
    title: 'Ají de Gallina',
    table: 5,
    plates: 1,
    category: 'Fondo',
    status: 'done',
    ingredients: [
      { name: 'Pollo', available: true },
      { name: 'Ají amarillo', available: true },
      { name: 'Pan de molde', available: true },
      { name: 'Leche evaporada', available: false },
      { name: 'Nueces', available: true },
      { name: 'Arroz', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },
  {
    id: 4,
    title: 'Arroz con Leche',
    table: 2,
    plates: 4,
    category: 'Postre',
    status: 'waiting',
    ingredients: [
      { name: 'Arroz', available: true },
      { name: 'Leche entera', available: true },
      { name: 'Azúcar', available: true },
      { name: 'Canela', available: false },
      { name: 'Clavo de olor', available: true },
    ],
  },

]
