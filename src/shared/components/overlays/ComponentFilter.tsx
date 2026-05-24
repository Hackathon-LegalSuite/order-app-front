import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bot, CakeSlice, CupSoda, Ham , Popcorn  } from 'lucide-react'
import type { Category } from '@/shared/types/Categoy.types.ts'
import { useProductsStore } from '@/features/productclient/store/productsStore.ts'
import { fetchProducts, fetchProductsByCategory } from '@/features/productclient/services/productsService.ts'

type FilterOption = {
  id: number
  label: string
  icon: LucideIcon
  category?: Category
}

const filters: FilterOption[] = [
  { id: 1, label: 'Entrada',      icon: Popcorn ,     category: 'ENTRADA'      },
  { id: 2, label: 'Plato Fuerte', icon: Ham ,      category: 'PLATO_FUERTE' },
  { id: 3, label: 'Postre',       icon: CakeSlice, category: 'POSTRE'       },
  { id: 4, label: 'Bebida',       icon: CupSoda,   category: 'BEBIDA'       },
  { id: 5, label: 'IA',           icon: Bot                                  },
]

const ComponentFilter = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const { setProducts, setStatus } = useProductsStore()

  const handleClick = async (option: FilterOption) => {
    if (!option.category) return

    setStatus('loading')
    try {
      if (activeId === option.id) {
        setActiveId(null)
        const all = await fetchProducts()
        setProducts(all)
      } else {
        setActiveId(option.id)
        const filtered = await fetchProductsByCategory(option.category)
        setProducts(filtered)
      }
    } catch {
      setStatus('error', 'Error al filtrar productos')
    }
  }

  return (
    <div className='flex justify-between items-center'>
      {filters.map((option) => {
        const Icon = option.icon
        const isIA = option.id === 5
        const isActive = activeId === option.id

        return (
          <div
            key={option.id}
            onClick={() => !isIA && handleClick(option)}
            title={option.label}
            className={`flex justify-center items-center rounded-full w-14.5 h-11 transition-colors ${
              isIA ? 'cursor-default bg-card' : isActive ? 'bg-one cursor-pointer' : 'bg-card cursor-pointer'
            } ${isActive && !isIA ? 'text-item' : isIA ? 'text-item' : 'text-one'}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )
      })}
    </div>
  )
}

export default ComponentFilter
