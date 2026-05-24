import { useState } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import ComponentInput from '@/shared/components/ui/ComponentInput.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import { CircleUser, KeySquare, ArrowRight } from 'lucide-react'
import meseros from '@/assets/images/meseros.png'
import { useChefAuth } from '@/features/loginchef/hooks/useChefAuth.ts'

const loginSchema = z.object({
  usuario: z.string().trim().min(1, 'Ingresa tu usuario'),
  contrasena: z.string().trim().min(1, 'Ingresa tu contraseña'),
})

type LoginForm = z.infer<typeof loginSchema>

const FormLoginChef = () => {
  const navigate = useNavigate()
  const { login, error, status } = useChefAuth()
  const [values, setValues] = useState<LoginForm>({ usuario: '', contrasena: '' })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginForm, string>>>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = loginSchema.safeParse(values)
    if (!result.success) {
      const errors: Partial<Record<keyof LoginForm, string>> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'usuario' || field === 'contrasena') {
          errors[field] = issue.message
        }
      })
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    const auth = await login(result.data)
    if (auth) {
        navigate('/orderchef', { replace: true })
    }
  }

  return (
    <form
      className="w-full flex flex-col items-center justify-between bg-one px-12 pt-8 rounded-2xl gap-6 max-w-md border border-black/5 shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className=" text-two">¡Bienvenido!</h1>
        <p className="text-secondary text-sm leading-relaxed">
          Por Favor ingresa tu usuario y contraseña para comenzar
        </p>
        <div className="flex flex-col w-full gap-6">
          <ComponentInput
            placeholder="Ingresa tu usuario"
            label="Tu usuario"
            labelClassName="text-two"
            activeClassName="focus-within:ring-item"
            icon={CircleUser}
            value={values.usuario}
            onChange={(event) => setValues((current) => ({ ...current, usuario: event.target.value }))}
          />
          {fieldErrors.usuario ? <p className="-mt-4 text-left text-xs text-red-200">{fieldErrors.usuario}</p> : null}
          <ComponentInput
            placeholder="Ingresa tu contraseña"
            label="Tu contraseña"
            type="password"
            labelClassName="text-two"
            activeClassName="focus-within:ring-item"
            icon={KeySquare}
            value={values.contrasena}
            onChange={(event) => setValues((current) => ({ ...current, contrasena: event.target.value }))}
          />
          {fieldErrors.contrasena ? <p className="-mt-4 text-left text-xs text-red-200">{fieldErrors.contrasena}</p> : null}
          {status === 'error' && error ? <p className="text-left text-xs text-red-200">{error}</p> : null}
          <div className="flex items-center justify-end mt-2">
            <ComponentButton
              text={status === 'loading' ? 'Ingresando...' : 'Iniciar sesión'}
              color="bg-item"
              icon={ArrowRight}
              disabled={status === 'loading'}
            />
          </div>
        </div>
      </div>
      <img
        src={meseros}
        alt="Login Image"
      />
    </form>
  )
}

export default FormLoginChef;