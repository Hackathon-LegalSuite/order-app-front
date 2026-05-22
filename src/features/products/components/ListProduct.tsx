import type { CardProductProps } from "@/shared/components/ui/CardProduct.tsx"
import CardProduct from "@/shared/components/ui/CardProduct.tsx"

type Product = Omit<CardProductProps, "price"> & { price: number }

const products: Product[] = [
  {
    name: "Hamburguesa Clasica",
    price: 100000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Doble",
    price: 120000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa BBQ",
    price: 110000,
    amount: 3,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Pollo",
    price: 95000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Queso",
    price: 105000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Tocino",
    price: 115000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Suprema",
    price: 130000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Veggie",
    price: 98000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Clasica 2",
    price: 100000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Doble 2",
    price: 120000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa BBQ 2",
    price: 110000,
    amount: 3,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Pollo 2",
    price: 95000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Queso 2",
    price: 105000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Tocino 2",
    price: 115000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Suprema 2",
    price: 130000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Veggie 2",
    price: 98000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Clasica 3",
    price: 100000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Doble 3",
    price: 120000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa BBQ 3",
    price: 110000,
    amount: 3,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Pollo 3",
    price: 95000,
    amount: 1,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Queso 3",
    price: 105000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
  {
    name: "Hamburguesa Tocino 3",
    price: 115000,
    amount: 2,
    category: "fuerte",
    img: "https://cdn.prod.website-files.com/5edad490415d3af51ed48281/64ce51a538241ed4629d056c_menu-muy-casero-arroz-lentejas-barato-rico-sabor-fresco-frijoles-pollo-carne%20(4).png",
    type: "client",
  },
]

const ListProduct = () => {
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
          type={product.type}
        />
      ))}
    </div>
  )
}

export default ListProduct