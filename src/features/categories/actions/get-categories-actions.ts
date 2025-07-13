"use server";

import {
  getCategories,
  getCategoriesByType,
} from "@/features/categories/services/get-categories";
import { Category, CategoryTypeKey } from "@/features/categories/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export const getCategoriesByTypeAction = async (
  type: CategoryTypeKey
): Promise<ServiceBaseResponse<Category[]>> => {
  const response = await getCategoriesByType({ type });

  return response;
};

export const getCategoriesAction = async (): Promise<
  ServiceBaseResponse<Category[]>
> => {
  const response = await getCategories();

  return response;
};
