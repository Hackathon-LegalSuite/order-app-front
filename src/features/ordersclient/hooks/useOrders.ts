import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchOrders } from '@/features/ordersclient/services/orderService.ts'
import type { PedidoItem } from '@/features/ordersclient/types/order.types.ts'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useOrders = () => {
  const [orders, setOrders] = useState<PedidoItem[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStatus('loading')
    fetchOrders()
      .then((data) => {
        setOrders(data)
        setStatus('success')
      })
      .catch((err) => {
        let message = 'Error al cargar los pedidos'
        if (axios.isAxiosError(err)) {
          const data = err.response?.data as { error?: string } | undefined
          message = data?.error ?? err.message
        } else if (err instanceof Error) {
          message = err.message
        }
        setError(message)
        setStatus('error')
      })
  }, [])

  return { orders, status, error }
}
