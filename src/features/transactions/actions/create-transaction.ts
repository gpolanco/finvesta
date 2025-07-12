"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CreateTransactionData } from "@/features/transactions/types";

export async function createTransaction(data: CreateTransactionData) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Usuario no autenticado");
  }

  // Verify account belongs to user
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("id, user_id")
    .eq("id", data.accountId)
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    throw new Error("Cuenta no encontrada o no autorizada");
  }

  // Convert data to database format
  const dbData = {
    account_id: data.accountId,
    category_id: data.categoryId,
    amount: data.amount,
    description: data.description,
    type: data.transactionType as "income" | "expense" | "investment",
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
    console.error("Error creating transaction:", error);
    throw new Error("Error al crear la transacción");
  }

  // Revalidate relevant paths
  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  revalidatePath(`/accounts/${data.accountId}`);

  return transaction;
}
