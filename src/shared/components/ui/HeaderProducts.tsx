import name from "@assets/images/name.png"
import ComponentCar from "@/shared/components/overlays/ComponentCar.tsx"
import { ShoppingCart, ChevronLeft } from "lucide-react"
import { selectCartCount, useCartStore } from "@store/cartStore.ts"
import { useLocation, useNavigate, useParams } from "react-router"

type HeaderProductsProps = {
  showCart?: boolean
  cartCount?: number
}

const HeaderProducts = ({ showCart = true, cartCount }: HeaderProductsProps) => {
  const storeCartCount = useCartStore(selectCartCount)
  const resolvedCartCount = cartCount ?? storeCartCount
  const { idmesa } = useParams<{ idmesa: string }>()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showBack = !pathname.endsWith('/products')

  return (
    <div className="flex justify-between w-full">
      <div className="w-32 flex items-center">
        {showBack && (
          <ChevronLeft onClick={() => navigate(-1)} className="w-8 h-8 shrink-0 text-one cursor-pointer" />
        )}
        <img src={name} alt="" onClick={() => idmesa && navigate(`/init/${idmesa}/products`)} className="cursor-pointer" />
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
