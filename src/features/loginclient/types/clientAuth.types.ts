export type ClientAuthRequest = {
  nombre: string
  codigoMesa: string
}

export type ClientAuthResponse = {
  nombre: string
  rol: string
  token: string
  mesaId?: number
  expiresIn?: string
}

export type ClientAuthData = ClientAuthResponse & {
  mesaId: number
  expiresAt: number
}