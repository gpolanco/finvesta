import { CategoryMapper } from "@/features/categories/category-mapper";
import { Category, CategoryType } from "@/features/categories/types";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";
import { createClient } from "@/lib/supabase/server";

export interface UpdateCategoryParams extends ServiceBaseParams {
  id: string;
  name?: string;
  type?: CategoryType;
  color?: string;
  isDefault?: boolean;
  description?: string;
}

export async function updateCategory(
  params: UpdateCategoryParams
): Promise<ServiceBaseResponse<Category>> {
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
      throw new Error("Default categories cannot be edited");
    }

    const { data: category, error } = await supabase
      .from("categories")
      .update({
        ...(params.name && { name: params.name }),
        ...(params.type && { type: params.type }),
        ...(params.color && { color: params.color }),
        ...(typeof params.isDefault === "boolean" && {
          is_default: params.isDefault,
        }),
        ...(params.description && { description: params.description }),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error("Error updating category");
    }

    return {
      success: true,
      data: CategoryMapper.toDomain(category),
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
      error: "Error updating category",
    };
  }
}
