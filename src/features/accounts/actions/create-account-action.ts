"use server";

import { revalidatePath } from "next/cache";
import {
  createAccount,
  type CreateAccountParams,
} from "../services/create-account";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import { Account } from "@/features/accounts/types";

export async function createAccountAction(
  params: CreateAccountParams
): Promise<ServiceBaseResponse<Account>> {
  const response = await createAccount(params);

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}
