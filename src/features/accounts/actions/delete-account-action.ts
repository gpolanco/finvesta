"use server";

import { revalidatePath } from "next/cache";
import { deleteAccount, DeleteAccountParams } from "../services/delete-account";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function deleteAccountAction(
  params: DeleteAccountParams
): Promise<ServiceBaseResponse<void>> {
  const response = await deleteAccount(params);

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}
