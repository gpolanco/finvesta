# 001-2: Instalación y Configuración Shadcn/UI

**⏱️ Estimación**: 30-40 minutos  
**🎯 Objetivo**: Tener Shadcn/UI configurado con componentes base y tema financiero

## 📋 Pasos Específicos

### 1. Inicializar Shadcn/UI (10 min)

```bash
# Ejecutar configuración inicial
npx shadcn@latest init

# Configuración recomendada:
# ✓ TypeScript: Yes
# ✓ Style: New York
# ✓ Base color: Slate
# ✓ CSS variables: Yes
# ✓ Import alias components: @/components
# ✓ Import alias utils: @/lib/utils
# ✓ RSC: Yes
```

### 2. Instalar Componentes Base (10 min)

```bash
# Componentes esenciales para finanzas
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add sheet
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add table
```

### 3. Personalizar Tema Financiero (10 min)

```css
/* src/app/globals.css - Añadir después de las variables existentes */

:root {
  /* Finanzas theme colors */
  --financial-green: 142 76% 36%; /* Para valores positivos */
  --financial-red: 0 84% 60%; /* Para valores negativos */
  --financial-warning: 38 92% 50%; /* Para alertas */
  --financial-info: 199 89% 48%; /* Para información */
  --financial-crypto: 280 100% 70%; /* Para cripto */
  --financial-cash: 120 100% 25%; /* Para efectivo */
  --financial-investment: 240 100% 50%; /* Para inversiones */
}

.dark {
  /* Dark theme adjustments */
  --financial-green: 142 76% 36%;
  --financial-red: 0 84% 60%;
  --financial-warning: 38 92% 50%;
  --financial-info: 199 89% 48%;
  --financial-crypto: 280 100% 70%;
  --financial-cash: 120 100% 25%;
  --financial-investment: 240 100% 50%;
}

/* Utility classes para finanzas */
.text-financial-positive {
  color: hsl(var(--financial-green));
}

.text-financial-negative {
  color: hsl(var(--financial-red));
}

.text-financial-warning {
  color: hsl(var(--financial-warning));
}

.bg-financial-crypto {
  background-color: hsl(var(--financial-crypto) / 0.1);
  color: hsl(var(--financial-crypto));
}

.bg-financial-cash {
  background-color: hsl(var(--financial-cash) / 0.1);
  color: hsl(var(--financial-cash));
}

.bg-financial-investment {
  background-color: hsl(var(--financial-investment) / 0.1);
  color: hsl(var(--financial-investment));
}
```

### 4. Crear Componente de Testing UI (5 min)

```typescript
// src/components/ui-test.tsx - Componente temporal para verificar UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function UITest() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Finvesta UI Components Test</h1>

      {/* Financial Values */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Display Test</CardTitle>
          <CardDescription>
            Testing financial colors and components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <span className="text-financial-positive font-bold">
              +€1,500.00
            </span>
            <span className="text-financial-negative font-bold">-€250.00</span>
            <span className="text-financial-warning font-bold">⚠️ Alert</span>
          </div>

          <div className="flex gap-2">
            <Badge className="bg-financial-crypto">Crypto</Badge>
            <Badge className="bg-financial-cash">Cash</Badge>
            <Badge className="bg-financial-investment">Investment</Badge>
          </div>

          <Alert>
            <AlertDescription>
              💰 Tienes €42,000 sin rentabilidad - considera mover a cuenta
              remunerada
            </AlertDescription>
          </Alert>

          <Button>Registrar Transacción</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 5. Añadir al Layout para Testing (5 min)

```typescript
// Temporalmente añadir al layout principal o crear página de test
// src/app/ui-test/page.tsx
import { UITest } from "@/components/ui-test";

export default function UITestPage() {
  return <UITest />;
}
```

## ✅ Criterios de Éxito

- [ ] Shadcn/UI inicializado correctamente
- [ ] Componentes base instalados sin errores
- [ ] Tema financiero personalizado aplicado
- [ ] Página de test muestra componentes con colores correctos
- [ ] Build de Next.js funciona sin warnings

## 🧪 Testing

```bash
# 1. Verificar instalación
npm run dev

# 2. Ir a http://localhost:3000/ui-test
# 3. Verificar que:
#    - Colores financieros se ven correctos
#    - Badges tienen colores específicos
#    - Alert se muestra bien
#    - Button funciona

# 3. Verificar build
npm run build
```

## 🎨 Componentes Instalados

| Componente | Uso en Finvesta              |
| ---------- | ---------------------------- |
| `Button`   | Acciones principales, CTAs   |
| `Card`     | KPIs, resúmenes financieros  |
| `Input`    | Formularios de transacciones |
| `Badge`    | Categorías, tipos de cuenta  |
| `Alert`    | Notificaciones financieras   |
| `Form`     | Registro transacciones       |
| `Table`    | Listados de movimientos      |
| `Sheet`    | Navegación móvil             |

## 🔄 Troubleshooting

### Error: "Module not found @/components/ui/..."

```bash
# Verificar que paths estén en tsconfig.json
cat tsconfig.json | grep '"@/*"'
```

### CSS no se aplica

```bash
# Verificar que globals.css esté importado en layout.tsx
grep -n "globals.css" src/app/layout.tsx
```

## 📝 Commit

```bash
git add .
git commit -m "feat(ui): setup Shadcn/UI with financial theme

- Initialize Shadcn/UI with TypeScript and CSS variables
- Install essential components for financial app
- Add custom financial color scheme for positive/negative values
- Create UI test component with financial styling
- Add utility classes for crypto, cash, investment types

Refs: tasks/001-setup/subtask-2-shadcn.md"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-3-layout.md](./subtask-3-layout.md)**

## 📋 Actualizar Estado

```bash
# Actualizar tasks/current-task.md:
# - Estado anterior: ✅ Completado
# - Estado actual: 🟡 En progreso
# - Próximo subtask: 001-3 Layout Base
```
