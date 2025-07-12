# 002-4: Edición y baja de cuentas

**⏱️ Estimación**: 30 minutos  
**🎯 Objetivo**: Permitir editar y desactivar/borrar cuentas financieras, validando reglas de negocio y feedback inmediato.

## 📋 Pasos Específicos

### 1. Crear AccountEditForm (10 min)

- Crear `src/features/accounts/components/AccountEditForm.tsx`
- Inputs: nombre, tipo, proveedor
- Botón de guardar y cancelar

### 2. Permitir baja/desactivación de cuentas (10 min)

- Botón para desactivar/borrar cuenta (soft delete)
- Validar que no se pueda borrar cuenta con saldo >0
- Confirmación antes de borrar

### 3. Integrar edición en AccountList (5 min)

- Añadir botón de editar en cada cuenta
- Modal o drawer para edición

### 4. Pruebas unitarias mínimas (5 min)

- Render y submit del formulario
- Edge: cuenta con saldo >0
- Error: fallo de Supabase

## ✅ Criterios de Éxito

- [ ] Edición de cuentas funcional
- [ ] Baja/desactivación de cuentas
- [ ] No se puede borrar cuenta con saldo >0
- [ ] Feedback inmediato en UI
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Probar edición y baja de cuentas
npm run dev

# 2. Edge: cuenta con saldo >0
# 3. Error: fallo de Supabase
```

## 🔄 Troubleshooting

### Error: "No se puede borrar cuenta"

- Revisar validación de saldo
- Revisar query y user_id

## 📝 Commit

```bash
git add .
git commit -m "feat(accounts): edición y baja de cuentas financieras

- Formulario de edición y baja de cuentas
- Validación de saldo y feedback inmediato
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-4-cuentas-edicion.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-5-filtros.md](./subtask-5-filtros.md)**

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
