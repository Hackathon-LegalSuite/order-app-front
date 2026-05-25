# Feature: loginchef

Autenticación del personal de cocina y sala (chef / mesero). Valida credenciales contra el backend, parsea el JWT para calcular su expiración y persiste los datos de sesión en `chefAuthStore`.

---

## Archivos

### `services/chefAuth.ts`

Capa de comunicación con el backend para login de chef/mesero.

#### `loginChef(requestBody: ChefAuthRequest): Promise<ChefAuthData>`
Envía `POST /auth/login` con `{ username, password }` (mapea los campos del formulario `usuario`/`contrasena` al contrato del backend). Retorna los datos de sesión incluyendo la expiración calculada del token.

**Función auxiliar interna:**

| Función | Descripción |
|---|---|
| `parseJwtExpiresAt(token)` | Decodifica el payload Base64 del JWT y extrae el campo `exp` (en segundos) convirtiéndolo a milisegundos epoch. Si el token es inválido o no trae `exp`, usa un fallback de 6 horas. |

**Tipos propios:**

| Tipo | Descripción |
|---|---|
| `ChefAuthRequest` | `{ usuario: string, contrasena: string }` — campos del formulario |
| `ChefAuthResponse` | Respuesta cruda del backend: `{ nombre, rol, token }` |

---

### `hooks/useChefAuth.ts`

Hook que expone la acción de login y el estado de autenticación al componente.

#### `useChefAuth()`
Retorna `{ status, error, login }`.

| Retorno | Descripción |
|---|---|
| `status` | Estado de la petición: `'idle'`, `'loading'`, `'error'` |
| `error` | Mensaje de error extraído de la respuesta Axios o del objeto `Error` |
| `login(payload)` | Llama a `loginChef`, persiste el resultado en `chefAuthStore` y retorna los datos de auth o `null` si falla |

---

### `components/FormLoginChef.tsx`

Formulario de login con validación en cliente mediante Zod.

**Schema de validación (`loginSchema`):**
- `usuario`: string no vacío
- `contrasena`: string no vacío

**Comportamiento:**
- Valida los campos antes de hacer la petición y muestra errores por campo debajo de cada input.
- Al éxito navega a `/orderchef` con `replace: true` para que no quede en el historial.
- Muestra `"Ingresando..."` en el botón mientras el status es `'loading'`.
- Errores de backend se muestran bajo el campo de contraseña.

**Funciones internas:**

| Función | Descripción |
|---|---|
| `handleSubmit(event)` | Valida con Zod, llama a `login` y navega si la autenticación es exitosa |

---

### `components/PageLoginChef.tsx`

Página contenedora del login de chef. Centra el formulario en pantalla completa sobre fondo `bg-background` y muestra el logo del restaurante sobre el formulario.
