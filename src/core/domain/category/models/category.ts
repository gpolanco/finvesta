import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";

/**
 * Core domain model for Category
 * This represents the business concept of a category within the category bounded context
 */
export interface Category {
  readonly id: string;
  readonly name: CategoryName;
  readonly description?: CategoryDescription;
  readonly type: CategoryType;
  readonly color: CategoryColor;
  readonly isDefault: boolean;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}
