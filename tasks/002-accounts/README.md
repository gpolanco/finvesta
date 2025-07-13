# Task 002: Cuentas y Transacciones - Finvesta

## 🎯 Objetivo General

Implementar la gestión completa de cuentas financieras y transacciones del usuario, permitiendo visualizar, crear, editar y eliminar cuentas y movimientos, con validaciones y feedback inmediato.

## ⏱️ Estimación Total: 4-5 horas

## 📊 Estado del Progreso

### ✅ Completado

- **002-1**: Modelo de cuentas financieras (45 min) ✅
- **002-2**: CRUD de transacciones (60 min) ✅
- **002-3**: **Sistema de categorías (45 min)** ✅ **COMPLETADO**
- **002-X**: **Centralización de tipos (60 min)** ✅ **COMPLETADO ADICIONAL**
- **Refactor**: Integración con patrones establecidos ✅

### 🔄 Próximo

- **002-4**: Edición y baja de cuentas (30 min) ← **SIGUIENTE**

### 📋 Pendiente

- **002-5**: Filtros y búsqueda (30 min)
- **002-6**: Validaciones y feedback (30 min)

### 🎯 Logros Adicionales ✅

- **✅ Centralización de tipos**: Account types y currency types centralizados
- **✅ English-first development**: Toda la UI traducida a inglés
- **✅ Visual consistency**: Colores e iconos centralizados
- **✅ Funciones utilitarias**: Type-safe utilities para manipulación de tipos
- **✅ Refactorización**: Transactions como feature separado
- **✅ Patrones**: Implementación de nuevos patrones de UI
- **✅ Rutas**: Sistema de rutas centralizado
- **✅ Formateadores**: Utilidades personalizadas con Intl API
- **✅ UX**: Patrón EmptyContent con children
- **✅ Responsive**: UI mobile-first y accesible
- **✅ Arquitectura**: Domain-based con useOptimistic establecido

## 📋 Subtasks (En orden estricto)

### 002-1: Modelo de cuentas financieras ✅

**⏱️ 45 min**

- Consultar y mostrar todas las cuentas del usuario (bancos, cripto, inversiones, etc.)
- Crear componente de lista de cuentas (`AccountList`)
- Mostrar nombre, tipo, proveedor y saldo de cada cuenta
- UI responsive y accesible (mobile-first)
- Usar tipos TypeScript de `src/types/database.ts`
- Pruebas unitarias mínimas (render, edge, error)

#### ✅ Criterios de éxito:

- [x] Consulta de cuentas desde Supabase
- [x] Lista de cuentas con datos reales
- [x] Mostrar tipo, proveedor y saldo
- [x] UI responsive y accesible
- [x] TypeScript sin warnings
- [x] Sin errores en consola
- [x] Pruebas unitarias mínimas

---

### 002-2: CRUD de transacciones ✅

**⏱️ 60 min**

- Crear formulario para registrar nuevas transacciones (`TransactionForm`)
- Validar con Zod y react-hook-form
- Permitir alta, edición y borrado de transacciones
- Mostrar lista de transacciones por cuenta
- Feedback inmediato (toast, loading, error)
- Validar registro <10s

#### ✅ Criterios de éxito:

- [x] Formulario de transacción funcional
- [x] Validaciones Zod y react-hook-form
- [x] Alta, edición y borrado funcionando
- [x] Lista de transacciones por cuenta
- [x] Feedback inmediato en UI
- [x] Registro <10s
- [x] Pruebas unitarias mínimas

---

### 002-3: Sistema de categorías ✅

**⏱️ 45 min**

- Mostrar y gestionar categorías de ingresos, gastos e inversión
- Permitir crear, editar y eliminar categorías personalizadas
- Asignar color y tipo a cada categoría
- Validar que las categorías por defecto no se puedan borrar
- UI accesible y mobile-first

#### ✅ Criterios de éxito:

- [x] Lista de categorías por tipo
- [x] Alta, edición y borrado de categorías personalizadas
- [x] No se pueden borrar categorías por defecto
- [x] Asignación de color y tipo
- [x] UI accesible y responsive
- [x] **Patrones arquitectónicos establecidos** (useOptimistic, FormDialog, etc.)
- [x] Pruebas unitarias mínimas

---

### 🆕 002-X: Centralización de Tipos ✅

**⏱️ 60 min** - **SUBTASK ADICIONAL COMPLETADO**

- Centralizar account types y currency types en `features/shared/types/`
- Traducir toda la aplicación a inglés (English-first development)
- Centralizar colores e iconos para account types
- Crear funciones utilitarias type-safe
- Eliminar hardcoding en toda la aplicación

#### ✅ Criterios de éxito:

- [x] Account types centralizados con constantes, schemas, colores e iconos
- [x] Currency types separados en archivo independiente
- [x] Traducción completa a inglés (UI, validaciones, labels)
- [x] Colores e iconos centralizados por tipo de cuenta
- [x] Funciones utilitarias: `getAccountTypeColors()`, `getAccountTypeIcon()`, etc.
- [x] Eliminación de hardcoding en toda la aplicación
- [x] Type safety con schemas Zod centralizados

#### 🎨 **Mapeo de Colores Centralizados**:

```
BANK:       blue   (Banknote icon)
CRYPTO:     yellow (Bitcoin icon)
INVESTMENT: green  (PiggyBank icon)
SAVINGS:    purple (Wallet icon)
CASH:       gray   (CreditCard icon)
```

---

### 002-4: Edición y baja de cuentas

**⏱️ 30 min**

- Permitir editar nombre, tipo y proveedor de cuentas
- Permitir desactivar/borrar cuentas (soft delete)
- Validar que no se pueda borrar una cuenta con saldo >0
- Feedback inmediato en UI
- **Aplicar patrones establecidos** (useOptimistic, FormDialog, etc.)
- **Usar tipos centralizados** de account-types.ts

#### ✅ Criterios de éxito:

- [ ] Edición de cuentas funcional
- [ ] Baja/desactivación de cuentas
- [ ] No se puede borrar cuenta con saldo >0
- [ ] Feedback inmediato
- [ ] Usar funciones centralizadas para colores e iconos
- [ ] Pruebas unitarias mínimas

---

### 002-5: Filtros y búsqueda en transacciones

**⏱️ 30 min**

- Permitir filtrar transacciones por cuenta, tipo, categoría y fecha
- Implementar búsqueda por descripción
- UI rápida y sin recargas

#### ✅ Criterios de éxito:

- [ ] Filtros funcionales por cuenta, tipo, categoría y fecha
- [ ] Búsqueda por descripción
- [ ] UI rápida y sin recargas
- [ ] Pruebas unitarias mínimas

---

### 002-6: Validaciones y feedback financiero

**⏱️ 30 min**

- Validar que los movimientos respetan reglas de negocio (no saldo negativo, etc.)
- Mostrar alertas si se exceden límites (ej: cripto >15%, liquidez >20k€)
- Feedback visual inmediato (toast, banners, etc.)

#### ✅ Criterios de éxito:

- [ ] Validaciones de negocio implementadas
- [ ] Alertas automáticas en UI
- [ ] Feedback visual inmediato
- [ ] Pruebas unitarias mínimas

---

## 🏗️ **Patrones Arquitectónicos Establecidos**

### **✅ Patrones Completados - Para replicar en próximas features:**

1. **🔧 Centralized Types** (`features/shared/types/`)

   - Constantes, schemas Zod, opciones de formulario
   - Colores e iconos centralizados con funciones utilitarias
   - English-first development establecido
   - Type-safe utilities para manipulación

2. **📂 Domain-based organization** (`/features/{domain}/components|actions|services|lib`)

3. **🔧 Services con ServiceBaseResponse** (nunca lanzan excepciones)

4. **🚀 Server actions limpios** (sin try-catch redundante)

5. **⚡ useOptimistic** para create/update (UX sin flicker)

6. **🗑️ Delete con confirmación** clara (sin optimistic)

7. **📝 FormDialog reutilizable** + react-hook-form + zod

8. **🔄 useTransition** + Toast notifications para feedback

9. **⚖️ Client/Server balance** (páginas server, listas client cuando necesario)

---

## ✅ Criterios de Éxito Globales

- [x] Gestión completa de cuentas y transacciones
- [x] **Tipos centralizados y English-first development** ✅
- [x] **Visual consistency con colores e iconos centralizados** ✅
- [x] UI responsive y accesible
- [ ] Validaciones y feedback financiero
- [x] TypeScript sin warnings
- [x] Sin errores en consola
- [x] Pruebas unitarias para cada subtask

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos

---

## 📝 Commit

```bash
git add .
git commit -m "feat(accounts): implementa Task 002 - cuentas y transacciones

- Modelo de cuentas financieras y CRUD de transacciones
- Sistema de categorías y centralización de tipos
- Account types y currency types centralizados
- English-first development establecido
- Colores e iconos centralizados con funciones utilitarias
- UI responsive y feedback inmediato
- Pruebas unitarias para cada subtask

Refs: tasks/002-accounts/README.md
Don't forget to commit!"
```
