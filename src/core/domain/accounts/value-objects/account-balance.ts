import {
  ACCOUNT_CONSTRAINTS,
  ACCOUNT_MESSAGES,
} from "@/core/domain/accounts/constants/account-constants";

/**
 * Value Object for Account Balance
 * Ensures balance is always a valid monetary amount
 */
export class AccountBalance {
  private constructor(private readonly value: number) {}

  static create(balance: number): AccountBalance {
    if (!Number.isFinite(balance)) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.BALANCE_INVALID);
    }

    if (balance < ACCOUNT_CONSTRAINTS.BALANCE.MIN) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.BALANCE_TOO_LOW);
    }

    if (balance > ACCOUNT_CONSTRAINTS.BALANCE.MAX) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.BALANCE_TOO_HIGH);
    }

    // Round to 2 decimal places for currency precision
    const roundedBalance = Math.round(balance * 100) / 100;

    return new AccountBalance(roundedBalance);
  }

  getValue(): number {
    return this.value;
  }

  add(amount: number): AccountBalance {
    return AccountBalance.create(this.value + amount);
  }

  subtract(amount: number): AccountBalance {
    return AccountBalance.create(this.value - amount);
  }

  isPositive(): boolean {
    return this.value > 0;
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  equals(other: AccountBalance): boolean {
    return this.value === other.value;
  }
}
