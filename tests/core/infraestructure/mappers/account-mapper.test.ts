/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { AccountMapper } from "@/core/infraestructure/mappers";
import { Account } from "@/core/domain/accounts";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { Currency } from "@/core/domain/accounts/value-objects/currency";

describe("AccountMapper", () => {
  const mockPrismaAccount = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Cuenta Principal",
    balance: "1000.50",
    type: "bank",
    currency: "USD",
    isActive: true,
    description: null,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  } as any; // Using any to match Prisma types for testing

  const mockDomainAccount: Omit<Account, "id" | "createdAt" | "updatedAt"> = {
    name: AccountName.create("Cuenta Principal"),
    balance: AccountBalance.create(1000.5),
    type: AccountType.fromString("bank"),
    currency: Currency.create("USD"),
    isActive: true,
    userId: "user-123",
  };

  describe("toDomain", () => {
    it("should convert Prisma Account to Domain Account successfully", () => {
      const result = AccountMapper.toDomain(mockPrismaAccount);

      expect(result.id).toBe(mockPrismaAccount.id);
      expect(result.name.getValue()).toBe(mockPrismaAccount.name);
      expect(result.balance.getValue()).toBe(1000.5);
      expect(result.type.getValue()).toBe(mockPrismaAccount.type);
      expect(result.currency.getCode()).toBe(mockPrismaAccount.currency);
      expect(result.isActive).toBe(mockPrismaAccount.isActive);
      expect(result.userId).toBe("default"); // Default value from mapper
      expect(result.createdAt).toEqual(mockPrismaAccount.createdAt);
      expect(result.updatedAt).toEqual(mockPrismaAccount.updatedAt);
    });

    it("should handle decimal balance conversion correctly", () => {
      const prismaAccountWithDecimal = {
        ...mockPrismaAccount,
        balance: "1234.567",
      };

      const result = AccountMapper.toDomain(prismaAccountWithDecimal);
      expect(result.balance.getValue()).toBe(1234.57); // Number() rounds to 2 decimal places
    });

    it("should handle zero balance", () => {
      const prismaAccountWithZero = {
        ...mockPrismaAccount,
        balance: "0.00",
      };

      const result = AccountMapper.toDomain(prismaAccountWithZero);
      expect(result.balance.getValue()).toBe(0);
    });

    it("should handle negative balance", () => {
      const prismaAccountWithNegative = {
        ...mockPrismaAccount,
        balance: "-500.25",
      };

      const result = AccountMapper.toDomain(prismaAccountWithNegative);
      expect(result.balance.getValue()).toBe(-500.25);
    });
  });

  describe("toDatabase", () => {
    it("should convert Domain Account to Prisma Account successfully", () => {
      const result = AccountMapper.toDatabase(mockDomainAccount);

      expect(result.name).toBe(mockDomainAccount.name.getValue());
      expect(result.balance.toString()).toBe("1000.5");
      expect(result.type).toBe(mockDomainAccount.type.getValue());
      expect(result.currency).toBe(mockDomainAccount.currency.getCode());
      expect(result.description).toBeNull(); // Not in domain model
      // isActive is excluded from toDatabase result
    });

    it("should handle zero balance", () => {
      const domainAccountWithZero = {
        ...mockDomainAccount,
        balance: AccountBalance.create(0),
      };

      const result = AccountMapper.toDatabase(domainAccountWithZero);
      expect(result.balance.toString()).toBe("0");
    });

    it("should handle negative balance", () => {
      const domainAccountWithNegative = {
        ...mockDomainAccount,
        balance: AccountBalance.create(-250.75),
      };

      const result = AccountMapper.toDatabase(domainAccountWithNegative);
      expect(result.balance.toString()).toBe("-250.75");
    });

    it("should handle large balance values", () => {
      const domainAccountWithLargeBalance = {
        ...mockDomainAccount,
        balance: AccountBalance.create(999999.99),
      };

      const result = AccountMapper.toDatabase(domainAccountWithLargeBalance);
      expect(result.balance.toString()).toBe("999999.99");
    });
  });

  describe("toDatabaseUpdate", () => {
    it("should convert partial Domain Account to Prisma update data", () => {
      const partialData = {
        name: AccountName.create("Nuevo Nombre"),
        balance: AccountBalance.create(2000.0),
      };

      const result = AccountMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBe("Nuevo Nombre");
      expect(result.balance?.toString()).toBe("2000");
      expect(result.type).toBeUndefined();
      expect(result.currency).toBeUndefined();
      // isActive is excluded from toDatabaseUpdate result
    });

    it("should handle empty partial data", () => {
      const result = AccountMapper.toDatabaseUpdate({});

      expect(result.name).toBeUndefined();
      expect(result.balance).toBeUndefined();
      expect(result.type).toBeUndefined();
      expect(result.currency).toBeUndefined();
      // isActive is excluded from toDatabaseUpdate result
    });

    it("should handle single field update", () => {
      const partialData = {
        name: AccountName.create("Solo Nombre"),
      };

      const result = AccountMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBe("Solo Nombre");
      expect(result.balance).toBeUndefined();
      expect(result.type).toBeUndefined();
    });

    it("should handle type and currency updates", () => {
      const partialData = {
        type: AccountType.fromString("savings"),
        currency: Currency.create("EUR"),
      };

      const result = AccountMapper.toDatabaseUpdate(partialData);

      expect(result.name).toBeUndefined();
      expect(result.balance).toBeUndefined();
      expect(result.type).toBe("savings");
      expect(result.currency).toBe("EUR");
    });
  });

  describe("edge cases", () => {
    it("should handle very long account names", () => {
      const longName = "A".repeat(100);
      const prismaAccountWithLongName = {
        ...mockPrismaAccount,
        name: longName,
      };

      const result = AccountMapper.toDomain(prismaAccountWithLongName);
      expect(result.name.getValue()).toBe(longName);
    });

    it("should handle very small balance values", () => {
      const prismaAccountWithSmallBalance = {
        ...mockPrismaAccount,
        balance: "0.001",
      };

      const result = AccountMapper.toDomain(prismaAccountWithSmallBalance);
      expect(result.balance.getValue()).toBe(0); // Number("0.001") rounds to 0
    });

    it("should handle inactive accounts", () => {
      const prismaAccountInactive = {
        ...mockPrismaAccount,
        isActive: false,
      };

      const result = AccountMapper.toDomain(prismaAccountInactive);
      expect(result.isActive).toBe(false);
    });
  });
});
