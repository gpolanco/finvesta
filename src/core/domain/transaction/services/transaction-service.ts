import { Transaction } from "@/core/domain/transaction/models/transaction";

/**
 * Core business logic for Transaction operations within the transaction bounded context
 */
export interface TransactionService {
  /**
   * Get all transactions for a user
   */
  getUserTransactions(userId: string): Promise<Transaction[]>;

  /**
   * Get transactions by type for a user
   */
  getTransactionsByType(userId: string, type: string): Promise<Transaction[]>;

  /**
   * Get transactions by account for a user
   */
  getTransactionsByAccount(
    userId: string,
    accountId: string
  ): Promise<Transaction[]>;

  /**
   * Get transactions by category for a user
   */
  getTransactionsByCategory(
    userId: string,
    categoryId: string
  ): Promise<Transaction[]>;

  /**
   * Get transactions by date range for a user
   */
  getTransactionsByDateRange(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<Transaction[]>;

  /**
   * Get transactions by month and year for a user
   */
  getTransactionsByMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<Transaction[]>;

  /**
   * Get transaction by ID (with user ownership validation)
   */
  getTransactionById(id: string, userId: string): Promise<Transaction>;

  /**
   * Create a new transaction with business validation
   */
  createTransaction(params: {
    accountId: string;
    categoryId: string;
    amount: number;
    description: string;
    transactionType: string;
    transactionDate: string | Date;
    userId: string;
  }): Promise<Transaction>;

  /**
   * Update transaction with business validation
   */
  updateTransaction(
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
  ): Promise<Transaction>;

  /**
   * Delete transaction (with business rules validation)
   */
  deleteTransaction(id: string, userId: string): Promise<void>;

  /**
   * Mark transaction as reconciled
   */
  markTransactionAsReconciled(id: string, userId: string): Promise<void>;

  /**
   * Mark transaction as unreconciled
   */
  markTransactionAsUnreconciled(id: string, userId: string): Promise<void>;

  /**
   * Get recent transactions for a user
   */
  getRecentTransactions(userId: string, limit?: number): Promise<Transaction[]>;

  /**
   * Get transactions with pagination for a user
   */
  getTransactionsWithPagination(
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
   * Get transaction statistics for a user
   */
  getTransactionStats(userId: string): Promise<{
    totalTransactions: number;
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    transactionsByType: Record<string, number>;
    transactionsByAccount: Record<string, number>;
    transactionsByCategory: Record<string, number>;
  }>;

  /**
   * Get monthly transaction totals for a user
   */
  getMonthlyTotals(
    userId: string,
    year: number
  ): Promise<
    Array<{
      month: number;
      monthName: string;
      income: number;
      expense: number;
      net: number;
      transactionCount: number;
    }>
  >;

  /**
   * Get account balance after a specific transaction
   */
  getAccountBalanceAfterTransaction(
    userId: string,
    accountId: string,
    transactionId: string
  ): Promise<number>;

  /**
   * Check if account has sufficient balance for a transaction
   */
  checkAccountBalance(
    userId: string,
    accountId: string,
    amount: number,
    excludeTransactionId?: string
  ): Promise<boolean>;

  /**
   * Validate transaction data without persistence
   */
  validateTransactionData(params: {
    accountId: string;
    categoryId: string;
    amount: number;
    description: string;
    transactionType: string;
    transactionDate: string | Date;
  }): Promise<{
    isValid: boolean;
    errors: string[];
  }>;

  /**
   * Bulk create transactions for a user
   */
  bulkCreateTransactions(
    userId: string,
    transactions: Array<{
      accountId: string;
      categoryId: string;
      amount: number;
      description: string;
      transactionType: string;
      transactionDate: string | Date;
    }>
  ): Promise<Transaction[]>;

  /**
   * Get transaction summary by period
   */
  getTransactionSummaryByPeriod(
    userId: string,
    period: "day" | "week" | "month" | "quarter" | "year",
    startDate?: string | Date
  ): Promise<{
    period: string;
    startDate: string;
    endDate: string;
    income: number;
    expense: number;
    net: number;
    transactionCount: number;
    topCategories: Array<{ categoryId: string; amount: number; count: number }>;
    topAccounts: Array<{ accountId: string; amount: number; count: number }>;
  }>;

  /**
   * Search transactions by description
   */
  searchTransactionsByDescription(
    userId: string,
    searchTerm: string,
    limit?: number
  ): Promise<Transaction[]>;

  /**
   * Get duplicate transaction suggestions
   */
  getDuplicateTransactionSuggestions(
    userId: string,
    transaction: {
      accountId: string;
      amount: number;
      description: string;
      transactionType: string;
      transactionDate: string | Date;
    }
  ): Promise<Transaction[]>;
}
