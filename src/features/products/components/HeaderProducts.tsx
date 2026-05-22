import name from "@assets/images/name.png"
import ComponentCar from "@/shared/components/overlays/ComponentCar.tsx"
import { ShoppingCart } from 'lucide-react';

const HeaderProducts = () => {
  return (
    <div className="flex justify-between w-full ">
        <div className="w-32 flex items-center">
            <img src={name} alt="" />
        </div>
        <div>
            <ComponentCar icon={ShoppingCart} numberProduct={2} />
        </div>
    </div>
  )
}

export default HeaderProducts