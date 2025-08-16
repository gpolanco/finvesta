# 📚 Documentación del Sistema AI Tasks - Finvesta

## 🎯 Qué es este Sistema

Sistema completo de **AI Tasks** optimizado para desarrollo con **Cursor** y agentes AI, específicamente diseñado para construir **Finvesta** - tu app personal de finanzas.

## 📂 Estructura del Proyecto

```
finvesta/
├── .cursor/
│   └── finvesta.md              # 🧠 Reglas específicas de Cursor
├── tasks/
│   ├── project-context.md       # 💰 Tu contexto financiero específico
│   ├── current-task.md          # 🎯 Estado actual del desarrollo
│   ├── README.md               # 📚 Esta documentación
│   ├── SETUP_COMPLETE.md       # ✅ Guía completa del sistema
│   ├── templates/              # 📋 Templates para nuevas tasks
│   │   ├── task-template.md
│   │   ├── subtask-template.md
│   │   ├── review-template.md
│   │   └── getting-started.md
│   └── 001-setup/              # 🔧 Primera tarea (subdividida)
│       ├── README.md           # Overview de la tarea
│       ├── subtask-1-supabase.md    # 30-45 min
│       ├── subtask-2-shadcn.md      # 30-40 min
│       ├── subtask-3-layout.md      # 45-60 min
│       ├── subtask-4-auth.md        # 60-90 min
│       └── subtask-5-database.md    # 45-60 min
├── src/                        # 💻 Código de la aplicación
└── [resto del proyecto Next.js]
```

## 🎯 Contexto Financiero de Ejemplo

**IMPORTANTE**: Este sistema incluye ejemplos de configuración financiera para demostrar funcionalidades:

- **Ejemplo de ingresos**: 3.730€/mes
- **Ejemplo de ahorro**: 1.500€/mes
- **Ejemplo de situación**: 22.000€ liquidez + 10.000€ cripto
- **Ejemplo de límite**: Cripto 15% máximo del patrimonio
- **Ejemplo de meta**: 100.000€ patrimonio neto optimizado

**Nota**: Estos valores son ejemplos para demostración. La aplicación es completamente configurable y se adapta a cualquier perfil financiero, desde usuarios básicos hasta portafolios complejos de inversión.

## 🔄 Flujo de Trabajo

### 📝 Para Cursor (Recomendado)

1. **Al empezar sesión**:

   ```
   "Lee tasks/project-context.md y tasks/current-task.md.
   ¿Qué subtask debo implementar ahora?"
   ```

2. **Para implementar**:

   ```
   "Implementa subtask-X-nombre.md siguiendo exactamente los pasos.
   Usa los ejemplos de configuración para demostrar funcionalidades (22k€ liquidez, 10k€ cripto, 3.730€/mes ingreso, 1.500€/mes ahorro)."
   ```

3. **Al completar**:
   ```
   "Crea commit con formato especificado y actualiza current-task.md"
   ```

### 🛠️ Para Desarrollo Manual

1. Lee `tasks/project-context.md`
2. Verifica `tasks/current-task.md`
3. Implementa subtask activo
4. Ejecuta testing
5. Haz commit
6. Actualiza estado

## 📋 Tasks Planificadas

### ✅ Task 001: Setup Inicial (4-5 horas)

- **Estado**: 📋 Subdividida en 5 subtasks
- **Objetivo**: Base del proyecto con Supabase + Shadcn/UI + Auth
- **Criterios**: Conexión BD, autenticación, layout responsivo

### 🟡 Task 002: Cuentas y Transacciones (4-5 horas)

- **Estado**: ⏳ Pendiente de subdividir
- **Objetivo**: Gestión completa de cuentas y movimientos
- **Criterios**: CRUD cuentas, registro transacciones <10s

### 🟡 Task 003: Dashboard KPIs (5-6 horas)

- **Estado**: ⏳ Pendiente de subdividir
- **Objetivo**: KPIs financieros y visualizaciones
- **Criterios**: Dashboard <3s, alertas automáticas

### 🟡 Task 004: Sistema Alertas (3-4 horas)

- **Estado**: ⏳ Pendiente de subdividir
- **Objetivo**: Notificaciones inteligentes financieras
- **Criterios**: Motor reglas, sugerencias específicas

### 🟡 Task 005: Reportes (3-4 horas)

- **Estado**: ⏳ Pendiente de subdividir
- **Objetivo**: Exportación y análisis de datos
- **Criterios**: PDF/CSV, reportes automáticos

## 🧠 Cómo Funciona Cursor

### 📁 Archivos Clave para Cursor

1. **`.cursor/rules/finvesta.mdc`**: Reglas específicas del proyecto
2. **`tasks/project-context.md`**: Tu contexto financiero
3. **`tasks/current-task.md`**: Estado actual siempre actualizado

### 🎯 Principios de Cursor

- **Contexto persistente**: Cursor mantiene el contexto entre sesiones
- **Subtasks granulares**: Máximo 1-2 horas por subtask
- **Números reales**: Siempre usar 22k€ liquidez, 10k€ cripto, 3.730€/mes ingreso, 1.500€/mes ahorro
- **Testing incluido**: Cada subtask incluye validaciones

## 📊 Métricas del Sistema

| Aspecto                | Estado        | Detalle                   |
| ---------------------- | ------------- | ------------------------- |
| **Granularidad**       | ✅ Optimizada | Subtasks 30-90 min        |
| **Contexto**           | ✅ Específico | Situación financiera real |
| **Templates**          | ✅ Completos  | 4 templates en MD         |
| **Documentación**      | ✅ Completa   | Guías paso a paso         |
| **Cursor Integration** | ✅ Optimizada | Reglas específicas        |

## 🚀 Empezar Desarrollo

### 🎯 Primera vez:

```bash
# 1. Lee el contexto completo
cat tasks/project-context.md

# 2. Verifica estado actual
cat tasks/current-task.md

# 3. Empieza con primer subtask
cat tasks/001-setup/subtask-1-supabase.md
```

### 🤖 Con Cursor:

```
"Lee tasks/project-context.md y dime el estado financiero del usuario.
Luego implementa tasks/001-setup/subtask-1-supabase.md paso a paso."
```

## 💡 Ventajas del Sistema

### ✅ Para Agentes AI:

- **Sin ambigüedades**: Cada paso es específico
- **Contexto claro**: Números reales del usuario
- **Criterios verificables**: Sabes cuándo algo está completo
- **Workflow predecible**: Mismo proceso siempre

### ✅ Para Desarrollo Manual:

- **Chunks manejables**: Nunca más de 2 horas
- **Progreso visible**: Barras de progreso
- **Testing incluido**: Validaciones paso a paso
- **Commits atómicos**: Un commit por subtask

## 🔧 Creación de Nuevas Tasks

### 📋 Usar Templates

1. **Para nueva task completa**:

   ```bash
   cp tasks/templates/task-template.md tasks/00X-nombre/
   # Editar y personalizar
   ```

2. **Para nuevo subtask**:

   ```bash
   cp tasks/templates/subtask-template.md tasks/00X-nombre/subtask-Y-nombre.md
   # Seguir estructura específica
   ```

3. **Para review al completar**:
   ```bash
   cp tasks/templates/review-template.md tasks/00X-nombre/review.md
   # Documentar resultados
   ```

## 🎯 Objetivo Final

En **15-20 horas de desarrollo** tendrás una app completa que:

- 💰 **Automatice** tu estrategia financiera hacia 100k€
- 🚨 **Detecte** desequilibrios (cripto >15%, liquidez >20k€)
- 📊 **Visualice** KPIs críticos en tiempo real
- 🎯 **Guíe** decisiones con alertas específicas
- 📱 **Funcione** perfectamente en móvil y desktop

---

**🚀 Sistema optimizado para máxima eficiencia con Cursor. ¡Todo listo para construir tu app de finanzas personales!**
