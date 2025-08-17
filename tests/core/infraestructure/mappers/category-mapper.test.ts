import { describe, it, expect } from "vitest";
import { CategoryMapper } from "@/core/infraestructure/mappers";
import { Category as DomainCategory } from "@/core/domain/category/models/category";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";

describe("CategoryMapper", () => {
  const mockPrismaCategory = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Alimentacion",
    description: "Gastos en comida y bebidas",
    type: "expense",
    color: "#FF6B6B",
    isDefault: false,
    userId: "user-123",
    isActive: true,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  };

  const mockDomainCategory: Omit<
    DomainCategory,
    "id" | "createdAt" | "updatedAt"
  > = {
    name: CategoryName.create("Alimentacion"),
    description: CategoryDescription.create("Gastos en comida y bebidas"),
    type: CategoryType.fromString("expense"),
    color: CategoryColor.create("#FF6B6B"),
    isDefault: false,
    userId: "user-123",
  };

  describe("toDomain", () => {
    it("should convert Prisma Category to Domain Category successfully", () => {
      const result = CategoryMapper.toDomain(mockPrismaCategory);

      expect(result.id).toBe(mockPrismaCategory.id);
      expect(result.name.getValue()).toBe(mockPrismaCategory.name);
      expect(result.description?.getValue()).toBe(
        mockPrismaCategory.description
      );
      expect(result.type.getValue()).toBe(mockPrismaCategory.type);
      expect(result.color.getValue()).toBe(mockPrismaCategory.color);
      expect(result.isDefault).toBe(mockPrismaCategory.isDefault);
      expect(result.userId).toBe(mockPrismaCategory.userId);
      // isActive is not in domain model
      expect(result.createdAt).toEqual(mockPrismaCategory.createdAt);
      expect(result.updatedAt).toEqual(mockPrismaCategory.updatedAt);
    });

    it("should handle null description", () => {
      const prismaCategoryWithNullDescription = {
        ...mockPrismaCategory,
        description: null,
      };

      const result = CategoryMapper.toDomain(prismaCategoryWithNullDescription);
      expect(result.description).toBeUndefined();
    });

    it("should handle empty description", () => {
      const prismaCategoryWithEmptyDescription = {
        ...mockPrismaCategory,
        description: "",
      };

      const result = CategoryMapper.toDomain(
        prismaCategoryWithEmptyDescription
      );
      expect(result.description).toBeUndefined(); // Empty string becomes undefined in domain
    });

    it("should handle default category", () => {
      const prismaCategoryDefault = {
        ...mockPrismaCategory,
        isDefault: true,
      };

      const result = CategoryMapper.toDomain(prismaCategoryDefault);
      expect(result.isDefault).toBe(true);
    });

    it("should handle inactive category", () => {
      const prismaCategoryInactive = {
        ...mockPrismaCategory,
        isActive: false,
      };

      CategoryMapper.toDomain(prismaCategoryInactive);
      // isActive is not in domain model
    });
  });

  describe("toDatabase", () => {
    it("should convert Domain Category to Prisma Category successfully", () => {
      const result = CategoryMapper.toDatabase(mockDomainCategory);

      expect(result.name).toBe(mockDomainCategory.name.getValue());
      expect(result.description).toBe(
        mockDomainCategory.description?.getValue()
      );
      expect(result.type).toBe(mockDomainCategory.type.getValue());
      expect(result.color).toBe(mockDomainCategory.color.getValue());
      expect(result.isDefault).toBe(mockDomainCategory.isDefault);
      expect(result.userId).toBe(mockDomainCategory.userId);
      // isActive is not in domain model
    });

    it("should handle undefined description", () => {
      const domainCategoryWithoutDescription = {
        ...mockDomainCategory,
        description: undefined,
      };

      const result = CategoryMapper.toDatabase(
        domainCategoryWithoutDescription
      );
      expect(result.description).toBeNull();
    });

    it("should handle empty description", () => {
      const domainCategoryWithEmptyDescription = {
        ...mockDomainCategory,
        description: CategoryDescription.create(""),
      };

      const result = CategoryMapper.toDatabase(
        domainCategoryWithEmptyDescription
      );
      expect(result.description).toBeNull(); // Empty string becomes null in database
    });

    it("should handle default category", () => {
      const domainCategoryDefault = {
        ...mockDomainCategory,
        isDefault: true,
      };

      const result = CategoryMapper.toDatabase(domainCategoryDefault);
      expect(result.isDefault).toBe(true);
    });

    it("should handle inactive category", () => {
      const domainCategoryInactive = {
        ...mockDomainCategory,
        // isActive is not in domain model
      };

      CategoryMapper.toDatabase(domainCategoryInactive);
      // isActive is not in domain model
    });
  });

  describe("toDatabaseUpdate", () => {
    it("should convert partial Domain Category to Prisma update data", () => {
      const partialData = {
        name: CategoryName.create("Nuevo Nombre"),
        color: CategoryColor.create("#4ECDC4"),
      };

      const result = CategoryMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBe("Nuevo Nombre");
      expect(result.color).toBe("#4ECDC4");
      expect(result.description).toBeUndefined();
      expect(result.type).toBeUndefined();
      expect(result.isDefault).toBeUndefined();
      expect(result.userId).toBeUndefined();
      // isActive is not in domain model
    });

    it("should handle empty partial data", () => {
      const result = CategoryMapper.toDatabaseUpdate({});

      expect(result.name).toBeUndefined();
      expect(result.description).toBeUndefined();
      expect(result.type).toBeUndefined();
      expect(result.color).toBeUndefined();
      expect(result.isDefault).toBeUndefined();
      expect(result.userId).toBeUndefined();
      // isActive is not in domain model
    });

    it("should handle single field update", () => {
      const partialData = {
        name: CategoryName.create("Solo Nombre"),
      };

      const result = CategoryMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBe("Solo Nombre");
      expect(result.description).toBeUndefined();
      expect(result.type).toBeUndefined();
    });

    it("should handle description update", () => {
      const partialData = {
        description: CategoryDescription.create("Nueva descripción"),
      };

      const result = CategoryMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBeUndefined();
      expect(result.description).toBe("Nueva descripción");
      expect(result.type).toBeUndefined();
    });

    it("should handle type and color updates", () => {
      const partialData = {
        type: CategoryType.fromString("income"),
        color: CategoryColor.create("#45B7D1"),
      };

      const result = CategoryMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBeUndefined();
      expect(result.description).toBeUndefined();
      expect(result.type).toBe("income");
      expect(result.color).toBe("#45B7D1");
    });
  });

  describe("edge cases", () => {
    it("should handle very long category names", () => {
      const longName = "A".repeat(50); // Max length is 50
      const prismaCategoryWithLongName = {
        ...mockPrismaCategory,
        name: longName,
      };

      const result = CategoryMapper.toDomain(prismaCategoryWithLongName);
      expect(result.name.getValue()).toBe(longName);
    });

    it("should handle very long descriptions", () => {
      const longDescription = "A".repeat(200); // Max length is 200
      const prismaCategoryWithLongDescription = {
        ...mockPrismaCategory,
        description: longDescription,
      };

      const result = CategoryMapper.toDomain(prismaCategoryWithLongDescription);
      expect(result.description?.getValue()).toBe(longDescription);
    });

    it("should handle different color formats", () => {
      const colorFormats = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

      colorFormats.forEach((color) => {
        const prismaCategoryWithColor = {
          ...mockPrismaCategory,
          color,
        };

        const result = CategoryMapper.toDomain(prismaCategoryWithColor);
        expect(result.color.getValue()).toBe(color);
      });
    });

    it("should handle different category types", () => {
      const categoryTypes = ["expense", "income", "transfer"];

      categoryTypes.forEach((type) => {
        const prismaCategoryWithType = {
          ...mockPrismaCategory,
          type,
        };

        const result = CategoryMapper.toDomain(prismaCategoryWithType);
        expect(result.type.getValue()).toBe(type);
      });
    });
  });
});
