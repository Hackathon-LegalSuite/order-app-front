import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import { useClientAuthStore, selectClientIsValid } from '@store/clientAuthStore.ts'

const ClientAuthGuard = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const navigate = useNavigate()
  const auth = useClientAuthStore((state) => state.auth)
  const logout = useClientAuthStore((state) => state.logout)
  const isValid = useClientAuthStore(selectClientIsValid)
  const mesaId = Number(idmesa)
  const isMesaValid = Number.isFinite(mesaId)
  const isAuthorized = Boolean(auth && isMesaValid && auth.mesaId === mesaId && isValid)

  useEffect(() => {
    if (!auth || !isMesaValid || auth.mesaId !== mesaId) {
      if (auth && isMesaValid && auth.mesaId !== mesaId) {
        logout()
      }
      return
    }

    const remainingMs = auth.expiresAt - Date.now()
    if (remainingMs <= 0) {
      logout()
      navigate('/init', { replace: true })
      return
    }

    const timeoutId = window.setTimeout(() => {
      logout()
      navigate('/init', { replace: true })
    }, remainingMs)

    return () => window.clearTimeout(timeoutId)
  }, [auth, isMesaValid, mesaId, navigate, logout])

  if (!isAuthorized) {
    return <Navigate to="/init" replace />
  }

  return <Outlet />
}

export default ClientAuthGuard
