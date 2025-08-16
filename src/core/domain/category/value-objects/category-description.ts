import { CategoryDescriptionTooLongError } from "@/core/domain/category/errors/category-errors";
import { CATEGORY_CONSTRAINTS } from "@/core/domain/category/constants/category-constants";

/**
 * Value Object for Category Description
 * Encapsulates the business concept of category descriptions with validation
 */
export class CategoryDescription {
  private constructor(private readonly value: string | undefined) {}

  /**
   * Create a new CategoryDescription with validation
   */
  static create(value?: string): CategoryDescription {
    if (!value || value.trim().length === 0) {
      return new CategoryDescription(undefined);
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length > CATEGORY_CONSTRAINTS.DESCRIPTION.MAX_LENGTH) {
      throw new CategoryDescriptionTooLongError();
    }

    return new CategoryDescription(trimmedValue);
  }

  /**
   * Get the description value
   */
  getValue(): string | undefined {
    return this.value;
  }

  /**
   * Check if description exists
   */
  hasValue(): boolean {
    return this.value !== undefined && this.value.length > 0;
  }

  /**
   * Get the length of the description
   */
  getLength(): number {
    return this.value?.length || 0;
  }

  /**
   * Check if description is empty
   */
  isEmpty(): boolean {
    return !this.hasValue();
  }

  /**
   * Get truncated description for display
   */
  getTruncated(maxLength: number = 50): string {
    if (!this.value) return "";

    if (this.value.length <= maxLength) {
      return this.value;
    }

    return this.value.substring(0, maxLength) + "...";
  }

  /**
   * Check if description equals another
   */
  equals(other: CategoryDescription): boolean {
    if (this.isEmpty() && other.isEmpty()) return true;
    if (this.isEmpty() || other.isEmpty()) return false;
    return this.value === other.value;
  }

  toString(): string {
    return this.value || "";
  }
}
