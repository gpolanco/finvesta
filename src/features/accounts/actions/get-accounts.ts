import { createClient } from "@/lib/supabase/server";
import { Account } from "@/types/database";

export async function getAccounts(): Promise<Account[]> {
  const supabase = await createClient();

  // Obtener el usuario autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  // Consultar las cuentas del usuario
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching accounts:", error);
    throw new Error("Error fetching accounts");
  }

  return accounts || [];
}
