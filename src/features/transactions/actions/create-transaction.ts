"use server";

import { revalidatePath } from "next/cache";
import { createTransaction as createTransactionService } from "@/features/transactions/services/create-transaction";
import type {
  CreateTransactionData,
  Transaction,
} from "@/features/transactions/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function createTransaction(
  data: CreateTransactionData
): Promise<ServiceBaseResponse<Transaction>> {
  const response = await createTransactionService(data);

  if (response.success) {
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
    revalidatePath(`/accounts/${data.accountId}`);
  }

  return response;
}
