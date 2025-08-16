import { describe, it, expect } from "vitest";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";
import { InvalidTransactionTypeError } from "@/core/domain/transaction/errors/transaction-errors";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ArrowRightLeft,
} from "lucide-react";

describe("TransactionType", () => {
  describe("factory methods", () => {
    it("should create income type", () => {
      const type = TransactionType.income();
      expect(type.getValue()).toBe("income");
      expect(type.getLabel()).toBe("Income");
      expect(type.getIcon()).toBe(ArrowUpRight);
      expect(type.getColor()).toBe("green");
      expect(type.getBadgeColor()).toBe(
        "bg-green-50 text-green-700 border-green-200"
      );
      expect(type.getIconColor()).toBe("text-green-600");
      expect(type.getAmountColor()).toBe("text-green-600");
      expect(type.getPrimaryColor()).toBe("green");
      expect(type.getAmountPrefix()).toBe("+");
    });

    it("should create expense type", () => {
      const type = TransactionType.expense();
      expect(type.getValue()).toBe("expense");
      expect(type.getLabel()).toBe("Expense");
      expect(type.getIcon()).toBe(ArrowDownRight);
      expect(type.getColor()).toBe("red");
      expect(type.getBadgeColor()).toBe(
        "bg-red-50 text-red-700 border-red-200"
      );
      expect(type.getIconColor()).toBe("text-red-600");
      expect(type.getAmountColor()).toBe("text-red-600");
      expect(type.getPrimaryColor()).toBe("red");
      expect(type.getAmountPrefix()).toBe("-");
    });

    it("should create investment type", () => {
      const type = TransactionType.investment();
      expect(type.getValue()).toBe("investment");
      expect(type.getLabel()).toBe("Investment");
      expect(type.getIcon()).toBe(TrendingUp);
      expect(type.getColor()).toBe("blue");
      expect(type.getBadgeColor()).toBe(
        "bg-blue-50 text-blue-700 border-blue-200"
      );
      expect(type.getIconColor()).toBe("text-blue-600");
      expect(type.getAmountColor()).toBe("text-blue-600");
      expect(type.getPrimaryColor()).toBe("blue");
      expect(type.getAmountPrefix()).toBe("+");
    });

    it("should create transfer type", () => {
      const type = TransactionType.transfer();
      expect(type.getValue()).toBe("transfer");
      expect(type.getLabel()).toBe("Transfer");
      expect(type.getIcon()).toBe(ArrowRightLeft);
      expect(type.getColor()).toBe("gray");
      expect(type.getBadgeColor()).toBe(
        "bg-gray-50 text-gray-700 border-gray-200"
      );
      expect(type.getIconColor()).toBe("text-gray-600");
      expect(type.getAmountColor()).toBe("text-gray-600");
      expect(type.getPrimaryColor()).toBe("gray");
      expect(type.getAmountPrefix()).toBe("");
    });
  });

  describe("fromString", () => {
    it("should create type from valid string", () => {
      expect(TransactionType.fromString("income")).toEqual(
        TransactionType.income()
      );
      expect(TransactionType.fromString("expense")).toEqual(
        TransactionType.expense()
      );
      expect(TransactionType.fromString("investment")).toEqual(
        TransactionType.investment()
      );
      expect(TransactionType.fromString("transfer")).toEqual(
        TransactionType.transfer()
      );
    });

    it("should throw error for invalid string", () => {
      expect(() => TransactionType.fromString("invalid")).toThrow(
        InvalidTransactionTypeError
      );
      expect(() => TransactionType.fromString("")).toThrow(
        InvalidTransactionTypeError
      );
    });
  });

  describe("getAllTypes", () => {
    it("should return all available types", () => {
      const types = TransactionType.getAllTypes();
      expect(types).toHaveLength(4);
      expect(types).toContainEqual(TransactionType.income());
      expect(types).toContainEqual(TransactionType.expense());
      expect(types).toContainEqual(TransactionType.investment());
      expect(types).toContainEqual(TransactionType.transfer());
    });
  });

  describe("getTypeOptions", () => {
    it("should return type options for UI", () => {
      const options = TransactionType.getTypeOptions();
      expect(options).toHaveLength(4);

      const incomeOption = options.find((opt) => opt.value === "income");
      expect(incomeOption).toEqual({
        value: "income",
        label: "Income",
        icon: ArrowUpRight,
        color: "green",
        badgeColor: "bg-green-50 text-green-700 border-green-200",
        iconColor: "text-green-600",
        amountColor: "text-green-600",
        primaryColor: "green",
        amountPrefix: "+",
      });

      const expenseOption = options.find((opt) => opt.value === "expense");
      expect(expenseOption).toEqual({
        value: "expense",
        label: "Expense",
        icon: ArrowDownRight,
        color: "red",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        iconColor: "text-red-600",
        amountColor: "text-red-600",
        primaryColor: "red",
        amountPrefix: "-",
      });
    });
  });

  describe("type checking methods", () => {
    it("should correctly identify income type", () => {
      const type = TransactionType.income();
      expect(type.isIncome()).toBe(true);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify expense type", () => {
      const type = TransactionType.expense();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(true);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify investment type", () => {
      const type = TransactionType.investment();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(true);
      expect(type.isTransfer()).toBe(false);
    });

    it("should correctly identify transfer type", () => {
      const type = TransactionType.transfer();
      expect(type.isIncome()).toBe(false);
      expect(type.isExpense()).toBe(false);
      expect(type.isInvestment()).toBe(false);
      expect(type.isTransfer()).toBe(true);
    });
  });

  describe("equals", () => {
    it("should return true for same types", () => {
      const type1 = TransactionType.income();
      const type2 = TransactionType.income();
      expect(type1.equals(type2)).toBe(true);
    });

    it("should return false for different types", () => {
      const type1 = TransactionType.income();
      const type2 = TransactionType.expense();
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the value", () => {
      const type = TransactionType.income();
      expect(type.toString()).toBe("income");
    });
  });
});
