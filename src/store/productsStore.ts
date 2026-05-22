import { create } from 'zustand'
import type { Product } from '@/features/products/data/products.ts'

type ProductsState = {
  products: Product[]
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
  setProducts: (products: Product[]) => void
  setStatus: (status: ProductsState['status'], error?: string | null) => void
}

export const useProductsStore = create<ProductsState>()((set) => ({
  products: [],
  status: 'idle',
  error: null,
  setProducts: (products) => set({ products, status: 'success', error: null }),
  setStatus: (status, error = null) => set({ status, error }),
}))
