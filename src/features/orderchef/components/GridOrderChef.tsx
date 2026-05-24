import { useState, useEffect } from 'react'
import CardProductChef from '@/shared/components/ui/CardProductChef.tsx'
import ComponentFloatingMessage from '@/shared/components/overlays/ComponentFloatingMessage.tsx'
import { useOrdersChef } from '@/features/orderchef/hooks/useOrdersChef.ts'
import { useUpdateOrderEstado } from '@/features/orderchef/hooks/useUpdateOrderEstado.ts'
import type { PedidoEstadoChef, PedidoItemChef } from '@/features/orderchef/types/orderChef.types.ts'

const estadoMap: Record<PedidoEstadoChef, 'waiting' | 'in-progress' | 'done'> = {
  EN_ESPERA:  'waiting',
  EN_PROGRESO: 'in-progress',
  LISTO:      'done',
  ENTREGADO:  'done',
}

const GridOrderChef = () => {
  const { orders: fetched, status, error, refetch } = useOrdersChef()
  const [orders, setOrders] = useState<PedidoItemChef[]>([])

  useEffect(() => { setOrders(fetched) }, [fetched])

  const { update, loadingId, message, isError } = useUpdateOrderEstado(() => {
    refetch()
  })

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-40 text-secondary">
        Cargando pedidos...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-40 text-red-500 text-sm px-4 text-center">
        {error ?? 'No se pudieron cargar los pedidos'}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 text-secondary">
        <span className="text-3xl">🍽️</span>
        <p className="text-sm">No hay pedidos pendientes</p>
      </div>
    )
  }

  return (
    <>
      {message && (
        <ComponentFloatingMessage message={message} variant={isError ? 'error' : 'success'} autoHideMs={3000} />
      )}
      <div className='grid gap-4 p-4' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(450px, 100%), 1fr))' }}>
        {orders.map((order) => (
          <CardProductChef
            key={order.itemId}
            title={order.platoNombre}
            image={order.imagenUrl}
            table={order.mesa}
            mesero={order.mesero}
            ingredients={order.ingredientesExcluidos.map((name) => ({ name, available: false }))}
            status={estadoMap[order.estado]}
            loading={loadingId === order.itemId}
            onStatusChange={() => update(order.itemId)}
          />
        ))}
      </div>
    </>
  )
}

export default GridOrderChef
