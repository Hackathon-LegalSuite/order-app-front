import { useState } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import EditProduct from '@/shared/components/ui/EditProduct.tsx'
import { useProducts } from '@/features/productclient/hooks/useProducts.ts'
import type { Product } from '@/features/productclient/types/products.types.ts'
import { useIaStore } from '@/features/ia/store/iaStore.ts'
import { Bot, X } from 'lucide-react'

const ListProductClient = () => {
  const { products, status, error } = useProducts()
  const [selected, setSelected] = useState<Product | null>(null)
  const { active: iaActive, suggestedIds, excludedIngredientIds, mensaje, clear: clearIa } = useIaStore()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-40 text-secondary">
        Cargando productos...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-40 text-red-500 text-sm px-4 text-center">
        {error ?? 'No se pudieron cargar los productos'}
      </div>
    )
  }

  if (status === 'success' && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 text-secondary">
        <span className="text-3xl">🍽️</span>
        <p className="text-sm">No hay productos en esta categoría</p>
      </div>
    )
  }

  const sortedProducts = iaActive && suggestedIds.length > 0
    ? [
        ...products.filter((p) => suggestedIds.includes(p.id)),
        ...products.filter((p) => !suggestedIds.includes(p.id)),
      ]
    : products

  const selectedIsIa = selected !== null && iaActive && suggestedIds.includes(selected.id)

  return (
    <>
      <div className="flex flex-col w-full gap-5 pb-20">
        {iaActive && mensaje && (
          <div className="flex items-start gap-3 bg-item/10 border border-item/30 rounded-2xl px-4 py-3">
            <Bot className="w-4 h-4 text-item shrink-0 mt-0.5" />
            <p className="flex-1 text-sm text-primary leading-snug">{mensaje}</p>
            <button type="button" onClick={clearIa} className="shrink-0 text-secondary active:text-primary">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {sortedProducts.map((product) => (
          <CardProduct
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            img={product.img}
            isIa={iaActive && suggestedIds.includes(product.id)}
            onClick={() => setSelected(product)}
          />
        ))}
      </div>

      <EditProduct
        isOpen={selected !== null}
        id={selected?.id ?? 0}
        name={selected?.name ?? ''}
        ingredients={selected?.ingredients ?? []}
        onClose={() => setSelected(null)}
        iaExcludedIds={selectedIsIa ? excludedIngredientIds : undefined}
      />
    </>
  )
}

export default ListProductClient
