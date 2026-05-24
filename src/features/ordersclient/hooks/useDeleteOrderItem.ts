import { useState } from 'react'
import { deleteOrderItem } from '@/features/ordersclient/services/orderService.ts'

export const useDeleteOrderItem = (onSuccess: (itemId: number) => void) => {
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const remove = async (pedidoId: number, itemId: number) => {
    setLoadingId(itemId)
    try {
      const msg = await deleteOrderItem(pedidoId, itemId)
      setMessage(msg)
      onSuccess(itemId)
    } finally {
      setLoadingId(null)
    }
  }

  return { remove, loadingId, message }
}
