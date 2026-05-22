import { useMemo } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { products } from '@/features/products/data/products.ts'
import { useCartStore } from '@store/cartStore.ts'

const ListProduct = () => {
  const items = useCartStore((state) => state.items)
  const productCounts = useMemo(() => {
    const counts = new Map<number, number>()
    items.forEach((item) => {
      counts.set(item.productId, (counts.get(item.productId) ?? 0) + 1)
    })
    return counts
  }, [items])

  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {products.map((product) => (
        <CardProduct
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          amount={productCounts.get(product.id) ?? 0}
          category={product.category}
          img={product.img}
          ingredients={product.ingredients}
          type="client"
        />
      ))}
    </div>
  )
}

export default ListProduct