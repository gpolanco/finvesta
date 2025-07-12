import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

/**
 * Obtiene el usuario autenticado en Server Components
 * Devuelve null si no hay usuario autenticado
 */
export async function getUserServer(): Promise<User | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error getting user in server:", error);
    return null;
  }
}
