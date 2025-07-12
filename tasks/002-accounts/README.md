# Task 002: Cuentas y Transacciones - Finvesta

## 🎯 Objetivo General

Implementar la gestión completa de cuentas financieras y transacciones del usuario, permitiendo visualizar, crear, editar y eliminar cuentas y movimientos, con validaciones y feedback inmediato.

## ⏱️ Estimación Total: 4-5 horas

## 📋 Subtasks (En orden estricto)

### 002-1: Modelo de cuentas financieras

**⏱️ 45 min**

- Consultar y mostrar todas las cuentas del usuario (bancos, cripto, inversiones, etc.)
- Crear componente de lista de cuentas (`AccountList`)
- Mostrar nombre, tipo, proveedor y saldo de cada cuenta
- UI responsive y accesible (mobile-first)
- Usar tipos TypeScript de `src/types/database.ts`
- Pruebas unitarias mínimas (render, edge, error)

#### ✅ Criterios de éxito:

- [ ] Consulta de cuentas desde Supabase
- [ ] Lista de cuentas con datos reales
- [ ] Mostrar tipo, proveedor y saldo
- [ ] UI responsive y accesible
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias mínimas

---

### 002-2: CRUD de transacciones

**⏱️ 60 min**

- Crear formulario para registrar nuevas transacciones (`TransactionForm`)
- Validar con Zod y react-hook-form
- Permitir alta, edición y borrado de transacciones
- Mostrar lista de transacciones por cuenta
- Feedback inmediato (toast, loading, error)
- Validar registro <10s

#### ✅ Criterios de éxito:

- [ ] Formulario de transacción funcional
- [ ] Validaciones Zod y react-hook-form
- [ ] Alta, edición y borrado funcionando
- [ ] Lista de transacciones por cuenta
- [ ] Feedback inmediato en UI
- [ ] Registro <10s
- [ ] Pruebas unitarias mínimas

---

### 002-3: Sistema de categorías

**⏱️ 45 min**

- Mostrar y gestionar categorías de ingresos, gastos e inversión
- Permitir crear, editar y eliminar categorías personalizadas
- Asignar color y tipo a cada categoría
- Validar que las categorías por defecto no se puedan borrar
- UI accesible y mobile-first

#### ✅ Criterios de éxito:

- [ ] Lista de categorías por tipo
- [ ] Alta, edición y borrado de categorías personalizadas
- [ ] No se pueden borrar categorías por defecto
- [ ] Asignación de color y tipo
- [ ] UI accesible y responsive
- [ ] Pruebas unitarias mínimas

---

### 002-4: Edición y baja de cuentas

**⏱️ 30 min**

- Permitir editar nombre, tipo y proveedor de cuentas
- Permitir desactivar/borrar cuentas (soft delete)
- Validar que no se pueda borrar una cuenta con saldo >0
- Feedback inmediato en UI

#### ✅ Criterios de éxito:

- [ ] Edición de cuentas funcional
- [ ] Baja/desactivación de cuentas
- [ ] No se puede borrar cuenta con saldo >0
- [ ] Feedback inmediato
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

## ✅ Criterios de Éxito Globales

- [ ] Gestión completa de cuentas y transacciones
- [ ] UI responsive y accesible
- [ ] Validaciones y feedback financiero
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias para cada subtask

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
- Sistema de categorías y validaciones de negocio
- UI responsive y feedback inmediato
- Pruebas unitarias para cada subtask

Refs: tasks/002-accounts/README.md
Don't forget to commit!"
```
