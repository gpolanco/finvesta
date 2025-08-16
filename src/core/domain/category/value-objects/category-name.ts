import {
  CategoryNameTooShortError,
  CategoryNameTooLongError,
  CategoryNameInvalidCharactersError,
} from "@/core/domain/category/errors/category-errors";
import { CATEGORY_CONSTRAINTS } from "@/core/domain/category/constants/category-constants";

/**
 * Value Object for Category Name
 * Encapsulates the business concept of category names with validation
 */
export class CategoryName {
  private constructor(private readonly value: string) {}

  /**
   * Create a new CategoryName with validation
   */
  static create(value: string): CategoryName {
    if (!value || value.trim().length === 0) {
      throw new CategoryNameTooShortError();
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length < CATEGORY_CONSTRAINTS.NAME.MIN_LENGTH) {
      throw new CategoryNameTooShortError();
    }

    if (trimmedValue.length > CATEGORY_CONSTRAINTS.NAME.MAX_LENGTH) {
      throw new CategoryNameTooLongError();
    }

    if (!CATEGORY_CONSTRAINTS.NAME.PATTERN.test(trimmedValue)) {
      throw new CategoryNameInvalidCharactersError();
    }

    return new CategoryName(trimmedValue);
  }

  /**
   * Get the string value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Get the display value (capitalized)
   */
  getDisplayValue(): string {
    return this.value.charAt(0).toUpperCase() + this.value.slice(1);
  }

  /**
   * Check if name equals another
   */
  equals(other: CategoryName): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  /**
   * Check if name contains a substring (case-insensitive)
   */
  contains(substring: string): boolean {
    return this.value.toLowerCase().includes(substring.toLowerCase());
  }

  /**
   * Get the length of the name
   */
  getLength(): number {
    return this.value.length;
  }

  /**
   * Check if name is empty
   */
  isEmpty(): boolean {
    return this.value.length === 0;
  }

  toString(): string {
    return this.value;
  }
}
