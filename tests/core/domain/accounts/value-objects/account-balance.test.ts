import { describe, it, expect } from "vitest";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";

describe("AccountBalance", () => {
  describe("create", () => {
    it("should create a valid positive balance", () => {
      const balance = AccountBalance.create(1000.5);
      expect(balance.getValue()).toBe(1000.5);
    });

    it("should create a valid negative balance", () => {
      const balance = AccountBalance.create(-500.25);
      expect(balance.getValue()).toBe(-500.25);
    });

    it("should create a zero balance", () => {
      const balance = AccountBalance.create(0);
      expect(balance.getValue()).toBe(0);
    });

    it("should round to 2 decimal places", () => {
      const balance = AccountBalance.create(1000.123);
      expect(balance.getValue()).toBe(1000.12);
    });

    it("should throw error for non-finite numbers", () => {
      expect(() => AccountBalance.create(NaN)).toThrow(
        "Balance must be a valid number"
      );
      expect(() => AccountBalance.create(Infinity)).toThrow(
        "Balance must be a valid number"
      );
      expect(() => AccountBalance.create(-Infinity)).toThrow(
        "Balance must be a valid number"
      );
    });

    it("should throw error for balance too low", () => {
      expect(() => AccountBalance.create(-1000000000)).toThrow(
        "Balance cannot be less than -999,999,999"
      );
    });

    it("should throw error for balance too high", () => {
      expect(() => AccountBalance.create(1000000000)).toThrow(
        "Balance cannot exceed 999,999,999"
      );
    });

    it("should handle edge case of minimum balance", () => {
      const balance = AccountBalance.create(-999999999);
      expect(balance.getValue()).toBe(-999999999);
    });

    it("should handle edge case of maximum balance", () => {
      const balance = AccountBalance.create(999999999);
      expect(balance.getValue()).toBe(999999999);
    });
  });

  describe("getValue", () => {
    it("should return the balance value", () => {
      const balance = AccountBalance.create(1500.75);
      expect(balance.getValue()).toBe(1500.75);
    });
  });

  describe("add", () => {
    it("should add positive amount", () => {
      const balance = AccountBalance.create(1000);
      const newBalance = balance.add(500);
      expect(newBalance.getValue()).toBe(1500);
    });

    it("should add negative amount", () => {
      const balance = AccountBalance.create(1000);
      const newBalance = balance.add(-300);
      expect(newBalance.getValue()).toBe(700);
    });

    it("should handle decimal addition", () => {
      const balance = AccountBalance.create(1000.5);
      const newBalance = balance.add(99.99);
      expect(newBalance.getValue()).toBe(1100.49);
    });
  });

  describe("subtract", () => {
    it("should subtract positive amount", () => {
      const balance = AccountBalance.create(1000);
      const newBalance = balance.subtract(300);
      expect(newBalance.getValue()).toBe(700);
    });

    it("should subtract negative amount", () => {
      const balance = AccountBalance.create(1000);
      const newBalance = balance.subtract(-200);
      expect(newBalance.getValue()).toBe(1200);
    });

    it("should handle decimal subtraction", () => {
      const balance = AccountBalance.create(1000.5);
      const newBalance = balance.subtract(99.99);
      expect(newBalance.getValue()).toBe(900.51);
    });
  });

  describe("comparison methods", () => {
    it("should correctly identify positive balance", () => {
      const balance = AccountBalance.create(1000);
      expect(balance.isPositive()).toBe(true);
      expect(balance.isNegative()).toBe(false);
      expect(balance.isZero()).toBe(false);
    });

    it("should correctly identify negative balance", () => {
      const balance = AccountBalance.create(-500);
      expect(balance.isPositive()).toBe(false);
      expect(balance.isNegative()).toBe(true);
      expect(balance.isZero()).toBe(false);
    });

    it("should correctly identify zero balance", () => {
      const balance = AccountBalance.create(0);
      expect(balance.isPositive()).toBe(false);
      expect(balance.isNegative()).toBe(false);
      expect(balance.isZero()).toBe(true);
    });
  });

  describe("equals", () => {
    it("should return true for equal balances", () => {
      const balance1 = AccountBalance.create(1000.5);
      const balance2 = AccountBalance.create(1000.5);
      expect(balance1.equals(balance2)).toBe(true);
    });

    it("should return false for different balances", () => {
      const balance1 = AccountBalance.create(1000);
      const balance2 = AccountBalance.create(1001);
      expect(balance1.equals(balance2)).toBe(false);
    });

    it("should return false for balances with different precision", () => {
      const balance1 = AccountBalance.create(1000);
      const balance2 = AccountBalance.create(1000.0);
      expect(balance1.equals(balance2)).toBe(true); // Should be equal after rounding
    });
  });
});
