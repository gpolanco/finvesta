import { createClient } from "@/lib/supabase/server";
import { Account } from "@/types/database";

/**
 * SOLO PARA DEBUG - Obtiene todas las cuentas sin filtrar por usuario
 * NO usar en producción
 */
export async function getAllAccountsDebug(): Promise<Account[]> {
  const supabase = await createClient();

  // Consultar TODAS las cuentas (sin filtro de usuario)
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all accounts:", error);
    throw new Error("Error fetching all accounts");
  }

  return accounts || [];
}
