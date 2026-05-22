import axios, { AxiosHeaders } from 'axios'
import { useClientAuthStore } from '@store/clientAuthStore.ts'

export const API_BASE_URL = '/api'

export const http = axios.create({
	baseURL: API_BASE_URL,
})

http.interceptors.request.use((config) => {
	const token = useClientAuthStore.getState().auth?.token
	if (token) {
		if (!config.headers) {
			config.headers = new AxiosHeaders()
		} else if (!(config.headers instanceof AxiosHeaders)) {
			config.headers = new AxiosHeaders(config.headers)
		}

		config.headers.set('Authorization', `Bearer ${token}`)
	}

	return config
})
