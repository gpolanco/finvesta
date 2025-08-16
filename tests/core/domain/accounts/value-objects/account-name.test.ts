import { describe, it, expect } from "vitest";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";

describe("AccountName", () => {
  describe("create", () => {
    it("should create a valid account name", () => {
      const accountName = AccountName.create("My Account");
      expect(accountName.getValue()).toBe("My Account");
    });

    it("should trim whitespace from account name", () => {
      const accountName = AccountName.create("  My Account  ");
      expect(accountName.getValue()).toBe("My Account");
    });

    it("should throw error for name too short", () => {
      expect(() => AccountName.create("A")).toThrow(
        "Account name must be at least 2 characters"
      );
    });

    it("should throw error for name too long", () => {
      const longName = "A".repeat(101);
      expect(() => AccountName.create(longName)).toThrow(
        "Account name cannot exceed 100 characters"
      );
    });

    it("should throw error for name with invalid characters", () => {
      expect(() => AccountName.create("My@Account")).toThrow(
        "Account name contains invalid characters"
      );
      expect(() => AccountName.create("My#Account")).toThrow(
        "Account name contains invalid characters"
      );
      expect(() => AccountName.create("My$Account")).toThrow(
        "Account name contains invalid characters"
      );
    });

    it("should accept valid characters", () => {
      expect(() => AccountName.create("My-Account")).not.toThrow();
      expect(() => AccountName.create("My_Account")).not.toThrow();
      expect(() => AccountName.create("My Account 123")).not.toThrow();
    });

    it("should handle edge case of minimum length", () => {
      const accountName = AccountName.create("AB");
      expect(accountName.getValue()).toBe("AB");
    });

    it("should handle edge case of maximum length", () => {
      const longName = "A".repeat(100);
      const accountName = AccountName.create(longName);
      expect(accountName.getValue()).toBe(longName);
    });
  });

  describe("getValue", () => {
    it("should return the account name value", () => {
      const accountName = AccountName.create("Test Account");
      expect(accountName.getValue()).toBe("Test Account");
    });
  });

  describe("equals", () => {
    it("should return true for equal account names", () => {
      const name1 = AccountName.create("Test Account");
      const name2 = AccountName.create("Test Account");
      expect(name1.equals(name2)).toBe(true);
    });

    it("should return false for different account names", () => {
      const name1 = AccountName.create("Test Account");
      const name2 = AccountName.create("Different Account");
      expect(name1.equals(name2)).toBe(false);
    });

    it("should return false for names with different casing", () => {
      const name1 = AccountName.create("Test Account");
      const name2 = AccountName.create("test account");
      expect(name1.equals(name2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the account name as string", () => {
      const accountName = AccountName.create("Test Account");
      expect(accountName.toString()).toBe("Test Account");
    });
  });
});
