import type { Category } from '@/shared/types/Categoy.types.ts'
import { CATEGORY_LABEL } from '@/shared/types/Categoy.types.ts'
import type { Ingredient } from '@/features/productclient/types/products.types.ts'
import ComponentCount from '@/shared/components/overlays/ComponentCount.tsx'
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx'
import { Check, SquarePen, X, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@store/cartStore.ts'

export type CardProductProps = {
    id: number
    name: string
    price?: number
    amount: number
    category: Category
    img: string
    ingredients: Ingredient[]
    type: 'client' | 'chef' | 'waiter'
    defaultExpanded?: boolean
    excludedIngredientIds?: number[]
    readonlyIngredients?: boolean
    showExceptionDot?: boolean
    onConfirm?: (excludedIngredientIds: number[]) => void
    onCancel?: () => void
    onDelete?: () => void
}

const CardProduct = ({
    id,
    name,
    price,
    amount,
    category,
    img,
    ingredients,
    type,
    defaultExpanded = false,
    excludedIngredientIds,
    readonlyIngredients = false,
    showExceptionDot = false,
    onConfirm,
    onCancel,
    onDelete,
}: CardProductProps) => {
    const [isSelected, setIsSelected] = useState(defaultExpanded)
    const [localExcludedIngredientIds, setLocalExcludedIngredientIds] = useState(
        () => excludedIngredientIds ?? [],
    )
    const addItem = useCartStore((state) => state.addItem)
    const removeLastItemByProduct = useCartStore(
        (state) => state.removeLastItemByProduct,
    )
    const formattedPrice =
        typeof price === 'number' ? new Intl.NumberFormat('es-CO').format(price) : ''

    const resolvedExcludedIngredientIds = readonlyIngredients
        ? excludedIngredientIds ?? []
        : localExcludedIngredientIds

    const handleToggleIngredient = (ingredient: Ingredient) => {
        if (readonlyIngredients || ingredient.required) return

        setLocalExcludedIngredientIds((current) =>
            current.includes(ingredient.id)
                ? current.filter((idValue) => idValue !== ingredient.id)
                : [...current, ingredient.id],
        )
    }

    const handleAddDefault = () => {
        if (readonlyIngredients) return
        addItem(id, [])
    }

    const handleRemoveDefault = () => {
        if (readonlyIngredients) return
        removeLastItemByProduct(id)
    }

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(localExcludedIngredientIds)
        } else {
            addItem(id, localExcludedIngredientIds)
        }
        setIsSelected(false)
    }

    const handleCancel = () => {
        setLocalExcludedIngredientIds(excludedIngredientIds ?? [])
        setIsSelected(false)
        onCancel?.()
    }

    if (type === 'client') {
        return (
            <div
                className={`flex px-3 py-5 w-full rounded-3xl gap-2 ${
                    isSelected ? 'bg-primary items-start min-h-40' : 'bg-card items-center h-40'
                }`}
            >
                {isSelected ? (
                    <div className="flex flex-col gap-3 w-full h-full text-two">
                        <div className="flex justify-between h-full gap-3 w-full">
                            <div className="grid grid-rows-4 grid-flow-col gap-x-6 gap-y-3 text-sm flex-1 w-full content-start">
                                {ingredients.map((ingredient) => {
                                    const isExcluded = resolvedExcludedIngredientIds.includes(ingredient.id)
                                    const isLocked = ingredient.required

                                    return (
                                        <div
                                            key={ingredient.id}
                                            onClick={() => handleToggleIngredient(ingredient)}
                                            className={`flex items-center gap-2 ${
                                                isLocked || readonlyIngredients ? 'cursor-default' : 'cursor-pointer'
                                            }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    isLocked
                                                        ? 'bg-item opacity-40'
                                                        : isExcluded
                                                        ? 'bg-secondary'
                                                        : 'bg-item'
                                                }`}
                                            />
                                            <span
                                                className={
                                                    isLocked
                                                        ? 'text-secondary opacity-60'
                                                        : isExcluded
                                                        ? 'text-secondary'
                                                        : 'text-two'
                                                }
                                            >
                                                {ingredient.label}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    className="bg-two w-11 h-7 flex items-center justify-center py-2 px-2 rounded-2xl"
                                >
                                    <Check className="text-one w-4 h-4" />
                                </button>
                                {onCancel !== undefined && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-secondary w-11 h-7 flex items-center justify-center py-2 px-2 rounded-2xl"
                                    >
                                        <X className="text-one w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <img className="w-35" src={img} alt={name} />
                        </div>
                        <div className="flex flex-col justify-between h-full w-full">
                            <div className="flex justify-between gap-1">
                                <div className="font-semibold text-lg leading-tight">
                                    {name}
                                    {showExceptionDot && (
                                        <span className="inline-block w-2 h-2 rounded-full bg-orange-400 ml-1 mb-0.5" />
                                    )}
                                </div>
                                {onCancel !== undefined && (
                                    <button
                                        type="button"
                                        onClick={() => setIsSelected((value) => !value)}
                                        className="bg-one w-10 h-8 flex items-center justify-center py-2 px-2 rounded-2xl"
                                    >
                                        <SquarePen className="text-two w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <span>$ {formattedPrice}</span>
                                {onDelete !== undefined && (
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        className="bg-red-400 w-10 h-8 flex items-center justify-center py-2 px-2 rounded-2xl"
                                    >
                                        <Trash2 className="text-white w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <ComponentCount
                                    amount={amount}
                                    onDecrement={handleRemoveDefault}
                                    onIncrement={handleAddDefault}
                                />
                                <ComponentTag text={CATEGORY_LABEL[category]} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        )
    }

    return null
}

export default CardProduct
