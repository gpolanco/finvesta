import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

export const accountsRoutes = {
  list: {
    path: "/accounts",
    title: "Mis Cuentas - Finvesta",
    description: "Gestiona tus cuentas bancarias, inversiones y cripto",
  } as BaseRoute,

  create: {
    path: "/accounts/create",
    title: "Añadir Cuenta - Finvesta",
    description: "Conecta una nueva cuenta financiera",
  } as BaseRoute,

  detail: {
    path: "/accounts/:id",
    title: "Detalle de Cuenta - Finvesta",
    description: "Ver movimientos y gestionar cuenta específica",
    generatePath: (params: { id: string }) => `/accounts/${params.id}`,
  } as DynamicRoute<{ id: string }>,

  edit: {
    path: "/accounts/:id/edit",
    title: "Editar Cuenta - Finvesta",
    description: "Modificar configuración de la cuenta",
    generatePath: (params: { id: string }) => `/accounts/${params.id}/edit`,
  } as DynamicRoute<{ id: string }>,
} as const;
