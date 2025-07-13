import { Category } from "@/features/categories/types";
import { DataBaseTypes } from "@/types/database";

export const CategoryMapper = {
  toDomain: (category: DataBaseTypes["Category"]): Category => ({
    id: category.id,
    name: category.name,
    type: category.type,
    color: category.color,
    isDefault: category.is_default,
    createdAt: category.created_at,
    description: category.description,
    updatedAt: category.updated_at,
  }),

  toDataBase: (
    category: Category,
    userId: string
  ): DataBaseTypes["Category"] => ({
    id: category.id,
    user_id: userId,
    name: category.name,
    type: category.type,
    color: category.color,
    is_default: category.isDefault,
    created_at: category.createdAt,
    description: category.description,
    updated_at: category.updatedAt,
  }),
};
