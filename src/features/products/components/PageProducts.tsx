import ComponentInput from "@/shared/components/ui/ComponentInput.tsx"
import HeaderProducts from "@/shared/components/ui/HeaderProducts.tsx"
import { Search } from 'lucide-react';
import ComponentFilter from "@/shared/components/overlays/ComponentFilter.tsx";
import ListProduct from "./ListProduct.tsx";
import ComponentButton from "@/shared/components/ui/ComponentButton.tsx";
import ClientLayout from "@/shared/components/layouts/ClientLayout.tsx";


const pageproducts = () => {
  return (
    <ClientLayout>
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
    </ClientLayout>
  )
}

export default pageproducts