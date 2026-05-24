import { useState, useEffect } from 'react'
import CardProductChef from '@/shared/components/ui/CardProductChef.tsx'
import ComponentFloatingMessage from '@/shared/components/overlays/ComponentFloatingMessage.tsx'
import { useOrdersChef } from '@/features/orderchef/hooks/useOrdersChef.ts'
import { useUpdateOrderEstado } from '@/features/orderchef/hooks/useUpdateOrderEstado.ts'
import { useChefAuthStore } from '@store/chefAuthStore.ts'
import type { PedidoEstadoChef, PedidoItemChef } from '@/features/orderchef/types/orderChef.types.ts'

const estadoMapCocinero: Record<PedidoEstadoChef, 'waiting' | 'in-progress' | 'ready' | 'done'> = {
  EN_ESPERA:  'waiting',
  EN_PROGRESO: 'in-progress',
  LISTO:      'done',
  ENTREGADO:  'done',
}

const estadoMapMesero: Record<PedidoEstadoChef, 'waiting' | 'in-progress' | 'ready' | 'done'> = {
  EN_ESPERA:  'done',
  EN_PROGRESO: 'done',
  LISTO:      'ready',
  ENTREGADO:  'done',
}

const FLASH_DURATION = 2000

const GridOrderChef = () => {
  const rol = useChefAuthStore((state) => state.auth?.rol)
  const estadoMap = rol === 'MESERO' ? estadoMapMesero : estadoMapCocinero

  const { orders: fetched, status, error, refetch } = useOrdersChef()
  const [orders, setOrders] = useState<PedidoItemChef[]>([])
  const [flashingIds, setFlashingIds] = useState<Set<number>>(new Set())

  useEffect(() => { setOrders(fetched) }, [fetched])

  const { update, loadingId, message, isError } = useUpdateOrderEstado()

  const isFinalTransition = (estado: PedidoEstadoChef) => {
    if (rol === 'MESERO') return estado === 'LISTO'
    return estado === 'EN_PROGRESO'
  }

  const handleStatusChange = async (order: PedidoItemChef) => {
    const willFlash = isFinalTransition(order.estado)
    const success = await update(order.itemId)

    if (!success) return

    if (willFlash) {
      setFlashingIds((prev) => new Set(prev).add(order.itemId))
      setTimeout(() => {
        setFlashingIds((prev) => {
          const next = new Set(prev)
          next.delete(order.itemId)
          return next
        })
        refetch()
      }, FLASH_DURATION)
    } else {
      refetch()
    }
  }

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
            ingredients={order.ingredientes.map((ing) => ({
                name: ing.nombre,
                available: !order.ingredientesExcluidos.includes(ing.nombre),
              }))}
            status={estadoMap[order.estado]}
            loading={loadingId === order.itemId}
            flashing={flashingIds.has(order.itemId)}
            onStatusChange={() => handleStatusChange(order)}
          />
        ))}
      </div>
    </>
  )
}

export default GridOrderChef
