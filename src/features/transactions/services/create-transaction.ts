"use server";

import { createClient } from "@/lib/supabase/server";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import type {
  CreateTransactionData,
  Transaction,
} from "@/features/transactions/types";
import type { TransactionType } from "@/features/shared/types/transaction-types";

export async function createTransaction(
  data: CreateTransactionData
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

    // Verify account belongs to user
    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("id, user_id")
      .eq("id", data.accountId)
      .eq("user_id", user.id)
      .single();

    if (accountError || !account) {
      throw new Error("Account not found or not authorized");
    }

    // Convert data to database format
    const dbData = {
      account_id: data.accountId,
      category_id: data.categoryId,
      amount: data.amount,
      description: data.description,
      type: data.transactionType as TransactionType,
      transaction_date: data.transactionDate,
      user_id: user.id,
    };

    // Create transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert([dbData])
      .select()
      .single();

    if (error) {
      throw new Error("Error creating transaction");
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
      error: "Error creating transaction",
    };
  }
}
