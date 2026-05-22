import type { LucideIcon } from 'lucide-react'

type ComponentCarProps = {
  numberProduct: number
  icon: LucideIcon
}

const ComponentCar = ({ numberProduct, icon }: ComponentCarProps) => {
  const Icon = icon
  return (
    <div className="w-24 rounded-[100px] bg-card px-2.5 py-1.5 flex justify-between items-center font-light text-sm">
      <div className='bg-one h-7 w-7 flex justify-center items-center text-two rounded-[100%]'>{numberProduct}</div>
      <div className='h-7 w-7 flex justify-center items-center rounded-[100%]'>
        {Icon ? <Icon className="w-5 h-5 text-one" /> : null}
      </div>
    </div>
  )
}

export default ComponentCar
