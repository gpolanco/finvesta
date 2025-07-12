# 001-3: Layout Base y Navegación

**⏱️ Estimación**: 45-60 minutos  
**🎯 Objetivo**: Layout responsivo con navegación principal para la app financiera

## 📋 Pasos Específicos

### 1. Actualizar Layout Principal (15 min)

```typescript
// src/app/layout.tsx - Actualizar layout existente
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finvesta - Gestión Financiera Personal",
  description:
    "Controla tu patrimonio, optimiza tus inversiones y alcanza tus metas financieras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
```

### 2. Crear Componente de Navegación (20 min)

```typescript
// src/components/layout/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  CreditCard,
  TrendingUp,
  Bell,
  FileText,
  Menu,
  Wallet,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Cuentas",
    icon: Wallet,
    href: "/accounts",
    color: "text-violet-500",
  },
  {
    label: "Transacciones",
    icon: CreditCard,
    href: "/transactions",
    color: "text-pink-700",
  },
  {
    label: "Inversiones",
    icon: TrendingUp,
    href: "/investments",
    color: "text-orange-700",
  },
  {
    label: "Alertas",
    icon: Bell,
    href: "/alerts",
    color: "text-emerald-500",
  },
  {
    label: "Reportes",
    icon: FileText,
    href: "/reports",
    color: "text-blue-500",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 py-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
            pathname === route.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground"
          )}
        >
          <div className="flex items-center flex-1">
            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
            {route.label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="px-3 py-6">
          <h2 className="mb-2 px-4 text-lg font-semibold">Finvesta</h2>
          <Navigation />
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### 3. Crear Header con User Info (10 min)

```typescript
// src/components/layout/header.tsx
"use client";

import { MobileNavigation } from "./navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut } from "lucide-react";

export function Header() {
  // TODO: Get user data from auth context
  const user = {
    name: "Usuario Finvesta",
    email: "usuario@ejemplo.com",
    avatar: null,
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <MobileNavigation />

        <div className="ml-auto flex items-center space-x-4">
          {/* Quick Stats - Solo en desktop */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <span>Patrimonio:</span>
              <span className="font-semibold text-foreground">€52,000</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Cripto:</span>
              <span className="text-financial-warning font-semibold">
                19.2%
              </span>
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
```

### 4. Crear Sidebar (10 min)

```typescript
// src/components/layout/sidebar.tsx
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-background border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary">💰 Finvesta</h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col px-4">
          <Navigation />
        </div>

        {/* Footer con info rápida */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Objetivo mes:</span>
                <span className="font-semibold">€1,500</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Progreso:</span>
                <span className="text-financial-positive font-semibold">
                  €1,200
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 5. Crear Layout Dashboard (10 min)

```typescript
// src/components/layout/dashboard-layout.tsx
import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

### 6. Crear Página Dashboard Test (5 min)

```typescript
// src/app/dashboard/page.tsx
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bienvenido de vuelta! Aquí tienes un resumen de tus finanzas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patrimonio Neto
              </CardTitle>
              <span className="text-2xl">💰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€52,000</div>
              <p className="text-xs text-muted-foreground">
                +2.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Liquidez sin Rentabilidad
              </CardTitle>
              <Badge variant="destructive">⚠️</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-financial-negative">
                €42,000
              </div>
              <p className="text-xs text-muted-foreground">
                Considera mover a cuenta remunerada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                % Criptomonedas
              </CardTitle>
              <Badge variant="secondary" className="bg-financial-crypto">
                ₿
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-financial-warning">
                19.2%
              </div>
              <p className="text-xs text-muted-foreground">
                Objetivo: &lt;15% del patrimonio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ahorro este Mes
              </CardTitle>
              <span className="text-2xl">🎯</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-financial-positive">
                €1,200
              </div>
              <p className="text-xs text-muted-foreground">
                Objetivo: €1,500/mes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
```

## ✅ Criterios de Éxito

- [x] Layout responsivo funciona en desktop y móvil
- [x] Navegación principal implementada con iconos
- [x] Header con user dropdown operativo
- [x] Sidebar visible en desktop, sheet en móvil
- [x] Dashboard muestra KPIs con datos de ejemplo
- [x] Colores financieros aplicados correctamente

## 🧪 Testing

```bash
# 1. Verificar responsividad
npm run dev
# - Desktop: http://localhost:3000/dashboard
# - Móvil: Cambiar tamaño de ventana o usar dev tools

# 2. Verificar navegación
# - Click en enlaces del sidebar
# - Probar menú móvil (hamburger)
# - Probar dropdown de usuario

# 3. Verificar colores
# - KPIs deben tener colores específicos
# - Badges con temas correctos
```

## 📝 Commit

```bash
git add .
git commit -m "feat(layout): implement responsive dashboard layout

- Create main navigation with financial app routes
- Add responsive header with user dropdown and quick stats
- Implement sidebar for desktop and sheet for mobile
- Create dashboard layout with proper spacing
- Add test dashboard page with financial KPIs
- Apply financial color scheme to components

Refs: tasks/001-setup/subtask-3-layout.md"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-4-auth.md](./subtask-4-auth.md)**
