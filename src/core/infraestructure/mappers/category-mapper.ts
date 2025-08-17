import { Category as PrismaCategory } from "@prisma/client";
import { Category as DomainCategory } from "@/core/domain/category/models/category";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";

/**
 * Mapper to convert between Database Category and Domain Category
 * This ensures proper separation between infrastructure and domain layers
 */
export class CategoryMapper {
  /**
   * Convert Database Category to Domain Category
   */
  static toDomain(databaseCategory: PrismaCategory): DomainCategory {
    return {
      id: databaseCategory.id,
      name: CategoryName.create(databaseCategory.name),
      description: databaseCategory.description
        ? CategoryDescription.create(databaseCategory.description)
        : undefined,
      type: CategoryType.fromString(databaseCategory.type),
      color: CategoryColor.create(databaseCategory.color),
      isDefault: databaseCategory.isDefault,
      userId: databaseCategory.userId,
      createdAt: databaseCategory.createdAt,
      updatedAt: databaseCategory.updatedAt,
    };
  }

  /**
   * Convert Domain Category to Database Category (for creation/updates)
   */
  static toDatabase(
    domainCategory: Omit<DomainCategory, "id" | "createdAt" | "updatedAt">
  ): Omit<PrismaCategory, "id" | "createdAt" | "updatedAt" | "isActive"> {
    return {
      name: domainCategory.name.getValue(),
      description: domainCategory.description?.getValue() ?? null,
      type: domainCategory.type.getValue(),
      color: domainCategory.color.getValue(),
      isDefault: domainCategory.isDefault,
      userId: domainCategory.userId,
    };
  }

  /**
   * Convert Domain Category to Database Category (for updates)
   */
  static toDatabaseUpdate(
    domainCategory: Partial<
      Omit<DomainCategory, "id" | "createdAt" | "updatedAt">
    >
  ): Partial<
    Omit<PrismaCategory, "id" | "createdAt" | "updatedAt" | "isActive">
  > {
    const update: Partial<
      Omit<PrismaCategory, "id" | "createdAt" | "updatedAt" | "isActive">
    > = {};

    if (domainCategory.name) update.name = domainCategory.name.getValue();
    if (domainCategory.description !== undefined) {
      update.description = domainCategory.description?.getValue();
    }
    if (domainCategory.type) update.type = domainCategory.type.getValue();
    if (domainCategory.color) update.color = domainCategory.color.getValue();
    if (domainCategory.isDefault !== undefined)
      update.isDefault = domainCategory.isDefault;
    if (domainCategory.userId) update.userId = domainCategory.userId;

    return update;
  }
}
