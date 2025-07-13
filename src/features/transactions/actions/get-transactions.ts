"use server";

import {
  getTransactionsByAccount as getTransactionsByAccountService,
  getAllTransactions as getAllTransactionsService,
} from "@/features/transactions/services/get-transactions";
import type { TransactionWithDetails } from "@/features/transactions/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function getTransactionsByAccount(
  accountId: string
): Promise<ServiceBaseResponse<TransactionWithDetails[]>> {
  return await getTransactionsByAccountService(accountId);
}

export async function getAllTransactions(): Promise<
  ServiceBaseResponse<TransactionWithDetails[]>
> {
  return await getAllTransactionsService();
}
