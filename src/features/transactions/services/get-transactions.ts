"use server";

import { createClient } from "@/lib/supabase/server";
import { TransactionMapper } from "@/features/transactions/transaction-mapper";
import type { TransactionWithDetails } from "@/features/transactions/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function getTransactionsByAccount(
  accountId: string
): Promise<ServiceBaseResponse<TransactionWithDetails[]>> {
  try {
    const supabase = await createClient();

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
        *,
        account:accounts!transactions_account_id_fkey(id, name, type, provider),
        category:categories(id, name, type, color)
      `
      )
      .eq("account_id", accountId)
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error fetching transactions");
    }

    return {
      success: true,
      data: (transactions || []).map((transaction) =>
        TransactionMapper.toDomain(transaction)
      ),
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
      error: "Error fetching transactions",
    };
  }
}

export async function getAllTransactions(): Promise<
  ServiceBaseResponse<TransactionWithDetails[]>
> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
        *,
        account:accounts!transactions_account_id_fkey!inner(id, name, type, provider),
        category:categories(id, name, type, color)
      `
      )
      .eq("account.user_id", user.id)
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error fetching all transactions");
    }

    return {
      success: true,
      data: (transactions || []).map((transaction) =>
        TransactionMapper.toDomain(transaction)
      ),
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
      error: "Error fetching all transactions",
    };
  }
}
