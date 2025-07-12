import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

const basePath = "/transactions";

export const transactionsRoutes = {
  list: {
    path: basePath,
    title: "Transactions",
    description: "Manage all your financial transactions and movements",
  } as BaseRoute,

  create: {
    path: `${basePath}/create`,
    title: "New Transaction",
    description: "Add a new financial transaction",
  } as BaseRoute,

  detail: {
    path: `${basePath}/:id`,
    title: "Transaction Details",
    description: "View and edit transaction details",
    generatePath: (params: { id: string }) => `${basePath}/${params.id}`,
  } as DynamicRoute<{ id: string }>,

  edit: {
    path: `${basePath}/:id/edit`,
    title: "Edit Transaction",
    description: "Modify transaction details",
    generatePath: (params: { id: string }) => `${basePath}/${params.id}/edit`,
  } as DynamicRoute<{ id: string }>,
} as const;
