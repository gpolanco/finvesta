"use server";

import { revalidatePath } from "next/cache";
import { deleteTransaction as deleteTransactionService } from "@/features/transactions/services/delete-transaction";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function deleteTransaction(
  transactionId: string
): Promise<ServiceBaseResponse<{ success: boolean }>> {
  const response = await deleteTransactionService(transactionId);

  if (response.success) {
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
  }

  return response;
}
