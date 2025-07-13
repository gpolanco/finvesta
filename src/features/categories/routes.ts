import { BaseRoute } from "@/features/shared/types/route-type";

const basePath = "/categories";

export const categoriesRoutes = {
  list: {
    path: basePath,
    title: "Categories",
    description: "Manage your categories for income, expenses and investments",
  } as BaseRoute,
} as const;
