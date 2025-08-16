import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { Currency } from "@/core/domain/accounts/value-objects/currency";

/**
 * Core domain model for Account
 * This represents the business concept of an account within the accounts bounded context
 */
export interface Account {
  readonly id: string;
  readonly name: AccountName;
  readonly type: AccountType;
  readonly provider?: string;
  readonly balance: AccountBalance;
  readonly currency: Currency;
  readonly isActive: boolean;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}
