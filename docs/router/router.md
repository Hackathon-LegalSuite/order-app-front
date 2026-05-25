# src/router

Configuración de rutas de la aplicación y guardias de autenticación. Define las rutas públicas y protegidas para los dos flujos de usuario: **cliente** (por mesa) y **chef/mesero** (por credenciales).

---

## Archivos

### `AppRouter.tsx`

Componente raíz del enrutador. Monta un `BrowserRouter` y declara toda la tabla de rutas de la aplicación.

**Mapa de rutas:**

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | Redirect → `/loginchef` | Público |
| `/loginchef` | `PageLoginChef` | Público — si ya está autenticado como chef redirige a `/orderchef` |
| `/orderchef` | `PageOrderChef` | Protegida por `ChefAuthGuard` |
| `/orderchef/entregas` | `PageOrderChef` | Protegida por `ChefAuthGuard` |
| `/init` | `PageLoginClient` | Público |
| `/init/:idmesa` | `PageLoginClient` | Público |
| `/init/:idmesa/order` | Redirect → `car` | Protegida por `ClientAuthGuard` |
| `/init/:idmesa/order/car` | `PageOrderClient` | Protegida por `ClientAuthGuard` |
| `/init/:idmesa/order/products` | `PageOrderClient` | Protegida por `ClientAuthGuard` |
| `/init/:idmesa/products` | `PageProductsClient` | Protegida por `ClientAuthGuard` |
| `/init/:idmesa/ia` | `PageIa` | Protegida por `ClientAuthGuard` |
| `*` | Redirect → `/loginchef` | Catch-all |

> La verificación de sesión activa del chef (`selectChefIsValid`) se evalúa directamente en `AppRouter` para manejar la redirección del `/loginchef` sin montar el componente del formulario innecesariamente.

---

### `ChefAuthGuard.tsx`

Guard de ruta para las páginas del chef/mesero. Actúa como un `<Outlet />` protegido que verifica sesión activa y programa el logout automático al vencer el token.

**Lógica:**
1. Si no hay sesión válida (`selectChefIsValid` = false), redirige a `/loginchef`.
2. Si hay sesión, calcula el tiempo restante (`auth.expiresAt - Date.now()`) y programa un `setTimeout` que ejecuta `logout()` y navega a `/loginchef` exactamente cuando vence el token.
3. El timeout se limpia al desmontar o cuando cambia `auth`, evitando fugas de memoria.

---

### `ClientAuthGuard.tsx`

Guard de ruta para las páginas del cliente. Verifica que la sesión sea válida **y** que pertenezca a la mesa que figura en la URL (`:idmesa`).

**Lógica:**
1. Si el `mesaId` de la URL no es un número finito, redirige a `/init`.
2. Si existe sesión pero el `auth.mesaId` no coincide con el `:idmesa` de la URL (el cliente escaneó el QR de otra mesa), hace `logout()` y redirige.
3. Si la sesión es válida y la mesa coincide, programa el logout automático al vencer el token, igual que `ChefAuthGuard`.
4. Si no está autorizado, redirige a `/init`.
