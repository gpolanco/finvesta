"use server";

import { revalidatePath } from "next/cache";
import {
  updateAccount,
  type UpdateAccountParams,
} from "../services/update-account";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import { Account } from "@/features/accounts/types";

export async function updateAccountAction(
  params: UpdateAccountParams
): Promise<ServiceBaseResponse<Account>> {
  const response = await updateAccount(params);

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}
