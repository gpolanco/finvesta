# 002-3: Sistema de categorías

**⏱️ Estimación**: 45 minutos  
**🎯 Objetivo**: Permitir visualizar, crear, editar y eliminar categorías de ingresos, gastos e inversión, con UI accesible y mobile-first.

## 📋 Pasos Específicos

### 1. Crear CategoryList y CategoryForm (15 min)

- Crear `src/features/transactions/components/CategoryList.tsx`
- Crear `src/features/transactions/components/CategoryForm.tsx`
- Mostrar categorías agrupadas por tipo
- Inputs: nombre, tipo, color

### 2. Alta, edición y borrado de categorías (15 min)

- Permitir crear nuevas categorías personalizadas
- Permitir editar nombre, tipo y color
- Permitir borrar solo categorías personalizadas (no las por defecto)
- Confirmación antes de borrar

### 3. Integrar con transacciones (5 min)

- Usar categorías en TransactionForm
- Validar que siempre haya al menos una categoría por tipo

### 4. Pruebas unitarias mínimas (10 min)

- Render de listas y formularios
- Edge: sin categorías personalizadas
- Error: fallo de Supabase

## ✅ Criterios de Éxito

- [ ] Lista de categorías por tipo
- [ ] Alta, edición y borrado de categorías personalizadas
- [ ] No se pueden borrar categorías por defecto
- [ ] Asignación de color y tipo
- [ ] UI accesible y responsive
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Probar alta, edición y borrado de categorías
npm run dev

# 2. Edge: sin categorías personalizadas
# 3. Error: fallo de Supabase
```

## 🔄 Troubleshooting

### Error: "No se muestra categoría"

- Revisar query y user_id
- Revisar tipos y props

## 📝 Commit

```bash
git add .
git commit -m "feat(categories): sistema de categorías financieras

- Listado y gestión de categorías por tipo
- Alta, edición y borrado de categorías personalizadas
- UI accesible y responsive
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-3-categorias.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-4-cuentas-edicion.md](./subtask-4-cuentas-edicion.md)**

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
