import { useState } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import EditProduct from '@/shared/components/ui/EditProduct.tsx'
import { useCartStore } from '@store/cartStore.ts'
import { useProducts } from '@/features/productclient/hooks/useProducts.ts'
import type { CartItem } from '@store/cartStore.ts'

type Selected = { item: CartItem; productId: number }

const ListOrderClient = () => {
  const items = useCartStore((state) => state.items)
  const updateItemExclusions = useCartStore((state) => state.updateItemExclusions)
  const removeItem = useCartStore((state) => state.removeItem)
  const { products } = useProducts()
  const [selected, setSelected] = useState<Selected | null>(null)

  const selectedProduct = selected
    ? products.find((p) => p.id === selected.productId)
    : null

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 text-secondary">
        <span className="text-3xl">🍽️</span>
        <p className="text-sm">No hay platos para pedir</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col w-full gap-5 pb-20">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (!product) return null

          return (
            <CardProduct
              key={item.id}
              name={product.name}
              price={product.price}
              category={product.category}
              img={product.img}
              isEdited={item.excludedIngredientIds.length > 0}
              onClick={() => setSelected({ item, productId: product.id })}
            />
          )
        })}
      </div>

      <EditProduct
        isOpen={selected !== null}
        id={selected?.productId ?? 0}
        name={selectedProduct?.name ?? ''}
        ingredients={selectedProduct?.ingredients ?? []}
        initialExcluded={selected?.item.excludedIngredientIds ?? []}
        mode="order"
        onConfirm={(excluded) => {
          if (selected) updateItemExclusions(selected.item.id, excluded)
        }}
        onDelete={() => {
          if (selected) removeItem(selected.item.id)
        }}
        onClose={() => setSelected(null)}
      />
    </>
  )
}

export default ListOrderClient
