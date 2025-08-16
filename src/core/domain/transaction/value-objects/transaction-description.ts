import {
  TransactionDescriptionTooShortError,
  TransactionDescriptionTooLongError,
  TransactionDescriptionInvalidCharactersError,
} from "@/core/domain/transaction/errors/transaction-errors";
import { TRANSACTION_CONSTRAINTS } from "@/core/domain/transaction/constants/transaction-constants";

/**
 * Value Object for Transaction Description
 * Encapsulates the business concept of transaction descriptions with validation
 */
export class TransactionDescription {
  private constructor(private readonly value: string) {}

  /**
   * Create a new TransactionDescription with validation
   */
  static create(value: string): TransactionDescription {
    if (!value || value.trim().length === 0) {
      throw new TransactionDescriptionRequiredError();
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length < TRANSACTION_CONSTRAINTS.DESCRIPTION.MIN_LENGTH) {
      throw new TransactionDescriptionTooShortError();
    }

    if (trimmedValue.length > TRANSACTION_CONSTRAINTS.DESCRIPTION.MAX_LENGTH) {
      throw new TransactionDescriptionTooLongError();
    }

    if (!TRANSACTION_CONSTRAINTS.DESCRIPTION.PATTERN.test(trimmedValue)) {
      throw new TransactionDescriptionInvalidCharactersError();
    }

    return new TransactionDescription(trimmedValue);
  }

  /**
   * Get the description value
   */
  getValue(): string {
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
  equals(other: TransactionDescription): boolean {
    if (this.isEmpty() && other.isEmpty()) return true;
    if (this.isEmpty() || other.isEmpty()) return false;
    return this.value === other.value;
  }

  toString(): string {
    return this.value || "";
  }
}

// Import the error class that was referenced
import { TransactionDescriptionRequiredError } from "@/core/domain/transaction/errors/transaction-errors";
