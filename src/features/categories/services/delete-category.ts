import { createClient } from "@/lib/supabase/server";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";

export interface DeleteCategoryParams extends ServiceBaseParams {
  id: string;
}

export async function deleteCategory(
  params: DeleteCategoryParams
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

    const { data: existingCategory, error: checkError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (checkError || !existingCategory) {
      throw new Error("Category not found");
    }

    if (existingCategory.is_default) {
      throw new Error("Default categories cannot be deleted");
    }

    // Check if there are transactions using this category
    const { data: transactions, error: transactionError } = await supabase
      .from("transactions")
      .select("id")
      .eq("category_id", params.id)
      .limit(1);

    if (transactionError) {
      throw new Error("This category has transactions associated");
    }

    if (transactions && transactions.length > 0) {
      throw new Error(
        "Cannot delete a category that has transactions associated"
      );
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", params.id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error("Error deleting category");
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
      error: "An error occurred while deleting the category",
    };
  }
}
