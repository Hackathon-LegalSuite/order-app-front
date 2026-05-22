import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Initform from './InitForm.tsx'
import { useClientAuthStore, selectClientIsValid } from '@store/clientAuthStore.ts'

const InitProducts = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const navigate = useNavigate()
  const auth = useClientAuthStore((state) => state.auth)
  const isValid = useClientAuthStore(selectClientIsValid)

  useEffect(() => {
    if (!auth || !isValid) {
      return
    }

    navigate(`/init/${auth.mesaId}/products`, { replace: true })
  }, [auth, isValid, navigate])

  console.log('ID da mesa:', idmesa)

  return( <div className="w-full h-screen flex items-center justify-center bg-item px-6 py-9">
    <Initform />

  </div>)
}

export default InitProducts