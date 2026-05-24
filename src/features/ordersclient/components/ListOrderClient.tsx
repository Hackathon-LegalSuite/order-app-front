import { useState, useEffect } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import { useOrders } from '@/features/ordersclient/hooks/useOrders.ts'
import { useDeleteOrderItem } from '@/features/ordersclient/hooks/useDeleteOrderItem.ts'
import type { PedidoEstado } from '@/features/ordersclient/types/order.types.ts'

const estadoTag: Record<PedidoEstado, { text: string; className: string }> = {
  EN_ESPERA:      { text: 'Recibido por el chef',  className: 'bg-warning text-primary'   },
  EN_PREPARACION: { text: 'En preparación',         className: 'bg-blue-400 text-white'    },
  LISTO:          { text: 'Preparado',              className: 'bg-item text-primary'      },
  ENTREGADO:      { text: 'Entregado',              className: 'bg-secondary text-white'   },
}

const ListOrderClient = () => {
  const { orders: fetched, status, error } = useOrders()
  const [orders, setOrders] = useState(fetched)

  useEffect(() => { setOrders(fetched) }, [fetched])

  const { remove } = useDeleteOrderItem((itemId) => {
    setOrders((prev) => prev.filter((o) => o.itemId !== itemId))
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
        <span className="text-3xl">🧾</span>
        <p className="text-sm">No tienes pedidos aún</p>
      </div>
    )
  }

  const groups = orders.reduce<Map<number, typeof orders>>((acc, order) => {
    const list = acc.get(order.pedidoId) ?? []
    list.push(order)
    acc.set(order.pedidoId, list)
    return acc
  }, new Map())

  const groupEntries = Array.from(groups.entries())

  return (
    <div className="flex flex-col w-full gap-5 pb-20">
      {groupEntries.map(([pedidoId, items], groupIndex) => (
        <div key={pedidoId} className="flex flex-col gap-3">
          {groupIndex > 0 && <hr className="border-secondary/30" />}
          <span className="text-xs text-secondary font-medium px-1">Pedido #{pedidoId}</span>
          {items.map((order) => (
            <CardProduct
              key={order.itemId}
              name={order.platoNombre}
              price={order.precio}
              img={order.imagenUrl}
              statusTag={estadoTag[order.estado]}
              {...(order.estado === 'EN_ESPERA' && {
                onDelete: () => remove(order.pedidoId, order.itemId),
              })}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ListOrderClient
