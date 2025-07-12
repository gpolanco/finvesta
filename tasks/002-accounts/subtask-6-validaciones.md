# 002-6: Validaciones y feedback financiero

**⏱️ Estimación**: 30 minutos  
**🎯 Objetivo**: Implementar validaciones de negocio y feedback visual inmediato en la gestión de cuentas y transacciones.

## 📋 Pasos Específicos

### 1. Validaciones de negocio en transacciones (10 min)

- No permitir saldo negativo en cuentas
- Validar límites: cripto >15%, liquidez >20k€, ahorro <1.500€
- Mostrar mensajes de error claros

### 2. Alertas automáticas en UI (10 min)

- Mostrar banners, toast o badges cuando se exceden límites
- Integrar alertas en AccountList y TransactionForm

### 3. Feedback visual inmediato (5 min)

- Loading, éxito y error en acciones
- Animaciones sutiles (<300ms)

### 4. Pruebas unitarias mínimas (5 min)

- Validaciones de negocio (unit)
- Render de alertas y feedback

## ✅ Criterios de Éxito

- [ ] Validaciones de negocio implementadas
- [ ] Alertas automáticas en UI
- [ ] Feedback visual inmediato
- [ ] TypeScript sin warnings
- [ ] Sin errores en consola
- [ ] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Probar validaciones y alertas
npm run dev

# 2. Edge: cripto >15%, liquidez >20k€, ahorro <1.500€
# 3. Error: saldo negativo
```

## 🔄 Troubleshooting

### Error: "No se muestra alerta"

- Revisar lógica de validaciones y triggers
- Revisar props y tipos

## 📝 Commit

```bash
git add .
git commit -m "feat(financial): validaciones y feedback financiero

- Validaciones de negocio y alertas automáticas
- Feedback visual inmediato en UI
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-6-validaciones.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → Task 003: Dashboard KPIs

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
