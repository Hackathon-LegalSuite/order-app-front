import ComponentInput from "@/shared/components/ui/ComponentInput.tsx"
import HeaderProducts from "./HeaderProducts.tsx"
import { Search } from 'lucide-react';
import ComponentFilter from "@/shared/components/overlays/ComponentFilter.tsx";
import ListProduct from "./ListProduct.tsx";
import ComponentButton from "@/shared/components/ui/ComponentButton.tsx";


const pageproducts = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-item">
      <div className="flex flex-col w-full max-w-md bg-background h-screen py-8 px-6">
      <HeaderProducts/>
      <main className=" relative flex flex-col gap-5 w-full mt-6 flex-1 min-h-0">
        <div>
          <ComponentInput icon={Search}/>
        </div>
        <div>
          <ComponentFilter/>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <ListProduct/>
        </div>
        <div className="absolute flex w-full bottom-0">
          <ComponentButton text="confirmar" style={{ paddingTop: "16px", paddingBottom: "16px", fontSize: "18px" }} /> 

        </div>

      </main>
      </div>
    </div>
  )
}

export default pageproducts