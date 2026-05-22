import type { LucideIcon } from 'lucide-react'
import { Bot, CakeSlice, CupSoda, Beef, Grape } from 'lucide-react'
import type { Category } from '@/shared/types/Categoy.types.ts'

const ComponentFilter = () => {
  const opcionFilter: Array<{
    id: number
    label: Category[number]
    icon: LucideIcon
  }> = [
    { id: 1, label: 'entrada', icon: Grape },
    { id: 2, label: 'plato fuerte', icon: Beef },
    { id: 3, label: 'postre', icon: CakeSlice },
    { id: 4, label: 'bebida', icon: CupSoda },
    { id: 5, label: 'ia', icon: Bot },
  ]

  return (
    <div className='flex justify-between items-center'>
      {opcionFilter.map(({ id, label, icon: Icon }) => (
        <div
          key={id}
          className={`flex justify-center items-center rounded-full w-14.5 h-11 ${
            id === 5 ? 'bg-one text-item' : 'bg-two'
          }`}
          title={label}
        >
          <Icon className="w-6 h-6" />
        </div>
      ))}
    </div>
  )
}

export default ComponentFilter
