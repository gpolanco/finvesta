import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";

/**
 * Core domain model for Transaction
 * This represents the business concept of a transaction within the transaction bounded context
 */
export interface Transaction {
  readonly id: string;
  readonly accountId: string;
  readonly categoryId: string;
  readonly amount: TransactionAmount;
  readonly description: TransactionDescription;
  readonly transactionType: TransactionType;
  readonly transactionDate: TransactionDate;
  readonly isReconciled: boolean;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}
