# Feature: ordersclient

Gestión del pedido desde el lado del cliente. Cubre dos pantallas dentro de la misma página: el **carrito** (ítems seleccionados aún no enviados) y los **pedidos** (ítems ya enviados al chef con su estado en tiempo real). El cliente puede enviar el carrito, ver el progreso de sus pedidos y eliminar ítems en estado `EN_ESPERA`.

---

## Archivos

### `types/order.types.ts`

Define los contratos de datos del flujo de pedidos del cliente.

| Tipo | Descripción |
|---|---|
| `OrderItem` | Ítem a enviar: `{ platoId, ingredientesExcluidos? }` |
| `OrderRequest` | Cuerpo del `POST /pedido`: `{ items: OrderItem[] }` |
| `OrderResponse` | Respuesta de confirmación del pedido: `{ id, estado, createdAt }` |
| `PedidoEstado` | Union type: `'EN_ESPERA'` \| `'EN_PROGRESO'` \| `'LISTO'` \| `'ENTREGADO'` |
| `IngredienteItem` | Ingrediente de un ítem de pedido: `{ id, nombre, obligatorio }` |
| `PedidoItem` | Ítem de pedido completo con estado actual, ingredientes y excluidos |

---

### `services/orderService.ts`

Capa de comunicación con el backend para el flujo de pedidos del cliente.

#### `submitOrder(payload: OrderRequest): Promise<OrderResponse>`
Envía `POST /pedido` con los ítems del carrito. Retorna la confirmación del pedido creado.

#### `fetchOrders(): Promise<PedidoItem[]>`
Hace `GET /pedido` y retorna todos los ítems de pedidos del cliente autenticado.

#### `deleteOrderItem(pedidoId: number, itemId: number): Promise<string | null>`
Hace `DELETE /pedido/:pedidoId/item/:itemId`. Retorna el mensaje del backend o `null` si no hay mensaje.

---

### `hooks/useOrders.ts`

Hook que carga y mantiene actualizado el listado de pedidos del cliente mediante polling.

#### `useOrders()`
Retorna `{ orders, status, error }`.

| Retorno | Descripción |
|---|---|
| `orders` | Lista de `PedidoItem[]` |
| `status` | `'idle'` \| `'loading'` \| `'success'` \| `'error'` |
| `error` | Mensaje de error o `null` |

**Comportamiento de polling:** igual que en `orderchef` — carga inicial con `'loading'` y actualizaciones silenciosas cada 8 segundos.

---

### `hooks/useSubmitOrder.ts`

Hook que gestiona el envío del carrito como pedido al backend.

#### `useSubmitOrder()`
Retorna `{ confirm, status, error, order }`.

| Retorno | Descripción |
|---|---|
| `confirm()` | Lee los ítems del `cartStore`, construye el `OrderRequest`, llama a `submitOrder` y limpia el carrito al éxito |
| `status` | `'idle'` \| `'loading'` \| `'success'` \| `'error'` |
| `error` | Mensaje de error o `null` |
| `order` | Respuesta del pedido confirmado o `null` |

> Al llegar a `'success'`, `PageOrderClient` detecta el cambio y navega automáticamente a la pestaña de pedidos para que el cliente vea el estado de lo enviado.

---

### `hooks/useDeleteOrderItem.ts`

Hook para eliminar un ítem de pedido en estado `EN_ESPERA`.

#### `useDeleteOrderItem(onSuccess: (itemId: number) => void)`
Acepta un callback que se ejecuta tras una eliminación exitosa para actualizar la lista localmente sin necesidad de refetch.

Retorna `{ remove, loadingId, message }`.

| Retorno | Descripción |
|---|---|
| `remove(pedidoId, itemId)` | Llama a `deleteOrderItem` y ejecuta `onSuccess` si no hay error |
| `loadingId` | ID del ítem en proceso de eliminación |
| `message` | Mensaje de confirmación del backend |

---

### `components/ListCarClient.tsx`

Lista los ítems del carrito (store local, aún no enviados).

**Comportamiento:**
- Lee los ítems de `cartStore` y cruza con `useProducts` para obtener los datos visuales del producto.
- Al tocar una tarjeta abre `EditProduct` en modo `"order"` para que el cliente modifique los ingredientes excluidos o elimine el ítem.
- Si el carrito está vacío muestra un estado vacío con icono.

---

### `components/ListOrderClient.tsx`

Lista los ítems de pedidos ya enviados al chef con su estado actual.

**Comportamiento:**
- Agrupa los ítems por `pedidoId` y muestra cada grupo con su número de pedido.
- Cada estado tiene un tag de color distinto (`EN_ESPERA` → amarillo, `EN_PROGRESO` → azul, `LISTO` → verde, `ENTREGADO` → gris).
- Solo los ítems en `EN_ESPERA` muestran el botón de eliminar.
- Al tocar una tarjeta abre `EditProduct` en modo `"view"` (solo lectura) para ver los ingredientes del plato.
- Las eliminaciones se aplican localmente de inmediato gracias al callback de `useDeleteOrderItem`.

---

### `components/PageOrderClient.tsx`

Página principal del flujo de pedido del cliente. Implementa la navegación entre pestañas **Carrito** y **Pedidos** mediante la URL (no con estado local), lo que permite compartir la URL directamente a una pestaña.

**Rutas de pestaña:**
- `carrito` → `/init/:idmesa/order/car`
- `pedidos` → `/init/:idmesa/order/products`

**Comportamiento:**
- Cuando `useSubmitOrder` llega a `'success'`, navega automáticamente a la pestaña de pedidos usando un `ref` para ejecutarlo solo una vez.
- El botón "Enviar mi pedido" se deshabilita si el carrito está vacío.
- El botón solo aparece en la pestaña de carrito.
