import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

const accountsBasePath = "/accounts";

export const accountsRoutes = {
  list: {
    path: accountsBasePath,
    title: "My Accounts",
    description: "Manage your bank accounts, investments and crypto",
  } as BaseRoute,

  create: {
    path: `${accountsBasePath}/create`,
    title: "Add Account",
    description: "Connect a new financial account",
  } as BaseRoute,

  detail: {
    path: `${accountsBasePath}/:id`,
    title: "Account Details",
    description: "View transactions and manage specific account",
    generatePath: (params: { id: string }) =>
      `${accountsBasePath}/${params.id}`,
  } as DynamicRoute<{ id: string }>,

  edit: {
    path: `${accountsBasePath}/:id/edit`,
    title: "Edit Account",
    description: "Modify account configuration",
    generatePath: (params: { id: string }) =>
      `${accountsBasePath}/${params.id}/edit`,
  } as DynamicRoute<{ id: string }>,
} as const;
