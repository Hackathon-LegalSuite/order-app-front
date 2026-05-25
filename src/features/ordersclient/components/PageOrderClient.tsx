import { useEffect } from 'react'
import ClientLayout from '@/shared/components/layouts/ClientLayout.tsx'
import ListCarClient from './ListCarClient.tsx'
import ListOrderClient from './ListOrderClient.tsx'
import ComponentButton from '@/shared/components/ui/ComponentButton.tsx'
import HeaderProducts from '@/shared/components/ui/HeaderProducts.tsx'
import { useSubmitOrder } from '@/features/ordersclient/hooks/useSubmitOrder.ts'
import { useCartStore } from '@store/cartStore.ts'
import { useLocation, useNavigate, useParams } from 'react-router'

type Tab = 'carrito' | 'pedidos'

const PageOrderClient = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { confirm, status } = useSubmitOrder()
  const itemCount = useCartStore((state) => state.items.length)

  const tab: Tab = location.pathname.endsWith('/products') ? 'pedidos' : 'carrito'

  useEffect(() => {
    if (status === 'success') {
      navigate(`/init/${idmesa}/order/products`)
    }
  }, [status, idmesa, navigate])

  const setTab = (t: Tab) => {
    navigate(`/init/${idmesa}/order/${t === 'carrito' ? 'car' : 'products'}`)
  }

  return (
    <ClientLayout>
      <main className=" relative flex flex-col gap-5 w-full flex-1 min-h-0">
        <div>
          <HeaderProducts showCart={false} />
        </div>
        <div className="flex bg-card rounded-2xl p-1 gap-1">
          {(['carrito', 'pedidos'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
                tab === t ? 'bg-primary text-two' : 'text-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          {tab === 'carrito' ? <ListCarClient /> : <ListOrderClient />}
        </div>
        {tab === 'carrito' && (
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
        )}
      </main>
    </ClientLayout>
  )
}

export default PageOrderClient