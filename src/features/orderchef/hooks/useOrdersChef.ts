import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchOrdersChef } from '@/features/orderchef/services/orderChefService.ts'
import type { PedidoItemChef } from '@/features/orderchef/types/orderChef.types.ts'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useOrdersChef = () => {
  const [orders, setOrders] = useState<PedidoItemChef[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const load = (silent = false) => {
    if (!silent) setStatus('loading')
    fetchOrdersChef()
      .then((data) => {
        setOrders([...data].sort((a, b) => a.itemId - b.itemId))
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
  }

  useEffect(() => { load() }, [])

  return { orders, status, error, refetch: () => load(true) }
}
