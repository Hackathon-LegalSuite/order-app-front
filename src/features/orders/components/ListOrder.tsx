import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { getProductById } from '@/features/products/data/products.ts'
import { useCartStore } from '@store/cartStore.ts'

const ListOrder = () => {
  const items = useCartStore((state) => state.items)

  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {items.map((item) => {
        const product = getProductById(item.productId)

        if (!product) {
          return null
        }

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
            defaultExpanded
            readonlyIngredients
            excludedIngredientIds={item.excludedIngredientIds}
          />
        )
      })}
    </div>
  )
}

export default ListOrder