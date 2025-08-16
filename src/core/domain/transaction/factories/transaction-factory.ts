import { Transaction } from "@/core/domain/transaction/models/transaction";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";
import {
  TransactionNotFoundError,
  AccountNotFoundError,
  InsufficientBalanceError,
  CannotDeleteReconciledTransactionError,
} from "@/core/domain/transaction/errors/transaction-errors";
import { TransactionRepository } from "@/core/domain/transaction/repositories/transaction-repository";

/**
 * Factory for creating and updating Transaction instances
 * Handles business logic for transaction creation and updates
 */
export class TransactionFactory {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Create a new transaction with validation
   */
  async create(params: {
    accountId: string;
    categoryId: string;
    amount: number;
    description: string;
    transactionType: string;
    transactionDate: string | Date;
    userId: string;
  }): Promise<Transaction> {
    // Validate and create value objects
    const transactionAmount = TransactionAmount.create(params.amount);
    const transactionDescription = TransactionDescription.create(
      params.description
    );
    const transactionType = TransactionType.fromString(params.transactionType);
    const transactionDate = TransactionDate.create(params.transactionDate);

    // Validate account exists and belongs to user
    const accountExists = await this.transactionRepository.exists(
      params.accountId,
      params.userId
    );
    if (!accountExists) {
      throw new AccountNotFoundError();
    }

    // Validate category exists and belongs to user
    // Note: This would require a category repository dependency
    // For now, we'll assume it's validated at the service layer

    // Validate category type matches transaction type
    // Note: This would require a category repository dependency
    // For now, we'll assume it's validated at the service layer

    // Check sufficient balance for expenses
    if (transactionAmount.isNegative()) {
      const hasBalance = await this.transactionRepository.hasSufficientBalance(
        params.accountId,
        Math.abs(params.amount)
      );
      if (!hasBalance) {
        throw new InsufficientBalanceError();
      }
    }

    // Create transaction data
    const transactionData = {
      accountId: params.accountId,
      categoryId: params.categoryId,
      amount: transactionAmount,
      description: transactionDescription,
      transactionType: transactionType,
      transactionDate: transactionDate,
      isReconciled: false,
      userId: params.userId,
    };

    // Persist to repository
    return this.transactionRepository.create(transactionData);
  }

  /**
   * Update an existing transaction with validation
   */
  async update(
    id: string,
    userId: string,
    updates: {
      accountId?: string;
      categoryId?: string;
      amount?: number;
      description?: string;
      transactionType?: string;
      transactionDate?: string | Date;
      isReconciled?: boolean;
    }
  ): Promise<Transaction> {
    // Verify transaction ownership
    const existingTransaction =
      await this.transactionRepository.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      throw new TransactionNotFoundError();
    }

    // Prepare update data with correct types
    const updateData: Partial<{
      accountId: string;
      categoryId: string;
      amount: TransactionAmount;
      description: TransactionDescription;
      transactionType: TransactionType;
      transactionDate: TransactionDate;
      isReconciled: boolean;
    }> = {};

    // Handle account ID update
    if (updates.accountId !== undefined) {
      // Validate account exists and belongs to user
      const accountExists = await this.transactionRepository.exists(
        updates.accountId,
        userId
      );
      if (!accountExists) {
        throw new AccountNotFoundError();
      }
      updateData.accountId = updates.accountId;
    }

    // Handle category ID update
    if (updates.categoryId !== undefined) {
      // Validate category exists and belongs to user
      // Note: This would require a category repository dependency
      updateData.categoryId = updates.categoryId;
    }

    // Handle amount update
    if (updates.amount !== undefined) {
      const newAmount = TransactionAmount.create(updates.amount);

      // Check sufficient balance for expenses
      if (newAmount.isNegative()) {
        const hasBalance =
          await this.transactionRepository.hasSufficientBalance(
            existingTransaction.accountId,
            Math.abs(updates.amount),
            id
          );
        if (!hasBalance) {
          throw new InsufficientBalanceError();
        }
      }

      updateData.amount = newAmount;
    }

    // Handle description update
    if (updates.description !== undefined) {
      updateData.description = TransactionDescription.create(
        updates.description
      );
    }

    // Handle transaction type update
    if (updates.transactionType !== undefined) {
      updateData.transactionType = TransactionType.fromString(
        updates.transactionType
      );
    }

    // Handle transaction date update
    if (updates.transactionDate !== undefined) {
      updateData.transactionDate = TransactionDate.create(
        updates.transactionDate
      );
    }

    // Handle reconciliation update
    if (updates.isReconciled !== undefined) {
      updateData.isReconciled = updates.isReconciled;
    }

    // Apply updates
    return this.transactionRepository.update(id, updateData);
  }

  /**
   * Delete a transaction with business rules validation
   */
  async delete(id: string, userId: string): Promise<void> {
    // Verify transaction ownership
    const existingTransaction =
      await this.transactionRepository.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      throw new TransactionNotFoundError();
    }

    // Check if transaction is reconciled
    if (existingTransaction.isReconciled) {
      throw new CannotDeleteReconciledTransactionError();
    }

    // Delete the transaction
    await this.transactionRepository.delete(id);
  }

  /**
   * Mark transaction as reconciled
   */
  async markAsReconciled(id: string, userId: string): Promise<void> {
    // Verify transaction ownership
    const existingTransaction =
      await this.transactionRepository.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      throw new TransactionNotFoundError();
    }

    await this.transactionRepository.markAsReconciled(id);
  }

  /**
   * Mark transaction as unreconciled
   */
  async markAsUnreconciled(id: string, userId: string): Promise<void> {
    // Verify transaction ownership
    const existingTransaction =
      await this.transactionRepository.findByIdAndUserId(id, userId);
    if (!existingTransaction) {
      throw new TransactionNotFoundError();
    }

    await this.transactionRepository.markAsUnreconciled(id);
  }

  /**
   * Create Transaction instance from database data
   */
  static fromDatabase(data: {
    id: string;
    account_id: string;
    category_id: string;
    amount: number;
    description: string;
    transaction_type: string;
    transaction_date: string;
    is_reconciled: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  }): Transaction {
    return {
      id: data.id,
      accountId: data.account_id,
      categoryId: data.category_id,
      amount: TransactionAmount.create(data.amount),
      description: TransactionDescription.create(data.description),
      transactionType: TransactionType.fromString(data.transaction_type),
      transactionDate: TransactionDate.create(data.transaction_date),
      isReconciled: data.is_reconciled,
      userId: data.user_id,
      createdAt: new Date(data.created_at),
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
    };
  }

  /**
   * Convert Transaction to database format
   */
  static toDatabase(transaction: Transaction): {
    id: string;
    account_id: string;
    category_id: string;
    amount: number;
    description: string;
    transaction_type: string;
    transaction_date: string;
    is_reconciled: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  } {
    return {
      id: transaction.id,
      account_id: transaction.accountId,
      category_id: transaction.categoryId,
      amount: transaction.amount.getValue(),
      description: transaction.description.getValue(),
      transaction_type: transaction.transactionType.getValue(),
      transaction_date: transaction.transactionDate.toISOString(),
      is_reconciled: transaction.isReconciled,
      user_id: transaction.userId,
      created_at: transaction.createdAt.toISOString(),
      updated_at: transaction.updatedAt?.toISOString(),
    };
  }
}
