import ClientLayout from '@/shared/components/layouts/ClientLayout.tsx'
import ListOrderClient from './ListOrderClient.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import HeaderProducts from '@/shared/components/ui/HeaderProducts.tsx'

const PageOrderClient = () => {
  return (
    <ClientLayout>
      <main className=" relative flex flex-col gap-5 w-full flex-1 min-h-0">
        <div>
          <HeaderProducts showCart={false} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <ListOrderClient />
        </div>
        <div className="absolute flex w-full bottom-0">
          <ComponentButton text="confirmar" style={{ paddingTop: '16px', paddingBottom: '16px', fontSize: '18px' }} />
        </div>
      </main>
    </ClientLayout>
  )
}

export default PageOrderClient