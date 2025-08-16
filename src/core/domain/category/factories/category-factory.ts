import { Category } from "@/core/domain/category/models/category";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";
import {
  DuplicateCategoryNameError,
  CategoryNotFoundError,
  CannotDeleteDefaultCategoryError,
  CannotDeleteCategoryInUseError,
} from "@/core/domain/category/errors/category-errors";
import { CategoryRepository } from "@/core/domain/category/repositories/category-repository";

/**
 * Factory for creating and updating Category instances
 * Handles business logic for category creation and updates
 */
export class CategoryFactory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  /**
   * Create a new category with validation
   */
  async create(params: {
    name: string;
    description?: string;
    type: string;
    color?: string;
    userId: string;
  }): Promise<Category> {
    // Validate and create value objects
    const categoryName = CategoryName.create(params.name);
    const categoryDescription = CategoryDescription.create(params.description);
    const categoryType = CategoryType.fromString(params.type);
    const categoryColor = params.color
      ? CategoryColor.create(params.color)
      : CategoryColor.createRandom();

    // Check for duplicate names
    const nameExists = await this.categoryRepository.nameExists(
      categoryName,
      params.userId
    );

    if (nameExists) {
      throw new DuplicateCategoryNameError();
    }

    // Create category data
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
      type: categoryType,
      color: categoryColor,
      isDefault: false,
      userId: params.userId,
    };

    // Persist to repository
    return this.categoryRepository.create(categoryData);
  }

  /**
   * Update an existing category with validation
   */
  async update(
    id: string,
    userId: string,
    updates: {
      name?: string;
      description?: string;
      type?: string;
      color?: string;
      isDefault?: boolean;
    }
  ): Promise<Category> {
    // Verify category ownership
    const existingCategory = await this.categoryRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!existingCategory) {
      throw new CategoryNotFoundError();
    }

    // Prepare update data with correct types
    const updateData: Partial<{
      name: CategoryName;
      description: CategoryDescription;
      type: CategoryType;
      color: CategoryColor;
      isDefault: boolean;
    }> = {};

    // Handle name update with duplicate check
    if (updates.name !== undefined) {
      const newName = CategoryName.create(updates.name);

      // Check for duplicate names (excluding current category)
      const nameExists = await this.categoryRepository.nameExists(
        newName,
        userId,
        id
      );

      if (nameExists) {
        throw new DuplicateCategoryNameError();
      }

      updateData.name = newName;
    }

    // Handle description update
    if (updates.description !== undefined) {
      updateData.description = CategoryDescription.create(updates.description);
    }

    // Handle type update
    if (updates.type !== undefined) {
      updateData.type = CategoryType.fromString(updates.type);
    }

    // Handle color update
    if (updates.color !== undefined) {
      updateData.color = CategoryColor.create(updates.color);
    }

    // Handle isDefault update
    if (updates.isDefault !== undefined) {
      updateData.isDefault = updates.isDefault;
    }

    // Apply updates
    return this.categoryRepository.update(id, updateData);
  }

  /**
   * Delete a category with business rules validation
   */
  async delete(id: string, userId: string): Promise<void> {
    // Verify category ownership
    const existingCategory = await this.categoryRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!existingCategory) {
      throw new CategoryNotFoundError();
    }

    // Check if it's a default category
    if (existingCategory.isDefault) {
      throw new CannotDeleteDefaultCategoryError();
    }

    // Check if category is in use
    const isInUse = await this.categoryRepository.isInUse(id);
    if (isInUse) {
      throw new CannotDeleteCategoryInUseError();
    }

    // Delete the category
    await this.categoryRepository.delete(id);
  }

  /**
   * Create Category instance from database data
   */
  static fromDatabase(data: {
    id: string;
    name: string;
    description?: string;
    type: string;
    color: string;
    is_default: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  }): Category {
    return {
      id: data.id,
      name: CategoryName.create(data.name),
      description: CategoryDescription.create(data.description),
      type: CategoryType.fromString(data.type),
      color: CategoryColor.create(data.color),
      isDefault: data.is_default,
      userId: data.user_id,
      createdAt: new Date(data.created_at),
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
    };
  }

  /**
   * Convert Category to database format
   */
  static toDatabase(category: Category): {
    id: string;
    name: string;
    description?: string;
    type: string;
    color: string;
    is_default: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  } {
    return {
      id: category.id,
      name: category.name.getValue(),
      description: category.description?.getValue(),
      type: category.type.getValue(),
      color: category.color.getValue(),
      is_default: category.isDefault,
      user_id: category.userId,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt?.toISOString(),
    };
  }
}
