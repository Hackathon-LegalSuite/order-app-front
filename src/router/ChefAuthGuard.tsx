import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { useChefAuthStore, selectChefIsValid } from '@store/chefAuthStore.ts'

const ChefAuthGuard = () => {
  const auth = useChefAuthStore((state) => state.auth)
  const logout = useChefAuthStore((state) => state.logout)
  const isValid = useChefAuthStore(selectChefIsValid)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) return

    const remainingMs = auth.expiresAt - Date.now()
    if (remainingMs <= 0) {
      logout()
      navigate('/loginchef', { replace: true })
      return
    }

    const timeoutId = window.setTimeout(() => {
      logout()
      navigate('/loginchef', { replace: true })
    }, remainingMs)

    return () => window.clearTimeout(timeoutId)
  }, [auth, navigate, logout])

  if (!isValid) {
    return <Navigate to="/loginchef" replace />
  }

  return <Outlet />
}

export default ChefAuthGuard
