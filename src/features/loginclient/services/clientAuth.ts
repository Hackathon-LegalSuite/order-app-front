import { http } from '@/services/http.ts'
import type { ClientAuthData, ClientAuthRequest, ClientAuthResponse } from '@/features/loginclient/types/clientAuth.types.ts'

const DEFAULT_EXPIRES_MS = 6 * 60 * 60 * 1000

const parseExpiresInMs = (value?: string) => {
  if (!value) {
    return DEFAULT_EXPIRES_MS
  }

  const match = value.trim().match(/^(\d+)\s*([smhd])$/i)
  if (!match) {
    return DEFAULT_EXPIRES_MS
  }

  const amount = Number(match[1])
  const unitRaw = match[2]
  if (!unitRaw) {
    return DEFAULT_EXPIRES_MS
  }

  const unit = unitRaw.toLowerCase()
  const unitMs: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  }

  return amount * (unitMs[unit] ?? DEFAULT_EXPIRES_MS)
}

export const loginClient = async (
  mesaId: number,
  requestBody: ClientAuthRequest,
): Promise<ClientAuthData> => {
  const { data } = await http.post<ClientAuthResponse>(
    `/auth/cliente/${mesaId}`,
    requestBody,
  )
  return { ...data, expiresAt: Date.now() + parseExpiresInMs(data.expiresIn) }
}