import { Account } from "@/core/domain/accounts/models/account";

/**
 * Core business logic for Account operations within the accounts bounded context
 */
export interface AccountService {
  /**
   * Get all accounts for a user
   */
  getUserAccounts(userId: string): Promise<Account[]>;

  /**
   * Get account by ID (with user ownership validation)
   */
  getAccountById(id: string, userId: string): Promise<Account>;

  /**
   * Create a new account with business validation
   */
  createAccount(params: {
    name: string;
    type: string;
    provider?: string;
    balance: number;
    currency: string;
    userId: string;
  }): Promise<Account>;

  /**
   * Update account with business validation
   */
  updateAccount(
    id: string,
    userId: string,
    updates: {
      name?: string;
      type?: string;
      provider?: string;
      balance?: number;
      currency?: string;
      isActive?: boolean;
    }
  ): Promise<Account>;

  /**
   * Deactivate account (soft delete)
   */
  deactivateAccount(id: string, userId: string): Promise<void>;

  /**
   * Delete account permanently (with business rules)
   */
  deleteAccount(id: string, userId: string): Promise<void>;

  /**
   * Get total balance across all user accounts
   */
  getTotalBalance(userId: string): Promise<number>;

  /**
   * Get accounts by type for a user
   */
  getAccountsByType(userId: string, type: string): Promise<Account[]>;
}
