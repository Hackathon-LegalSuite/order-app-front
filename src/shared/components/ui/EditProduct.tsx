import { useState } from 'react'
import type { Ingredient } from '@/features/productclient/types/products.types.ts'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import { useCartStore } from '@store/cartStore.ts'
import { ShoppingCart } from 'lucide-react'

type EditProductProps = {
  isOpen: boolean
  id: number
  name: string
  ingredients: Ingredient[]
  onClose: () => void
}

const EditProduct = ({ isOpen, id, name, ingredients, onClose }: EditProductProps) => {
  const isEditable = ingredients.some((i) => !i.required)
  const [excluded, setExcluded] = useState<number[]>([])
  const addItem = useCartStore((state) => state.addItem)

  const toggle = (id: number) => {
    setExcluded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
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

            <div className="mt-6">
              <ComponentButton text="Añadir a carrito" icon={ShoppingCart} type="button" onClick={() => { addItem(id, excluded); onClose() }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProduct
