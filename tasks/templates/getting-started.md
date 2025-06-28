# 🚀 Getting Started - Sistema AI Tasks para Finvesta

## 📋 Pasos Iniciales (5 minutos)

### 1. ✅ Verificar Estructura del Proyecto

```bash
# Verificar que tienes todos los archivos necesarios
ls -la .cursor/
ls -la tasks/
ls -la tasks/001-setup/
```

Deberías ver:

```
.cursor/
└── finvesta.md          # Reglas específicas de Cursor

tasks/
├── project-context.md   # Tu contexto financiero
├── current-task.md      # Estado actual
├── README.md           # Documentación completa
├── SETUP_COMPLETE.md   # Guía del sistema
├── templates/          # Templates para nuevas tasks
└── 001-setup/         # Primera tarea subdividida
```

### 2. 📖 Leer Contexto Esencial

```bash
# OBLIGATORIO: Lee tu contexto financiero específico
cat tasks/project-context.md

# Verifica qué tarea está activa
cat tasks/current-task.md
```

### 3. 🎯 Identificar Próximo Paso

```bash
# Ver overview de la tarea actual
cat tasks/001-setup/README.md

# Ver el primer subtask a implementar
cat tasks/001-setup/subtask-1-supabase.md
```

## 🤖 Uso con Cursor (Recomendado)

### 📝 Comandos Estándar para Cursor

#### Al empezar nueva sesión:

```
"Lee tasks/project-context.md y tasks/current-task.md.
¿Qué subtask debo implementar ahora según el estado actual?"
```

#### Para implementar subtask:

```
"Implementa exactamente el subtask-X-nombre.md siguiendo todos los pasos.
Usa los números reales del usuario (22k€ liquidez, 10k€ cripto, 3.730€/mes ingreso, 1.500€/mes ahorro).
Incluye TypeScript types y validaciones."
```

#### Al completar subtask:

```
"Crea commit con formato especificado y actualiza current-task.md
marcando este subtask como completado."
```

#### Para verificar progreso:

```
"¿Qué falta para completar la Task 001?
Muestra el estado actual y próximos pasos."
```

## 🛠️ Desarrollo Manual

### 📋 Workflow Paso a Paso

1. **Lee contexto financiero** (`tasks/project-context.md`)
2. **Verifica estado actual** (`tasks/current-task.md`)
3. **Implementa subtask activo** (sigue pasos específicos)
4. **Ejecuta testing** (según criterios definidos)
5. **Haz commit** (formato especificado)
6. **Actualiza estado** (`tasks/current-task.md`)
7. **Repite** con siguiente subtask

### 🧪 Comandos de Verificación

```bash
# Verificar que Next.js funciona
npm run dev

# Verificar TypeScript
npm run type-check

# Verificar build
npm run build

# Ver logs de desarrollo
npm run dev 2>&1 | tee development.log
```

## 📊 Seguimiento de Progreso

### 🎯 Estados de Subtask

- 🟡 **No iniciado**: Listo para empezar
- 🔵 **En progreso**: Actualmente desarrollando
- ✅ **Completado**: Terminado y testeado
- ❌ **Bloqueado**: Esperando dependencias

### 📈 Tracking en current-task.md

El archivo `tasks/current-task.md` siempre muestra:

- ✅ Última tarea completada
- 🔵 Subtask actual en progreso
- 🎯 Próximos 3 subtasks
- 📊 Barra de progreso visual

## 🚨 Troubleshooting Común

### Issue: "No sé por dónde empezar"

```bash
# Solución: Lee el contexto y estado actual
cat tasks/project-context.md
cat tasks/current-task.md
```

### Issue: "Cursor no entiende el contexto"

```bash
# Solución: Refuerza el contexto financiero
"Recuerda: estamos desarrollando Finvesta para optimizar 22k€ sin rentabilidad
+ 10k€ cripto hacia objetivo de 100k€ patrimonio en 5 años"
```

### Issue: "Subtask muy complejo"

```bash
# Solución: Cada subtask está diseñado para 30-90 min máximo
# Si parece complejo, sigue EXACTAMENTE los pasos numerados
cat tasks/001-setup/subtask-1-supabase.md
```

### Issue: "Tests fallan"

```bash
# Solución: Cada subtask incluye troubleshooting específico
# Buscar sección "🔄 Troubleshooting" en el subtask
```

## 🎯 Objetivos por Fase

### 🔧 Fase 1: Setup (Task 001) - 4-5 horas

- ✅ Supabase conectado
- ✅ UI components configurados
- ✅ Layout responsivo creado
- ✅ Autenticación funcionando
- ✅ Base de datos con esquema financiero

### 💰 Fase 2: Accounts (Task 002) - 4-5 horas

- Gestión de cuentas bancarias
- Sistema de transacciones
- Categorización automática
- Transferencias entre cuentas

### 📊 Fase 3: Dashboard (Task 003) - 5-6 horas

- KPIs financieros en tiempo real
- Gráficas con Recharts
- Indicadores de riesgo
- Progreso hacia objetivos

### 🚨 Fase 4: Alertas (Task 004) - 3-4 horas

- Motor de reglas financieras
- Notificaciones inteligentes
- Sugerencias accionables
- Configuración de umbrales

### 📈 Fase 5: Reportes (Task 005) - 3-4 horas

- Reportes mensuales/anuales
- Exportación PDF/CSV
- Análisis de tendencias
- Automatización de reportes

## ✨ Tips para Máxima Eficiencia

### 🎯 Con Cursor:

- **Sé específico**: Menciona siempre números reales (22k€ liquidez, 10k€ cripto, 3.730€/mes ingreso)
- **Cita archivos**: "según tasks/001-setup/subtask-1-supabase.md"
- **Refuerza contexto**: "para usuario de 45 años, objetivo 1.500€/mes"

### 🛠️ Desarrollo Manual:

- **Un subtask por vez**: No saltarse pasos
- **Testing continuo**: Verificar después de cada paso
- **Commits atómicos**: Un commit por subtask completado

### 🧠 Para Ambos:

- **Lee SIEMPRE project-context.md** antes de empezar
- **Usa números reales** del usuario en ejemplos
- **Sigue orden estricto** de subtasks
- **Actualiza current-task.md** al completar

---

## 🎬 ¡Empezar AHORA!

### 🚀 Opción 1: Con Cursor (Recomendado)

```
"Lee tasks/project-context.md y explícame la situación financiera del usuario.
Luego implementa tasks/001-setup/subtask-1-supabase.md paso a paso."
```

### 🛠️ Opción 2: Manual

```bash
# 1. Leer contexto
cat tasks/project-context.md

# 2. Ver primer subtask
cat tasks/001-setup/subtask-1-supabase.md

# 3. Empezar implementación
# Seguir los pasos 1-6 exactamente como están definidos
```

---

**🎯 En 15-20 horas tendrás tu app personal de finanzas que automatice tu estrategia hacia 100k€ de patrimonio optimizado.**
