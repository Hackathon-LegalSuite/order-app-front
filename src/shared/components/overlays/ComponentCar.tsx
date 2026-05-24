import './ComponentCar.css'
import type { LucideIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

type ComponentCarProps = {
  numberProduct: number
  icon: LucideIcon
}

const ComponentCar = ({ numberProduct, icon }: ComponentCarProps) => {
  const Icon = icon
  const navigate = useNavigate()
  const { idmesa } = useParams<{ idmesa: string }>()

  const handleClick = () => {
    if (idmesa) navigate(`/init/${idmesa}/order`)
  }

  return (
    <div onClick={handleClick} className="w-24 rounded-[100px] bg-card px-2.5 py-1.5 flex justify-between items-center font-light text-sm cursor-pointer">
      <div className="relative h-7 w-7">
        <div
          key={numberProduct}
          className="absolute inset-0 rounded-full bg-one opacity-60"
          style={{ animation: 'cart-ring 0.5s ease-out forwards' }}
        />
        <div
          key={`n-${numberProduct}`}
          className="relative bg-one h-7 w-7 flex justify-center items-center text-two rounded-full"
          style={{ animation: 'cart-pop 0.4s ease-out' }}
        >
          {numberProduct}
        </div>
      </div>
      <div className='h-7 w-7 flex justify-center items-center rounded-[100%]'>
        {Icon ? <Icon className="w-5 h-5 text-one" /> : null}
      </div>
    </div>
  )
}

export default ComponentCar
