# src/assets

Recursos estáticos del proyecto: imágenes e íconos importados directamente en los componentes mediante los alias de Vite.

---

## Estructura

```
assets/
├── images/
│   ├── meseros.png   # Ilustración de meseros usada en los formularios de login
│   └── name.png      # Logotipo en texto del restaurante (usado en HeaderProducts)
└── icons/
    └── (vacío)
```

---

## Uso

Los archivos se importan con el alias `@assets`:

```ts
import meseros from '@assets/images/meseros.png'
import name from '@assets/images/name.png'
```

> El ícono de la aplicación (`favicon`) se encuentra en `public/` como `logo.png`, no en `assets/`, porque debe ser accesible por URL directa (`/logo.png`) sin pasar por el bundler.
