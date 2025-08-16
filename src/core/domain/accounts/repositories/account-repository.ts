import { Account } from "@/core/domain/accounts/models/account";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";

/**
 * Repository interface for Account domain
 * Defines the contract for data access within the accounts bounded context
 */
export interface AccountRepository {
  /**
   * Find all accounts for a specific user
   */
  findByUserId(userId: string): Promise<Account[]>;

  /**
   * Find account by ID
   */
  findById(id: string): Promise<Account | null>;

  /**
   * Find account by ID and user ID (security check)
   */
  findByIdAndUserId(id: string, userId: string): Promise<Account | null>;

  /**
   * Find account by name and user ID
   */
  findByNameAndUserId(
    name: AccountName,
    userId: string
  ): Promise<Account | null>;

  /**
   * Create a new account
   */
  create(
    account: Omit<Account, "id" | "createdAt" | "updatedAt">
  ): Promise<Account>;

  /**
   * Update an existing account
   */
  update(
    id: string,
    updates: Partial<Omit<Account, "id" | "createdAt" | "updatedAt">>
  ): Promise<Account>;

  /**
   * Soft delete an account (set isActive to false)
   */
  deactivate(id: string): Promise<void>;

  /**
   * Hard delete an account (use with caution)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if account exists and belongs to user
   */
  exists(id: string, userId: string): Promise<boolean>;

  /**
   * Check if account name exists for user
   */
  nameExists(
    name: AccountName,
    userId: string,
    excludeId?: string
  ): Promise<boolean>;
}
