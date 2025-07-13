import { createClient } from "@/lib/supabase/server";
import type { Category, CategoryType } from "@/features/categories/types";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";
import { CategoryMapper } from "@/features/categories/category-mapper";

export interface CreateCategoryParams extends ServiceBaseParams {
  name: string;
  type: CategoryType;
  color?: string;
  isDefault?: boolean;
  description?: string;
}

export async function createCategory(
  params: CreateCategoryParams
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

    const { data, error } = await supabase
      .from("categories")
      .insert({
        user_id: user.id,
        name: params.name,
        type: params.type,
        color: params.color || "#6b7280",
        is_default: params.isDefault ?? false,
        description: params.description,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Error creating category");
    }

    if (!data) {
      throw new Error("Category not created");
    }

    const categoryDomain = CategoryMapper.toDomain(data);

    return {
      success: true,
      data: categoryDomain,
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
      error: "An error occurred while creating the category",
    };
  }
}
