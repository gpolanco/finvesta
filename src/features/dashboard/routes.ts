import { BaseRoute } from "@/features/shared/types/route-type";

export const dashboardRoutes = {
  home: {
    path: "/",
    title: "Dashboard",
    description:
      "Your financial summary - Portfolio, investments, savings and more",
  } as BaseRoute,

  overview: {
    path: "/dashboard",
    title: "Dashboard",
    description:
      "Your financial summary - Portfolio, investments, savings and more",
  } as BaseRoute,
} as const;
