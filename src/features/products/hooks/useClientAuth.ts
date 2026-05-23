import { useCallback } from 'react'
import axios from 'axios'
import { loginClient } from '@/features/products/services/clientAuth.ts'
import { useClientAuthStore } from '@store/clientAuthStore.ts'
import type { ClientAuthRequest } from '@/features/products/types/clientAuth.types.ts'

export const useClientAuth = () => {
  const { status, error, setAuth, setStatus } = useClientAuthStore()

  const login = useCallback(
    async (mesaId: number, payload: ClientAuthRequest) => {
      setStatus('loading')
      try {
        const auth = await loginClient(mesaId, payload)
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
    [setAuth, setStatus],
  )

  return { status, error, login }
}
