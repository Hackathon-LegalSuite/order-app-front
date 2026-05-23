export type ClientAuthResponse = {
  expiresIn: string
  mesaId: number
  nombre: string
  rol: string
  token: string
}

export type ClientAuthData = ClientAuthResponse & {
  expiresAt: number
}

export type ClientAuthRequest = {
  nombre: string
  codigoMesa: string
}