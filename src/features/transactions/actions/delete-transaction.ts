"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(transactionId: string) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Usuario no autenticado");
  }

  // Get transaction and verify it exists
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
    throw new Error("No autorizado para eliminar esta transacción");
  }

  // Delete transaction
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Error al eliminar la transacción");
  }

  // Revalidate relevant paths
  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  revalidatePath(`/accounts/${existingTransaction.account_id}`);

  return { success: true };
}
