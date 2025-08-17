# 🏗️ Finvesta - Proyecto de Gestión Financiera Personal

## 📋 Descripción General

**Finvesta** es una aplicación web de gestión financiera personal diseñada para ayudar a usuarios individuales a administrar sus finanzas de manera inteligente y organizada. La aplicación permite gestionar cuentas bancarias, transacciones, categorías de gastos e ingresos, y proporciona alertas y recomendaciones financieras personalizadas.

## 🎯 Objetivo del Proyecto

El objetivo principal es crear una plataforma financiera completa que permita a los usuarios:

- Visualizar su patrimonio total de manera clara y organizada
- Gestionar múltiples tipos de cuentas (bancarias, criptomonedas, inversiones, ahorros, efectivo)
- Registrar y categorizar todas sus transacciones financieras
- Recibir alertas inteligentes sobre su situación financiera
- Tomar decisiones informadas sobre sus finanzas personales

## 💰 Contexto Financiero de Ejemplo

La aplicación incluye ejemplos de configuración financiera para demostrar funcionalidades:

- **Ejemplo de patrimonio**: 22.000€ en liquidez + 10.000€ en criptomonedas
- **Ejemplo de ingresos**: 3.730€ mensuales
- **Ejemplo de ahorro**: 1.500€ por mes
- **Tipos de activos soportados**: Cuentas bancarias, criptomonedas, inversiones, ahorros, efectivo y más

**Nota**: Estos valores son solo ejemplos para demostración. La aplicación es completamente configurable y se adapta a cualquier perfil financiero, desde usuarios con finanzas simples hasta portafolios complejos de inversión.

## 🏛️ Arquitectura del Sistema

### Estructura de Dominios

La aplicación está organizada en dominios funcionales bien definidos:

- **Cuentas**: Gestión de diferentes tipos de cuentas financieras
- **Transacciones**: Registro y categorización de movimientos financieros
- **Categorías**: Sistema de clasificación para ingresos, gastos e inversiones
- **Dashboard**: Vista general del patrimonio y métricas financieras
- **Alertas**: Sistema de notificaciones y recomendaciones financieras

### Arquitectura Técnica

#### **Integración Supabase + Prisma (IMPLEMENTADA)**

- **Supabase**: Maneja autenticación, RLS y funciones de base de datos
- **Prisma**: Proporciona ORM, validaciones y tipado fuerte
- **Sincronización**: Los usuarios de Supabase se sincronizan automáticamente con Prisma
- **Seguridad**: Filtrado automático por usuario en todos los repositorios

#### **Estado de la Integración**

- ✅ **Schema unificado**: Prisma maneja el esquema de BD
- ✅ **Sincronización automática**: Usuarios se sincronizan entre sistemas
- ✅ **Repositorios seguros**: Todos filtran por userId
- ✅ **Conexión estable**: Base de datos funcionando correctamente
- ❌ **RLS pendiente**: Políticas de seguridad en BD (documentado para más adelante)

### Principios de Diseño

- **Desarrollo en inglés**: Toda la interfaz y funcionalidades en inglés para mantener consistencia
- **Tipos centralizados**: Definiciones de tipos financieros centralizadas y reutilizables
- **Patrones consistentes**: Uso de patrones establecidos para formularios, modales y validaciones
- **Responsive design**: Interfaz adaptativa para dispositivos móviles y de escritorio
- **Validaciones robustas**: Sistema de validaciones que previene errores y proporciona feedback inmediato

## 🔧 Funcionalidades Principales

### Sistema de Cuentas

- **Tipos de cuenta**: Bancarias, criptomonedas, inversiones, ahorros y efectivo
- **Gestión completa**: Crear, editar, eliminar cuentas con validaciones de seguridad
- **Balance en tiempo real**: Visualización actualizada del saldo de cada cuenta
- **Validaciones inteligentes**: Prevención de eliminación de cuentas con saldo positivo
- **Seguridad por usuario**: Cada usuario solo ve y gestiona sus propias cuentas

### Sistema de Transacciones

- **Categorización automática**: Asignación de categorías según el tipo de transacción
- **Validaciones de negocio**: Prevención de saldos negativos y alertas de riesgo
- **Filtros avanzados**: Búsqueda y filtrado por cuenta, categoría, tipo y fecha
- **Historial completo**: Registro detallado de todas las transacciones financieras
- **Aislamiento de datos**: Transacciones filtradas automáticamente por usuario

### Sistema de Categorías

- **Categorías predefinidas**: Sistema base de categorías para ingresos, gastos e inversiones
- **Categorías de transferencia**: Categorías especiales para movimientos entre cuentas
- **Personalización**: Capacidad de crear y editar categorías personalizadas
- **Colores y organización**: Sistema visual para identificar rápidamente tipos de transacciones
- **Seguridad por usuario**: Categorías organizadas y filtradas por usuario

### Sistema de Alertas Financieras

- **Límites configurables**: Alertas automáticas cuando se exceden límites personalizables por usuario
- **Recomendaciones inteligentes**: Consejos específicos según el tipo de cuenta y balance
- **Prevención de problemas**: Alertas tempranas sobre situaciones financieras de riesgo
- **Feedback inmediato**: Notificaciones en tiempo real sobre la salud financiera
- **Personalización completa**: Cada usuario puede configurar sus propios límites y alertas

## 🎨 Experiencia de Usuario

### Interfaz de Usuario

- **Diseño limpio y moderno**: Interfaz intuitiva basada en principios de UX/UI modernos
- **Navegación clara**: Estructura de navegación lógica y fácil de entender
- **Responsive design**: Funcionalidad completa en dispositivos móviles y de escritorio
- **Accesibilidad**: Diseño accesible con etiquetas apropiadas y navegación por teclado

### Flujos de Usuario

- **Onboarding simple**: Proceso de configuración inicial intuitivo
- **Operaciones rápidas**: Creación y edición de transacciones en pocos clics
- **Feedback inmediato**: Confirmaciones y notificaciones para todas las acciones
- **Recuperación de errores**: Mensajes claros y opciones de recuperación cuando algo falla

## 🚀 Estado Actual del Proyecto

### Completado (100%)

- **Task 001 - Setup Inicial**: Configuración completa del proyecto, autenticación, base de datos
- **Task 002 - Cuentas y Transacciones**: Sistema completo de gestión financiera con validaciones

### En Progreso

- **Integración Supabase + Prisma**: ✅ COMPLETADA
  - Schema unificado implementado
  - Sincronización automática de usuarios funcionando
  - Repositorios seguros con filtrado por usuario
  - Conexión de base de datos estable

### Pendiente

- **Task 003 - Dashboard**: Implementación de métricas y visualizaciones financieras
- **Task 004 - Alertas**: Sistema de notificaciones y recomendaciones
- **Task 005 - Reportes**: Generación de reportes financieros
- **RLS Implementation**: Políticas de seguridad en base de datos (documentado)

## 🔐 Seguridad y Privacidad

### Implementado

- **Autenticación robusta**: Supabase maneja login, registro y sesiones
- **Filtrado por usuario**: Todos los repositorios filtran automáticamente por userId
- **Validaciones de negocio**: Prevención de operaciones no permitidas
- **Aislamiento de datos**: Usuarios solo pueden acceder a sus propios datos

### Pendiente

- **Row Level Security (RLS)**: Políticas de seguridad a nivel de base de datos
- **Auditoría de accesos**: Trazabilidad de operaciones y accesos
- **Encriptación adicional**: Para datos sensibles si es requerido

## 📚 Documentación Técnica

### Documentos Disponibles

- **AI Project Overview** (este documento): Visión general del proyecto y estado actual
- **RLS Implementation Pending**: Documentación para implementar seguridad adicional
- **Supabase-Prisma Integration**: Detalles técnicos de la integración (para desarrolladores)

### Recursos de Desarrollo

- **Prisma Studio**: `pnpm db:studio` - Gestión visual de la base de datos
- **Migraciones**: `pnpm db:migrate` - Gestión de cambios en el esquema
- **Regeneración de cliente**: `pnpm db:generate` - Actualizar cliente de Prisma

## 🎯 Próximos Pasos

1. **Completar funcionalidades básicas** de cuentas, transacciones y categorías
2. **Implementar dashboard** con métricas financieras
3. **Desarrollar sistema de alertas** inteligentes
4. **Implementar RLS** para completar la seguridad doble
5. **Generar reportes** financieros personalizados

---

**Última actualización**: Integración Supabase + Prisma completada y funcionando
**Estado de seguridad**: Nivel aplicación implementado, RLS pendiente
**Próxima prioridad**: Completar funcionalidades básicas del dominio financiero
