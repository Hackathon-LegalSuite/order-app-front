import { useState, useEffect } from 'react'
import CardProduct from '@/shared/components/ui/CardProduct.tsx'
import EditProduct from '@/shared/components/ui/EditProduct.tsx'
import ComponentFloatingMessage from '@/shared/components/overlays/ComponentFloatingMessage.tsx'
import { useOrders } from '@/features/ordersclient/hooks/useOrders.ts'
import { useDeleteOrderItem } from '@/features/ordersclient/hooks/useDeleteOrderItem.ts'
import type { PedidoEstado, PedidoItem } from '@/features/ordersclient/types/order.types.ts'

const estadoTag: Record<PedidoEstado, { text: string; className: string }> = {
  EN_ESPERA:   { text: 'Recibido por el chef', className: 'bg-warning text-primary' },
  EN_PROGRESO: { text: 'Cocinando',            className: 'bg-blue-400 text-white'  },
  LISTO:          { text: 'Preparado',              className: 'bg-item text-primary'      },
  ENTREGADO:      { text: 'Entregado',              className: 'bg-secondary text-white'   },
}

const ListOrderClient = () => {
  const { orders: fetched, status, error } = useOrders()
  const [orders, setOrders] = useState(fetched)
  const [viewItem, setViewItem] = useState<PedidoItem | null>(null)
  useEffect(() => { setOrders(fetched) }, [fetched])

  const { remove, message } = useDeleteOrderItem((itemId) => {
    setOrders((prev) => prev.filter((o) => o.itemId !== itemId))
  })

  const viewIngredients = viewItem
    ? viewItem.ingredientes.map((i) => ({ id: i.id, label: i.nombre, required: i.obligatorio }))
    : []

  const viewExcluded = viewItem
    ? viewItem.ingredientes
        .filter((i) => viewItem.ingredientesExcluidos.includes(i.nombre))
        .map((i) => i.id)
    : []

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
    <>
      {message && (
        <ComponentFloatingMessage message={message} variant="info" autoHideMs={3000} />
      )}
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
                isEdited={order.ingredientesExcluidos.length > 0}
                statusTag={estadoTag[order.estado]}
                onClick={() => setViewItem(order)}
                {...(order.estado === 'EN_ESPERA' && {
                  onDelete: () => remove(order.pedidoId, order.itemId),
                })}
              />
            ))}
          </div>
        ))}
      </div>

      <EditProduct
        isOpen={viewItem !== null}
        id={viewItem?.platoId ?? 0}
        name={viewItem?.platoNombre ?? ''}
        ingredients={viewIngredients}
        initialExcluded={viewExcluded}
        mode="view"
        onClose={() => setViewItem(null)}
      />
    </>
  )
}

export default ListOrderClient
