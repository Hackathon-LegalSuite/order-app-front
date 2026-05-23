import { http } from '@/services/http.ts'
import type { ChefAuthData } from '@/store/chefAuthStore.ts'

type ChefAuthResponse = {
  nombre: string
  rol: string
  token: string
}

const DEFAULT_EXPIRES_MS = 6 * 60 * 60 * 1000

const parseJwtExpiresAt = (token: string) => {
  const [, payload] = token.split('.')

  if (!payload) {
    return Date.now() + DEFAULT_EXPIRES_MS
  }

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(normalizedPayload)
    const data = JSON.parse(json) as { exp?: number }

    if (!data.exp) {
      return Date.now() + DEFAULT_EXPIRES_MS
    }

    return data.exp * 1000
  } catch {
    return Date.now() + DEFAULT_EXPIRES_MS
  }
}

export type ChefAuthRequest = {
  usuario: string
  contrasena: string
}

export const loginChef = async (
  requestBody: ChefAuthRequest,
): Promise<ChefAuthData> => {
  // map frontend field names to backend API fields (username/password)
  const payload = {
    username: requestBody.usuario,
    password: requestBody.contrasena,
  }

  const { data } = await http.post<ChefAuthResponse>('/auth/login', payload)

  return {
    nombre: data.nombre,
    rol: data.rol,
    token: data.token,
    expiresAt: parseJwtExpiresAt(data.token),
  }
}