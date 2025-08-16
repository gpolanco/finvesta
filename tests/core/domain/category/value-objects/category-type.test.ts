import { describe, it, expect } from "vitest";
import { CategoryType } from "@/core/domain/category/value-objects/category-type";
import { InvalidCategoryTypeError } from "@/core/domain/category/errors/category-errors";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowLeftRight,
} from "lucide-react";

describe("CategoryType", () => {
  describe("factory methods", () => {
    it("should create income type", () => {
      const type = CategoryType.income();
      expect(type.getValue()).toBe("income");
      expect(type.getLabel()).toBe("Income");
      expect(type.getIcon()).toBe(TrendingUp);
      expect(type.getColor()).toBe("green");
    });

    it("should create expense type", () => {
      const type = CategoryType.expense();
      expect(type.getValue()).toBe("expense");
      expect(type.getLabel()).toBe("Expense");
      expect(type.getIcon()).toBe(TrendingDown);
      expect(type.getColor()).toBe("red");
    });

    it("should create investment type", () => {
      const type = CategoryType.investment();
      expect(type.getValue()).toBe("investment");
      expect(type.getLabel()).toBe("Investment");
      expect(type.getIcon()).toBe(PiggyBank);
      expect(type.getColor()).toBe("blue");
    });

    it("should create transfer type", () => {
      const type = CategoryType.transfer();
      expect(type.getValue()).toBe("transfer");
      expect(type.getLabel()).toBe("Transfer");
      expect(type.getIcon()).toBe(ArrowLeftRight);
      expect(type.getColor()).toBe("purple");
    });
  });

  describe("fromString", () => {
    it("should create type from valid string", () => {
      expect(CategoryType.fromString("income")).toEqual(CategoryType.income());
      expect(CategoryType.fromString("expense")).toEqual(
        CategoryType.expense()
      );
      expect(CategoryType.fromString("investment")).toEqual(
        CategoryType.investment()
      );
      expect(CategoryType.fromString("transfer")).toEqual(
        CategoryType.transfer()
      );
    });

    it("should throw error for invalid string", () => {
      expect(() => CategoryType.fromString("invalid")).toThrow(
        InvalidCategoryTypeError
      );
      expect(() => CategoryType.fromString("")).toThrow(
        InvalidCategoryTypeError
      );
    });
  });

  describe("getAllTypes", () => {
    it("should return all available types", () => {
      const types = CategoryType.getAllTypes();
      expect(types).toHaveLength(4);
      expect(types).toContainEqual(CategoryType.income());
      expect(types).toContainEqual(CategoryType.expense());
      expect(types).toContainEqual(CategoryType.investment());
      expect(types).toContainEqual(CategoryType.transfer());
    });
  });

  describe("getTypeOptions", () => {
    it("should return type options for UI", () => {
      const options = CategoryType.getTypeOptions();
      expect(options).toHaveLength(4);

      const incomeOption = options.find((opt) => opt.value === "income");
      expect(incomeOption).toEqual({
        value: "income",
        label: "Income",
        icon: TrendingUp,
        color: "green",
      });
    });
  });

  describe("type checking methods", () => {
    it("should correctly identify income type", () => {
      const type = CategoryType.income();
      expect(type.isIncome()).toBe(true);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify expense type", () => {
      const type = CategoryType.expense();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(true);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify investment type", () => {
      const type = CategoryType.investment();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(true);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify transfer type", () => {
      const type = CategoryType.transfer();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(true);
    });
  });

  describe("equals", () => {
    it("should return true for same types", () => {
      const type1 = CategoryType.income();
      const type2 = CategoryType.income();
      expect(type1.equals(type2)).toBe(true);
    });

    it("should return false for different types", () => {
      const type1 = CategoryType.income();
      const type2 = CategoryType.expense();
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the value", () => {
      const type = CategoryType.income();
      expect(type.toString()).toBe("income");
    });
  });
});
