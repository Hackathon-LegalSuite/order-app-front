import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginPage from '@features/login/components/Page.tsx'
import OrdersPage from '@features/orders/components/Page.tsx'

const isAuthenticated = () => {
	if (typeof window === 'undefined') {
		return false
	}

	return Boolean(localStorage.getItem('auth_token'))
}

const AppRouter = () => {
	const loggedIn = isAuthenticated()

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route
					path="/login"
					element={loggedIn ? <Navigate to="/orders" replace /> : <LoginPage />}
				/>
				<Route
					path="/orders"
					element={loggedIn ? <OrdersPage /> : <Navigate to="/login" replace />}
				/>
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
