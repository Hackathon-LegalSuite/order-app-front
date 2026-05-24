import { useState, useCallback } from 'react'
import axios from 'axios'
import { submitOrder } from '@/features/ordersclient/services/orderService.ts'
import { useCartStore } from '@store/cartStore.ts'
import type { OrderResponse } from '@/features/ordersclient/types/order.types.ts'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useSubmitOrder = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const confirm = useCallback(async () => {
    if (items.length === 0) return

    setStatus('loading')
    setError(null)

    try {
      const payload = {
        items: items.map((item) => ({
          platoId: item.productId,
          ...(item.excludedIngredientIds.length > 0 && {
            ingredientesExcluidos: item.excludedIngredientIds,
          }),
        })),
      }

      const response = await submitOrder(payload)
      setOrder(response)
      setStatus('success')
      clearCart()
    } catch (err) {
      let message = 'Error al confirmar el pedido'
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { error?: string } | undefined
        message = data?.error ?? err.message
      } else if (err instanceof Error) {
        message = err.message
      }
      setError(message)
      setStatus('error')
    }
  }, [items, clearCart])

  return { confirm, status, error, order }
}
