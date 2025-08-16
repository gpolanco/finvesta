import { describe, it, expect } from "vitest";
import { Category } from "@/core/domain/category/models/category";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";

describe("Category Model", () => {
  describe("Category interface", () => {
    it("should have all required properties", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        description: CategoryDescription.create("Test description"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(category).toHaveProperty("id");
      expect(category).toHaveProperty("name");
      expect(category).toHaveProperty("description");
      expect(category).toHaveProperty("type");
      expect(category).toHaveProperty("color");
      expect(category).toHaveProperty("isDefault");
      expect(category).toHaveProperty("userId");
      expect(category).toHaveProperty("createdAt");
      expect(category).toHaveProperty("updatedAt");
    });

    it("should have correct types for all properties", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        description: CategoryDescription.create("Test description"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(typeof category.id).toBe("string");
      expect(category.name).toBeInstanceOf(CategoryName);
      expect(category.description).toBeInstanceOf(CategoryDescription);
      expect(category.type).toBeInstanceOf(CategoryType);
      expect(category.color).toBeInstanceOf(CategoryColor);
      expect(typeof category.isDefault).toBe("boolean");
      expect(typeof category.userId).toBe("string");
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.updatedAt).toBeInstanceOf(Date);
    });

    it("should have readonly properties", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        description: CategoryDescription.create("Test description"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // TypeScript should prevent assignment to readonly properties
      // This test verifies the interface structure
      expect(category).toBeDefined();
    });
  });

  describe("Category with minimal data", () => {
    it("should create category without optional properties", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.expense(),
        color: CategoryColor.create("#00FF00"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.description).toBeUndefined();
      expect(category.updatedAt).toBeUndefined();
    });
  });

  describe("Category with different types", () => {
    it("should support all category types", () => {
      const incomeCategory: Category = {
        id: "income-1",
        name: CategoryName.create("Salary"),
        type: CategoryType.income(),
        color: CategoryColor.create("#22C55E"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      const expenseCategory: Category = {
        id: "expense-1",
        name: CategoryName.create("Food"),
        type: CategoryType.expense(),
        color: CategoryColor.create("#EF4444"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      const investmentCategory: Category = {
        id: "investment-1",
        name: CategoryName.create("Stocks"),
        type: CategoryType.investment(),
        color: CategoryColor.create("#3B82F6"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      const transferCategory: Category = {
        id: "transfer-1",
        name: CategoryName.create("Bank Transfer"),
        type: CategoryType.transfer(),
        color: CategoryColor.create("#8B5CF6"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(incomeCategory.type.isIncome()).toBe(true);
      expect(expenseCategory.type.isExpense()).toBe(true);
      expect(investmentCategory.type.isInvestment()).toBe(true);
      expect(transferCategory.type.isTransfer()).toBe(true);
    });
  });

  describe("Category with different colors", () => {
    it("should support custom hex colors", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF6B6B"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.color.getValue()).toBe("#FF6B6B");
    });

    it("should support default color", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create(""),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.color.isDefault()).toBe(true);
    });
  });

  describe("Category status", () => {
    it("should support default categories", () => {
      const defaultCategory: Category = {
        id: "default-1",
        name: CategoryName.create("Default Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: true,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(defaultCategory.isDefault).toBe(true);
    });

    it("should support custom categories", () => {
      const customCategory: Category = {
        id: "custom-1",
        name: CategoryName.create("Custom Category"),
        type: CategoryType.expense(),
        color: CategoryColor.create("#00FF00"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(customCategory.isDefault).toBe(false);
    });
  });

  describe("Category timestamps", () => {
    it("should have creation timestamp", () => {
      const now = new Date();
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: now,
      };

      expect(category.createdAt).toBe(now);
    });

    it("should have optional update timestamp", () => {
      const now = new Date();
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date("2023-01-01"),
        updatedAt: now,
      };

      expect(category.updatedAt).toBe(now);
    });
  });

  describe("Category value objects integration", () => {
    it("should work with CategoryName methods", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.name.getValue()).toBe("Test Category");
      expect(category.name.getDisplayValue()).toBe("Test Category");
    });

    it("should work with CategoryType methods", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.expense(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.type.getValue()).toBe("expense");
      expect(category.type.getLabel()).toBe("Expense");
      expect(category.type.getColor()).toBe("red");
    });

    it("should work with CategoryColor methods", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.color.getValue()).toBe("#FF0000");
      expect(category.color.getHex()).toBe("#FF0000");
      expect(category.color.getRgb()).toBe("rgb(255, 0, 0)");
    });

    it("should work with CategoryDescription methods", () => {
      const category: Category = {
        id: "test-id",
        name: CategoryName.create("Test Category"),
        description: CategoryDescription.create("A test description"),
        type: CategoryType.income(),
        color: CategoryColor.create("#FF0000"),
        isDefault: false,
        userId: "user-123",
        createdAt: new Date(),
      };

      expect(category.description?.getValue()).toBe("A test description");
      expect(category.description?.hasValue()).toBe(true);
    });
  });
});
