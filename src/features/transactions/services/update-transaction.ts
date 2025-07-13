"use server";

import { createClient } from "@/lib/supabase/server";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import type {
  UpdateTransactionData,
  Transaction,
} from "@/features/transactions/types";

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionData
): Promise<ServiceBaseResponse<Transaction>> {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Verify transaction belongs to user (through account)
    const { data: existingTransaction, error: fetchError } = await supabase
      .from("transactions")
      .select("id, account_id")
      .eq("id", transactionId)
      .single();

    if (fetchError || !existingTransaction) {
      throw new Error("Transaction not found");
    }

    // Verify account belongs to user
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("user_id")
      .eq("id", existingTransaction.account_id)
      .eq("user_id", user.id)
      .single();

    if (accountError || !account) {
      throw new Error("Not authorized to edit this transaction");
    }

    // Convert data to database format
    const dbData: Record<string, unknown> = {};
    if (data.accountId) dbData.account_id = data.accountId;
    if (data.categoryId) dbData.category_id = data.categoryId;
    if (data.amount !== undefined) dbData.amount = data.amount;
    if (data.description) dbData.description = data.description;
    if (data.transactionType) dbData.type = data.transactionType;
    if (data.transactionDate) dbData.transaction_date = data.transactionDate;

    // Update transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .update(dbData)
      .eq("id", transactionId)
      .select()
      .single();

    if (error) {
      throw new Error("Error updating transaction");
    }

    // Map to domain format
    const domainTransaction: Transaction = {
      id: transaction.id,
      accountId: transaction.account_id,
      categoryId: transaction.category_id,
      amount: transaction.amount,
      description: transaction.description,
      transactionType: transaction.type,
      transactionDate: transaction.transaction_date,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
    };

    return {
      success: true,
      data: domainTransaction,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Error updating transaction",
    };
  }
}
