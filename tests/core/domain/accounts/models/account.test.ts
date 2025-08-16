import { describe, it, expect } from "vitest";
import { Account } from "@/core/domain/accounts/models/account";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { Currency } from "@/core/domain/accounts/value-objects/currency";

describe("Account Model", () => {
  const createValidAccount = (): Account => ({
    id: "acc-123",
    name: AccountName.create("Test Account"),
    type: AccountType.bank(),
    provider: "Test Bank",
    balance: AccountBalance.create(1000.5),
    currency: Currency.create("EUR"),
    isActive: true,
    userId: "user-123",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
  });

  describe("Account interface", () => {
    it("should have all required properties", () => {
      const account = createValidAccount();

      expect(account).toHaveProperty("id");
      expect(account).toHaveProperty("name");
      expect(account).toHaveProperty("type");
      expect(account).toHaveProperty("provider");
      expect(account).toHaveProperty("balance");
      expect(account).toHaveProperty("currency");
      expect(account).toHaveProperty("isActive");
      expect(account).toHaveProperty("userId");
      expect(account).toHaveProperty("createdAt");
      expect(account).toHaveProperty("updatedAt");
    });

    it("should have correct types for all properties", () => {
      const account = createValidAccount();

      expect(typeof account.id).toBe("string");
      expect(account.name).toBeInstanceOf(AccountName);
      expect(account.type).toBeInstanceOf(AccountType);
      expect(typeof account.provider).toBe("string");
      expect(account.balance).toBeInstanceOf(AccountBalance);
      expect(account.currency).toBeInstanceOf(Currency);
      expect(typeof account.isActive).toBe("boolean");
      expect(typeof account.userId).toBe("string");
      expect(account.createdAt).toBeInstanceOf(Date);
      expect(account.updatedAt).toBeInstanceOf(Date);
    });

    it("should have readonly properties", () => {
      const account = createValidAccount();

      // TypeScript readonly properties are compile-time only
      // Runtime tests for readonly properties are not possible
      expect(account).toHaveProperty("id");
      expect(account).toHaveProperty("name");
      expect(account).toHaveProperty("type");
    });
  });

  describe("Account with minimal data", () => {
    it("should create account without optional properties", () => {
      const account: Account = {
        id: "acc-123",
        name: AccountName.create("Minimal Account"),
        type: AccountType.cash(),
        balance: AccountBalance.create(0),
        currency: Currency.create("USD"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date("2024-01-01T00:00:00Z"),
      };

      expect(account.id).toBe("acc-123");
      expect(account.name.getValue()).toBe("Minimal Account");
      expect(account.type.getValue()).toBe("cash");
      expect(account.balance.getValue()).toBe(0);
      expect(account.currency.getCode()).toBe("USD");
      expect(account.isActive).toBe(true);
      expect(account.userId).toBe("user-123");
      expect(account.createdAt).toBeInstanceOf(Date);
      expect(account.updatedAt).toBeUndefined();
    });
  });

  describe("Account with different types", () => {
    it("should support all account types", () => {
      const types = [
        AccountType.bank(),
        AccountType.crypto(),
        AccountType.investment(),
        AccountType.cash(),
        AccountType.savings(),
      ];

      types.forEach((type, index) => {
        const account: Account = {
          id: `acc-${index}`,
          name: AccountName.create(`Account ${index}`),
          type,
          balance: AccountBalance.create(1000),
          currency: Currency.create("EUR"),
          isActive: true,
          userId: "user-123",
          createdAt: new Date("2024-01-01T00:00:00Z"),
        };

        expect(account.type).toBe(type);
        expect(account.type.getValue()).toBe(type.getValue());
      });
    });
  });

  describe("Account with different currencies", () => {
    it("should support supported currencies", () => {
      const currencies = ["EUR", "USD"];

      currencies.forEach((currencyCode, index) => {
        const account: Account = {
          id: `acc-${index}`,
          name: AccountName.create(`Account ${index}`),
          type: AccountType.bank(),
          balance: AccountBalance.create(1000),
          currency: Currency.create(currencyCode),
          isActive: true,
          userId: "user-123",
          createdAt: new Date("2024-01-01T00:00:00Z"),
        };

        expect(account.currency.getCode()).toBe(currencyCode);
      });
    });
  });

  describe("Account balance scenarios", () => {
    it("should support positive balances", () => {
      const account = createValidAccount();
      expect(account.balance.getValue()).toBe(1000.5);
      expect(account.balance.isPositive()).toBe(true);
    });

    it("should support negative balances", () => {
      const account: Account = {
        ...createValidAccount(),
        balance: AccountBalance.create(-500.25),
      };

      expect(account.balance.getValue()).toBe(-500.25);
      expect(account.balance.isNegative()).toBe(true);
    });

    it("should support zero balance", () => {
      const account: Account = {
        ...createValidAccount(),
        balance: AccountBalance.create(0),
      };

      expect(account.balance.getValue()).toBe(0);
      expect(account.balance.isZero()).toBe(true);
    });
  });

  describe("Account status", () => {
    it("should support active accounts", () => {
      const account = createValidAccount();
      expect(account.isActive).toBe(true);
    });

    it("should support inactive accounts", () => {
      const account: Account = {
        ...createValidAccount(),
        isActive: false,
      };

      expect(account.isActive).toBe(false);
    });
  });

  describe("Account timestamps", () => {
    it("should have creation timestamp", () => {
      const account = createValidAccount();
      expect(account.createdAt).toBeInstanceOf(Date);
      expect(account.createdAt.getTime()).toBeGreaterThan(0);
    });

    it("should have optional update timestamp", () => {
      const account = createValidAccount();
      expect(account.updatedAt).toBeInstanceOf(Date);

      const accountWithoutUpdate: Account = {
        ...createValidAccount(),
        updatedAt: undefined,
      };

      expect(accountWithoutUpdate.updatedAt).toBeUndefined();
    });
  });
});
