import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";
import { authRoutes } from "@/features/auth/routes";
import { dashboardRoutes } from "@/features/dashboard/routes";
import { accountsRoutes } from "@/features/accounts/routes";
import { transactionsRoutes } from "@/features/transactions/routes";

/**
 * Sistema de rutas centralizado de Finvesta
 *
 * Cada feature define sus rutas en su propio archivo routes.ts
 * y se importan aquí para tener un punto central de acceso.
 */
export const appRoutes = {
  // Dashboard y página principal
  dashboard: dashboardRoutes,

  // Sistema de autenticación
  auth: authRoutes,

  // Gestión de cuentas financieras
  accounts: accountsRoutes,

  // Gestión de transacciones
  transactions: transactionsRoutes,

  // TODO: Añadir cuando se implementen estos features
  // alerts: alertsRoutes,
  // reports: reportsRoutes,
} as const;

/**
 * Helper para obtener metadata de una ruta para Next.js
 */
export const getMetadata = (route: BaseRoute) => {
  return {
    title: route.title,
    description: route.description,
  };
};

/**
 * Helper para obtener todas las rutas como array plano
 * Útil para generar sitemaps, navegación, etc.
 */
export const getAllRoutes = (): BaseRoute[] => {
  const routes: BaseRoute[] = [];

  Object.values(appRoutes).forEach((featureRoutes) => {
    Object.values(featureRoutes).forEach((route) => {
      routes.push(route as BaseRoute);
    });
  });

  return routes;
};

/**
 * Tipo que representa todas las rutas de la aplicación
 */
export type AppRoutes = typeof appRoutes;

/**
 * Re-exportamos los tipos de rutas
 */
export type { BaseRoute, DynamicRoute };

/**
 * Re-exportamos las rutas individuales para imports directos si es necesario
 */
export { authRoutes, dashboardRoutes, accountsRoutes, transactionsRoutes };
