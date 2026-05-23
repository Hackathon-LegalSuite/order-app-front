import ComponentInput from '@/shared/components/ui/ComponentInput.tsx'
import HeaderProducts from '@/shared/components/ui/HeaderProducts.tsx'
import { Search } from 'lucide-react'
import ComponentFilter from '@/shared/components/overlays/ComponentFilter.tsx'
import ListProductClient from './ListProductClient.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import ClientLayout from '@/shared/components/layouts/ClientLayout.tsx'
import { useNavigate, useParams } from 'react-router'

const PageProductsClient = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const navigate = useNavigate()

  return (
    <ClientLayout>
      <HeaderProducts />
      <main className=" relative flex flex-col gap-5 w-full mt-6 flex-1 min-h-0">
        <div>
          <ComponentInput icon={Search} />
        </div>
        <div>
          <ComponentFilter />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <ListProductClient />
        </div>
        <div className="absolute flex w-full bottom-0">
          <ComponentButton
            text="confirmar"
            style={{ paddingTop: '16px', paddingBottom: '16px', fontSize: '18px' }}
            type="button"
            onClick={() => navigate(`/init/${idmesa}/order`)}
          />
        </div>

      </main>
    </ClientLayout>
  )
}

export default PageProductsClient