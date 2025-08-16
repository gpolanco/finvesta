import { Transaction } from "@/core/domain/transaction/models/transaction";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";

/**
 * Repository interface for Transaction domain
 * Defines the contract for data access within the transaction bounded context
 */
export interface TransactionRepository {
  /**
   * Find all transactions for a specific user
   */
  findByUserId(userId: string): Promise<Transaction[]>;

  /**
   * Find transactions by account ID for a specific user
   */
  findByAccountIdAndUserId(
    accountId: string,
    userId: string
  ): Promise<Transaction[]>;

  /**
   * Find transactions by category ID for a specific user
   */
  findByCategoryIdAndUserId(
    categoryId: string,
    userId: string
  ): Promise<Transaction[]>;

  /**
   * Find transactions by type for a specific user
   */
  findByTypeAndUserId(
    type: TransactionType,
    userId: string
  ): Promise<Transaction[]>;

  /**
   * Find transactions by date range for a specific user
   */
  findByDateRangeAndUserId(
    startDate: TransactionDate,
    endDate: TransactionDate,
    userId: string
  ): Promise<Transaction[]>;

  /**
   * Find transactions by month and year for a specific user
   */
  findByMonthAndYearAndUserId(
    month: number,
    year: number,
    userId: string
  ): Promise<Transaction[]>;

  /**
   * Find transaction by ID
   */
  findById(id: string): Promise<Transaction | null>;

  /**
   * Find transaction by ID and user ID (security check)
   */
  findByIdAndUserId(id: string, userId: string): Promise<Transaction | null>;

  /**
   * Find recent transactions for a specific user
   */
  findRecentByUserId(userId: string, limit: number): Promise<Transaction[]>;

  /**
   * Find transactions with pagination for a specific user
   */
  findByUserIdWithPagination(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    transactions: Transaction[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Create a new transaction
   */
  create(
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ): Promise<Transaction>;

  /**
   * Update an existing transaction
   */
  update(
    id: string,
    updates: Partial<Omit<Transaction, "id" | "createdAt" | "updatedAt">>
  ): Promise<Transaction>;

  /**
   * Delete a transaction permanently
   */
  delete(id: string): Promise<void>;

  /**
   * Mark transaction as reconciled
   */
  markAsReconciled(id: string): Promise<void>;

  /**
   * Mark transaction as unreconciled
   */
  markAsUnreconciled(id: string): Promise<void>;

  /**
   * Check if transaction exists and belongs to user
   */
  exists(id: string, userId: string): Promise<boolean>;

  /**
   * Get transaction count for a specific user
   */
  getCountByUserId(userId: string): Promise<number>;

  /**
   * Get transaction count by account for a specific user
   */
  getCountByAccountIdAndUserId(
    accountId: string,
    userId: string
  ): Promise<number>;

  /**
   * Get transaction count by category for a specific user
   */
  getCountByCategoryIdAndUserId(
    categoryId: string,
    userId: string
  ): Promise<number>;

  /**
   * Get total amount by type for a specific user
   */
  getTotalAmountByTypeAndUserId(
    type: TransactionType,
    userId: string
  ): Promise<number>;

  /**
   * Get total amount by account for a specific user
   */
  getTotalAmountByAccountIdAndUserId(
    accountId: string,
    userId: string
  ): Promise<number>;

  /**
   * Get total amount by category for a specific user
   */
  getTotalAmountByCategoryIdAndUserId(
    categoryId: string,
    userId: string
  ): Promise<number>;

  /**
   * Get monthly totals for a specific user
   */
  getMonthlyTotalsByUserId(
    userId: string,
    year: number
  ): Promise<
    Array<{ month: number; income: number; expense: number; net: number }>
  >;

  /**
   * Check if category is being used by transactions
   */
  isCategoryInUse(categoryId: string): Promise<boolean>;

  /**
   * Get category usage count
   */
  getCategoryUsageCount(categoryId: string): Promise<number>;

  /**
   * Check if account has sufficient balance for transaction
   */
  hasSufficientBalance(
    accountId: string,
    amount: number,
    excludeTransactionId?: string
  ): Promise<boolean>;

  /**
   * Get account balance after transaction
   */
  getAccountBalanceAfterTransaction(
    accountId: string,
    transactionId: string
  ): Promise<number>;
}
