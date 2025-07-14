# 002-5: Filtros y búsqueda en transacciones

**⏱️ Estimación**: 30 minutos  
**🎯 Objetivo**: Permitir filtrar y buscar transacciones por cuenta, tipo, categoría, fecha y descripción, con UI rápida y sin recargas.

## 📋 Pasos Específicos

### 1. Crear filtros en TransactionList (10 min)

- Añadir selectores de cuenta, tipo, categoría y fecha en `TransactionList`
- Añadir input de búsqueda por descripción

### 2. Implementar lógica de filtrado (10 min)

- Filtrar transacciones en memoria o vía Supabase
- Actualizar lista en tiempo real al cambiar filtros

### 3. Mejoras de UI y accesibilidad (5 min)

- Etiquetas y placeholders claros
- Accesibilidad: roles, aria, focus

### 4. Pruebas unitarias mínimas (5 min)

- Render de filtros y búsqueda
- Edge: sin resultados
- Error: fallo de Supabase

## ✅ Criterios de Éxito

- [x] Filtros funcionales por cuenta, tipo, categoría y fecha
- [x] Búsqueda por descripción
- [x] UI rápida y sin recargas
- [x] TypeScript sin warnings
- [x] Sin errores en consola
- [ ] Pruebas unitarias mínimas

## 🧪 Testing

```bash
# 1. Probar filtros y búsqueda
npm run dev

# 2. Edge: sin resultados
# 3. Error: fallo de Supabase
```

## 🔄 Troubleshooting

### Error: "No filtra correctamente"

- Revisar lógica de filtrado y queries
- Revisar props y tipos

## 📝 Commit

```bash
git add .
git commit -m "feat(transactions): filtros y búsqueda en transacciones

- Filtros por cuenta, tipo, categoría y fecha
- Búsqueda por descripción
- UI rápida y sin recargas
- Pruebas unitarias mínimas

Refs: tasks/002-accounts/subtask-5-filtros.md
Don't forget to commit!"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-6-validaciones.md](./subtask-6-validaciones.md)**

## 💰 Contexto Financiero

- 22.000€ liquidez sin rentabilidad
- 10.000€ en criptomonedas (19.2% del patrimonio)
- 1.500€/mes objetivo de ahorro
- 3.730€/mes ingresos
