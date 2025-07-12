import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

export const accountsRoutes = {
  list: {
    path: "/accounts",
    title: "My Accounts",
    description: "Manage your bank accounts, investments and crypto",
  } as BaseRoute,

  create: {
    path: "/accounts/create",
    title: "Add Account",
    description: "Connect a new financial account",
  } as BaseRoute,

  detail: {
    path: "/accounts/:id",
    title: "Account Details",
    description: "View transactions and manage specific account",
    generatePath: (params: { id: string }) => `/accounts/${params.id}`,
  } as DynamicRoute<{ id: string }>,

  edit: {
    path: "/accounts/:id/edit",
    title: "Edit Account",
    description: "Modify account configuration",
    generatePath: (params: { id: string }) => `/accounts/${params.id}/edit`,
  } as DynamicRoute<{ id: string }>,
} as const;
