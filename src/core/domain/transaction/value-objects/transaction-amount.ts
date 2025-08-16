import { InvalidTransactionAmountError } from "@/core/domain/transaction/errors/transaction-errors";
import { TRANSACTION_CONSTRAINTS } from "@/core/domain/transaction/constants/transaction-constants";

/**
 * Value Object for Transaction Amount
 * Encapsulates the business concept of transaction amounts with validation
 */
export class TransactionAmount {
  private constructor(private readonly value: number) {}

  /**
   * Create a new TransactionAmount with validation
   */
  static create(value: number): TransactionAmount {
    if (!Number.isFinite(value)) {
      throw new InvalidTransactionAmountError("Amount must be a valid number");
    }

    if (value < TRANSACTION_CONSTRAINTS.AMOUNT.MIN) {
      throw new InvalidTransactionAmountError(
        `Amount cannot be less than ${TRANSACTION_CONSTRAINTS.AMOUNT.MIN.toLocaleString()}`
      );
    }

    if (value > TRANSACTION_CONSTRAINTS.AMOUNT.MAX) {
      throw new InvalidTransactionAmountError(
        `Amount cannot exceed ${TRANSACTION_CONSTRAINTS.AMOUNT.MAX.toLocaleString()}`
      );
    }

    // Round to specified decimal places
    const roundedValue =
      Math.round(
        value * Math.pow(10, TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES)
      ) / Math.pow(10, TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES);

    return new TransactionAmount(roundedValue);
  }

  /**
   * Get the amount value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Get the absolute value
   */
  getAbsoluteValue(): number {
    return Math.abs(this.value);
  }

  /**
   * Check if amount is positive
   */
  isPositive(): boolean {
    return this.value > 0;
  }

  /**
   * Check if amount is negative
   */
  isNegative(): boolean {
    return this.value < 0;
  }

  /**
   * Check if amount is zero
   */
  isZero(): boolean {
    return this.value === 0;
  }

  /**
   * Check if amount is income (positive)
   */
  isIncome(): boolean {
    return this.isPositive();
  }

  /**
   * Check if amount is expense (negative)
   */
  isExpense(): boolean {
    return this.isNegative();
  }

  /**
   * Add another amount
   */
  add(other: TransactionAmount): TransactionAmount {
    return TransactionAmount.create(this.value + other.getValue());
  }

  /**
   * Subtract another amount
   */
  subtract(other: TransactionAmount): TransactionAmount {
    return TransactionAmount.create(this.value - other.getValue());
  }

  /**
   * Multiply by a factor
   */
  multiply(factor: number): TransactionAmount {
    return TransactionAmount.create(this.value * factor);
  }

  /**
   * Divide by a factor
   */
  divide(factor: number): TransactionAmount {
    if (factor === 0) {
      throw new InvalidTransactionAmountError("Cannot divide by zero");
    }
    return TransactionAmount.create(this.value / factor);
  }

  /**
   * Check if amount equals another
   */
  equals(other: TransactionAmount): boolean {
    return this.value === other.value;
  }

  /**
   * Check if amount is greater than another
   */
  isGreaterThan(other: TransactionAmount): boolean {
    return this.value > other.value;
  }

  /**
   * Check if amount is less than another
   */
  isLessThan(other: TransactionAmount): boolean {
    return this.value < other.value;
  }

  /**
   * Check if amount is greater than or equal to another
   */
  isGreaterThanOrEqual(other: TransactionAmount): boolean {
    return this.value >= other.value;
  }

  /**
   * Check if amount is less than or equal to another
   */
  isLessThanOrEqual(other: TransactionAmount): boolean {
    return this.value <= other.value;
  }

  /**
   * Get formatted string representation
   */
  toFormattedString(currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES,
      maximumFractionDigits: TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES,
    }).format(this.value);
  }

  /**
   * Get formatted string without currency symbol
   */
  toFormattedNumber(): string {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES,
      maximumFractionDigits: TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES,
    }).format(this.value);
  }

  toString(): string {
    return this.value.toString();
  }
}
