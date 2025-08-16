import { describe, it, expect } from "vitest";
import {
  CATEGORY_CONSTRAINTS,
  CATEGORY_TYPES,
  CATEGORY_TYPE_VALUES,
  CATEGORY_TYPE_LABELS,
  CATEGORY_TYPE_COLORS,
  DEFAULT_CATEGORY_COLORS,
  CATEGORY_MESSAGES,
  CATEGORY_TYPE_OPTIONS,
} from "@/core/domain/category/constants/category-constants";

describe("Category Constants", () => {
  describe("CATEGORY_CONSTRAINTS", () => {
    it("should have correct name constraints", () => {
      expect(CATEGORY_CONSTRAINTS.NAME.MIN_LENGTH).toBe(2);
      expect(CATEGORY_CONSTRAINTS.NAME.MAX_LENGTH).toBe(50);
      expect(CATEGORY_CONSTRAINTS.NAME.PATTERN).toBeInstanceOf(RegExp);
    });

    it("should have correct description constraints", () => {
      expect(CATEGORY_CONSTRAINTS.DESCRIPTION.MAX_LENGTH).toBe(200);
    });

    it("should have correct color constraints", () => {
      expect(CATEGORY_CONSTRAINTS.COLOR.PATTERN).toBeInstanceOf(RegExp);
      expect(CATEGORY_CONSTRAINTS.COLOR.DEFAULT).toBe("#6B7280");
    });
  });

  describe("CATEGORY_TYPES", () => {
    it("should have all required category types", () => {
      expect(CATEGORY_TYPES).toHaveProperty("INCOME");
      expect(CATEGORY_TYPES).toHaveProperty("EXPENSE");
      expect(CATEGORY_TYPES).toHaveProperty("INVESTMENT");
      expect(CATEGORY_TYPES).toHaveProperty("TRANSFER");
    });

    it("should have correct number of types", () => {
      expect(Object.keys(CATEGORY_TYPES)).toHaveLength(4);
    });
  });

  describe("CATEGORY_TYPE_VALUES", () => {
    it("should contain all category type values", () => {
      expect(CATEGORY_TYPE_VALUES).toContain("income");
      expect(CATEGORY_TYPE_VALUES).toContain("expense");
      expect(CATEGORY_TYPE_VALUES).toContain("investment");
      expect(CATEGORY_TYPE_VALUES).toContain("transfer");
    });
  });

  describe("CATEGORY_TYPE_LABELS", () => {
    it("should have correct labels for each type", () => {
      expect(CATEGORY_TYPE_LABELS[CATEGORY_TYPES.INCOME]).toBe("Income");
      expect(CATEGORY_TYPE_LABELS[CATEGORY_TYPES.EXPENSE]).toBe("Expense");
      expect(CATEGORY_TYPE_LABELS[CATEGORY_TYPES.INVESTMENT]).toBe(
        "Investment"
      );
      expect(CATEGORY_TYPE_LABELS[CATEGORY_TYPES.TRANSFER]).toBe("Transfer");
    });
  });

  describe("CATEGORY_TYPE_COLORS", () => {
    it("should have correct colors for each type", () => {
      expect(CATEGORY_TYPE_COLORS[CATEGORY_TYPES.INCOME]).toBe("green");
      expect(CATEGORY_TYPE_COLORS[CATEGORY_TYPES.EXPENSE]).toBe("red");
      expect(CATEGORY_TYPE_COLORS[CATEGORY_TYPES.INVESTMENT]).toBe("blue");
      expect(CATEGORY_TYPE_COLORS[CATEGORY_TYPES.TRANSFER]).toBe("purple");
    });
  });

  describe("DEFAULT_CATEGORY_COLORS", () => {
    it("should contain valid hex colors", () => {
      expect(DEFAULT_CATEGORY_COLORS).toHaveLength(10);
      DEFAULT_CATEGORY_COLORS.forEach((color) => {
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it("should contain specific expected colors", () => {
      expect(DEFAULT_CATEGORY_COLORS).toContain("#EF4444"); // red-500
      expect(DEFAULT_CATEGORY_COLORS).toContain("#22C55E"); // green-500
      expect(DEFAULT_CATEGORY_COLORS).toContain("#3B82F6"); // blue-500
    });
  });

  describe("CATEGORY_MESSAGES", () => {
    describe("VALIDATION", () => {
      it("should have name validation messages", () => {
        expect(CATEGORY_MESSAGES.VALIDATION.NAME_REQUIRED).toBe(
          "Category name is required"
        );
        expect(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_SHORT).toBe(
          "Category name must be at least 2 characters"
        );
        expect(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_LONG).toBe(
          "Category name cannot exceed 50 characters"
        );
        expect(CATEGORY_MESSAGES.VALIDATION.NAME_INVALID_CHARS).toBe(
          "Category name contains invalid characters"
        );
      });

      it("should have description validation messages", () => {
        expect(CATEGORY_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG).toBe(
          "Description cannot exceed 200 characters"
        );
      });

      it("should have color validation messages", () => {
        expect(CATEGORY_MESSAGES.VALIDATION.COLOR_INVALID).toBe(
          "Color must be a valid hex color code"
        );
      });

      it("should have other validation messages", () => {
        expect(CATEGORY_MESSAGES.VALIDATION.TYPE_INVALID).toBe(
          "Invalid category type"
        );
        expect(CATEGORY_MESSAGES.VALIDATION.USER_ID_REQUIRED).toBe(
          "User ID is required"
        );
        expect(CATEGORY_MESSAGES.VALIDATION.CATEGORY_ID_REQUIRED).toBe(
          "Category ID is required"
        );
      });
    });

    describe("BUSINESS", () => {
      it("should have business rule messages", () => {
        expect(CATEGORY_MESSAGES.BUSINESS.DUPLICATE_NAME).toBe(
          "A category with this name already exists"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_DEFAULT).toBe(
          "Cannot delete default category"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_IN_USE).toBe(
          "Cannot delete category that is being used by transactions"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.ACCESS_DENIED).toBe(
          "Access denied to this category"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND).toBe(
          "Category not found"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.CATEGORY_ALREADY_EXISTS).toBe(
          "Category already exists"
        );
        expect(CATEGORY_MESSAGES.BUSINESS.MAX_CATEGORIES_REACHED).toBe(
          "Maximum categories limit reached"
        );
      });
    });
  });

  describe("CATEGORY_TYPE_OPTIONS", () => {
    it("should contain all category types with labels and colors", () => {
      expect(CATEGORY_TYPE_OPTIONS).toHaveLength(4);

      const incomeOption = CATEGORY_TYPE_OPTIONS.find(
        (opt) => opt.value === "income"
      );
      expect(incomeOption).toEqual({
        value: "income",
        label: "Income",
        color: "green",
      });

      const expenseOption = CATEGORY_TYPE_OPTIONS.find(
        (opt) => opt.value === "expense"
      );
      expect(expenseOption).toEqual({
        value: "expense",
        label: "Expense",
        color: "red",
      });
    });
  });

  describe("Constants consistency", () => {
    it("should have consistent number of types and labels", () => {
      const typeCount = Object.keys(CATEGORY_TYPES).length;
      const labelCount = Object.keys(CATEGORY_TYPE_LABELS).length;
      const colorCount = Object.keys(CATEGORY_TYPE_COLORS).length;

      expect(typeCount).toBe(labelCount);
      expect(typeCount).toBe(colorCount);
    });

    it("should have all types covered in labels and colors", () => {
      Object.values(CATEGORY_TYPES).forEach((type) => {
        expect(CATEGORY_TYPE_LABELS).toHaveProperty(type);
        expect(CATEGORY_TYPE_COLORS).toHaveProperty(type);
      });
    });

    it("should have all type values in CATEGORY_TYPE_VALUES", () => {
      Object.values(CATEGORY_TYPES).forEach((type) => {
        expect(CATEGORY_TYPE_VALUES).toContain(type);
      });
    });
  });
});
