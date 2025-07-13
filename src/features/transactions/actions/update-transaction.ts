"use server";

import { revalidatePath } from "next/cache";
import { updateTransaction as updateTransactionService } from "@/features/transactions/services/update-transaction";
import type {
  UpdateTransactionData,
  Transaction,
} from "@/features/transactions/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionData
): Promise<ServiceBaseResponse<Transaction>> {
  const response = await updateTransactionService(transactionId, data);

  if (response.success) {
    // Revalidate relevant paths
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    // Revalidate old and new account paths if account changed
    if (data.accountId) {
      revalidatePath(`/accounts/${data.accountId}`);
    }
  }

  return response;
}
