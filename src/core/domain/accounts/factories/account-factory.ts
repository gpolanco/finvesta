import { Account } from "@/core/domain/accounts/models/account";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { Currency } from "@/core/domain/accounts/value-objects/currency";
import {
  DuplicateAccountNameError,
  AccountNotFoundError,
} from "@/core/domain/accounts/errors/account-errors";
import { AccountRepository } from "@/core/domain/accounts/repositories/account-repository";

/**
 * Factory for creating and updating Account instances
 * Handles business logic for account creation and updates
 */
export class AccountFactory {
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Create a new account with validation
   */
  async create(params: {
    name: string;
    type: string;
    provider?: string;
    balance: number;
    currency: string;
    userId: string;
  }): Promise<Account> {
    // Validate and create value objects
    const accountName = AccountName.create(params.name);
    const accountType = AccountType.fromString(params.type);
    const accountBalance = AccountBalance.create(params.balance);
    const accountCurrency = Currency.create(params.currency);

    // Check for duplicate names
    const nameExists = await this.accountRepository.nameExists(
      accountName,
      params.userId
    );

    if (nameExists) {
      throw new DuplicateAccountNameError();
    }

    // Create account data
    const accountData = {
      name: accountName,
      type: accountType,
      provider: params.provider,
      balance: accountBalance,
      currency: accountCurrency,
      isActive: true,
      userId: params.userId,
    };

    // Persist to repository
    return this.accountRepository.create(accountData);
  }

  /**
   * Update an existing account with validation
   */
  async update(
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
  ): Promise<Account> {
    // Verify account ownership
    const existingAccount = await this.accountRepository.findByIdAndUserId(
      id,
      userId
    );
    if (!existingAccount) {
      throw new AccountNotFoundError();
    }

    // Prepare update data with correct types
    const updateData: Partial<{
      name: AccountName;
      type: AccountType;
      provider?: string;
      balance: AccountBalance;
      currency: Currency;
      isActive: boolean;
    }> = {};

    // Handle name update with duplicate check
    if (updates.name !== undefined) {
      const newName = AccountName.create(updates.name);

      // Check for duplicate names (excluding current account)
      const nameExists = await this.accountRepository.nameExists(
        newName,
        userId,
        id
      );

      if (nameExists) {
        throw new DuplicateAccountNameError();
      }

      updateData.name = newName;
    }

    // Handle type update
    if (updates.type !== undefined) {
      updateData.type = AccountType.fromString(updates.type);
    }

    // Handle balance update
    if (updates.balance !== undefined) {
      updateData.balance = AccountBalance.create(updates.balance);
    }

    // Handle currency update
    if (updates.currency !== undefined) {
      updateData.currency = Currency.create(updates.currency);
    }

    // Handle other updates
    if (updates.provider !== undefined) {
      updateData.provider = updates.provider;
    }

    if (updates.isActive !== undefined) {
      updateData.isActive = updates.isActive;
    }

    // Apply updates
    return this.accountRepository.update(id, updateData);
  }

  /**
   * Create Account instance from database data
   */
  static fromDatabase(data: {
    id: string;
    name: string;
    type: string;
    provider?: string;
    balance: number;
    currency: string;
    is_active: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  }): Account {
    return {
      id: data.id,
      name: AccountName.create(data.name),
      type: AccountType.fromString(data.type),
      provider: data.provider,
      balance: AccountBalance.create(data.balance),
      currency: Currency.create(data.currency),
      isActive: data.is_active,
      userId: data.user_id,
      createdAt: new Date(data.created_at),
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
    };
  }

  /**
   * Convert Account to database format
   */
  static toDatabase(account: Account): {
    id: string;
    name: string;
    type: string;
    provider?: string;
    balance: number;
    currency: string;
    is_active: boolean;
    user_id: string;
    created_at: string;
    updated_at?: string;
  } {
    return {
      id: account.id,
      name: account.name.getValue(),
      type: account.type.getValue(),
      provider: account.provider,
      balance: account.balance.getValue(),
      currency: account.currency.getCode(),
      is_active: account.isActive,
      user_id: account.userId,
      created_at: account.createdAt.toISOString(),
      updated_at: account.updatedAt?.toISOString(),
    };
  }
}
