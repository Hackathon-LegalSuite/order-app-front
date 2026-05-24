import { useState } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import EditProduct from '@/shared/components/ui/EditProduct.tsx'
import { useProducts } from '@/features/productclient/hooks/useProducts.ts'
import type { Product } from '@/features/productclient/types/products.types.ts'

const ListProductClient = () => {
  const { products, status, error } = useProducts()
  const [selected, setSelected] = useState<Product | null>(null)

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

  return (
    <>
      <div className="flex flex-col w-full gap-5 pb-20">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            img={product.img}
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
      />
    </>
  )
}

export default ListProductClient
