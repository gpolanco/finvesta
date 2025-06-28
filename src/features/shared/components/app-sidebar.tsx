"use client";

import * as React from "react";
import {
  IconCash,
  IconCreditCard,
  IconTrendingUp,
  IconAlertTriangle,
  IconFileText,
  IconChartBar,
  IconWallet,
  IconSettings,
  IconHelp,
  IconSearch,
} from "@tabler/icons-react";

import { appRoutes } from "@/features/routes";
import { NavDocuments } from "@/features/shared/components/nav-documents";
import { NavMain } from "@/features/shared/components/nav-main";
import { NavSecondary } from "@/features/shared/components/nav-secondary";
import { NavUser } from "@/features/shared/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/features/shared/components/ui/sidebar";

// Datos específicos de Finvesta usando el sistema de rutas
const finvestaData = {
  user: {
    name: "Usuario Finvesta",
    email: "usuario@finvesta.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: appRoutes.dashboard.home.path,
      icon: IconChartBar,
    },
    {
      title: "Mis Cuentas",
      url: appRoutes.accounts.list.path,
      icon: IconCreditCard,
    },
    {
      title: "Inversiones",
      url: "#", // TODO: Implementar en próximos subtasks
      icon: IconTrendingUp,
    },
    {
      title: "Alertas",
      url: "#", // TODO: Implementar en task 004
      icon: IconAlertTriangle,
    },
    {
      title: "Reportes",
      url: "#", // TODO: Implementar en task 005
      icon: IconFileText,
    },
  ],
  navFinancial: [
    {
      title: "Patrimonio",
      icon: IconWallet,
      isActive: true,
      url: appRoutes.dashboard.home.path,
      items: [
        {
          title: "Resumen General",
          url: appRoutes.dashboard.home.path,
        },
        {
          title: "Evolución",
          url: "#", // TODO: Gráfico temporal
        },
      ],
    },
    {
      title: "Cuentas",
      icon: IconCreditCard,
      url: appRoutes.accounts.list.path,
      items: [
        {
          title: "Todas las Cuentas",
          url: appRoutes.accounts.list.path,
        },
        {
          title: "Añadir Cuenta",
          url: appRoutes.accounts.create.path,
        },
      ],
    },
    {
      title: "Análisis",
      icon: IconChartBar,
      url: "#",
      items: [
        {
          title: "KPIs Financieros",
          url: appRoutes.dashboard.home.path,
        },
        {
          title: "Objetivos",
          url: "#", // TODO: Página de objetivos
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "#", // TODO: Página de settings
      icon: IconSettings,
    },
    {
      title: "Ayuda",
      url: "#", // TODO: Página de ayuda
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#", // TODO: Búsqueda global
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Objetivos Financieros",
      url: "#", // TODO: Página de objetivos
      icon: IconCash,
    },
    {
      name: "Historial",
      url: "#", // TODO: Historial completo
      icon: IconFileText,
    },
    {
      name: "Exportar Datos",
      url: "#", // TODO: Feature de exportación
      icon: IconFileText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={appRoutes.dashboard.home.path}>
                <IconCash className="!size-5" />
                <span className="text-base font-semibold">Finvesta</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={finvestaData.navMain} />
        <NavDocuments items={finvestaData.documents} />
        <NavSecondary items={finvestaData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={finvestaData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
