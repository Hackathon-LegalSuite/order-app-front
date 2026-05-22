import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ChefAuthData = {
  token: string
  nombre: string
  rol: string
  expiresAt: number
}

type ChefAuthState = {
  auth: ChefAuthData | null
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
  setAuth: (data: ChefAuthData) => void
  setStatus: (status: ChefAuthState['status'], error?: string | null) => void
  logout: () => void
}

export const useChefAuthStore = create<ChefAuthState>()(
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
      name: 'order-app-chef-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ auth: state.auth }),
    },
  ),
)

export const selectChefIsValid = (state: ChefAuthState) =>
  Boolean(state.auth && Date.now() < state.auth.expiresAt)
