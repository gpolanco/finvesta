# 🌱 Seed Data Feature

## 📋 Descripción

Esta feature proporciona herramientas de desarrollo para generar datos de ejemplo en Finvesta. **Solo debe usarse en desarrollo**.

## 🏗️ Estructura

```
src/features/seed/
├── actions/
│   ├── migrate-seed-data.ts         # Crear perfil + cuentas para usuario actual
│   └── get-all-accounts-debug.ts    # Obtener todas las cuentas (debug)
├── components/
│   └── seed-data-section.tsx        # Componente para mostrar datos de seed
└── README.md
```

## 🎯 Funcionalidades

### 1. Migración de Datos de Seed (`migrate-seed-data.ts`)

Crea datos de ejemplo para el usuario autenticado actual:

- **Perfil del usuario** con datos financieros de Finvesta:

  - Ingreso mensual: €3.730
  - Objetivo ahorro: €1.500
  - Max cripto: 15%
  - Max liquidez sin rentabilidad: €20.000

- **4 Cuentas financieras**:
  - Sabadell (banco): €12.000
  - BBVA (banco): €10.000
  - Binance (cripto): €10.000
  - Fidelity MSCI World (inversión): €2.500

**Total patrimonio:** €34.500

- 64% liquidez (€22.000) - ⚠️ Excede objetivo de €20.000
- 29% cripto (€10.000) - ⚠️ Excede objetivo del 15%
- 7% inversión (€2.500)

### 2. Debug de Cuentas (`get-all-accounts-debug.ts`)

Obtiene todas las cuentas sin filtrar por usuario. **Solo para debug**.

### 3. Componente de Visualización (`seed-data-section.tsx`)

Componente reutilizable para mostrar información de cuentas con variantes:

- `user`: Cuentas del usuario actual (verde)
- `all`: Todas las cuentas en BD (amarillo)

## 🚀 Uso

### Página de Seed Data

Acceder a `/seed` para:

- Ver estado actual del usuario y perfil
- Ver cuentas del usuario actual vs todas las cuentas
- Generar datos de ejemplo con un clic

### En Código

```typescript
import { migrateSeedDataToCurrentUser } from "@/features/seed/actions/migrate-seed-data";

// Crear datos de ejemplo para usuario actual
const result = await migrateSeedDataToCurrentUser();
```

## ⚠️ Importante

- **Solo usar en desarrollo**
- No exponer en producción
- Los datos generados son coherentes con el contexto financiero de Finvesta
- Útil para testing y demos

## 🔗 Relación con Finvesta

Los datos generados reflejan la situación financiera específica del usuario objetivo:

- Usuario de 45 años con €3.730/mes de ingreso
- Problema actual: demasiada liquidez sin rentabilidad y alto % en cripto
- Objetivo: optimizar distribución de activos hacia fondos indexados

Esto permite probar las alertas y KPIs con datos realistas.
