import type { Category } from '@/shared/types/Categoy.types.ts'

type ComponentTagProps = {
  text: string
  category?: Category
}

const categoryColors: Record<Category, string> = {
  ENTRADA:      'bg-violet-400 text-white',
  BEBIDA:       'bg-blue-400 text-white',
  PLATO_FUERTE: 'bg-orange-400 text-white',
  POSTRE:       'bg-pink-400 text-white',
}

const ComponentTag = ({ text, category }: ComponentTagProps) => {
  const colorClass = category ? categoryColors[category] : 'bg-item text-primary'

  return (
    <div className={`${colorClass} flex px-3 py-1 items-center justify-center font-normal rounded-2xl`}>
      <span className="text-xs font-normal">{text}</span>
    </div>
  )
}

export default ComponentTag
