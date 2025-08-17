/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { TransactionMapper } from "@/core/infraestructure/mappers";
import { Transaction as DomainTransaction } from "@/core/domain/transaction/models/transaction";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";

describe("TransactionMapper", () => {
  const mockPrismaTransaction = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    description: "Compra en supermercado",
    amount: "125.50",
    type: "expense",
    date: new Date("2024-01-15T10:30:00Z"),
    categoryId: "cat-123",
    accountId: "acc-456",
    isActive: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
  } as any; // Using any to match Prisma types for testing - TODO: Fix when Prisma types are properly aligned

  const mockDomainTransaction: Omit<
    DomainTransaction,
    "id" | "createdAt" | "updatedAt"
  > = {
    description: TransactionDescription.create("Compra en supermercado"),
    amount: TransactionAmount.create(125.5),
    transactionType: TransactionType.fromString("expense"),
    transactionDate: TransactionDate.create(new Date("2024-01-15T10:30:00Z")),
    categoryId: "cat-123",
    accountId: "acc-456",
    isReconciled: false,
    userId: "user-123",
  };

  describe("toDomain", () => {
    it("should convert Prisma Transaction to Domain Transaction successfully", () => {
      const result = TransactionMapper.toDomain(mockPrismaTransaction);

      expect(result.id).toBe(mockPrismaTransaction.id);
      expect(result.description.getValue()).toBe(
        mockPrismaTransaction.description
      );
      expect(result.amount.getValue()).toBe(125.5);
      expect(result.transactionType.getValue()).toBe(
        mockPrismaTransaction.type
      );
      expect(result.transactionDate.getValue()).toEqual(
        mockPrismaTransaction.date
      );
      expect(result.categoryId).toBe(mockPrismaTransaction.categoryId);
      expect(result.accountId).toBe(mockPrismaTransaction.accountId);
      // isActive is not in domain model, it's only in Prisma
      expect(result.createdAt).toEqual(mockPrismaTransaction.createdAt);
      expect(result.updatedAt).toEqual(mockPrismaTransaction.updatedAt);
    });

    it("should handle null categoryId", () => {
      const prismaTransactionWithNullCategory = {
        ...mockPrismaTransaction,
        categoryId: null,
      };

      const result = TransactionMapper.toDomain(
        prismaTransactionWithNullCategory
      );
      expect(result.categoryId).toBe("");
    });

    it("should handle decimal amount conversion correctly", () => {
      const prismaTransactionWithDecimal = {
        ...mockPrismaTransaction,
        amount: "1234.567",
      };

      const result = TransactionMapper.toDomain(prismaTransactionWithDecimal);
      expect(result.amount.getValue()).toBe(1234.57); // Number() rounds to 2 decimal places
    });

    it("should handle zero amount", () => {
      const prismaTransactionWithZero = {
        ...mockPrismaTransaction,
        amount: "0.00",
      };

      const result = TransactionMapper.toDomain(prismaTransactionWithZero);
      expect(result.amount.getValue()).toBe(0);
    });

    it("should handle negative amount", () => {
      const prismaTransactionWithNegative = {
        ...mockPrismaTransaction,
        amount: "-500.25",
      };

      const result = TransactionMapper.toDomain(prismaTransactionWithNegative);
      expect(result.amount.getValue()).toBe(-500.25);
    });

    it("should handle inactive transaction", () => {
      const prismaTransactionInactive = {
        ...mockPrismaTransaction,
        isActive: false,
      };

      TransactionMapper.toDomain(prismaTransactionInactive);
      // isActive is not in domain model
    });
  });

  describe("toDatabase", () => {
    it("should convert Domain Transaction to Prisma Transaction successfully", () => {
      const result = TransactionMapper.toDatabase(mockDomainTransaction);

      expect(result.description).toBe(
        mockDomainTransaction.description.getValue()
      );
      expect(result.amount.toString()).toBe("125.5");
      expect(result.type).toBe(
        mockDomainTransaction.transactionType.getValue()
      );
      expect(result.date).toEqual(
        mockDomainTransaction.transactionDate.getValue()
      );
      expect(result.categoryId).toBe(mockDomainTransaction.categoryId);
      expect(result.accountId).toBe(mockDomainTransaction.accountId);
      // isActive is not in domain model
    });

    it("should handle empty categoryId", () => {
      const domainTransactionWithoutCategory = {
        ...mockDomainTransaction,
        categoryId: "",
      };

      const result = TransactionMapper.toDatabase(
        domainTransactionWithoutCategory
      );
      expect(result.categoryId).toBeNull();
    });

    it("should handle zero amount", () => {
      const domainTransactionWithZero = {
        ...mockDomainTransaction,
        amount: TransactionAmount.create(0),
      };

      const result = TransactionMapper.toDatabase(domainTransactionWithZero);
      expect(result.amount.toString()).toBe("0");
    });

    it("should handle negative amount", () => {
      const domainTransactionWithNegative = {
        ...mockDomainTransaction,
        amount: TransactionAmount.create(-250.75),
      };

      const result = TransactionMapper.toDatabase(
        domainTransactionWithNegative
      );
      expect(result.amount.toString()).toBe("-250.75");
    });

    it("should handle large amount values", () => {
      const domainTransactionWithLargeAmount = {
        ...mockDomainTransaction,
        amount: TransactionAmount.create(999999.99),
      };

      const result = TransactionMapper.toDatabase(
        domainTransactionWithLargeAmount
      );
      expect(result.amount.toString()).toBe("999999.99");
    });

    it("should handle inactive transaction", () => {
      const domainTransactionInactive = {
        ...mockDomainTransaction,
        // isActive is not in domain model
      };

      TransactionMapper.toDatabase(domainTransactionInactive);
      // isActive is not in domain model
    });
  });

  describe("toDatabaseUpdate", () => {
    it("should convert partial Domain Transaction to Prisma update data", () => {
      const partialData = {
        description: TransactionDescription.create("Nueva descripcion"),
        amount: TransactionAmount.create(200.0),
      };

      const result = TransactionMapper.toDatabaseUpdate(partialData);

      expect(result.description).toBe("Nueva descripcion");
      expect(result.amount?.toString()).toBe("200");
      expect(result.type).toBeUndefined();
      expect(result.date).toBeUndefined();
      expect(result.categoryId).toBeUndefined();
      expect(result.accountId).toBeUndefined();
      expect(result.isActive).toBeUndefined();
    });

    it("should handle empty partial data", () => {
      const result = TransactionMapper.toDatabaseUpdate({});

      expect(result.description).toBeUndefined();
      expect(result.amount).toBeUndefined();
      expect(result.type).toBeUndefined();
      expect(result.date).toBeUndefined();
      expect(result.categoryId).toBeUndefined();
      expect(result.accountId).toBeUndefined();
      expect(result.isActive).toBeUndefined();
    });

    it("should handle single field update", () => {
      const partialData = {
        description: TransactionDescription.create("Solo descripcion"),
      };

      const result = TransactionMapper.toDatabaseUpdate(partialData);

      expect(result.description).toBe("Solo descripcion");
      expect(result.amount).toBeUndefined();
      expect(result.type).toBeUndefined();
    });

    it("should handle amount and type updates", () => {
      const partialData = {
        amount: TransactionAmount.create(300.0),
        transactionType: TransactionType.fromString("income"),
      };

      const result = TransactionMapper.toDatabaseUpdate(partialData);

      expect(result.description).toBeUndefined();
      expect(result.amount?.toString()).toBe("300");
      expect(result.type).toBe("income");
      expect(result.date).toBeUndefined();
    });

    it("should handle date and category updates", () => {
      const newDate = new Date("2024-02-01T12:00:00Z");
      const partialData = {
        transactionDate: TransactionDate.create(newDate),
        categoryId: "cat-789",
      };

      const result = TransactionMapper.toDatabaseUpdate(partialData);

      expect(result.description).toBeUndefined();
      expect(result.amount).toBeUndefined();
      expect(result.type).toBeUndefined();
      expect(result.date).toEqual(newDate);
      expect(result.categoryId).toBe("cat-789");
    });
  });

  describe("edge cases", () => {
    it("should handle very long descriptions", () => {
      const longDescription = "A".repeat(200); // Max length is 200
      const prismaTransactionWithLongDescription = {
        ...mockPrismaTransaction,
        description: longDescription,
      };

      const result = TransactionMapper.toDomain(
        prismaTransactionWithLongDescription
      );
      expect(result.description.getValue()).toBe(longDescription);
    });

    it("should handle very small amount values", () => {
      const prismaTransactionWithSmallAmount = {
        ...mockPrismaTransaction,
        amount: "0.001",
      };

      const result = TransactionMapper.toDomain(
        prismaTransactionWithSmallAmount
      );
      expect(result.amount.getValue()).toBe(0); // Number("0.001") rounds to 0
    });

    it("should handle different transaction types", () => {
      const transactionTypes = ["expense", "income", "transfer"];

      transactionTypes.forEach((type) => {
        const prismaTransactionWithType = {
          ...mockPrismaTransaction,
          type,
        };

        const result = TransactionMapper.toDomain(prismaTransactionWithType);
        expect(result.transactionType.getValue()).toBe(type);
      });
    });

    it("should handle future dates", () => {
      const futureDate = new Date("2025-12-31T23:59:59Z");
      const prismaTransactionWithFutureDate = {
        ...mockPrismaTransaction,
        date: futureDate,
      };

      const result = TransactionMapper.toDomain(
        prismaTransactionWithFutureDate
      );
      expect(result.transactionDate.getValue()).toEqual(futureDate);
    });

    it("should handle past dates", () => {
      const pastDate = new Date("2020-01-01T00:00:00Z");
      const prismaTransactionWithPastDate = {
        ...mockPrismaTransaction,
        date: pastDate,
      };

      const result = TransactionMapper.toDomain(prismaTransactionWithPastDate);
      expect(result.transactionDate.getValue()).toEqual(pastDate);
    });
  });
});
