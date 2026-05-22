import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ClientAuthData = {
  token: string
  mesaId: number
  nombre: string
  rol: string
  expiresAt: number
}

type ClientAuthState = {
  auth: ClientAuthData | null
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
  setAuth: (data: ClientAuthData) => void
  setStatus: (status: ClientAuthState['status'], error?: string | null) => void
  logout: () => void
}

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set) => ({
      auth: null,
      status: 'idle',
      error: null,
      setAuth: (data) => set({ auth: data, status: 'success', error: null }),
      setStatus: (status, error = null) => set({ status, error }),
      logout: () => set({ auth: null, status: 'idle', error: null }),
    }),
    {
      name: 'order-app-client-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ auth: state.auth }),
    },
  ),
)

export const selectClientIsValid = (state: ClientAuthState) =>
  Boolean(state.auth && Date.now() < state.auth.expiresAt)
