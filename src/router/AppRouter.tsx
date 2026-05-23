import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import PageLoginChef from '@/features/loginchef/components/PageLoginChef.tsx'
import PageLoginClient from '@/features/loginclient/components/PageLoginClient.tsx'
import PageOrderClient from '@/features/ordersclient/components/PageOrderClient.tsx'
import PageProductsClient from '@/features/productclient/components/PageProductsClient.tsx'
import ClientAuthGuard from '@/router/ClientAuthGuard.tsx'
import { useChefAuthStore, selectChefIsValid } from '@store/chefAuthStore.ts'

const AppRouter = () => {
	const loggedIn = useChefAuthStore(selectChefIsValid)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/loginchef" replace />} />
				<Route
					path="/loginchef"
					element={loggedIn ? <Navigate to="/orders" replace /> :  <PageLoginChef />}
				/>
				<Route path="/init" element={<PageLoginClient />} />
				<Route path="/init/:idmesa" element={<PageLoginClient />} />
				<Route element={<ClientAuthGuard />}>
					<Route
						path="/init/:idmesa/order"
						element={<PageOrderClient />}
					/>
					<Route
						path="/init/:idmesa/products"
						element={<PageProductsClient />}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/loginchef" replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
