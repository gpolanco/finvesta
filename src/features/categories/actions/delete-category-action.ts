"use server";

import { revalidatePath } from "next/cache";
import {
  deleteCategory,
  DeleteCategoryParams,
} from "../services/delete-category";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function deleteCategoryAction(
  params: DeleteCategoryParams
): Promise<ServiceBaseResponse<void>> {
  const response = await deleteCategory(params);

  if (response.success) {
    revalidatePath("/categories");
  }

  return response;
}
