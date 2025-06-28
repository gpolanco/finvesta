import { BaseRoute } from "@/features/shared/types/route-type";

export const dashboardRoutes = {
  home: {
    path: "/",
    title: "Dashboard - Finvesta",
    description:
      "Tu resumen financiero personal - Patrimonio, cripto, ahorros y más",
  } as BaseRoute,

  overview: {
    path: "/dashboard",
    title: "Resumen Financiero - Finvesta",
    description:
      "Visualiza tus KPIs: patrimonio neto, % cripto, liquidez y objetivos",
  } as BaseRoute,
} as const;
