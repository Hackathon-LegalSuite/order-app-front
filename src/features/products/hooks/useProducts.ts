import { useEffect } from 'react'
import axios from 'axios'
import { useProductsStore } from '@store/productsStore.ts'
import { fetchProducts } from '@/features/products/services/productsService.ts'

export const useProducts = () => {
  const { products, status, error, setProducts, setStatus } = useProductsStore()

  useEffect(() => {
    if (status !== 'idle') return

    setStatus('loading')
    fetchProducts()
      .then(setProducts)
      .catch((err) => {
        let message = 'Error al cargar los productos'
        if (axios.isAxiosError(err)) {
          const data = err.response?.data as { error?: string } | undefined
          message = data?.error ?? err.message
        } else if (err instanceof Error) {
          message = err.message
        }
        setStatus('error', message)
      })
  }, [status, setProducts, setStatus])

  return { products, status, error }
}
