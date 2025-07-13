"use server";

import { revalidatePath } from "next/cache";
import {
  createCategory,
  type CreateCategoryParams,
} from "../services/create-category";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import { Category } from "@/features/categories/types";

export async function createCategoryAction(
  params: CreateCategoryParams
): Promise<ServiceBaseResponse<Category>> {
  const response = await createCategory(params);

  if (response.success) {
    revalidatePath("/categories");
  }

  return response;
}
