import { describe, it, expect } from "vitest";
import { Transaction } from "@/core/domain/transaction/models/transaction";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";

describe("Transaction Model", () => {
  it("should have all required properties with correct types", () => {
    const transaction: Transaction = {
      id: "txn-123",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Salary payment"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date("2024-01-15T10:00:00Z"),
    };

    expect(transaction.id).toBe("txn-123");
    expect(transaction.accountId).toBe("acc-123");
    expect(transaction.categoryId).toBe("cat-456");
    expect(transaction.amount).toBeInstanceOf(TransactionAmount);
    expect(transaction.description).toBeInstanceOf(TransactionDescription);
    expect(transaction.transactionType).toBeInstanceOf(TransactionType);
    expect(transaction.transactionDate).toBeInstanceOf(TransactionDate);
    expect(transaction.isReconciled).toBe(false);
    expect(transaction.userId).toBe("user-123");
    expect(transaction.createdAt).toBeInstanceOf(Date);
  });

  it("should handle optional updatedAt property", () => {
    const transaction: Transaction = {
      id: "txn-123",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Salary payment"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date("2024-01-15T10:00:00Z"),
      updatedAt: new Date("2024-01-15T11:00:00Z"),
    };

    expect(transaction.updatedAt).toBeInstanceOf(Date);
    expect(transaction.updatedAt).toEqual(new Date("2024-01-15T11:00:00Z"));
  });

  it("should support different transaction types", () => {
    const incomeTransaction: Transaction = {
      id: "txn-1",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(1000.0),
      description: TransactionDescription.create("Salary"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const expenseTransaction: Transaction = {
      id: "txn-2",
      accountId: "acc-123",
      categoryId: "cat-789",
      amount: TransactionAmount.create(-75.5),
      description: TransactionDescription.create("Grocery shopping"),
      transactionType: TransactionType.expense(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const investmentTransaction: Transaction = {
      id: "txn-3",
      accountId: "acc-123",
      categoryId: "cat-101",
      amount: TransactionAmount.create(500.0),
      description: TransactionDescription.create("Stock purchase"),
      transactionType: TransactionType.investment(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const transferTransaction: Transaction = {
      id: "txn-4",
      accountId: "acc-123",
      categoryId: "cat-202",
      amount: TransactionAmount.create(200.0),
      description: TransactionDescription.create("Transfer to savings"),
      transactionType: TransactionType.transfer(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    expect(incomeTransaction.transactionType.isIncome()).toBe(true);
    expect(expenseTransaction.transactionType.isExpense()).toBe(true);
    expect(investmentTransaction.transactionType.isInvestment()).toBe(true);
    expect(transferTransaction.transactionType.isTransfer()).toBe(true);
  });

  it("should support different amounts (positive, negative, zero)", () => {
    const positiveTransaction: Transaction = {
      id: "txn-1",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Income"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const negativeTransaction: Transaction = {
      id: "txn-2",
      accountId: "acc-123",
      categoryId: "cat-789",
      amount: TransactionAmount.create(-75.25),
      description: TransactionDescription.create("Expense"),
      transactionType: TransactionType.expense(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const zeroTransaction: Transaction = {
      id: "txn-3",
      accountId: "acc-123",
      categoryId: "cat-101",
      amount: TransactionAmount.create(0),
      description: TransactionDescription.create("Zero amount"),
      transactionType: TransactionType.transfer(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    expect(positiveTransaction.amount.isPositive()).toBe(true);
    expect(negativeTransaction.amount.isNegative()).toBe(true);
    expect(zeroTransaction.amount.isZero()).toBe(true);
  });

  it("should support different reconciliation states", () => {
    const reconciledTransaction: Transaction = {
      id: "txn-1",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Reconciled transaction"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: true,
      userId: "user-123",
      createdAt: new Date(),
    };

    const unreconciledTransaction: Transaction = {
      id: "txn-2",
      accountId: "acc-123",
      categoryId: "cat-789",
      amount: TransactionAmount.create(-75.25),
      description: TransactionDescription.create("Unreconciled transaction"),
      transactionType: TransactionType.expense(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    expect(reconciledTransaction.isReconciled).toBe(true);
    expect(unreconciledTransaction.isReconciled).toBe(false);
  });

  it("should support different date formats", () => {
    const dateStringTransaction: Transaction = {
      id: "txn-1",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Date from string"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    const dateObjectTransaction: Transaction = {
      id: "txn-2",
      accountId: "acc-123",
      categoryId: "cat-789",
      amount: TransactionAmount.create(-75.25),
      description: TransactionDescription.create("Date from object"),
      transactionType: TransactionType.expense(),
      transactionDate: TransactionDate.create(new Date("2024-01-15")),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    expect(dateStringTransaction.transactionDate.toDateString()).toBe(
      "2024-01-15"
    );
    expect(dateObjectTransaction.transactionDate.toDateString()).toBe(
      "2024-01-15"
    );
  });

  it("should have readonly properties", () => {
    const transaction: Transaction = {
      id: "txn-123",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount: TransactionAmount.create(100.5),
      description: TransactionDescription.create("Salary payment"),
      transactionType: TransactionType.income(),
      transactionDate: TransactionDate.create("2024-01-15"),
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    // TypeScript should prevent assignment to readonly properties
    // This test verifies the interface structure
    expect(typeof transaction.id).toBe("string");
    expect(typeof transaction.accountId).toBe("string");
    expect(typeof transaction.categoryId).toBe("string");
    expect(typeof transaction.amount).toBe("object");
    expect(typeof transaction.description).toBe("object");
    expect(typeof transaction.transactionType).toBe("object");
    expect(typeof transaction.transactionDate).toBe("object");
    expect(typeof transaction.isReconciled).toBe("boolean");
    expect(typeof transaction.userId).toBe("string");
    expect(typeof transaction.createdAt).toBe("object");
  });

  it("should integrate correctly with value objects", () => {
    const amount = TransactionAmount.create(100.5);
    const description = TransactionDescription.create("Test transaction");
    const type = TransactionType.income();
    const date = TransactionDate.create("2024-01-15");

    const transaction: Transaction = {
      id: "txn-123",
      accountId: "acc-123",
      categoryId: "cat-456",
      amount,
      description,
      transactionType: type,
      transactionDate: date,
      isReconciled: false,
      userId: "user-123",
      createdAt: new Date(),
    };

    // Verify value object integration
    expect(transaction.amount.getValue()).toBe(100.5);
    expect(transaction.description.getValue()).toBe("Test transaction");
    expect(transaction.transactionType.getValue()).toBe("income");
    expect(transaction.transactionDate.toDateString()).toBe("2024-01-15");

    // Verify value object methods work correctly
    expect(transaction.amount.isPositive()).toBe(true);
    expect(transaction.description.getLength()).toBe(16);
    expect(transaction.transactionType.isIncome()).toBe(true);
    // Note: This test depends on the current year, so we'll test the actual value instead
    expect(transaction.transactionDate.getYear()).toBe(2024);
  });
});
