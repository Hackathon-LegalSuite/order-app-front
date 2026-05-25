# src/services

Capa de infraestructura HTTP. Exporta las instancias de Axios configuradas que usan todos los servicios de las features. No contiene lógica de negocio.

---

## Archivos

### `http.ts`

Crea y exporta dos instancias de Axios, cada una con su propio interceptor de autenticación.

**URL base:** `/api` — resuelto por el proxy de Vite en desarrollo hacia `https://order-app-back.onrender.com`. En producción Vercel maneja el rewrite mediante `vercel.json`.

---

#### `http` — instancia del cliente

```ts
import { http } from '@services/http.ts'
```

Usada por todas las features del flujo de cliente: `loginclient`, `ordersclient`, `productclient` e `ia`.

El interceptor inyecta automáticamente el token del cliente en cada petición:
```
Authorization: Bearer <clientAuthStore.auth.token>
```

---

#### `httpChef` — instancia del chef/mesero

```ts
import { httpChef } from '@services/http.ts'
```

Usada exclusivamente por `orderchef`.

El interceptor inyecta el token del chef:
```
Authorization: Bearer <chefAuthStore.auth.token>
```

---

#### `attachToken(token, config)` — función auxiliar interna

Añade el header `Authorization` a la configuración de la petición. Si el token es `undefined` (sesión no iniciada), devuelve la config sin modificar. Crea una instancia de `AxiosHeaders` si los headers no son del tipo correcto.

---

> Ambas instancias leen el token en el momento de cada petición usando `.getState()` directamente desde los stores de Zustand, sin necesidad de hooks ni suscripciones, ya que los interceptores corren fuera del árbol de React.
