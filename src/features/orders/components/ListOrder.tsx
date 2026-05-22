import type { CardProductProps } from "@/shared/components/ui/CardProduct.tsx"
import CardProduct from "@/shared/components/ui/CardProduct.tsx"

type Product = Omit<CardProductProps, "price" | "ingredients"> & { price: number; ingredients: Array<{ id: number; label: string }> }

const products: Product[] = [
  {
    name: "Hamburguesa Clasica",
    price: 100000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
    ingredients: [
      { id: 1, label: "Platano" },
      { id: 2, label: "Lentejas" },
      { id: 3, label: "Carne Molida" },
      { id: 4, label: "Tomate" },
      { id: 5, label: "Pico de gallo" },
    ],
  },
  {
    name: "Hamburguesa Clasica",
    price: 100000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
    ingredients: [
      { id: 1, label: "Platano" },
      { id: 2, label: "Lentejas" },
      { id: 3, label: "Carne Molida" },
      { id: 4, label: "Tomate" },
      { id: 5, label: "Pico de gallo" },
    ],
  }
]

const ListOrder = () => {
  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {products.map((product) => (
        <CardProduct
          key={product.name}
          name={product.name}
          price={product.price}
          amount={product.amount}
          category={product.category}
          img={product.img}
          ingredients={product.ingredients}
          type={product.type}
        />
      ))}
    </div>
  )
}

export default ListOrder