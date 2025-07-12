"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UpdateTransactionData } from "@/features/transactions/types";

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionData
) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Usuario no autenticado");
  }

  // Verify transaction belongs to user (through account)
  const { data: existingTransaction, error: fetchError } = await supabase
    .from("transactions")
    .select("id, account_id")
    .eq("id", transactionId)
    .single();

  if (fetchError || !existingTransaction) {
    throw new Error("Transacción no encontrada");
  }

  // Verify account belongs to user
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("user_id")
    .eq("id", existingTransaction.account_id)
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    throw new Error("No autorizado para editar esta transacción");
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
    console.error("Error updating transaction:", error);
    throw new Error("Error al actualizar la transacción");
  }

  // Revalidate relevant paths
  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  revalidatePath(`/accounts/${existingTransaction.account_id}`);

  return transaction;
}
