"use server";

import { revalidatePath } from "next/cache";
import {
  updateCategory,
  type UpdateCategoryParams,
} from "../services/update-category";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import { Category } from "@/features/categories/types";

export async function updateCategoryAction(
  params: UpdateCategoryParams
): Promise<ServiceBaseResponse<Category>> {
  const response = await updateCategory(params);

  if (response.success) {
    revalidatePath("/categories");
  }

  return response;
}
