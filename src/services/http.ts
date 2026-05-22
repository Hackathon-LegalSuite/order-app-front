import axios from 'axios'

export const API_BASE_URL = 'https://order-app-back.onrender.com/'

export const http = axios.create({
	baseURL: API_BASE_URL,
})
