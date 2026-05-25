# Feature: orderchef

Panel de gestión de pedidos para el personal de cocina y sala. Muestra en tiempo real (polling cada 8 segundos) todos los ítems de pedidos pendientes y permite avanzar su estado con un solo toque. El comportamiento visual y las transiciones de estado se adaptan al rol del usuario autenticado: `COCINERO` o `MESERO`.

---

## Archivos

### `types/orderChef.types.ts`

Define los contratos de datos del panel de chef.

| Tipo | Descripción |
|---|---|
| `PedidoEstadoChef` | Union type de los estados posibles: `'EN_ESPERA'` \| `'EN_PROGRESO'` \| `'LISTO'` \| `'ENTREGADO'` |
| `IngredienteChef` | Ingrediente de un plato: `{ id, nombre, obligatorio }` |
| `PedidoItemChef` | Ítem de pedido completo: id del ítem, id del pedido, plato, precio, imagen, ingredientes, ingredientes excluidos, estado, número de mesa y nombre del mesero |

---

### `services/orderChefService.ts`

Capa de comunicación con el backend para el panel de chef. Usa `httpChef` (instancia de Axios con el token de chef inyectado automáticamente).

#### `fetchOrdersChef(): Promise<PedidoItemChef[]>`
Hace `GET /pedido` y retorna todos los ítems de pedidos activos.

#### `updateOrderItemEstado(itemId: number): Promise<string>`
Hace `PATCH /pedido/item/:itemId/estado` para avanzar el estado del ítem al siguiente en la secuencia. Retorna el mensaje de confirmación del backend.

---

### `hooks/useOrdersChef.ts`

Hook que carga y mantiene actualizado el listado de pedidos del chef mediante polling.

#### `useOrdersChef()`
Retorna `{ orders, status, error, refetch }`.

| Retorno | Descripción |
|---|---|
| `orders` | Lista de `PedidoItemChef[]` ordenada por `itemId` ascendente |
| `status` | `'idle'` \| `'loading'` \| `'success'` \| `'error'` |
| `error` | Mensaje de error o `null` |
| `refetch()` | Fuerza una recarga silenciosa (sin cambiar el status a `'loading'`) |

**Comportamiento de polling:**
- Al montar hace una carga inicial mostrando el estado `'loading'`.
- Cada 8 segundos ejecuta una recarga silenciosa que actualiza los datos sin mostrar el indicador de carga, evitando parpadeos en pantalla.
- Al desmontar limpia el intervalo.

---

### `hooks/useUpdateOrderEstado.ts`

Hook que gestiona la mutación de estado de un ítem de pedido.

#### `useUpdateOrderEstado()`
Retorna `{ update, loadingId, message, isError }`.

| Retorno | Descripción |
|---|---|
| `update(itemId)` | Llama a `updateOrderItemEstado`, gestiona loading por ítem y retorna `true` si fue exitoso |
| `loadingId` | ID del ítem que está siendo actualizado en este momento (para mostrar spinner solo en esa tarjeta) |
| `message` | Mensaje de feedback de la operación (éxito o error) |
| `isError` | Indica si `message` es un error |

---

### `components/GridOrderChef.tsx`

Componente principal del panel de chef. Renderiza la grilla de pedidos y orquesta la lógica de transición de estados.

**Lógica de rol:**

| Rol | Transiciones disponibles |
|---|---|
| `COCINERO` | `EN_ESPERA → EN_PROGRESO → LISTO`. Cuando llega a `LISTO` la tarjeta hace flash y desaparece. |
| `MESERO` | Solo ve los platos en estado `LISTO` y los marca como `ENTREGADO`. Al entregar la tarjeta hace flash y desaparece. |

**Comportamiento de flash:**
- Cuando un ítem llega a su transición final, se añade a `flashingIds` durante `FLASH_DURATION` (2000 ms).
- Pasado ese tiempo se elimina de `flashingIds` y se llama a `refetch()` para que desaparezca del listado.

**Funciones internas:**

| Función | Descripción |
|---|---|
| `isFinalTransition(estado)` | Determina si el siguiente cambio de estado es la transición final del rol actual (para activar el flash) |
| `handleStatusChange(order)` | Llama a `update`, activa el flash si corresponde y sincroniza la lista |

---

### `components/PageOrderChef.tsx`

Página contenedora del panel de chef. Monta el `HeaderChef` en la parte superior y el `GridOrderChef` debajo dentro de un fondo `bg-background`.
