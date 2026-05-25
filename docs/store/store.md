# src/store

Stores globales de la aplicación construidos con Zustand. Los tres stores usan el middleware `persist` para sobrevivir recargas de página vía `localStorage`.

---

## Archivos

### `cartStore.ts`

Gestiona el carrito de compras del cliente. Persiste en `localStorage` bajo la clave `order-app-cart`.

**Tipo `CartItem`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | UUID único del ítem en el carrito (generado con `crypto.randomUUID` o fallback) |
| `productId` | `number` | ID del plato |
| `excludedIngredientIds` | `number[]` | IDs de ingredientes excluidos, normalizados (sin duplicados, ordenados) |
| `createdAt` | `number` | Timestamp de creación |

**Acciones:**

| Acción | Descripción |
|---|---|
| `addItem(productId, excludedIngredientIds?)` | Añade un nuevo ítem al carrito. Los IDs excluidos se normalizan con `normalizeExcluded` (deduplicados y ordenados). |
| `removeItem(id)` | Elimina un ítem por su `id` único. |
| `removeLastItemByProduct(productId)` | Elimina el último ítem añadido con ese `productId`. Útil para decrementar la cantidad del mismo plato. |
| `updateItemExclusions(id, excludedIngredientIds)` | Actualiza los ingredientes excluidos de un ítem ya en el carrito. |
| `clearCart()` | Vacía el carrito completamente. Llamado al hacer login de cliente. |

**Selectores exportados:**

| Selector | Descripción |
|---|---|
| `selectCartCount` | Número total de ítems en el carrito |
| `selectProductCount(productId)` | Número de ítems de un producto específico en el carrito |

---

### `chefAuthStore.ts`

Gestiona la sesión del chef/mesero. Persiste solo el campo `auth` en `localStorage` bajo la clave `order-app-chef-auth` (el `status` y `error` son transitorios y no se persisten).

**Tipo `ChefAuthData`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `token` | `string` | JWT de autenticación |
| `nombre` | `string` | Nombre del chef o mesero |
| `rol` | `string` | `'COCINERO'` o `'MESERO'` |
| `expiresAt` | `number` | Timestamp de expiración del token en ms |

**Acciones:**

| Acción | Descripción |
|---|---|
| `setAuth(data)` | Guarda los datos de sesión y pone `status` en `'success'` |
| `setStatus(status, error?)` | Actualiza el estado de la petición y opcionalmente el error |
| `logout()` | Limpia `auth` y resetea el estado a `'idle'` |

**Selector exportado:**

| Selector | Descripción |
|---|---|
| `selectChefIsValid` | `true` si existe `auth` y `Date.now() < auth.expiresAt` |

---

### `clientAuthStore.ts`

Gestiona la sesión del cliente. Persiste solo el campo `auth` en `localStorage` bajo la clave `order-app-client-auth`.

**Tipo `ClientAuthData`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `token` | `string` | JWT de autenticación |
| `mesaId` | `number` | ID de la mesa del cliente |
| `nombre` | `string` | Nombre del cliente |
| `rol` | `string` | Rol asignado por el backend |
| `expiresAt` | `number` | Timestamp de expiración en ms |

**Acciones:** idénticas a `chefAuthStore` (`setAuth`, `setStatus`, `logout`).

**Selector exportado:**

| Selector | Descripción |
|---|---|
| `selectClientIsValid` | `true` si existe `auth` y `Date.now() < auth.expiresAt` |

---

> Los selectores `selectChefIsValid` y `selectClientIsValid` son evaluados en los guards de ruta para proteger las páginas, y en el `AppRouter` para la redirección del login de chef.
