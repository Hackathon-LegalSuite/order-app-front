import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { useCartStore } from '@store/cartStore.ts'
import { useProductsStore } from '@/features/productclient/store/productsStore.ts'

const ListOrderClient = () => {
  const items = useCartStore((state) => state.items)
  const updateItemExclusions = useCartStore((state) => state.updateItemExclusions)
  const removeItem = useCartStore((state) => state.removeItem)
  const products = useProductsStore((state) => state.products)

  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {items.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return null

        return (
          <CardProduct
            key={item.id}
            id={product.id}
            name={product.name}
            price={product.price}
            amount={1}
            category={product.category}
            img={product.img}
            ingredients={product.ingredients}
            type="client"
            excludedIngredientIds={item.excludedIngredientIds}
            showExceptionDot={item.excludedIngredientIds.length > 0}
            onConfirm={(excluded) => updateItemExclusions(item.id, excluded)}
            onCancel={() => {}}
            onDelete={() => removeItem(item.id)}
          />
        )
      })}
    </div>
  )
}

export default ListOrderClient