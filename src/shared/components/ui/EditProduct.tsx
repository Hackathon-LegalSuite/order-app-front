import { useState, useEffect } from 'react'
import type { Ingredient } from '@/features/productclient/types/products.types.ts'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import { useCartStore } from '@store/cartStore.ts'
import { ShoppingCart, Check, Trash2 } from 'lucide-react'

type EditProductProps = {
  isOpen: boolean
  id: number
  name: string
  ingredients: Ingredient[]
  onClose: () => void
  mode?: 'add' | 'order'
  initialExcluded?: number[]
  onConfirm?: (excluded: number[]) => void
  onDelete?: () => void
}

const EditProduct = ({
  isOpen,
  id,
  name,
  ingredients,
  onClose,
  mode = 'add',
  initialExcluded = [],
  onConfirm,
  onDelete,
}: EditProductProps) => {
  const isEditable = ingredients.some((i) => !i.required)
  const [excluded, setExcluded] = useState<number[]>(initialExcluded)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (isOpen) setExcluded(initialExcluded)
  }, [isOpen])

  const toggle = (ingredientId: number) => {
    setExcluded((prev) =>
      prev.includes(ingredientId) ? prev.filter((x) => x !== ingredientId) : [...prev, ingredientId]
    )
  }

  const handleMain = () => {
    if (mode === 'order') {
      onConfirm?.(excluded)
    } else {
      addItem(id, excluded)
    }
    onClose()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center ${isOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`w-full max-w-4xl bg-background rounded-t-3xl transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-secondary" />
          </div>

          <div className="px-6 pt-4 pb-10">
            <p className="text-one text-sm mb-1">
              {isEditable ? 'Edita tu plato' : 'Plato no es editable'}
            </p>
            <h2 className="font-bold text-2xl uppercase mb-6">{name}</h2>

            <div className="grid grid-cols-2 gap-5">
              {ingredients.map((ingredient) => {
                const isChecked = !excluded.includes(ingredient.id)

                if (ingredient.required) {
                  return (
                    <div key={ingredient.id} className="flex items-center gap-3 opacity-40 cursor-default">
                      <span className="w-4 h-4 rounded-full bg-item shrink-0" />
                      <span className="text-base text-one">{ingredient.label}</span>
                    </div>
                  )
                }

                return (
                  <button
                    key={ingredient.id}
                    type="button"
                    onClick={() => toggle(ingredient.id)}
                    className="flex items-center gap-3 cursor-pointer text-left"
                  >
                    <span
                      className={`w-4 h-4 rounded-full shrink-0 border-2 transition-colors ${
                        isChecked ? 'bg-item border-item' : 'bg-transparent border-secondary'
                      }`}
                    />
                    <span className={`text-base transition-colors ${isChecked ? 'text-one' : 'text-secondary line-through'}`}>
                      {ingredient.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className={`mt-6 ${mode === 'order' ? 'flex gap-3' : ''}`}>
              {mode === 'order' && (
                <button
                  type="button"
                  onClick={() => { onDelete?.(); onClose() }}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-danger text-white font-semibold shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                  Eliminar
                </button>
              )}
              <ComponentButton
                text={mode === 'order' ? 'Confirmar' : 'Añadir a carrito'}
                icon={mode === 'order' ? Check : ShoppingCart}
                type="button"
                onClick={handleMain}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProduct
