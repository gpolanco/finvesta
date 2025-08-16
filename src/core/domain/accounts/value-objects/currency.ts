import {
  SUPPORTED_CURRENCIES,
  ACCOUNT_MESSAGES,
} from "@/core/domain/accounts/constants/account-constants";

/**
 * Value Object for Currency
 * Ensures currency codes follow ISO 4217 standard
 */
export class Currency {
  private constructor(private readonly code: string) {}

  static create(code: string): Currency {
    const normalizedCode = code.toUpperCase().trim();

    if (!/^[A-Z]{3}$/.test(normalizedCode)) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.CURRENCY_INVALID);
    }

    // Use constants from account constants
    if (
      !SUPPORTED_CURRENCIES.includes(
        normalizedCode as (typeof SUPPORTED_CURRENCIES)[number]
      )
    ) {
      throw new Error(ACCOUNT_MESSAGES.VALIDATION.CURRENCY_NOT_SUPPORTED);
    }

    return new Currency(normalizedCode);
  }

  getCode(): string {
    return this.code;
  }

  equals(other: Currency): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return this.code;
  }
}
