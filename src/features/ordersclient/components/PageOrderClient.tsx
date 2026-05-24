import ClientLayout from '@/shared/components/layouts/ClientLayout.tsx'
import ListOrderClient from './ListOrderClient.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import HeaderProducts from '@/shared/components/ui/HeaderProducts.tsx'
import { useSubmitOrder } from '@/features/ordersclient/hooks/useSubmitOrder.ts'
import { useCartStore } from '@store/cartStore.ts'

const PageOrderClient = () => {
  const { confirm, status } = useSubmitOrder()
  const itemCount = useCartStore((state) => state.items.length)

  return (
    <ClientLayout>
      <main className=" relative flex flex-col gap-5 w-full flex-1 min-h-0">
        <div>
          <HeaderProducts showCart={false} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <ListOrderClient />
        </div>
        <div
          className="fixed bottom-0 left-0 right-0 flex justify-center px-6 z-30"
          style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
        >
          <div className="w-full max-w-4xl">
            <ComponentButton
              text="Enviar mi pedido"
              style={{ paddingTop: '16px', paddingBottom: '16px', fontSize: '18px' }}
              type="button"
              loading={status === 'loading'}
              disabled={itemCount === 0}
              onClick={confirm}
            />
          </div>
        </div>
      </main>
    </ClientLayout>
  )
}

export default PageOrderClient