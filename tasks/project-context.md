# 🏗️ Finvesta - Contexto del Proyecto

## 📋 Estado Actual

**Proyecto**: Aplicación de gestión financiera personal  
**Stack**: Next.js 15 + React 19 + Supabase + TypeScript + TailwindCSS  
**Progreso**: Task 002 avanzada (70%) - Listo para edición de cuentas

## 💰 Contexto Financiero

- **Patrimonio objetivo**: 22.000€ liquidez + 10.000€ cripto
- **Ingresos**: 3.730€/mes
- **Ahorro objetivo**: 1.500€/mes
- **Gestión**: Cuentas bancarias, cripto, inversiones, ahorros, efectivo

## 🎯 **PATRONES OBLIGATORIOS** - No Retroceder

> ⚠️ **CRÍTICO**: Estos patrones están validados y DEBEN aplicarse en todas las nuevas features

### 🔧 **1. Centralized Types** (OBLIGATORIO)

```typescript
// ✅ SIEMPRE usar tipos centralizados
import {
  ACCOUNT_TYPES,
  getAccountTypeIcon,
  getAccountTypeColors,
} from "@/features/shared/types";

// ❌ NUNCA hardcodear
const color = account.type === "bank" ? "blue" : "gray"; // MAL
```

### 🌍 **2. English-First Development** (OBLIGATORIO)

- Toda UI, validaciones, labels en inglés
- Mensajes de error en inglés
- Comentarios de código en inglés
- **Nunca mezclar idiomas**

### 📝 **3. FormDialog Pattern** (OBLIGATORIO)

```typescript
// ✅ Patrón establecido en categories
<FormDialog account={account} onOptimisticUpdate={handleOptimistic} />
```

### ⚡ **4. useOptimistic Rules** (OBLIGATORIO)

- ✅ **Create/Update**: Con `useOptimistic` para UX instantánea
- ❌ **Delete**: Sin optimistic, con modal de confirmación

### 🔄 **5. Server Actions Pattern** (OBLIGATORIO)

```typescript
// ✅ Actions limpios
export async function createAccount(data: FormData) {
  const result = await createAccountService(data);
  if (!result.success) {
    return { error: result.error };
  }
  revalidatePath("/accounts");
  return { success: true };
}
```

### 🛡️ **6. Services Pattern** (OBLIGATORIO)

```typescript
// ✅ Services NUNCA lanzan excepciones
export async function createAccountService(
  data: CreateAccountData
): Promise<ServiceBaseResponse<Account>> {
  // Lógica del servicio
  return { success: true, data: account };
}
```

### 🎨 **7. Visual Consistency** (OBLIGATORIO)

```typescript
// ✅ Usar funciones centralizadas
const IconComponent = getAccountTypeIcon(account.type);
const badgeColors = getAccountTypeBadgeColor(account.type);

// ❌ NUNCA hardcodear colores/iconos
```

### 📱 **8. UI Standards** (OBLIGATORIO)

- **Mobile-first**: Todas las interfaces responsive
- **useTransition + Toast**: Para feedback inmediato
- **Empty states**: Con CTA y iconos
- **Accessibility**: Labels, ARIA roles

### 🏗️ **9. Domain Structure** (OBLIGATORIO)

```
features/{domain}/
├── components/
├── actions/
├── services/
├── lib/validations.ts
└── types.ts
```

### ✅ **10. Type Safety** (OBLIGATORIO)

```typescript
// ✅ Validaciones Zod centralizadas
const schema = z.object({
  type: accountTypeSchema, // Desde shared/types
  currency: currencySchema,
});

// ✅ Type guards
if (!isValidAccountType(type)) return;
```

## 🚨 **Anti-Patterns - NO HACER**

❌ Hardcodear tipos de cuenta: `"bank"`, `"crypto"`  
❌ Hardcodear colores: `"text-blue-600"`  
❌ UI en español  
❌ useOptimistic en deletes  
❌ try-catch en server actions  
❌ Services que lanzan excepciones  
❌ Componentes no responsive  
❌ Schemas Zod duplicados

## 🎯 **Próximas Tareas - Aplicar Patrones**

### 002-4: Account Editing (SIGUIENTE)

**Checklist obligatorio**:

- [ ] Usar `AccountFormDialog` reutilizable
- [ ] Aplicar `useOptimistic` para updates
- [ ] Usar tipos centralizados: `getAccountTypeIcon()`, `getAccountTypeBadgeColor()`
- [ ] Server actions limpios sin try-catch
- [ ] Services con `ServiceBaseResponse`
- [ ] UI en inglés
- [ ] Delete con modal de confirmación (sin optimistic)
- [ ] Mobile-first responsive

### Futuras Tareas

- Aplicar estos mismos patrones en transactions, dashboard, alerts
- **No reinventar**: Reutilizar FormDialog, colores centralizados, patterns establecidos

---

## 📚 Referencias Rápidas

- **Tipos centralizados**: `src/features/shared/types/`
- **FormDialog**: `src/features/categories/components/category-form-dialog.tsx`
- **Services**: `src/features/categories/services/`
- **Actions**: `src/features/categories/actions/`

---

🎯 **Objetivo**: Mantener consistencia arquitectónica y no retroceder en patrones ya validados.
