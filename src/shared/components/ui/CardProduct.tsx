import type { Category } from '@/shared/types/Categoy.types.ts'
import { CATEGORY_LABEL } from '@/shared/types/Categoy.types.ts'
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx'

export type CardProductProps = {
    name: string
    price?: number
    category: Category
    img: string
    onClick?: () => void
    isEdited?: boolean
}

const CardProduct = ({ name, price, category, img, onClick, isEdited = false }: CardProductProps) => {
    const formattedPrice =
        typeof price === 'number' ? new Intl.NumberFormat('es-CO').format(price) : ''

    return (
        <div onClick={onClick} className="flex px-3 py-5 w-full rounded-3xl gap-2 bg-card items-center h-40 cursor-pointer">
            <div>
                <img className="w-35" src={img} alt={name} />
            </div>
            <div className="flex flex-col justify-between h-full w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-lg leading-tight">{name}</span>
                  {isEdited && (
                    <span className="text-xs font-semibold bg-warning text-primary px-2 py-0.5 rounded-full">editado</span>
                  )}
                </div>
                <span>$ {formattedPrice}</span>
                <div className="flex justify-end">
                    <ComponentTag text={CATEGORY_LABEL[category]} />
                </div>
            </div>
        </div>
    )
}

export default CardProduct
