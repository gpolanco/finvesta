import { describe, it, expect } from "vitest";
import {
  TransactionDescriptionTooShortError,
  TransactionDescriptionTooLongError,
  TransactionDescriptionInvalidCharactersError,
  InvalidTransactionAmountError,
  InvalidTransactionTypeError,
  InvalidTransactionDateError,
  TransactionNotFoundError,
  TransactionAccessDeniedError,
  AccountNotFoundError,
  CategoryNotFoundError,
  CategoryTypeMismatchError,
  InsufficientBalanceError,
  CannotDeleteReconciledTransactionError,
  DuplicateTransactionError,
  InvalidTransferError,
  MaxTransactionsReachedError,
  TransactionAccountIdRequiredError,
  TransactionCategoryIdRequiredError,
  TransactionAmountRequiredError,
  TransactionDescriptionRequiredError,
  TransactionDateRequiredError,
  TransactionUserIdRequiredError,
  TransactionIdRequiredError,
} from "@/core/domain/transaction/errors/transaction-errors";
import { TRANSACTION_MESSAGES } from "@/core/domain/transaction/constants/transaction-constants";

describe("Transaction Errors", () => {
  describe("Validation Errors", () => {
    it("should create TransactionDescriptionTooShortError with correct message", () => {
      const error = new TransactionDescriptionTooShortError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_SHORT
      );
      expect(error.name).toBe("TransactionDescriptionTooShortError");
    });

    it("should create TransactionDescriptionTooLongError with correct message", () => {
      const error = new TransactionDescriptionTooLongError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG
      );
      expect(error.name).toBe("TransactionDescriptionTooLongError");
    });

    it("should create TransactionDescriptionInvalidCharactersError with correct message", () => {
      const error = new TransactionDescriptionInvalidCharactersError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_INVALID_CHARS
      );
      expect(error.name).toBe("TransactionDescriptionInvalidCharactersError");
    });

    it("should create InvalidTransactionAmountError with custom message", () => {
      const message = "Custom amount error message";
      const error = new InvalidTransactionAmountError(message);
      expect(error.message).toBe(message);
      expect(error.name).toBe("InvalidTransactionAmountError");
    });

    it("should create InvalidTransactionTypeError with correct message", () => {
      const error = new InvalidTransactionTypeError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_TYPE_INVALID
      );
      expect(error.name).toBe("InvalidTransactionTypeError");
    });

    it("should create InvalidTransactionDateError with custom message", () => {
      const message = "Custom date error message";
      const error = new InvalidTransactionDateError(message);
      expect(error.message).toBe(message);
      expect(error.name).toBe("InvalidTransactionDateError");
    });

    it("should create TransactionAccountIdRequiredError with correct message", () => {
      const error = new TransactionAccountIdRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.ACCOUNT_ID_REQUIRED
      );
      expect(error.name).toBe("TransactionAccountIdRequiredError");
    });

    it("should create TransactionCategoryIdRequiredError with correct message", () => {
      const error = new TransactionCategoryIdRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.CATEGORY_ID_REQUIRED
      );
      expect(error.name).toBe("TransactionCategoryIdRequiredError");
    });

    it("should create TransactionAmountRequiredError with correct message", () => {
      const error = new TransactionAmountRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.AMOUNT_REQUIRED
      );
      expect(error.name).toBe("TransactionAmountRequiredError");
    });

    it("should create TransactionDescriptionRequiredError with correct message", () => {
      const error = new TransactionDescriptionRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_REQUIRED
      );
      expect(error.name).toBe("TransactionDescriptionRequiredError");
    });

    it("should create TransactionDateRequiredError with correct message", () => {
      const error = new TransactionDateRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_REQUIRED
      );
      expect(error.name).toBe("TransactionDateRequiredError");
    });

    it("should create TransactionUserIdRequiredError with correct message", () => {
      const error = new TransactionUserIdRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.USER_ID_REQUIRED
      );
      expect(error.name).toBe("TransactionUserIdRequiredError");
    });

    it("should create TransactionIdRequiredError with correct message", () => {
      const error = new TransactionIdRequiredError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_ID_REQUIRED
      );
      expect(error.name).toBe("TransactionIdRequiredError");
    });
  });

  describe("Business Errors", () => {
    it("should create TransactionNotFoundError with correct message", () => {
      const error = new TransactionNotFoundError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.TRANSACTION_NOT_FOUND
      );
      expect(error.name).toBe("TransactionNotFoundError");
    });

    it("should create TransactionAccessDeniedError with correct message", () => {
      const error = new TransactionAccessDeniedError();
      expect(error.message).toBe(TRANSACTION_MESSAGES.BUSINESS.ACCESS_DENIED);
      expect(error.name).toBe("TransactionAccessDeniedError");
    });

    it("should create AccountNotFoundError with correct message", () => {
      const error = new AccountNotFoundError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.ACCOUNT_NOT_FOUND
      );
      expect(error.name).toBe("AccountNotFoundError");
    });

    it("should create CategoryNotFoundError with correct message", () => {
      const error = new CategoryNotFoundError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND
      );
      expect(error.name).toBe("CategoryNotFoundError");
    });

    it("should create CategoryTypeMismatchError with correct message", () => {
      const error = new CategoryTypeMismatchError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.CATEGORY_TYPE_MISMATCH
      );
      expect(error.name).toBe("CategoryTypeMismatchError");
    });

    it("should create InsufficientBalanceError with correct message", () => {
      const error = new InsufficientBalanceError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.INSUFFICIENT_BALANCE
      );
      expect(error.name).toBe("InsufficientBalanceError");
    });

    it("should create CannotDeleteReconciledTransactionError with correct message", () => {
      const error = new CannotDeleteReconciledTransactionError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.CANNOT_DELETE_RECONCILED
      );
      expect(error.name).toBe("CannotDeleteReconciledTransactionError");
    });

    it("should create DuplicateTransactionError with correct message", () => {
      const error = new DuplicateTransactionError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.DUPLICATE_TRANSACTION
      );
      expect(error.name).toBe("DuplicateTransactionError");
    });

    it("should create InvalidTransferError with correct message", () => {
      const error = new InvalidTransferError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.INVALID_TRANSFER
      );
      expect(error.name).toBe("InvalidTransferError");
    });

    it("should create MaxTransactionsReachedError with correct message", () => {
      const error = new MaxTransactionsReachedError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.MAX_TRANSACTIONS_REACHED
      );
      expect(error.name).toBe("MaxTransactionsReachedError");
    });
  });

  describe("Error Inheritance", () => {
    it("should all inherit from Error class", () => {
      const errors = [
        new TransactionDescriptionTooShortError(),
        new TransactionDescriptionTooLongError(),
        new TransactionDescriptionInvalidCharactersError(),
        new InvalidTransactionAmountError("test"),
        new InvalidTransactionTypeError(),
        new InvalidTransactionDateError("test"),
        new TransactionNotFoundError(),
        new TransactionAccessDeniedError(),
        new AccountNotFoundError(),
        new CategoryNotFoundError(),
        new CategoryTypeMismatchError(),
        new InsufficientBalanceError(),
        new CannotDeleteReconciledTransactionError(),
        new DuplicateTransactionError(),
        new InvalidTransferError(),
        new MaxTransactionsReachedError(),
        new TransactionAccountIdRequiredError(),
        new TransactionCategoryIdRequiredError(),
        new TransactionAmountRequiredError(),
        new TransactionDescriptionRequiredError(),
        new TransactionDateRequiredError(),
        new TransactionUserIdRequiredError(),
        new TransactionIdRequiredError(),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe("Error Names", () => {
    it("should have unique names for all errors", () => {
      const errorNames = [
        "TransactionDescriptionTooShortError",
        "TransactionDescriptionTooLongError",
        "TransactionDescriptionInvalidCharactersError",
        "InvalidTransactionAmountError",
        "InvalidTransactionTypeError",
        "InvalidTransactionDateError",
        "TransactionNotFoundError",
        "TransactionAccessDeniedError",
        "AccountNotFoundError",
        "CategoryNotFoundError",
        "CategoryTypeMismatchError",
        "InsufficientBalanceError",
        "CannotDeleteReconciledTransactionError",
        "DuplicateTransactionError",
        "InvalidTransferError",
        "MaxTransactionsReachedError",
        "TransactionAccountIdRequiredError",
        "TransactionCategoryIdRequiredError",
        "TransactionAmountRequiredError",
        "TransactionDescriptionRequiredError",
        "TransactionDateRequiredError",
        "TransactionUserIdRequiredError",
        "TransactionIdRequiredError",
      ];

      const uniqueNames = new Set(errorNames);
      expect(uniqueNames.size).toBe(errorNames.length);
    });
  });

  describe("Custom Message Support", () => {
    it("should support custom messages for errors that accept them", () => {
      const message1 = "First error message";
      const message2 = "Second error message";

      const error1 = new InvalidTransactionAmountError(message1);
      const error2 = new InvalidTransactionDateError(message2);

      expect(error1.message).toBe(message1);
      expect(error2.message).toBe(message2);
    });

    it("should use default messages for errors that don't accept custom messages", () => {
      const error = new TransactionNotFoundError();
      expect(error.message).toBe(
        TRANSACTION_MESSAGES.BUSINESS.TRANSACTION_NOT_FOUND
      );
    });
  });
});
