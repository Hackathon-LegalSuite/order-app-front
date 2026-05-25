# Feature: ia

Sugerencia de platos mediante inteligencia artificial. El cliente describe en lenguaje natural lo que desea comer y la IA devuelve una lista de platos recomendados junto con ingredientes a excluir. El resultado se persiste en el store global para que la pantalla de productos lo consuma y reordene su listado.

---

## Archivos

### `types/ia.types.ts`

Define los contratos de datos que circulan entre el servicio y el store.

| Tipo | Descripción |
|---|---|
| `IaRequest` | Cuerpo de la petición al backend: `{ prompt: string }` |
| `IaResponse` | Respuesta del backend: mensaje, lista de platos sugeridos y lista de ingredientes a excluir |
| `IaPlato` | Plato individual dentro de la respuesta: id, nombre, descripción, precio, categoría, imagen e ingredientes |
| `IaIngrediente` | Ingrediente a excluir: `{ id, nombre }` |
| `IaIngredientePlato` | Ingrediente de un plato: `{ id, nombre, obligatorio }` |

---

### `services/iaService.ts`

Capa de comunicación con el backend para la funcionalidad de IA.

#### `buscarPorPrompt(prompt: string): Promise<IaResponse>`
Envía el texto escrito por el usuario al endpoint `POST /menu/buscar` y retorna la respuesta con platos sugeridos e ingredientes a excluir.

---

### `store/iaStore.ts`

Store global (Zustand) que mantiene el resultado de la última sugerencia de IA activa.

| Campo | Tipo | Descripción |
|---|---|---|
| `active` | `boolean` | Indica si hay una sugerencia IA activa para mostrar en productos |
| `suggestedIds` | `number[]` | IDs de los platos sugeridos por la IA |
| `excludedIngredientIds` | `number[]` | IDs de ingredientes que la IA recomienda excluir |
| `mensaje` | `string` | Texto explicativo de la sugerencia para mostrar al usuario |

**Acciones:**

| Acción | Descripción |
|---|---|
| `setResult(suggestedIds, excludedIngredientIds, mensaje)` | Persiste el resultado de la IA y activa el estado `active: true` |
| `clear()` | Limpia el estado y desactiva la sugerencia |

---

### `components/FormIa.tsx`

Formulario principal de la pantalla de sugerencia IA.

**Comportamiento:**
- Muestra un grid de sugerencias rápidas predefinidas (11 opciones con emoji) que al pulsarlas precargan el textarea.
- El textarea se auto-redimensiona hasta un máximo de 140 px según el contenido.
- Al enviar (botón o `Enter` sin `Shift`), llama a `buscarPorPrompt`, guarda el resultado en `iaStore` y navega a `/init/:idmesa/products`.
- Mientras la petición está en curso muestra un spinner en el botón de envío y deshabilita el textarea.
- Si la API no devuelve platos muestra el mensaje `"No se encontraron resultados con lo que pediste."`.

**Funciones internas:**

| Función | Descripción |
|---|---|
| `submit()` | Llama al servicio, guarda el resultado en el store y navega a productos |
| `handleSubmit(e)` | Wrapper para el evento `onSubmit` del formulario |
| `handleKeyDown(e)` | Permite enviar con `Enter` (sin `Shift`) desde el textarea |

---

### `components/PageIa.tsx`

Página contenedora de la feature. Incluye un header con botón de retroceso que navega de vuelta a la pantalla de productos de la mesa actual, y monta `FormIa` dentro del layout de cliente.
