import { CATEGORY_MESSAGES } from "@/core/domain/category/constants/category-constants";

/**
 * Domain-specific errors for the Category bounded context
 */

export class CategoryNameTooShortError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_SHORT);
    this.name = "CategoryNameTooShortError";
  }
}

export class CategoryNameTooLongError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.VALIDATION.NAME_TOO_LONG);
    this.name = "CategoryNameTooLongError";
  }
}

export class CategoryNameInvalidCharactersError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.VALIDATION.NAME_INVALID_CHARS);
    this.name = "CategoryNameInvalidCharactersError";
  }
}

export class CategoryDescriptionTooLongError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG);
    this.name = "CategoryDescriptionTooLongError";
  }
}

export class InvalidCategoryColorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCategoryColorError";
  }
}

export class InvalidCategoryTypeError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.VALIDATION.TYPE_INVALID);
    this.name = "InvalidCategoryTypeError";
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND);
    this.name = "CategoryNotFoundError";
  }
}

export class CategoryAccessDeniedError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.ACCESS_DENIED);
    this.name = "CategoryAccessDeniedError";
  }
}

export class DuplicateCategoryNameError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.DUPLICATE_NAME);
    this.name = "DuplicateCategoryNameError";
  }
}

export class CannotDeleteDefaultCategoryError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_DEFAULT);
    this.name = "CannotDeleteDefaultCategoryError";
  }
}

export class CannotDeleteCategoryInUseError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.CANNOT_DELETE_IN_USE);
    this.name = "CannotDeleteCategoryInUseError";
  }
}

export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.CATEGORY_ALREADY_EXISTS);
    this.name = "CategoryAlreadyExistsError";
  }
}

export class MaxCategoriesReachedError extends Error {
  constructor() {
    super(CATEGORY_MESSAGES.BUSINESS.MAX_CATEGORIES_REACHED);
    this.name = "MaxCategoriesReachedError";
  }
}
