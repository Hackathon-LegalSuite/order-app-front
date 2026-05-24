import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ComponentInput from '@/shared/components/ui/ComponentInput.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import meseros from '@assets/images/meseros.png'
import { useClientAuth } from '@/features/loginclient/hooks/useClientAuth.ts'
import ComponentFloatingMessage from '@/shared/components/overlays/ComponentFloatingMessage.tsx'

import { CircleUserRound, QrCode, ArrowRight } from 'lucide-react'

const FormLoginClient = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const [clientName, setClientName] = useState('')
  const [mesaCode, setMesaCode] = useState('')
  const navigate = useNavigate()
  const { login, error, status } = useClientAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!idmesa) {
      return
    }

    const mesaId = Number(idmesa)
    if (Number.isNaN(mesaId)) {
      return
    }

    if (!clientName.trim() || !mesaCode.trim()) {
      return
    }

    const auth = await login(mesaId, {
      nombre: clientName.trim(),
      codigoMesa: mesaCode.trim(),
    })
    if (auth) {
      navigate(`/init/${mesaId}/products`)
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-background max-w-md pt-9 px-7 rounded-2xl ">
      {status === 'error' && error ? (
        <ComponentFloatingMessage
          message={error}
          variant="error"
          autoHideMs={3000}
        />
      ) : null}
      <div className="flex flex-col items-center gap-7">
        <div>
          <img src="/logo.png" alt="Login Logo" className="w-64" />
        </div>
        <div className="mt-3 text-center gap-2 flex flex-col">
          <h1>¡Bienvenido!</h1>
          <p className="text-false ">
            Por Favor ingresa tu nombre y el Código de tu mesa para comenzar
          </p>
        </div>
        <form
          className="flex flex-col gap-4 border-red-400 w-full"
          onSubmit={handleSubmit}
        >
          <ComponentInput
            placeholder="Ingresa tu nombre"
            label="Tu nombre"
            type="text"
            labelClassName="text-one"
            activeClassName="focus-within:ring-item"
            icon={CircleUserRound}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
          />
          <ComponentInput
            placeholder="En el QR encontraras el código"
            label="Código mesa"
            type="text"
            labelClassName="text-one"
            activeClassName="focus-within:ring-item"
            icon={QrCode}
            value={mesaCode}
            onChange={(event) => setMesaCode(event.target.value)}
          />
          <div className="mt-3">
            <ComponentButton text="Continuar" icon={ArrowRight} loading={status === 'loading'} />
          </div>
        </form>
      </div>
      <div>
        <img src={meseros} alt="" />
      </div>
    </div>
  )
}

export default FormLoginClient