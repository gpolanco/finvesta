"use server";

import { createClient } from "@/lib/supabase/server";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

export async function deleteTransaction(
  transactionId: string
): Promise<ServiceBaseResponse<{ success: boolean }>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

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
      throw new Error("Not authorized to delete this transaction");
    }

    // Delete transaction
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transactionId);

    if (error) {
      throw new Error("Error deleting transaction");
    }

    return {
      success: true,
      data: { success: true },
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
      error: "Error deleting transaction",
    };
  }
}
