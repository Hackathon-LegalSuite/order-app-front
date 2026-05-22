import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Pagelogin from '@/features/login/components/PageLogin.tsx'
import PageOrder from '@/features/orders/components/PageOrder.tsx'
import InitProducts from '@/features/products/components/InitProducts.tsx'
import PageProducts from '@/features/products/components/PageProducts.tsx'
import ClientAuthGuard from '@/router/ClientAuthGuard.tsx'

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
					element={loggedIn ? <Navigate to="/orders" replace /> :  <Pagelogin />}
				/>
				<Route path="/init" element={<InitProducts />} />
				<Route path="/init/:idmesa" element={<InitProducts />} />
				<Route element={<ClientAuthGuard />}>
					<Route
						path="/init/:idmesa/order"
						element={<PageOrder />}
					/>
					<Route
						path="/init/:idmesa/products"
						element={<PageProducts />}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
