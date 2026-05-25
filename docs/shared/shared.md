# src/shared

Componentes, tipos y utilidades reutilizables entre features. No contiene lógica de negocio propia — todo lo que está aquí puede ser consumido por cualquier feature sin crear dependencias circulares.

---

## `shared/types/`

### `Categoy.types.ts`

Define las categorías de platos del menú y sus etiquetas en español.

| Exportación | Descripción |
|---|---|
| `Category` | Union type: `'PLATO_FUERTE'` \| `'ENTRADA'` \| `'BEBIDA'` \| `'POSTRE'` |
| `CATEGORY_LABEL` | Record que mapea cada `Category` a su texto legible: `'Plato Fuerte'`, `'Entrada'`, `'Bebida'`, `'Postre'` |

---

## `shared/components/layouts/`

### `ClientLayout.tsx`

Layout base para todas las páginas del flujo cliente. Centra el contenido horizontalmente con un ancho máximo configurable y aplica el fondo `bg-item` en los laterales.

**Props:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido de la página |
| `maxWidthClassName` | `string` | `'max-w-4xl'` | Clase Tailwind para el ancho máximo del contenedor interior |
| `contentClassName` | `string` | `''` | Clases adicionales para el contenedor interior |

---

## `shared/components/ui/`

Componentes de interfaz atómicos y de uso general.

---

### `ComponentButton.tsx`

Botón primario de ancho completo con soporte para icono, estado de carga y deshabilitado.

**Props principales:**

| Prop | Descripción |
|---|---|
| `text` | Texto del botón |
| `icon?` | Icono de `lucide-react` mostrado a la derecha (se oculta durante `loading`) |
| `color?` | Clase de color de fondo (default: `'bg-primary'`) |
| `loading?` | Muestra spinner y deshabilita el botón |

Extiende `ComponentPropsWithoutRef<'button'>`, por lo que acepta todos los atributos nativos de un `<button>`.

---

### `ComponentInput.tsx`

Campo de texto estilizado con label opcional e icono izquierdo.

**Props principales:**

| Prop | Descripción |
|---|---|
| `label?` | Texto del label sobre el input |
| `icon?` | Icono de `lucide-react` a la izquierda del input |
| `labelClassName?` | Clases adicionales para el label |
| `activeClassName?` | Clase del ring al enfocar (default: `'focus-within:ring-primary'`) |

Extiende `ComponentPropsWithoutRef<'input'>`, acepta todos los atributos nativos de un `<input>`.

---

### `CardProduct.tsx`

Tarjeta de producto reutilizable. Usada en el catálogo del cliente, el carrito y la lista de pedidos.

**Props:**

| Prop | Descripción |
|---|---|
| `name` | Nombre del plato |
| `price?` | Precio formateado con `Intl.NumberFormat('es-CO')` |
| `category?` | Categoría del plato — muestra un `ComponentTag` de color |
| `img` | URL de la imagen |
| `onClick?` | Callback al tocar la tarjeta |
| `isEdited?` | Muestra badge `"editado"` cuando el plato tiene ingredientes excluidos |
| `isIa?` | Muestra badge `"IA"` con icono de bot cuando el plato fue sugerido por la IA |
| `statusTag?` | Objeto `{ text, className }` para mostrar el estado del pedido (usado en `ListOrderClient`) |
| `onDelete?` | Si está presente, muestra un icono de papelera que abre `ModalDeleteProduct` antes de confirmar |

---

### `CardProductChef.tsx`

Tarjeta de ítem de pedido para el panel del chef/mesero. Muestra imagen, nombre, mesa, mesero, lista de ingredientes con disponibilidad visual y un botón de acción que avanza el estado.

**Props:**

| Prop | Descripción |
|---|---|
| `title` | Nombre del plato |
| `image?` | URL de la imagen |
| `table` | Número de mesa |
| `mesero?` | Nombre del mesero |
| `ingredients` | Array `{ name, available }` — los no disponibles (excluidos) se muestran tachados |
| `status?` | `'waiting'` \| `'in-progress'` \| `'ready'` \| `'done'` — controla el color y texto del botón |
| `loading?` | Muestra `"Actualizando..."` y deshabilita el botón |
| `flashing?` | Activa la animación `animate-flash-success` sobre la tarjeta (transición final de estado) |
| `onStatusChange?` | Callback al pulsar el botón de acción |

---

### `EditProduct.tsx`

Bottom sheet deslizante para editar los ingredientes de un plato antes de añadirlo al carrito, actualizar los de un ítem ya en el carrito, o visualizar los ingredientes de un pedido enviado.

**Modos (`mode`):**

| Modo | Comportamiento |
|---|---|
| `'add'` (default) | Permite excluir ingredientes y añade el plato al carrito al confirmar |
| `'order'` | Permite modificar los ingredientes excluidos de un ítem ya en el carrito. Muestra botón de eliminar. |
| `'view'` | Solo lectura — muestra los ingredientes con su estado de inclusión. Sin posibilidad de editar. |

**Props clave:**

| Prop | Descripción |
|---|---|
| `isOpen` | Controla visibilidad mediante transformación CSS (`translate-y-full` / `translate-y-0`) |
| `ingredients` | Lista de `Ingredient[]` del plato |
| `initialExcluded?` | IDs de ingredientes ya excluidos al abrir (para modos `order` y `view`) |
| `iaExcludedIds?` | IDs de ingredientes que la IA recomienda excluir — se preseleccionan en modo `add` y se marcan con badge `"sugerido por IA"` |
| `onConfirm?` | Callback en modo `order` con los IDs excluidos resultantes |
| `onDelete?` | Callback en modo `order` para eliminar el ítem del carrito |

**Regla de mínimo de ingredientes:** no se puede excluir un ingrediente si al hacerlo quedarían menos de 2 ingredientes incluidos en el plato.

---

### `HeaderChef.tsx`

Encabezado de navegación del panel chef/mesero. Muestra tabs filtradas según el rol del usuario autenticado.

| Rol | Tabs visibles |
|---|---|
| `COCINERO` | "Pendientes" |
| `MESERO` | "Entregas" |

Usa `NavLink` de React Router para resaltar la tab activa con `border-item text-item`.

---

### `HeaderProducts.tsx`

Encabezado del catálogo de productos del cliente. Muestra el logo del restaurante y el componente `ComponentCar` con el contador del carrito.

**Comportamiento:**
- Si la URL contiene `/order`, muestra un `ChevronLeft` para volver al catálogo.
- El logo es clickeable y navega a `/init/:idmesa/products`.
- La prop `showCart` (default: `true`) controla si se muestra el icono del carrito.

---

## `shared/components/overlays/`

Componentes que se superponen sobre el contenido principal.

---

### `ComponentCar.tsx`

Botón de acceso al carrito con contador animado. Al hacer clic navega a `/init/:idmesa/order`.

**Animaciones (definidas en `ComponentCar.css`):**
- `cart-pop`: el número del contador escala al actualizarse.
- `cart-ring`: un halo circular se expande y desvanece alrededor del contador.

---

### `ComponentCount.tsx`

Control de incremento/decremento numérico con botones `+` y `−`. Componente puramente presentacional — recibe `amount`, `onIncrement` y `onDecrement` como props.

---

### `ComponentFilter.tsx`

Barra de filtros de categoría del catálogo. Incluye las 4 categorías de platos más el acceso a la IA.

**Comportamiento:**
- Al seleccionar una categoría activa, llama a `fetchProductsByCategory` y actualiza el `productsStore` directamente.
- Al pulsar la misma categoría activa de nuevo, carga todos los productos (`fetchProducts`) y desactiva el filtro.
- El filtro `IA` navega a `/init/:idmesa/ia` en lugar de filtrar.

---

### `ComponentFloatingMessage.tsx`

Mensaje flotante de feedback posicionado en la parte superior central de su contenedor. Se auto-oculta si recibe `autoHideMs`.

**Variantes:**

| Variante | Estilo |
|---|---|
| `error` | Fondo rojo — `bg-danger/90` |
| `success` | Fondo verde — `bg-item` |
| `warning` | Fondo amarillo — `bg-warning/90` |
| `info` | Fondo oscuro — `bg-primary/90` |

---

### `ComponenTag.tsx`

Badge de categoría de plato con color por tipo.

| Categoría | Color |
|---|---|
| `ENTRADA` | Violeta |
| `BEBIDA` | Azul |
| `PLATO_FUERTE` | Naranja |
| `POSTRE` | Rosa |

---

### `ModalDeleteProduct.tsx`

Modal de confirmación de eliminación de un plato. Muestra un overlay oscuro y un dialog centrado con el nombre del plato y dos acciones: "No, mantener" y "Sí, Cancelar plato".
