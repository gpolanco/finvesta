import { describe, it, expect } from "vitest";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { InvalidTransactionAmountError } from "@/core/domain/transaction/errors/transaction-errors";

describe("TransactionAmount", () => {
  describe("create", () => {
    it("should create a valid positive amount", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.getValue()).toBe(100.5);
    });

    it("should create a valid negative amount", () => {
      const amount = TransactionAmount.create(-75.25);
      expect(amount.getValue()).toBe(-75.25);
    });

    it("should create a zero amount", () => {
      const amount = TransactionAmount.create(0);
      expect(amount.getValue()).toBe(0);
    });

    it("should round to 2 decimal places", () => {
      const amount = TransactionAmount.create(100.567);
      expect(amount.getValue()).toBe(100.57);
    });

    it("should throw error for non-finite numbers", () => {
      expect(() => TransactionAmount.create(NaN)).toThrow(
        InvalidTransactionAmountError
      );
      expect(() => TransactionAmount.create(Infinity)).toThrow(
        InvalidTransactionAmountError
      );
      expect(() => TransactionAmount.create(-Infinity)).toThrow(
        InvalidTransactionAmountError
      );
    });

    it("should throw error for amount too low", () => {
      expect(() => TransactionAmount.create(-1000000000)).toThrow(
        InvalidTransactionAmountError
      );
    });

    it("should throw error for amount too high", () => {
      expect(() => TransactionAmount.create(1000000000)).toThrow(
        InvalidTransactionAmountError
      );
    });

    it("should handle edge case of minimum amount", () => {
      const amount = TransactionAmount.create(-999999999);
      expect(amount.getValue()).toBe(-999999999);
    });

    it("should handle edge case of maximum amount", () => {
      const amount = TransactionAmount.create(999999999);
      expect(amount.getValue()).toBe(999999999);
    });
  });

  describe("getValue", () => {
    it("should return the amount value", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.getValue()).toBe(100.5);
    });
  });

  describe("getAbsoluteValue", () => {
    it("should return absolute value for positive amount", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.getAbsoluteValue()).toBe(100.5);
    });

    it("should return absolute value for negative amount", () => {
      const amount = TransactionAmount.create(-75.25);
      expect(amount.getAbsoluteValue()).toBe(75.25);
    });

    it("should return absolute value for zero", () => {
      const amount = TransactionAmount.create(0);
      expect(amount.getAbsoluteValue()).toBe(0);
    });
  });

  describe("type checking methods", () => {
    it("should correctly identify positive amounts", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.isPositive()).toBe(true);
      expect(amount.isNegative()).toBe(false);
      expect(amount.isZero()).toBe(false);
    });

    it("should correctly identify negative amounts", () => {
      const amount = TransactionAmount.create(-75.25);
      expect(amount.isPositive()).toBe(false);
      expect(amount.isNegative()).toBe(true);
      expect(amount.isZero()).toBe(false);
    });

    it("should correctly identify zero amounts", () => {
      const amount = TransactionAmount.create(0);
      expect(amount.isPositive()).toBe(false);
      expect(amount.isNegative()).toBe(false);
      expect(amount.isZero()).toBe(true);
    });
  });

  describe("income/expense methods", () => {
    it("should correctly identify income", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.isIncome()).toBe(true);
      expect(amount.isExpense()).toBe(false);
    });

    it("should correctly identify expense", () => {
      const amount = TransactionAmount.create(-75.25);
      expect(amount.isIncome()).toBe(false);
      expect(amount.isExpense()).toBe(true);
    });
  });

  describe("arithmetic operations", () => {
    it("should add amounts correctly", () => {
      const amount1 = TransactionAmount.create(100.5);
      const amount2 = TransactionAmount.create(25.75);
      const result = amount1.add(amount2);
      expect(result.getValue()).toBe(126.25);
    });

    it("should subtract amounts correctly", () => {
      const amount1 = TransactionAmount.create(100.5);
      const amount2 = TransactionAmount.create(25.75);
      const result = amount1.subtract(amount2);
      expect(result.getValue()).toBe(74.75);
    });

    it("should multiply by factor correctly", () => {
      const amount = TransactionAmount.create(100.5);
      const result = amount.multiply(2);
      expect(result.getValue()).toBe(201.0);
    });

    it("should divide by factor correctly", () => {
      const amount = TransactionAmount.create(100.5);
      const result = amount.divide(2);
      expect(result.getValue()).toBe(50.25);
    });

    it("should throw error when dividing by zero", () => {
      const amount = TransactionAmount.create(100.5);
      expect(() => amount.divide(0)).toThrow(InvalidTransactionAmountError);
    });
  });

  describe("comparison methods", () => {
    it("should return true for equal amounts", () => {
      const amount1 = TransactionAmount.create(100.5);
      const amount2 = TransactionAmount.create(100.5);
      expect(amount1.equals(amount2)).toBe(true);
    });

    it("should return false for different amounts", () => {
      const amount1 = TransactionAmount.create(100.5);
      const amount2 = TransactionAmount.create(75.25);
      expect(amount1.equals(amount2)).toBe(false);
    });

    it("should compare amounts correctly", () => {
      const amount1 = TransactionAmount.create(100.5);
      const amount2 = TransactionAmount.create(75.25);
      const amount3 = TransactionAmount.create(150.0);

      expect(amount1.isGreaterThan(amount2)).toBe(true);
      expect(amount1.isLessThan(amount3)).toBe(true);
      expect(amount1.isGreaterThanOrEqual(amount2)).toBe(true);
      expect(amount1.isLessThanOrEqual(amount3)).toBe(true);
    });
  });

  describe("formatting methods", () => {
    it("should format as currency string", () => {
      const amount = TransactionAmount.create(100.5);
      const formatted = amount.toFormattedString("USD");
      expect(formatted).toBe("$100.50");
    });

    it("should format as number string", () => {
      const amount = TransactionAmount.create(100.5);
      const formatted = amount.toFormattedNumber();
      expect(formatted).toBe("100.50");
    });

    it("should handle negative amounts in formatting", () => {
      const amount = TransactionAmount.create(-75.25);
      const formatted = amount.toFormattedString("USD");
      expect(formatted).toBe("-$75.25");
    });
  });

  describe("toString", () => {
    it("should return the amount as string", () => {
      const amount = TransactionAmount.create(100.5);
      expect(amount.toString()).toBe("100.5");
    });
  });
});
