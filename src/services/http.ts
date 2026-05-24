import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import { useClientAuthStore } from '@store/clientAuthStore.ts'
import { useChefAuthStore } from '@store/chefAuthStore.ts'

export const API_BASE_URL = '/api'

const attachToken = (token: string | undefined, config: InternalAxiosRequestConfig) => {
	if (!token) return config
	config.headers = config.headers instanceof AxiosHeaders
		? config.headers
		: new AxiosHeaders(config.headers)
	config.headers.set('Authorization', `Bearer ${token}`)
	return config
}

export const http = axios.create({ baseURL: API_BASE_URL })
http.interceptors.request.use((config) => {
	attachToken(useClientAuthStore.getState().auth?.token, config)
	return config
})

export const httpChef = axios.create({ baseURL: API_BASE_URL })
httpChef.interceptors.request.use((config) => {
	attachToken(useChefAuthStore.getState().auth?.token, config)
	return config
})
