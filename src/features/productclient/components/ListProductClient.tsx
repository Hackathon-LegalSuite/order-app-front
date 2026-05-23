import { useMemo } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { useCartStore } from '@store/cartStore.ts'
import { useProducts } from '@/features/productclient/hooks/useProducts.ts'

const ListProductClient = () => {
  const { products, status, error } = useProducts()
  const items = useCartStore((state) => state.items)

  const productCounts = useMemo(() => {
    const counts = new Map<number, number>()
    items.forEach((item) => {
      counts.set(item.productId, (counts.get(item.productId) ?? 0) + 1)
    })
    return counts
  }, [items])

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
          onCancel={() => {}}
        />
      ))}
    </div>
  )
}

export default ListProductClient