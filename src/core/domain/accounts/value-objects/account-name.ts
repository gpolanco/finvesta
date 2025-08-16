import {
  ACCOUNT_CONSTRAINTS,
  ACCOUNT_MESSAGES,
} from "@/core/domain/accounts/constants/account-constants";

/**
 * Value Object for Account Name
 * Encapsulates validation and business rules for account naming
 */
export class AccountName {
  private constructor(private readonly value: string) {}

  static create(name: string): AccountName {
    const trimmedName = name.trim();

    if (trimmedName.length < ACCOUNT_CONSTRAINTS.NAME.MIN_LENGTH) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_SHORT);
    }

    if (trimmedName.length > ACCOUNT_CONSTRAINTS.NAME.MAX_LENGTH) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_LONG);
    }

    if (!/^[a-zA-Z0-9\s\-_]+$/.test(trimmedName)) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.NAME_INVALID_CHARS);
    }

    return new AccountName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AccountName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
