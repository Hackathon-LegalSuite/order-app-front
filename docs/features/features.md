# src/features

Módulos de funcionalidad organizados por dominio. Cada feature es autónoma: contiene sus propios componentes, hooks, servicios, store y tipos.

---

## Módulos

| Feature | Ruta principal | Rol | Documentación |
|---|---|---|---|
| `ia` | `/init/:idmesa/ia` | Cliente | [ia.md](ia.md) |
| `loginchef` | `/loginchef` | Chef / Mesero | [loginchef.md](loginchef.md) |
| `loginclient` | `/init/:idmesa` | Cliente | [loginclient.md](loginclient.md) |
| `orderchef` | `/orderchef` | Chef / Mesero | [orderchef.md](orderchef.md) |
| `ordersclient` | `/init/:idmesa/order/*` | Cliente | [ordersclient.md](ordersclient.md) |
| `productclient` | `/init/:idmesa/products` | Cliente | [productclient.md](productclient.md) |

---

## Estructura interna de cada feature

```
features/<nombre>/
  ├── components/   # Páginas y componentes específicos del dominio
  ├── hooks/        # Lógica con estado: peticiones, mutaciones, auth
  ├── services/     # Llamadas HTTP (usan las instancias de src/services/http.ts)
  ├── store/        # Store Zustand local del dominio (si aplica)
  └── types/        # Tipos TypeScript propios del dominio
```

No todas las features tienen todas las carpetas — solo las que necesitan.

---

## Convención de dependencias

- Una feature **puede** importar de `src/shared`, `src/store` y `src/services`.
- Una feature **no debe** importar de otra feature directamente.
- La comunicación entre features ocurre a través de los stores globales en `src/store`.

**Ejemplo:** `productclient` consume `iaStore` (de la feature `ia`) indirectamente a través del store en `src/store` — pero `iaStore` vive en `src/features/ia/store/iaStore.ts` y es importado directamente. Este es el único caso de dependencia cruzada entre features, justificado porque el store de IA es el canal de comunicación entre la búsqueda IA y el catálogo de productos.
