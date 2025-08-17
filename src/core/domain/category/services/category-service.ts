import { Category } from "@/core/domain/category/models/category";

/**
 * Core business logic for Category operations within the category bounded context
 */
export interface CategoryService {
  /**
   * Get all categories for a user
   */
  getUserCategories(userId: string): Promise<Category[]>;

  /**
   * Get categories by type for a user
   */
  getCategoriesByType(userId: string, type: string): Promise<Category[]>;

  /**
   * Get category by ID (with user ownership validation)
   */
  getCategoryById(id: string, userId: string): Promise<Category>;

  /**
   * Create a new category with business validation
   */
  createCategory(params: {
    name: string;
    description?: string;
    type: string;
    color?: string;
    userId: string;
  }): Promise<Category>;

  /**
   * Update category with business validation
   */
  updateCategory(
    id: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      type?: string;
      color?: string;
      isDefault?: boolean;
    }
  ): Promise<Category>;

  /**
   * Delete category (with business rules validation)
   */
  deleteCategory(id: string, userId: string): Promise<void>;

  /**
   * Get default categories for a specific type
   */
  getDefaultCategories(type: string): Promise<Category[]>;

  /**
   * Check if category name exists for user
   */
  categoryNameExists(
    name: string,
    userId: string,
    excludeId?: string
  ): Promise<boolean>;

  /**
   * Get category usage statistics
   */
  getCategoryUsageStats(userId: string): Promise<{
    totalCategories: number;
    categoriesByType: Record<string, number>;
    mostUsedCategories: Array<{ id: string; name: string; usageCount: number }>;
  }>;

  /**
   * Bulk create default categories for a new user
   */
  createDefaultCategoriesForUser(userId: string): Promise<Category[]>;

  /**
   * Validate category data without persistence
   */
  validateCategoryData(params: {
    name: string;
    description?: string;
    type: string;
    color?: string;
  }): Promise<{
    isValid: boolean;
    errors: string[];
  }>;
}
