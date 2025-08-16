import { describe, it, expect } from "vitest";
import {
  ACCOUNT_CONSTRAINTS,
  ACCOUNT_TYPES,
  ACCOUNT_TYPE_VALUES,
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPE_COLORS,
  ACCOUNT_MESSAGES,
  SUPPORTED_CURRENCIES,
} from "@/core/domain/accounts/constants/account-constants";

describe("Account Constants", () => {
  describe("ACCOUNT_CONSTRAINTS", () => {
    it("should have correct name constraints", () => {
      expect(ACCOUNT_CONSTRAINTS.NAME.MIN_LENGTH).toBe(2);
      expect(ACCOUNT_CONSTRAINTS.NAME.MAX_LENGTH).toBe(100);
      expect(ACCOUNT_CONSTRAINTS.NAME.PATTERN).toBeInstanceOf(RegExp);
    });

    it("should have correct balance constraints", () => {
      expect(ACCOUNT_CONSTRAINTS.BALANCE.MIN).toBe(-999999999);
      expect(ACCOUNT_CONSTRAINTS.BALANCE.MAX).toBe(999999999);
      expect(ACCOUNT_CONSTRAINTS.BALANCE.DECIMAL_PLACES).toBe(2);
    });

    it("should have correct currency constraints", () => {
      expect(ACCOUNT_CONSTRAINTS.CURRENCY.PATTERN).toBeInstanceOf(RegExp);
      expect(ACCOUNT_CONSTRAINTS.CURRENCY.SUPPORTED).toHaveLength(2);
      expect(ACCOUNT_CONSTRAINTS.CURRENCY.SUPPORTED).toContain("EUR");
      expect(ACCOUNT_CONSTRAINTS.CURRENCY.SUPPORTED).toContain("USD");
    });
  });

  describe("ACCOUNT_TYPES", () => {
    it("should have all required account types", () => {
      expect(ACCOUNT_TYPES.BANK).toBe("bank");
      expect(ACCOUNT_TYPES.CRYPTO).toBe("crypto");
      expect(ACCOUNT_TYPES.INVESTMENT).toBe("investment");
      expect(ACCOUNT_TYPES.CASH).toBe("cash");
      expect(ACCOUNT_TYPES.SAVINGS).toBe("savings");
    });

    it("should have correct number of types", () => {
      expect(Object.keys(ACCOUNT_TYPES)).toHaveLength(5);
    });
  });

  describe("ACCOUNT_TYPE_VALUES", () => {
    it("should contain all account type values", () => {
      expect(ACCOUNT_TYPE_VALUES).toHaveLength(5);
      expect(ACCOUNT_TYPE_VALUES).toContain("bank");
      expect(ACCOUNT_TYPE_VALUES).toContain("crypto");
      expect(ACCOUNT_TYPE_VALUES).toContain("investment");
      expect(ACCOUNT_TYPE_VALUES).toContain("cash");
      expect(ACCOUNT_TYPE_VALUES).toContain("savings");
    });
  });

  describe("ACCOUNT_TYPE_LABELS", () => {
    it("should have correct labels for each type", () => {
      expect(ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.BANK]).toBe("Bank");
      expect(ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.CRYPTO]).toBe("Cryptocurrency");
      expect(ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.INVESTMENT]).toBe("Investment");
      expect(ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.CASH]).toBe("Cash");
      expect(ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.SAVINGS]).toBe("Savings");
    });
  });

  describe("ACCOUNT_TYPE_COLORS", () => {
    it("should have correct colors for each type", () => {
      expect(ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.BANK]).toBe("blue");
      expect(ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.CRYPTO]).toBe("yellow");
      expect(ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.INVESTMENT]).toBe("green");
      expect(ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.CASH]).toBe("gray");
      expect(ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.SAVINGS]).toBe("purple");
    });
  });

  describe("ACCOUNT_MESSAGES", () => {
    describe("VALIDATION", () => {
      it("should have name validation messages", () => {
        expect(ACCOUNT_MESSAGES.VALIDATION.NAME_REQUIRED).toBe(
          "Account name is required"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_SHORT).toBe(
          "Account name must be at least 2 characters"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_LONG).toBe(
          "Account name cannot exceed 100 characters"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.NAME_INVALID_CHARS).toBe(
          "Account name contains invalid characters"
        );
      });

      it("should have balance validation messages", () => {
        expect(ACCOUNT_MESSAGES.VALIDATION.BALANCE_INVALID).toBe(
          "Balance must be a valid number"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.BALANCE_TOO_LOW).toBe(
          "Balance cannot be less than -999,999,999"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.BALANCE_TOO_HIGH).toBe(
          "Balance cannot exceed 999,999,999"
        );
      });

      it("should have currency validation messages", () => {
        expect(ACCOUNT_MESSAGES.VALIDATION.CURRENCY_INVALID).toBe(
          "Currency must be a valid 3-letter ISO code"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.CURRENCY_NOT_SUPPORTED).toBe(
          "Currency is not supported"
        );
      });

      it("should have other validation messages", () => {
        expect(ACCOUNT_MESSAGES.VALIDATION.USER_ID_REQUIRED).toBe(
          "User ID is required"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.ACCOUNT_ID_REQUIRED).toBe(
          "Account ID is required"
        );
        expect(ACCOUNT_MESSAGES.VALIDATION.ACCOUNT_TYPE_INVALID).toBe(
          "Invalid account type"
        );
      });
    });

    describe("BUSINESS", () => {
      it("should have business rule messages", () => {
        expect(ACCOUNT_MESSAGES.BUSINESS.DUPLICATE_NAME).toBe(
          "An account with this name already exists"
        );
        expect(ACCOUNT_MESSAGES.BUSINESS.CANNOT_DELETE_ACTIVE).toBe(
          "Cannot delete account with non-zero balance. Deactivate it first."
        );
        expect(ACCOUNT_MESSAGES.BUSINESS.ACCESS_DENIED).toBe(
          "Access denied to this account"
        );
        expect(ACCOUNT_MESSAGES.BUSINESS.ACCOUNT_NOT_FOUND).toBe(
          "Account not found"
        );
        expect(ACCOUNT_MESSAGES.BUSINESS.ACCOUNT_ALREADY_DEACTIVATED).toBe(
          "Account is already deactivated"
        );
        expect(ACCOUNT_MESSAGES.BUSINESS.MAX_ACCOUNTS_REACHED).toBe(
          "Maximum accounts limit reached"
        );
      });
    });
  });

  describe("SUPPORTED_CURRENCIES", () => {
    it("should contain supported currencies", () => {
      expect(SUPPORTED_CURRENCIES).toHaveLength(2);
      expect(SUPPORTED_CURRENCIES).toContain("EUR");
      expect(SUPPORTED_CURRENCIES).toContain("USD");
    });

    it("should be readonly", () => {
      expect(SUPPORTED_CURRENCIES).toBe(ACCOUNT_CONSTRAINTS.CURRENCY.SUPPORTED);
    });
  });

  describe("Constants consistency", () => {
    it("should have consistent number of types and labels", () => {
      const typeKeys = Object.keys(ACCOUNT_TYPES);
      const labelKeys = Object.keys(ACCOUNT_TYPE_LABELS);
      const colorKeys = Object.keys(ACCOUNT_TYPE_COLORS);

      expect(typeKeys).toHaveLength(labelKeys.length);
      expect(typeKeys).toHaveLength(colorKeys.length);
    });

    it("should have all types covered in labels and colors", () => {
      Object.values(ACCOUNT_TYPES).forEach((type) => {
        expect(ACCOUNT_TYPE_LABELS[type]).toBeDefined();
        expect(ACCOUNT_TYPE_COLORS[type]).toBeDefined();
      });
    });
  });
});
