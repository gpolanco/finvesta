import { ACCOUNT_MESSAGES } from "@/core/domain/accounts/constants/account-constants";

/**
 * Domain-specific errors for the Accounts bounded context
 */

export class AccountNameTooShortError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_SHORT);
    this.name = "AccountNameTooShortError";
  }
}

export class AccountNameTooLongError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.VALIDATION.NAME_TOO_LONG);
    this.name = "AccountNameTooLongError";
  }
}

export class AccountNameInvalidCharactersError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.VALIDATION.NAME_INVALID_CHARS);
    this.name = "AccountNameInvalidCharactersError";
  }
}

export class InvalidBalanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidBalanceError";
  }
}

export class InvalidCurrencyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCurrencyError";
  }
}

export class AccountNotFoundError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.BUSINESS.ACCOUNT_NOT_FOUND);
    this.name = "AccountNotFoundError";
  }
}

export class AccountAccessDeniedError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.BUSINESS.ACCESS_DENIED);
    this.name = "AccountAccessDeniedError";
  }
}

export class DuplicateAccountNameError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.BUSINESS.DUPLICATE_NAME);
    this.name = "DuplicateAccountNameError";
  }
}

export class CannotDeleteActiveAccountError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.BUSINESS.CANNOT_DELETE_ACTIVE);
    this.name = "CannotDeleteActiveAccountError";
  }
}

export class InvalidAccountTypeError extends Error {
  constructor() {
    super(ACCOUNT_MESSAGES.VALIDATION.ACCOUNT_TYPE_INVALID);
    this.name = "InvalidAccountTypeError";
  }
}
