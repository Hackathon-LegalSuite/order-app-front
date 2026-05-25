# Feature: productclient

Catálogo de platos disponibles para el cliente. Permite explorar el menú por categoría, añadir platos al carrito con o sin ingredientes excluidos, y visualizar el resultado de la sugerencia de IA cuando está activa (reordenando los platos sugeridos al tope de la lista).

---

## Archivos

### `types/products.types.ts`

Define los contratos de datos del catálogo de productos.

| Tipo | Descripción |
|---|---|
| `Ingredient` | Ingrediente de un plato: `{ id, label, required }` — nomenclatura en inglés para uso interno |
| `Product` | Plato del menú: `{ id, name, price, category, img, ingredients }` |

> Los campos están en inglés (`name`, `price`, `label`, `required`) porque son el modelo interno de la app. El servicio los mapea desde la respuesta en español del backend.

---

### `services/productsService.ts`

Capa de comunicación con el backend para el catálogo de platos. Mapea la respuesta del backend (campos en español) al modelo interno de la app (campos en inglés).

#### `fetchProducts(): Promise<Product[]>`
Hace `GET /platos` y retorna todos los platos del menú, mapeados con `toProduct`.

#### `fetchProductsByCategory(category: Category): Promise<Product[]>`
Hace `GET /platos/categoria/:category` y retorna los platos de esa categoría.

**Funciones de mapeo internas:**

| Función | Descripción |
|---|---|
| `toIngredient(i: ApiIngredient)` | Convierte `{ id, nombre, obligatorio }` → `{ id, label, required }` |
| `toProduct(p: ApiProduct)` | Convierte los campos en español del API al modelo `Product` interno |

---

### `store/productsStore.ts`

Store global (Zustand) que cachea el catálogo de productos durante la sesión.

| Campo | Tipo | Descripción |
|---|---|---|
| `products` | `Product[]` | Lista cacheada de todos los platos |
| `status` | `'idle'` \| `'loading'` \| `'success'` \| `'error'` | Estado de la carga |
| `error` | `string \| null` | Mensaje de error si la carga falló |

**Acciones:**

| Acción | Descripción |
|---|---|
| `setProducts(products)` | Guarda los productos y pone `status` en `'success'` |
| `setStatus(status, error?)` | Actualiza el estado y opcionalmente el mensaje de error |

---

### `hooks/useProducts.ts`

Hook que carga los productos al montar el componente, usando el store como caché para evitar peticiones repetidas durante la sesma sesión.

#### `useProducts()`
Retorna `{ products, status, error }`.

**Comportamiento:**
- Si `status` ya no es `'idle'` (la carga ya ocurrió o está en curso), no lanza una nueva petición.
- Solo carga una vez por sesión gracias al guard `if (status !== 'idle') return`.

---

### `components/ListProductClient.tsx`

Lista todos los platos del catálogo con soporte para el modo de sugerencia IA.

**Comportamiento normal:**
- Muestra todos los productos en su orden original.
- Al tocar un producto abre `EditProduct` (en modo default) donde el cliente puede seleccionar ingredientes a excluir antes de añadir al carrito.

**Comportamiento con IA activa (`iaStore.active === true`):**
- Muestra un banner superior con el mensaje de la IA y un botón `X` para limpiar la sugerencia.
- Reordena la lista poniendo primero los platos cuyos IDs están en `suggestedIds`.
- Las tarjetas de platos sugeridos reciben la prop `isIa={true}` para mostrarse con un indicador visual diferenciado.
- Al abrir `EditProduct` de un plato sugerido, pasa `iaExcludedIds` para que los ingredientes que la IA recomienda excluir aparezcan preseleccionados.

---

### `components/PageProductsClient.tsx`

Página principal del catálogo para el cliente.

**Composición:**
- `HeaderProducts` — encabezado con nombre de la mesa y acceso a IA.
- `ComponentFilter` — filtro de categorías.
- `ListProductClient` — listado de platos.
- Botón fijo en la parte inferior que navega a `/init/:idmesa/order` (carrito + pedidos).
