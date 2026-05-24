import { useCallback } from 'react'
import axios from 'axios'
import { loginChef } from '@/features/loginchef/services/chefAuth.ts'
import { useChefAuthStore } from '@/store/chefAuthStore.ts'
import type { ChefAuthRequest } from '@/features/loginchef/services/chefAuth.ts'

export const useChefAuth = () => {
  const { status, error, setAuth, setStatus } = useChefAuthStore()

  const login = useCallback(
    async (payload: ChefAuthRequest) => {
      setStatus('loading')
      try {
        const auth = await loginChef(payload)
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