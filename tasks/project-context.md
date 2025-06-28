# 📊 Contexto del Proyecto: Finvesta - App de Finanzas Personales

## 🎯 Visión General

**Finvesta** es una aplicación web para registrar transacciones financieras y visualizar KPIs que ayuden a tomar decisiones informadas hacia una estrategia financiera a 5 años.

## 👤 Perfil del Usuario Principal

- **Edad**: 45 años
- **Ingreso mensual**: 3.730 €
- **Ahorro objetivo**: 1.500 €/mes
- **Situación actual**:
  - ~22.000 € en cuentas sin rentabilidad (Sabadell, BBVA)
  - ~10.000 € en criptomonedas
  - 100 €/mes en fondo indexado (Fidelity MSCI World – MyInvestor)
  - 200 €/mes en criptomonedas

## 🎯 Objetivos Estratégicos

### Objetivo a 5 años

- Optimizar liquidez estancada (máximo 20.000 € sin rentabilidad - actualmente 22.000€)
- Mantener cripto <15% del patrimonio total
- Alcanzar 100.000 € de patrimonio neto
- Diversificar en fondos indexados, letras del tesoro, cuentas remuneradas

### Objetivos mensuales

- Mantener ahorro de 1.500 €/mes
- Monitorear distribución de activos
- Detectar desequilibrios automáticamente

## 🏗️ Stack Tecnológico

> Ver detalles completos en `.cursor/rules/finvesta.mdc`

- **Stack fijo**: Next.js 15 + Supabase + Shadcn/UI + Recharts

## 📊 KPIs Críticos

1. **Patrimonio neto mensual**
2. **% distribución de activos**
3. **Ahorro mensual vs objetivo (1.500 €)**
4. **% cripto del patrimonio total**
5. **Liquidez sin rentabilidad**
6. **Rentabilidad acumulada por inversión**

## 🚨 Alertas Automáticas

- Liquidez sin rentabilidad > 20.000 € (actual: 22.000€)
- % cripto > 15%
- Ahorro mensual < 1.500 €
- Gasto > ingreso mensual

## 📂 Estructura del Proyecto

```
src/
├── app/             # Rutas del App Router
├── features/        # Finanzas, cuentas, inversiones, alertas
├── lib/             # Helpers, gráficos, cálculos financieros
├── db/              # Schema y conexión Supabase
└── config/          # Constantes financieras (límites, objetivos)
```

## 🎨 Principios de Diseño

- **Simplicidad**: Registro de transacciones en <10 segundos
- **Claridad**: Dashboard con visión inmediata del progreso
- **Proactividad**: Alertas que guíen decisiones
- **Escalabilidad**: Preparado para funcionalidades avanzadas

## 📋 Criterios de Éxito

✅ Registro intuitivo de transacciones
✅ Dashboard claro con KPIs críticos
✅ Alertas automáticas funcionando
✅ Seguimiento del objetivo a 5 años
✅ UI responsive (desktop + móvil)
✅ Autenticación segura
