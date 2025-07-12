import { createClient } from "@/lib/supabase/server";
import type { TransactionWithDetails } from "@/features/transactions/types";

export async function getTransactionsByAccount(
  accountId: string
): Promise<TransactionWithDetails[]> {
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
    console.error("Error fetching transactions:", error);
    throw new Error("Error al cargar las transacciones");
  }

  return transactions || [];
}

export async function getAllTransactions(): Promise<TransactionWithDetails[]> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("Usuario no autenticado");
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
    console.error("Error fetching all transactions:", error);
    throw new Error("Error al cargar las transacciones");
  }

  return transactions || [];
}
