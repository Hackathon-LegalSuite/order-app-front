import { useState } from 'react'
import { deleteOrderItem } from '@/features/ordersclient/services/orderService.ts'

export const useDeleteOrderItem = (onSuccess: (itemId: number) => void) => {
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const remove = async (pedidoId: number, itemId: number) => {
    setLoadingId(itemId)
    try {
      await deleteOrderItem(pedidoId, itemId)
      onSuccess(itemId)
    } finally {
      setLoadingId(null)
    }
  }

  return { remove, loadingId }
}
