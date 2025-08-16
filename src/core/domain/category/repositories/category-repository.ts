import { Category } from "@/core/domain/category/models/category";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";

/**
 * Repository interface for Category domain
 * Defines the contract for data access within the category bounded context
 */
export interface CategoryRepository {
  /**
   * Find all categories for a specific user
   */
  findByUserId(userId: string): Promise<Category[]>;

  /**
   * Find categories by type for a specific user
   */
  findByTypeAndUserId(type: CategoryType, userId: string): Promise<Category[]>;

  /**
   * Find category by ID
   */
  findById(id: string): Promise<Category | null>;

  /**
   * Find category by ID and user ID (security check)
   */
  findByIdAndUserId(id: string, userId: string): Promise<Category | null>;

  /**
   * Find category by name and user ID
   */
  findByNameAndUserId(
    name: CategoryName,
    userId: string
  ): Promise<Category | null>;

  /**
   * Find default categories for a specific type
   */
  findDefaultByType(type: CategoryType): Promise<Category[]>;

  /**
   * Create a new category
   */
  create(
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ): Promise<Category>;

  /**
   * Update an existing category
   */
  update(
    id: string,
    updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>
  ): Promise<Category>;

  /**
   * Soft delete a category (set isDefault to false)
   */
  deactivate(id: string): Promise<void>;

  /**
   * Hard delete a category (use with caution)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if category exists and belongs to user
   */
  exists(id: string, userId: string): Promise<boolean>;

  /**
   * Check if category name exists for user
   */
  nameExists(
    name: CategoryName,
    userId: string,
    excludeId?: string
  ): Promise<boolean>;

  /**
   * Check if category is being used by transactions
   */
  isInUse(id: string): Promise<boolean>;

  /**
   * Get category usage count
   */
  getUsageCount(id: string): Promise<number>;
}
