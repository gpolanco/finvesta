# 002-1: Modelo de cuentas financieras

**⏱️ Estimación**: 45 minutos  
**🎯 Objetivo**: Consultar y mostrar todas las cuentas del usuario (bancos, cripto, inversiones, etc.) en un componente UI responsive y accesible.

## 📋 Pasos Específicos

### 1. Crear componente AccountList (10 min)

- [x] Crear `src/features/accounts/components/AccountList.tsx`
- [x] Usar tipos de `src/types/database.ts`
- [x] UI con shadcn/ui y Tailwind
- [x] Mock temporal de datos (luego: fetch real)

### 2. Integrar AccountList en página de cuentas (10 min)

- [x] Crear o actualizar página `/accounts` o sección en dashboard
- [x] Importar y renderizar `<AccountList />`
- [x] Asegurar layout responsive y mobile-first

### 3. Conectar con Supabase (15 min)

- [x] Reemplazar mock por consulta real a Supabase (tabla `accounts`)
- [x] Mostrar solo cuentas del usuario autenticado
- [x] Loading y manejo de errores

### 4. Mejoras de UI y accesibilidad (5 min)

- [x] Iconos por tipo de cuenta (lucide-react)
- [x] Badges de tipo y proveedor
- [x] Colores y espaciado según diseño financiero
- [x] Accesibilidad: roles, aria, focus

### 5. Pruebas unitarias mínimas (5 min)

- [x] Render básico del componente
- [x] Edge case: sin cuentas
- [x] Error case: error de fetch

## ✅ Criterios de Éxito

- [x] Componente AccountList creado y funcional
- [x] Integrado en página/sección de cuentas
- [x] Consulta real a Supabase (sin mock)
- [x] UI responsive y accesible
- [x] Iconos y badges por tipo
- [x] TypeScript sin warnings
- [x] Sin errores en consola
- [x] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Verificar render de cuentas
npm run dev

# 2. Probar en móvil y desktop
# Cambiar tamaño de ventana o usar dev tools

# 3. Simular error de fetch (desconectar Supabase)

# 4. Verificar edge case (sin cuentas)
```

## 🔄 Troubleshooting

### Error: "No se muestran cuentas"

- Verificar seed y datos en Supabase
- Revisar query y user_id

### Error: "TypeScript error en AccountList"

- Revisar tipos importados y props

## 📝 Commit

```bash
git add .
git commit -m "feat(accounts): modelo de cuentas financieras

- Componente AccountList con UI responsive y accesible
- Consulta real a Supabase y tipos TS
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-1-cuentas.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-2-transacciones.md](./subtask-2-transacciones.md)**

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
