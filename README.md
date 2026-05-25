# order-app-front
> Frontend de plataforma para automatizar la gestión de pedidos de un restaurante

---

# Tecnologías

| Categoría       | Tecnología                                |
| --------------- | ----------------------------------------- |
| Framework       | React 19 + TypeScript 6                   |
| Build tool      | Vite 8                                    |
| Estilos         | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Tipografía      | Poppins                                   |
| Iconos          | lucide-react                              |
| Estado global   | Zustand                                   |
| Routing         | React Router v7                           |
| HTTP            | Axios                                     |
| Validación      | Zod                                       |
| Testing         | Vitest                                    |
| Lint            | ESLint 9                                  |
| Package manager | pnpm                                      |
| Despliegue      | Vercel                                    |

---

# Estructura del Proyecto

```txt
├── docs/
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── features/
│   │   ├── ia/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   └── types/
│   │   ├── loginchef/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── loginclient/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── orderchef/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── ordersclient/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── productclient/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── store/
│   │       └── types/
│   │
│   ├── router/
│   │   ├── AppRouter.tsx
│   │   ├── ChefAuthGuard.tsx
│   │   └── ClientAuthGuard.tsx
│   │
│   ├── services/
│   │   └── http.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── ui/
│   │   │   └── overlays/
│   │   └── types/
│   │
│   ├── store/
│   │   ├── cartStore.ts
│   │   ├── chefAuthStore.ts
│   │   └── clientAuthStore.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .env
│
├── eslint.config.js
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── package.json
```

---

## Variables de entorno

| Variable       | Descripción                                                       |
| -------------- | ----------------------------------------------------------------- |
| `VITE_API_URL` | URL base de la API consumida por el cliente HTTP de la aplicación |

---

## Scripts disponibles

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm run dev

# Build de producción
pnpm run build

# Vista previa del build
pnpm run preview

# Linting
pnpm run lint
```

---

## Alias de imports

| Alias           | Ruta                               |
| --------------- | ---------------------------------- |
| `@/*`           | `src/*`                            |
| `@router/*`     | `src/router/*`                     |
| `@store/*`      | `src/store/*`                      |
| `@features/*`   | `src/features/*`                   |
| `@assets/*`     | `src/assets/*`                     |
| `@shared/*`     | `src/shared/*`                     |
| `@components/*` | `src/shared/components/*`          |
| `@ui/*`         | `src/shared/components/ui/*`       |
| `@overlays/*`   | `src/shared/components/overlays/*` |
| `@hooks/*`      | `src/shared/hooks/*`               |
| `@types/*`      | `src/shared/types/*`               |
| `@utils/*`      | `src/shared/utils/*`               |
| `@services/*`   | `src/services/*`                   |

```typescript
// nodenext requiere extensión explícita en los imports
import AppRouter from '@router/AppRouter.tsx'
import { useProducts } from '@features/productclient/hooks/useProducts.ts'
```

---

## Convenciones de naming

| Tipo        | Convención                  | Ejemplo              |
| ----------- | --------------------------- | -------------------- |
| Componentes | PascalCase                  | `CardProduct.tsx`    |
| Hooks       | camelCase con prefijo `use` | `useProducts.ts`     |
| Servicios   | camelCase                   | `productsService.ts` |
| Stores      | camelCase + `Store`         | `cartStore.ts`       |
| Tipos       | PascalCase + `.types.ts`    | `order.types.ts`     |

---
