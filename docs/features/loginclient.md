# Feature: loginclient

Autenticación del cliente en su mesa. El cliente ingresa su nombre y el código de su mesa (obtenido del QR físico de la mesa). Si la ruta ya trae el `idmesa` como parámetro de URL (acceso vía QR), el campo de número de mesa se oculta. Al autenticarse limpia el carrito anterior y persiste la sesión en `clientAuthStore`.

---

## Archivos

### `types/clientAuth.types.ts`

Define los contratos de datos de autenticación del cliente.

| Tipo | Descripción |
|---|---|
| `ClientAuthRequest` | Cuerpo enviado al backend: `{ nombre, codigoMesa }` |
| `ClientAuthResponse` | Respuesta cruda del backend: `{ nombre, rol, token, mesaId?, expiresIn? }` |
| `ClientAuthData` | Extiende `ClientAuthResponse` garantizando `mesaId: number` y añadiendo `expiresAt: number` (timestamp de expiración) |

---

### `services/clientAuth.ts`

Capa de comunicación con el backend para login del cliente.

#### `loginClient(mesaId: number, requestBody: ClientAuthRequest): Promise<ClientAuthData>`
Envía `POST /auth/cliente/:mesaId` con `{ nombre, codigoMesa }`. Parsea el campo `expiresIn` de la respuesta (formato `"Xs"`, `"Xm"`, `"Xh"` o `"Xd"`) y lo convierte a un timestamp absoluto.

**Función auxiliar interna:**

| Función | Descripción |
|---|---|
| `parseExpiresInMs(value?)` | Convierte strings tipo `"6h"`, `"30m"`, `"1d"` a milisegundos. Si el formato no coincide, usa fallback de 6 horas. |

---

### `hooks/useClientAuth.ts`

Hook que expone la acción de login del cliente y el estado de autenticación.

#### `useClientAuth()`
Retorna `{ status, error, login }`.

| Retorno | Descripción |
|---|---|
| `status` | Estado de la petición: `'idle'`, `'loading'`, `'error'` |
| `error` | Mensaje de error de la respuesta o del objeto `Error` |
| `login(mesaId, payload)` | Llama a `loginClient`, limpia el carrito con `cartStore.clearCart()`, persiste la sesión en `clientAuthStore` y retorna los datos o `null` si falla |

> Limpia el carrito al iniciar sesión para evitar que ítems de una sesión anterior queden en el carrito de un nuevo cliente en la misma mesa.

---

### `components/FormLoginClient.tsx`

Formulario de login del cliente.

**Comportamiento:**
- Si la URL incluye `:idmesa` (escaneo de QR), oculta el campo "Número de mesa".
- Si no hay `:idmesa` en la URL (acceso manual), muestra un campo numérico para que el cliente ingrese el número de su mesa.
- Errores de backend se muestran como un `ComponentFloatingMessage` flotante que se auto-oculta a los 3 segundos.
- Al éxito navega a `/init/:mesaId/products`.

**Funciones internas:**

| Función | Descripción |
|---|---|
| `handleSubmit(event)` | Resuelve el `mesaId` (desde params o desde el input), valida que los campos no estén vacíos, llama a `login` y navega si es exitoso |

---

### `components/PageLoginClient.tsx`

Página contenedora del login del cliente. Verifica al montar si ya existe una sesión válida (`selectClientIsValid`) y en ese caso redirige directamente a la pantalla de productos de la mesa, evitando que el cliente vuelva a logarse innecesariamente.
