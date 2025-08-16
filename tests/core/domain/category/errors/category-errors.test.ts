import { describe, it, expect } from "vitest";
import {
  CategoryNameTooShortError,
  CategoryNameTooLongError,
  CategoryNameInvalidCharactersError,
  CategoryDescriptionTooLongError,
  InvalidCategoryColorError,
  InvalidCategoryTypeError,
  CategoryNotFoundError,
  CategoryAccessDeniedError,
  DuplicateCategoryNameError,
  CannotDeleteDefaultCategoryError,
  CannotDeleteCategoryInUseError,
  CategoryAlreadyExistsError,
  MaxCategoriesReachedError,
} from "@/core/domain/category/errors/category-errors";
import { CATEGORY_MESSAGES } from "@/core/domain/category/constants/category-constants";

describe("Category Domain Errors", () => {
  describe("CategoryNameTooShortError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryNameTooShortError();
      expect(error.message).toBe(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_SHORT);
      expect(error.name).toBe("CategoryNameTooShortError");
    });
  });

  describe("CategoryNameTooLongError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryNameTooLongError();
      expect(error.message).toBe(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_LONG);
      expect(error.name).toBe("CategoryNameTooLongError");
    });
  });

  describe("CategoryNameInvalidCharactersError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryNameInvalidCharactersError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.VALIDATION.NAME_INVALID_CHARS
      );
      expect(error.name).toBe("CategoryNameInvalidCharactersError");
    });
  });

  describe("CategoryDescriptionTooLongError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryDescriptionTooLongError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG
      );
      expect(error.name).toBe("CategoryDescriptionTooLongError");
    });
  });

  describe("InvalidCategoryColorError", () => {
    it("should create error with custom message", () => {
      const customMessage = "Custom color error message";
      const error = new InvalidCategoryColorError(customMessage);
      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("InvalidCategoryColorError");
    });

    it("should create error with different messages", () => {
      const message1 = "First error message";
      const message2 = "Second error message";

      const error1 = new InvalidCategoryColorError(message1);
      const error2 = new InvalidCategoryColorError(message2);

      expect(error1.message).toBe(message1);
      expect(error2.message).toBe(message2);
    });
  });

  describe("InvalidCategoryTypeError", () => {
    it("should create error with correct message", () => {
      const error = new InvalidCategoryTypeError();
      expect(error.message).toBe(CATEGORY_MESSAGES.VALIDATION.TYPE_INVALID);
      expect(error.name).toBe("InvalidCategoryTypeError");
    });
  });

  describe("CategoryNotFoundError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryNotFoundError();
      expect(error.message).toBe(CATEGORY_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND);
      expect(error.name).toBe("CategoryNotFoundError");
    });
  });

  describe("CategoryAccessDeniedError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryAccessDeniedError();
      expect(error.message).toBe(CATEGORY_MESSAGES.BUSINESS.ACCESS_DENIED);
      expect(error.name).toBe("CategoryAccessDeniedError");
    });
  });

  describe("DuplicateCategoryNameError", () => {
    it("should create error with correct message", () => {
      const error = new DuplicateCategoryNameError();
      expect(error.message).toBe(CATEGORY_MESSAGES.BUSINESS.DUPLICATE_NAME);
      expect(error.name).toBe("DuplicateCategoryNameError");
    });
  });

  describe("CannotDeleteDefaultCategoryError", () => {
    it("should create error with correct message", () => {
      const error = new CannotDeleteDefaultCategoryError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_DEFAULT
      );
      expect(error.name).toBe("CannotDeleteDefaultCategoryError");
    });
  });

  describe("CannotDeleteCategoryInUseError", () => {
    it("should create error with correct message", () => {
      const error = new CannotDeleteCategoryInUseError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_IN_USE
      );
      expect(error.name).toBe("CannotDeleteCategoryInUseError");
    });
  });

  describe("CategoryAlreadyExistsError", () => {
    it("should create error with correct message", () => {
      const error = new CategoryAlreadyExistsError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.BUSINESS.CATEGORY_ALREADY_EXISTS
      );
      expect(error.name).toBe("CategoryAlreadyExistsError");
    });
  });

  describe("MaxCategoriesReachedError", () => {
    it("should create error with correct message", () => {
      const error = new MaxCategoriesReachedError();
      expect(error.message).toBe(
        CATEGORY_MESSAGES.BUSINESS.MAX_CATEGORIES_REACHED
      );
      expect(error.name).toBe("MaxCategoriesReachedError");
    });
  });

  describe("Error inheritance", () => {
    it("should all errors inherit from Error class", () => {
      const errors = [
        new CategoryNameTooShortError(),
        new CategoryNameTooLongError(),
        new CategoryNameInvalidCharactersError(),
        new CategoryDescriptionTooLongError(),
        new InvalidCategoryColorError("test"),
        new InvalidCategoryTypeError(),
        new CategoryNotFoundError(),
        new CategoryAccessDeniedError(),
        new DuplicateCategoryNameError(),
        new CannotDeleteDefaultCategoryError(),
        new CannotDeleteCategoryInUseError(),
        new CategoryAlreadyExistsError(),
        new MaxCategoriesReachedError(),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe("Error names", () => {
    it("should have unique error names", () => {
      const errorNames = [
        CategoryNameTooShortError.name,
        CategoryNameTooLongError.name,
        CategoryNameInvalidCharactersError.name,
        CategoryDescriptionTooLongError.name,
        InvalidCategoryColorError.name,
        InvalidCategoryTypeError.name,
        CategoryNotFoundError.name,
        CategoryAccessDeniedError.name,
        DuplicateCategoryNameError.name,
        CannotDeleteDefaultCategoryError.name,
        CannotDeleteCategoryInUseError.name,
        CategoryAlreadyExistsError.name,
        MaxCategoriesReachedError.name,
      ];

      const uniqueNames = new Set(errorNames);
      expect(uniqueNames.size).toBe(errorNames.length);
    });
  });
});
