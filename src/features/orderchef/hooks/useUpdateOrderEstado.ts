import { useState } from 'react'
import axios from 'axios'
import { updateOrderItemEstado } from '@/features/orderchef/services/orderChefService.ts'

export const useUpdateOrderEstado = (onSettled: () => void) => {
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const update = async (itemId: number) => {
    setLoadingId(itemId)
    setMessage(null)
    try {
      const msg = await updateOrderItemEstado(itemId)
      setIsError(false)
      setMessage(msg)
    } catch (err) {
      let msg = 'Error al actualizar el estado'
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { error?: string; mensaje?: string } | undefined
        msg = data?.error ?? data?.mensaje ?? err.message
      } else if (err instanceof Error) {
        msg = err.message
      }
      setIsError(true)
      setMessage(msg)
    } finally {
      setLoadingId(null)
      onSettled()
    }
  }

  return { update, loadingId, message, isError }
}
