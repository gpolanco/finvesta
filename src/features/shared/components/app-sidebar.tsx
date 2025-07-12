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
import { appConfig } from "@/app-config";

// Datos específicos de Finvesta usando el sistema de rutas
const finvestaData = {
  navMain: [
    {
      title: "Dashboard",
      url: appRoutes.dashboard.overview.path,
      icon: IconChartBar,
    },
    {
      title: "My Accounts",
      url: appRoutes.accounts.list.path,
      icon: IconCreditCard,
    },
    {
      title: "Transactions",
      url: appRoutes.transactions.list.path,
      icon: IconTrendingUp,
    },
    {
      title: "Alerts",
      url: "#", // TODO: Implementar en task 004
      icon: IconAlertTriangle,
    },
    {
      title: "Reports",
      url: "#", // TODO: Implementar en task 005
      icon: IconFileText,
    },
  ],
  navFinancial: [
    {
      title: "Assets",
      icon: IconWallet,
      isActive: true,
      url: appRoutes.dashboard.home.path,
      items: [
        {
          title: "General Summary",
          url: appRoutes.dashboard.home.path,
        },
        {
          title: "Evolution",
          url: "#", // TODO: Gráfico temporal
        },
      ],
    },
    {
      title: "Accounts",
      icon: IconCreditCard,
      url: appRoutes.accounts.list.path,
      items: [
        {
          title: "All Accounts",
          url: appRoutes.accounts.list.path,
        },
        {
          title: "Add Account",
          url: appRoutes.accounts.create.path,
        },
      ],
    },
    {
      title: "Transactions",
      icon: IconTrendingUp,
      url: appRoutes.transactions.list.path,
      items: [
        {
          title: "All Transactions",
          url: appRoutes.transactions.list.path,
        },
        {
          title: "New Transaction",
          url: appRoutes.transactions.create.path,
        },
      ],
    },
    {
      title: "Analysis",
      icon: IconChartBar,
      url: "#",
      items: [
        {
          title: "Financial KPIs",
          url: appRoutes.dashboard.home.path,
        },
        {
          title: "Goals",
          url: "#", // TODO: Página de objetivos
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#", // TODO: Página de settings
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "#", // TODO: Página de ayuda
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#", // TODO: Búsqueda global
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Financial Goals",
      url: "#", // TODO: Página de objetivos
      icon: IconCash,
    },
    {
      name: "History",
      url: "#", // TODO: Historial completo
      icon: IconFileText,
    },
    {
      name: "Export Data",
      url: "#", // TODO: Feature de exportación
      icon: IconFileText,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
    };
  } | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // Si no hay usuario, no mostramos el sidebar
  if (!user) return null;

  // Preparar datos del usuario para el componente NavUser
  const userData = {
    name: user.user_metadata?.name || user.email || "Usuario",
    email: user.email || "",
    avatar: "", // TODO: Implementar avatar cuando tengamos la funcionalidad
  };

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
                <span className="text-base font-semibold">
                  {appConfig.name}
                </span>
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
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
