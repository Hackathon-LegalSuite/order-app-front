import type { Category } from '@/shared/types/Categoy.types.ts'
import ComponentCount from '@/shared/components/overlays/ComponentCount.tsx'
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx'
import { Check, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@store/cartStore.ts'

export type CardProductProps = {
    id: number
    name: string
    price?: number
    amount: number
    category: Category
    img: string
    ingredients: Array<{ id: number; label: string }>
    type: 'client' | 'chef' | 'waiter'
    defaultExpanded?: boolean
    excludedIngredientIds?: number[]
    readonlyIngredients?: boolean
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

    const handleToggleIngredient = (ingredientId: number) => {
        if (readonlyIngredients) {
            return
        }

        setLocalExcludedIngredientIds((current) =>
            current.includes(ingredientId)
                ? current.filter((idValue) => idValue !== ingredientId)
                : [...current, ingredientId],
        )
    }

    const handleAddDefault = () => {
        if (readonlyIngredients) {
            return
        }

        addItem(id, [])
    }

    const handleRemoveDefault = () => {
        if (readonlyIngredients) {
            return
        }

        removeLastItemByProduct(id)
    }

    const handleConfirm = () => {
        if (readonlyIngredients) {
            return
        }

        addItem(id, localExcludedIngredientIds)
        setIsSelected(false)
    }

    if (type === 'client') {
        return (
            <div
                className={`flex px-3 py-5 w-full h-36 rounded-3xl gap-2 ${
                    isSelected ? 'bg-primary items-start' : 'bg-card items-center'
                }`}
            >
                {isSelected ? (
                    <div className="flex flex-col gap-3 w-full h-full text-two">
                        <div className="flex justify-between h-full gap-3 w-full">
                            <div className="grid grid-rows-4 grid-flow-col gap-x-6 gap-y-3 text-sm flex-1 w-full content-start">
                                {ingredients.map((ingredient) => {
                                    const isExcluded = resolvedExcludedIngredientIds.includes(
                                        ingredient.id,
                                    )
                                    return (
                                        <div
                                            key={ingredient.id}
                                            onClick={() => handleToggleIngredient(ingredient.id)}
                                            className={`flex items-center gap-2 ${
                                                readonlyIngredients ? '' : 'cursor-pointer'
                                            }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    isExcluded ? 'bg-secondary' : 'bg-item'
                                                }`}
                                            ></span>
                                            <span
                                                className={isExcluded ? 'text-secondary' : 'text-two'}
                                            >
                                                {ingredient.label}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="bg-two w-11 h-7 flex items-center justify-center py-2 px-2 rounded-2xl"
                            >
                                <Check className="text-one w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <img className="w-35" src={img} alt="" />
                        </div>
                        <div className="flex flex-col justify-between h-full w-full">
                            <div className="flex justify-between gap-1">
                                <div className="font-semibold text-lg leading-tight">
                                    {name}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsSelected((value) => !value)}
                                    className="bg-one w-12 h-8 flex items-center justify-center py-2 px-2 rounded-2xl"
                                >
                                    <SquarePen className="text-two w-4 h-4" />
                                </button>
                            </div>
                            <div>$ {formattedPrice}</div>
                            <div className="flex justify-between">
                                <ComponentCount
                                    amount={amount}
                                    onDecrement={handleRemoveDefault}
                                    onIncrement={handleAddDefault}
                                />
                                <ComponentTag text={category} />
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