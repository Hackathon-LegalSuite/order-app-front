import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { useOrders } from '@/features/ordersclient/hooks/useOrders.ts'
import type { PedidoEstado } from '@/features/ordersclient/types/order.types.ts'

const estadoTag: Record<PedidoEstado, { text: string; className: string }> = {
  EN_ESPERA:      { text: 'Recibido por el chef',       className: 'bg-warning text-primary' },
  EN_PREPARACION: { text: 'En preparación',  className: 'bg-blue-400 text-white'  },
  LISTO:          { text: 'Preparado',           className: 'bg-item text-primary'    },
  ENTREGADO:      { text: 'Entregado',       className: 'bg-secondary text-white' },
}

const ListOrderClient = () => {
  const { orders, status, error } = useOrders()

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
        <span className="text-3xl">🧾</span>
        <p className="text-sm">No tienes pedidos aún</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {orders.map((order) => (
        <CardProduct
          key={order.itemId}
          name={order.platoNombre}
          price={order.precio}
          img={order.imagenUrl}
          statusTag={estadoTag[order.estado]}
        />
      ))}
    </div>
  )
}

export default ListOrderClient
