import { CategoryMapper } from "@/features/categories/category-mapper";
import { Category, CategoryTypeKey } from "@/features/categories/types";
import {
  ServiceBaseParams,
  ServiceBaseResponse,
} from "@/features/shared/services/types/service-base";
import { createClient } from "@/lib/supabase/server";

export async function getCategories(): Promise<
  ServiceBaseResponse<Category[]>
> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("type", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      throw new Error("Error fetching categories");
    }

    return {
      success: true,
      data: (categories || []).map((cat) => CategoryMapper.toDomain(cat)),
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
      error: "Error fetching categories",
    };
  }
}

interface CategoryGetByTypeParams extends ServiceBaseParams {
  type: CategoryTypeKey;
}

export async function getCategoriesByType({
  type,
}: CategoryGetByTypeParams): Promise<ServiceBaseResponse<Category[]>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", type)
      .order("name", { ascending: true });

    if (error) {
      throw new Error("Error fetching categories by type");
    }

    return {
      success: true,
      data: (categories || []).map((cat) => CategoryMapper.toDomain(cat)),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  return {
    success: false,
    error: "Error fetching categories by type",
  };
}
