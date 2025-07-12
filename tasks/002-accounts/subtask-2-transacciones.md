# 002-2: CRUD de transacciones

**⏱️ Estimación**: 60 minutos  
**🎯 Objetivo**: Permitir registrar, editar y borrar transacciones financieras del usuario, con validaciones y feedback inmediato.

## 📋 Pasos Específicos

### 1. Crear TransactionForm (15 min)

- Crear `src/features/transactions/components/TransactionForm.tsx`
- Usar react-hook-form y Zod para validación
- Inputs: cuenta, tipo, categoría, cantidad, descripción, fecha
- Botón de guardar y cancelar

### 2. Integrar alta de transacciones (10 min)

- Llamar a Supabase para insertar nueva transacción
- Feedback de loading y error
- Resetear formulario tras éxito

### 3. Listar transacciones por cuenta (10 min)

- Crear `TransactionList` en `src/features/transactions/components/TransactionList.tsx`
- Mostrar lista de transacciones filtradas por cuenta
- Ordenar por fecha descendente

### 4. Editar y borrar transacciones (15 min)

- Permitir editar transacción existente (form prellenado)
- Permitir borrar (soft delete o hard delete)
- Confirmación antes de borrar

### 5. Pruebas unitarias mínimas (10 min)

- Render y submit del formulario
- Edge: cantidad negativa, campos vacíos
- Error: fallo de Supabase

## ✅ Criterios de Éxito

- [ ] Formulario TransactionForm funcional
- [ ] Alta, edición y borrado funcionando
- [ ] Lista de transacciones por cuenta
- [ ] Validaciones Zod y react-hook-form
- [ ] Feedback inmediato en UI
- [ ] Registro <10s
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Probar alta, edición y borrado
npm run dev

# 2. Simular error de Supabase
# Desconectar o modificar query

# 3. Edge: cantidad negativa, campos vacíos
```

## 🔄 Troubleshooting

### Error: "No se guarda transacción"

- Revisar validaciones y query
- Revisar user_id y account_id

### Error: "TypeScript error en TransactionForm"

- Revisar tipos y props

## 📝 Commit

```bash
git add .
git commit -m "feat(transactions): CRUD de transacciones financieras

- Formulario TransactionForm con validaciones y feedback
- Alta, edición y borrado de transacciones
- Lista de transacciones por cuenta
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-2-transacciones.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-3-categorias.md](./subtask-3-categorias.md)**

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
