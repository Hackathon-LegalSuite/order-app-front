import { useState } from 'react'
import type { Category } from '@/shared/types/Categoy.types.ts'
import { CATEGORY_LABEL } from '@/shared/types/Categoy.types.ts'
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx'
import { Trash2 } from 'lucide-react'
import ModalDeleteProduct from '@/shared/components/overlays/ModalDeleteProduct.tsx'

export type CardProductProps = {
    name: string
    price?: number
    category?: Category
    img: string
    onClick?: () => void
    isEdited?: boolean
    statusTag?: { text: string; className: string }
    onDelete?: () => void
}

const CardProduct = ({ name, price, category, img, onClick, isEdited = false, statusTag, onDelete }: CardProductProps) => {
    const formattedPrice =
        typeof price === 'number' ? new Intl.NumberFormat('es-CO').format(price) : ''
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <>
            <div onClick={onClick} className="flex px-3 py-5 w-full rounded-3xl gap-2 bg-card items-center h-30 cursor-pointer">
                <div>
                    <img className="w-35" src={img} alt={name} />
                </div>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex items-start gap-2">
                        <div className="flex flex-1 min-w-0 flex-wrap items-center gap-2">
                            <span className="font-semibold text-lg leading-tight line-clamp-2">{name}</span>
                            {isEdited && (
                                <span className="text-xs font-semibold bg-warning text-primary px-2 py-0.5 rounded-full">editado</span>
                            )}
                        </div>
                        {onDelete && (
                            <span className="shrink-0 pr-2">
                                <Trash2
                                    className="w-5 h-5 text-danger cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); setShowConfirm(true) }}
                                />
                            </span>
                        )}
                    </div>
                    <div className="flex mt-2 text-sm">
                        {category && <ComponentTag text={CATEGORY_LABEL[category]} category={category} />}
                        {statusTag && (
                            <span className={`text-xs font-semibold px-3 py-1 rounded-2xl ${statusTag.className}`}>
                                {statusTag.text}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <span className="pr-2">$ {formattedPrice}</span>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <ModalDeleteProduct
                    name={name}
                    onConfirm={() => { onDelete?.(); setShowConfirm(false) }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    )
}

export default CardProduct
