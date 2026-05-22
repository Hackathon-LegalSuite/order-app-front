import name from "@assets/images/name.png"
import ComponentCar from "@/shared/components/overlays/ComponentCar.tsx"
import { ShoppingCart } from "lucide-react"
import { selectCartCount, useCartStore } from "@store/cartStore.ts"

type HeaderProductsProps = {
  showCart?: boolean
  cartCount?: number
}

const HeaderProducts = ({ showCart = true, cartCount }: HeaderProductsProps) => {
  const storeCartCount = useCartStore(selectCartCount)
  const resolvedCartCount = cartCount ?? storeCartCount

  return (
    <div className="flex justify-between w-full">
      <div className="w-32 flex items-center">
        <img src={name} alt="" />
      </div>
      {showCart ? (
        <div>
          <ComponentCar icon={ShoppingCart} numberProduct={resolvedCartCount} />
        </div>
      ) : null}
    </div>
  )
}

export default HeaderProducts
