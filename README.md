# Arquitectura Scope-Based
> frontend de plataforma para automatuzar la gestion de pedidos de un restaurante

---

# Tegnologias

| Categoría       | Tecnología                                 |
| --------------- | ------------------------------------------ |
| Framework       | React 19 + TypeScript 5.9                  |
| Build tool      | Vite 8                                     |
| Estilos         | Tailwind CSS v4 (via `@tailwindcss/vite`)  |
| Tipografía      | Poppins                                    |
| Iconos          | lucide-react                               |
| Estado global   | Zustand                                    |
| Routing         | React Router v7                            |
| HTTP            | Axios                                      |
| Lint / Format   | ESLint 9 + Prettier                        |
| Package manager | pnpm                                       |
| Despliegue      | Vercel                                     |


---

# Estructura del Proyecto

```txt
├── docs/
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── providers/
│   │   ├── router/
│   │   ├── store/
│   │   └── layouts/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── animations/
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── overlays/
│   │   │
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── lib/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── schemas/
│   │   └── styles/
│   │
│   ├── features/
│   │   │
│   │   ├── products/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── schemas/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── constants/
│
│   ├── styles/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env
├── .env.development
├── .env.production
│
├── eslint.config.js
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── package.json
```

---

## Variables de entorno

| Variable       | Descripción                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL` | URL base de la API consumida por el cliente HTTP de la aplicación         |


---

## Scripts disponibles

### Inicializar el proyecto

```bash
pnpm install
pnpm run dev
```

---

## Alias de imports

> Recomendación: usa aliases para evitar imports relativos largos.

| Alias           | Ruta                                |
| --------------- | ----------------------------------- |
| `@/*`           | `src/*`                             |
| `@app/*`        | `src/app/*`                         |
| `@router/*`     | `src/app/router/*`                  |
| `@store/*`      | `src/app/store/*`                   |
| `@layouts/*`    | `src/app/layouts/*`                 |
| `@providers/*`  | `src/app/providers/*`               |
| `@features/*`   | `src/features/*`                    |
| `@assets/*`     | `src/assets/*`                      |
| `@shared/*`     | `src/shared/*`                      |
| `@components/*` | `src/shared/components/*`           |
| `@ui/*`         | `src/shared/components/ui/*`        |
| `@overlays/*`   | `src/shared/components/overlays/*`  |
| `@hooks/*`      | `src/shared/hooks/*`                |
| `@types/*`      | `src/shared/types/*`                |
| `@utils/*`      | `src/shared/utils/*`                |
| `@lib/*`        | `src/shared/lib/*`                  |
| `@constants/*`  | `src/shared/constants/*`            |
| `@schemas/*`    | `src/shared/schemas/*`              |
| `@styles/*`     | `src/styles/*`                      |

```typescript
// Correcto
import { AppRouter } from '@router/AppRouter.tsx'
import { useProductList } from '@features/products/hooks/useProductList.ts'
```

---

## Convenciones de naming

| Tipo        | Convención                  | Ejemplo           |
| ----------- | --------------------------- | ----------------- |
| Componentes | PascalCase                  | `CaseCard.tsx`    |
| Hooks       | camelCase con prefijo `use` | `useCaseList.ts`  |
| Servicios   | camelCase                   | `casesService.ts` |
| Slices      | camelCase                   | `casesSlice.ts`   |
| Tipos       | PascalCase + `.types.ts`    | `Case.types.ts`   |
| Utilidades  | camelCase                   | `formatDate.ts`   |

---
