import { useCallback } from 'react'
import axios from 'axios'
import { loginClient } from '@/features/loginclient/services/clientAuth.ts'
import { useClientAuthStore } from '@store/clientAuthStore.ts'
import { useCartStore } from '@store/cartStore.ts'
import type { ClientAuthRequest } from '@/features/loginclient/types/clientAuth.types.ts'

export const useClientAuth = () => {
  const { status, error, setAuth, setStatus } = useClientAuthStore()
  const clearCart = useCartStore((state) => state.clearCart)

  const login = useCallback(
    async (mesaId: number, payload: ClientAuthRequest) => {
      setStatus('loading')
      try {
        const auth = await loginClient(mesaId, payload)
        clearCart()
        setAuth(auth)
        return auth
      } catch (err) {
        let message = 'Error desconocido'
        if (axios.isAxiosError(err)) {
          const data = err.response?.data as { error?: string } | undefined
          message = data?.error ?? err.message
        } else if (err instanceof Error) {
          message = err.message
        }
        setStatus('error', message)
        return null
      }
    },
    [setAuth, setStatus, clearCart],
  )

  return { status, error, login }
}