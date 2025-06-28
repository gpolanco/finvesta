# 🗺️ Sistema de Rutas de Finvesta

## 📋 Arquitectura

El sistema de rutas está organizado de forma **modular y tipada**, donde cada feature define sus propias rutas y luego se centralizan en un archivo principal.

### 🏗️ Estructura

```
src/features/
├── shared/
│   └── types/
│       └── route-type.ts      # Tipos base para rutas
├── auth/
│   └── routes.ts              # Rutas de autenticación
├── dashboard/
│   └── routes.ts              # Rutas del dashboard
├── accounts/
│   └── routes.ts              # Rutas de cuentas
└── routes.ts                  # Archivo principal centralizado
```

## 🔧 Tipos de Rutas

### BaseRoute

Para rutas estáticas simples:

```typescript
export interface BaseRoute {
  path: string; // "/accounts"
  title: string; // "Mis Cuentas - Finvesta"
  description: string; // "Gestiona tus cuentas bancarias..."
}
```

### DynamicRoute

Para rutas con parámetros:

```typescript
export interface DynamicRoute<T extends Record<string, string | number>>
  extends BaseRoute {
  generatePath: (params: T) => string;
}
```

## 📝 Cómo Crear Rutas por Feature

### 1. Crear archivo `routes.ts` en tu feature:

```typescript
// src/features/tu-feature/routes.ts
import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

export const tuFeatureRoutes = {
  list: {
    path: "/tu-feature",
    title: "Lista - Finvesta",
    description: "Descripción SEO-friendly",
  } as BaseRoute,

  detail: {
    path: "/tu-feature/:id",
    title: "Detalle - Finvesta",
    description: "Ver detalles específicos",
    generatePath: (params: { id: string }) => `/tu-feature/${params.id}`,
  } as DynamicRoute<{ id: string }>,
} as const;
```

### 2. Importar en el archivo principal:

```typescript
// src/features/routes.ts
import { tuFeatureRoutes } from "@/features/tu-feature/routes";

export const appRoutes = {
  // ... otras rutas
  tuFeature: tuFeatureRoutes,
} as const;
```

## 🎯 Uso en Componentes

### Navegación simple:

```typescript
import { appRoutes } from "@/features/routes";

// Usar en Link o navigate
<Link href={appRoutes.accounts.list.path}>Mis Cuentas</Link>;
```

### Navegación dinámica:

```typescript
import { appRoutes } from "@/features/routes";

// Generar URL con parámetros
const accountUrl = appRoutes.accounts.detail.generatePath({ id: "123" });
<Link href={accountUrl}>Ver Cuenta</Link>;
```

### Metadata para páginas:

```typescript
import { getMetadata, appRoutes } from "@/features/routes";

export const metadata = getMetadata(appRoutes.accounts.list);
// Resultado: { title: "Mis Cuentas - Finvesta", description: "..." }
```

## 🌟 Beneficios

- **✅ Type Safety**: Autocompletado y validación de TypeScript
- **✅ Centralizado**: Todas las rutas en un lugar
- **✅ Modular**: Cada feature gestiona sus propias rutas
- **✅ SEO**: Títulos y descripciones consistentes
- **✅ Mantenible**: Cambios localizados por feature
- **✅ Reutilizable**: Helpers para metadata y navegación

## 🛠️ Helpers Disponibles

```typescript
import {
  appRoutes, // Todas las rutas organizadas
  getMetadata, // Metadata para Next.js
  getAllRoutes, // Array plano de todas las rutas
} from "@/features/routes";
```

## 📋 Convenciones

### Títulos

- Formato: `"[Sección] - Finvesta"`
- Ejemplo: `"Mis Cuentas - Finvesta"`

### Descripciones

- SEO-friendly y descriptivo
- Mencionar funcionalidad específica
- Incluir keywords relevantes (patrimonio, cripto, finanzas, etc.)

### Paths

- Usar kebab-case: `/my-accounts`
- Parámetros con `:` notation: `/accounts/:id`
- Coherentes con la jerarquía del feature

---

🎯 **Este sistema asegura rutas consistentes, tipadas y mantenibles en toda la aplicación.**
