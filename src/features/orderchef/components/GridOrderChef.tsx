import CardProductChef from '@/shared/components/ui/CardProductChef.tsx'
import { products, type Product } from '../data/products.ts'

const GridOrderChef = () => {
  return (
    <div className='grid gap-4 p-4' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(450px, 100%), 1fr))' }}>
      {products.map((product: Product) => (
        <CardProductChef
          key={product.id}
          title={product.title}
          image={product.image}
          table={product.table}
          plates={product.plates}
          category={product.category}
          ingredients={product.ingredients}
          status={product.status}
        />
      ))}
    </div>
  )
}

export default GridOrderChef
