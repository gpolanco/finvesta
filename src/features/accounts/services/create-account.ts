import { createClient } from "@/lib/supabase/server";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";
import { Account } from "@/features/accounts/types";
import { AccountType } from "@/features/shared/types/account-types";
import { DEFAULT_CURRENCY } from "@/features/shared/types/currency-types";

export interface CreateAccountParams extends ServiceBaseParams {
  name: string;
  type: AccountType;
  provider?: string;
  balance: number;
  currency?: string;
}

export async function createAccount(
  params: CreateAccountParams
): Promise<ServiceBaseResponse<Account>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Preparar datos para insertar
    const accountData = {
      user_id: user.id,
      name: params.name.trim(),
      type: params.type,
      provider: params.provider?.trim() || null,
      balance: params.balance,
      currency: params.currency || DEFAULT_CURRENCY,
      is_active: true,
    };

    const { data, error } = await supabase
      .from("accounts")
      .insert(accountData)
      .select()
      .single();

    if (error) {
      throw new Error("Error creating account");
    }

    // Transformar datos de la BD al tipo Account
    const account: Account = {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      type: data.type,
      provider: data.provider,
      balance: data.balance,
      currency: data.currency,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    return {
      success: true,
      data: account,
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
      error: "An error occurred while creating the account",
    };
  }
}
