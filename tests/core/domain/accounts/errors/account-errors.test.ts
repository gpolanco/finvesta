import { describe, it, expect } from "vitest";
import {
  AccountNameTooShortError,
  AccountNameTooLongError,
  AccountNameInvalidCharactersError,
  InvalidBalanceError,
  InvalidCurrencyError,
  AccountNotFoundError,
  AccountAccessDeniedError,
  DuplicateAccountNameError,
  CannotDeleteActiveAccountError,
  InvalidAccountTypeError,
} from "@/core/domain/accounts/errors/account-errors";

describe("Account Domain Errors", () => {
  describe("AccountNameTooShortError", () => {
    it("should create error with correct message", () => {
      const error = new AccountNameTooShortError();
      expect(error.message).toBe("Account name must be at least 2 characters");
      expect(error.name).toBe("AccountNameTooShortError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("AccountNameTooLongError", () => {
    it("should create error with correct message", () => {
      const error = new AccountNameTooLongError();
      expect(error.message).toBe("Account name cannot exceed 100 characters");
      expect(error.name).toBe("AccountNameTooLongError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("AccountNameInvalidCharactersError", () => {
    it("should create error with correct message", () => {
      const error = new AccountNameInvalidCharactersError();
      expect(error.message).toBe("Account name contains invalid characters");
      expect(error.name).toBe("AccountNameInvalidCharactersError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("InvalidBalanceError", () => {
    it("should create error with custom message", () => {
      const customMessage = "Custom balance error message";
      const error = new InvalidBalanceError(customMessage);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("InvalidBalanceError");
      expect(error).toBeInstanceOf(Error);
    });

    it("should create error with different messages", () => {
      const message1 = "Balance too low";
      const message2 = "Balance too high";

      const error1 = new InvalidBalanceError(message1);
      const error2 = new InvalidBalanceError(message2);

      expect(error1.message).toBe(message1);
      expect(error2.message).toBe(message2);
      expect(error1.message).not.toBe(error2.message);
    });
  });

  describe("InvalidCurrencyError", () => {
    it("should create error with custom message", () => {
      const customMessage = "Custom currency error message";
      const error = new InvalidCurrencyError(customMessage);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("InvalidCurrencyError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("AccountNotFoundError", () => {
    it("should create error with correct message", () => {
      const error = new AccountNotFoundError();
      expect(error.message).toBe("Account not found");
      expect(error.name).toBe("AccountNotFoundError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("AccountAccessDeniedError", () => {
    it("should create error with correct message", () => {
      const error = new AccountAccessDeniedError();
      expect(error.message).toBe("Access denied to this account");
      expect(error.name).toBe("AccountAccessDeniedError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("DuplicateAccountNameError", () => {
    it("should create error with correct message", () => {
      const error = new DuplicateAccountNameError();
      expect(error.message).toBe("An account with this name already exists");
      expect(error.name).toBe("DuplicateAccountNameError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("CannotDeleteActiveAccountError", () => {
    it("should create error with correct message", () => {
      const error = new CannotDeleteActiveAccountError();
      expect(error.message).toBe(
        "Cannot delete account with non-zero balance. Deactivate it first."
      );
      expect(error.name).toBe("CannotDeleteActiveAccountError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("InvalidAccountTypeError", () => {
    it("should create error with correct message", () => {
      const error = new InvalidAccountTypeError();
      expect(error.message).toBe("Invalid account type");
      expect(error.name).toBe("InvalidAccountTypeError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("Error inheritance", () => {
    it("should all errors inherit from Error class", () => {
      const errors = [
        new AccountNameTooShortError(),
        new AccountNameTooLongError(),
        new AccountNameInvalidCharactersError(),
        new InvalidBalanceError("test"),
        new InvalidCurrencyError("test"),
        new AccountNotFoundError(),
        new AccountAccessDeniedError(),
        new DuplicateAccountNameError(),
        new CannotDeleteActiveAccountError(),
        new InvalidAccountTypeError(),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
        expect(error).toHaveProperty("stack");
      });
    });
  });

  describe("Error names", () => {
    it("should have unique error names", () => {
      const errors = [
        new AccountNameTooShortError(),
        new AccountNameTooLongError(),
        new AccountNameInvalidCharactersError(),
        new InvalidBalanceError("test"),
        new InvalidCurrencyError("test"),
        new AccountNotFoundError(),
        new AccountAccessDeniedError(),
        new DuplicateAccountNameError(),
        new CannotDeleteActiveAccountError(),
        new InvalidAccountTypeError(),
      ];

      const names = errors.map((error) => error.name);
      const uniqueNames = new Set(names);

      expect(names.length).toBe(uniqueNames.size);
    });
  });
});
