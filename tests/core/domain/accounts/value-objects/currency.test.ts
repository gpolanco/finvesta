import { describe, it, expect } from "vitest";
import { Currency } from "@/core/domain/accounts/value-objects/currency";

describe("Currency", () => {
  describe("create", () => {
    it("should create a valid EUR currency", () => {
      const currency = Currency.create("EUR");
      expect(currency.getCode()).toBe("EUR");
    });

    it("should create a valid USD currency", () => {
      const currency = Currency.create("USD");
      expect(currency.getCode()).toBe("USD");
    });

    it("should normalize lowercase currency codes", () => {
      const currency = Currency.create("eur");
      expect(currency.getCode()).toBe("EUR");
    });

    it("should trim whitespace from currency codes", () => {
      const currency = Currency.create(" EUR ");
      expect(currency.getCode()).toBe("EUR");
    });

    it("should throw error for invalid currency format", () => {
      expect(() => Currency.create("EU")).toThrow(
        "Currency must be a valid 3-letter ISO code"
      );
      expect(() => Currency.create("EURO")).toThrow(
        "Currency must be a valid 3-letter ISO code"
      );
      expect(() => Currency.create("123")).toThrow(
        "Currency must be a valid 3-letter ISO code"
      );
    });

    it("should throw error for unsupported currency", () => {
      expect(() => Currency.create("GBP")).toThrow("Currency is not supported");
      expect(() => Currency.create("JPY")).toThrow("Currency is not supported");
      expect(() => Currency.create("CHF")).toThrow("Currency is not supported");
    });

    it("should accept supported currencies", () => {
      expect(() => Currency.create("EUR")).not.toThrow();
      expect(() => Currency.create("USD")).not.toThrow();
    });
  });

  describe("getCode", () => {
    it("should return the currency code", () => {
      const currency = Currency.create("EUR");
      expect(currency.getCode()).toBe("EUR");
    });
  });

  describe("equals", () => {
    it("should return true for equal currencies", () => {
      const currency1 = Currency.create("EUR");
      const currency2 = Currency.create("EUR");
      expect(currency1.equals(currency2)).toBe(true);
    });

    it("should return false for different currencies", () => {
      const currency1 = Currency.create("EUR");
      const currency2 = Currency.create("USD");
      expect(currency1.equals(currency2)).toBe(false);
    });

    it("should return false for currencies with different casing", () => {
      const currency1 = Currency.create("EUR");
      const currency2 = Currency.create("eur");
      expect(currency1.equals(currency2)).toBe(true); // Currency normalizes to uppercase
    });
  });

  describe("toString", () => {
    it("should return the currency code as string", () => {
      const currency = Currency.create("EUR");
      expect(currency.toString()).toBe("EUR");
    });
  });

  describe("edge cases", () => {
    it("should handle mixed case input", () => {
      const currency = Currency.create("EuR");
      expect(currency.getCode()).toBe("EUR");
    });

    it("should handle currency with spaces", () => {
      const currency = Currency.create("  USD  ");
      expect(currency.getCode()).toBe("USD");
    });
  });
});
