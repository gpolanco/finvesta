import { createClient } from "@/lib/supabase/server";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";

export interface DeleteAccountParams extends ServiceBaseParams {
  id: string;
}

export async function deleteAccount(
  params: DeleteAccountParams
): Promise<ServiceBaseResponse<void>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Verificar que la cuenta existe y pertenece al usuario
    const { data: existingAccount, error: checkError } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (checkError || !existingAccount) {
      throw new Error("Account not found");
    }

    // Validar que el saldo sea 0 antes de eliminar
    if (existingAccount.balance > 0) {
      throw new Error(
        "Cannot delete account with positive balance. Transfer or withdraw funds first."
      );
    }

    // Verificar si hay transacciones asociadas
    const { data: transactions, error: transactionError } = await supabase
      .from("transactions")
      .select("id")
      .eq("account_id", params.id)
      .limit(1);

    if (transactionError) {
      throw new Error("Error checking account transactions");
    }

    // Si hay transacciones, hacer soft delete (desactivar)
    // Si no hay transacciones y saldo es 0, hacer hard delete
    if (transactions && transactions.length > 0) {
      // Soft delete: desactivar cuenta
      const { error: updateError } = await supabase
        .from("accounts")
        .update({
          is_active: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
        .eq("user_id", user.id);

      if (updateError) {
        throw new Error("Error deactivating account");
      }
    } else {
      // Hard delete: eliminar cuenta completamente
      const { error: deleteError } = await supabase
        .from("accounts")
        .delete()
        .eq("id", params.id)
        .eq("user_id", user.id);

      if (deleteError) {
        throw new Error("Error deleting account");
      }
    }

    return {
      success: true,
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
      error: "An error occurred while deleting the account",
    };
  }
}
