import { TRANSACTION_MESSAGES } from "@/core/domain/transaction/constants/transaction-constants";

/**
 * Domain-specific errors for the Transaction bounded context
 */

export class TransactionDescriptionTooShortError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_SHORT);
    this.name = "TransactionDescriptionTooShortError";
  }
}

export class TransactionDescriptionTooLongError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG);
    this.name = "TransactionDescriptionTooLongError";
  }
}

export class TransactionDescriptionInvalidCharactersError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_INVALID_CHARS);
    this.name = "TransactionDescriptionInvalidCharactersError";
  }
}

export class InvalidTransactionAmountError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTransactionAmountError";
  }
}

export class InvalidTransactionTypeError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_TYPE_INVALID);
    this.name = "InvalidTransactionTypeError";
  }
}

export class InvalidTransactionDateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTransactionDateError";
  }
}

export class TransactionNotFoundError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.TRANSACTION_NOT_FOUND);
    this.name = "TransactionNotFoundError";
  }
}

export class TransactionAccessDeniedError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.ACCESS_DENIED);
    this.name = "TransactionAccessDeniedError";
  }
}

export class AccountNotFoundError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.ACCOUNT_NOT_FOUND);
    this.name = "AccountNotFoundError";
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND);
    this.name = "CategoryNotFoundError";
  }
}

export class CategoryTypeMismatchError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.CATEGORY_TYPE_MISMATCH);
    this.name = "CategoryTypeMismatchError";
  }
}

export class InsufficientBalanceError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.INSUFFICIENT_BALANCE);
    this.name = "InsufficientBalanceError";
  }
}

export class CannotDeleteReconciledTransactionError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.CANNOT_DELETE_RECONCILED);
    this.name = "CannotDeleteReconciledTransactionError";
  }
}

export class DuplicateTransactionError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.DUPLICATE_TRANSACTION);
    this.name = "DuplicateTransactionError";
  }
}

export class InvalidTransferError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.INVALID_TRANSFER);
    this.name = "InvalidTransferError";
  }
}

export class MaxTransactionsReachedError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.BUSINESS.MAX_TRANSACTIONS_REACHED);
    this.name = "MaxTransactionsReachedError";
  }
}

export class TransactionAccountIdRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.ACCOUNT_ID_REQUIRED);
    this.name = "TransactionAccountIdRequiredError";
  }
}

export class TransactionCategoryIdRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.CATEGORY_ID_REQUIRED);
    this.name = "TransactionCategoryIdRequiredError";
  }
}

export class TransactionAmountRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.AMOUNT_REQUIRED);
    this.name = "TransactionAmountRequiredError";
  }
}

export class TransactionDescriptionRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_REQUIRED);
    this.name = "TransactionDescriptionRequiredError";
  }
}

export class TransactionDateRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_REQUIRED);
    this.name = "TransactionDateRequiredError";
  }
}

export class TransactionUserIdRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.USER_ID_REQUIRED);
    this.name = "TransactionUserIdRequiredError";
  }
}

export class TransactionIdRequiredError extends Error {
  constructor() {
    super(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_ID_REQUIRED);
    this.name = "TransactionIdRequiredError";
  }
}
