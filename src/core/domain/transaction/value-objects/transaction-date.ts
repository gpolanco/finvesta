import { InvalidTransactionDateError } from "@/core/domain/transaction/errors/transaction-errors";
import { TRANSACTION_CONSTRAINTS } from "@/core/domain/transaction/constants/transaction-constants";

/**
 * Value Object for Transaction Date
 * Encapsulates the business concept of transaction dates with validation
 */
export class TransactionDate {
  private constructor(private readonly value: Date) {}

  /**
   * Create a new TransactionDate with validation
   */
  static create(value: Date | string): TransactionDate {
    let date: Date;

    if (typeof value === "string") {
      if (!value.trim()) {
        throw new InvalidTransactionDateError("Date string cannot be empty");
      }
      date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new InvalidTransactionDateError("Invalid date format");
      }
    } else {
      // Handle null/undefined Date objects
      if (!value || !(value instanceof Date) || isNaN(value.getTime())) {
        throw new InvalidTransactionDateError("Invalid date object");
      }
      date = value;
    }

    // Check if date is within valid range
    // Use timestamp comparison to avoid timezone issues
    const dateTimestamp = date.getTime();
    const minTimestamp = TRANSACTION_CONSTRAINTS.DATE.MIN.getTime();
    const maxTimestamp = TRANSACTION_CONSTRAINTS.DATE.MAX.getTime();

    if (dateTimestamp < minTimestamp) {
      throw new InvalidTransactionDateError(
        `Date cannot be before ${
          TRANSACTION_CONSTRAINTS.DATE.MIN.toISOString().split("T")[0]
        }`
      );
    }

    if (dateTimestamp > maxTimestamp) {
      throw new InvalidTransactionDateError(
        `Date cannot be after ${
          TRANSACTION_CONSTRAINTS.DATE.MAX.toISOString().split("T")[0]
        }`
      );
    }

    return new TransactionDate(date);
  }

  /**
   * Create from current date
   */
  static now(): TransactionDate {
    return new TransactionDate(new Date());
  }

  /**
   * Create from today's date (start of day)
   */
  static today(): TransactionDate {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new TransactionDate(today);
  }

  /**
   * Create from yesterday's date
   */
  static yesterday(): TransactionDate {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return new TransactionDate(yesterday);
  }

  /**
   * Create from a specific date parts
   */
  static fromParts(year: number, month: number, day: number): TransactionDate {
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return TransactionDate.create(date);
  }

  /**
   * Get the date value
   */
  getValue(): Date {
    return this.value;
  }

  /**
   * Get the date as ISO string
   */
  toISOString(): string {
    return this.value.toISOString();
  }

  /**
   * Get the date as date string (YYYY-MM-DD)
   */
  toDateString(): string {
    return this.value.toISOString().split("T")[0];
  }

  /**
   * Get the date as local date string
   */
  toLocalDateString(): string {
    return this.value.toLocaleDateString();
  }

  /**
   * Get the date as local date string with specific locale
   */
  toLocalDateStringWithLocale(locale: string = "en-US"): string {
    return this.value.toLocaleDateString(locale);
  }

  /**
   * Get the year
   */
  getYear(): number {
    return this.value.getFullYear();
  }

  /**
   * Get the month (1-12)
   */
  getMonth(): number {
    return this.value.getMonth() + 1; // Convert from 0-indexed to 1-indexed
  }

  /**
   * Get the day of month
   */
  getDay(): number {
    return this.value.getDate();
  }

  /**
   * Get the day of week (0-6, where 0 is Sunday)
   */
  getDayOfWeek(): number {
    return this.value.getDay();
  }

  /**
   * Get the day of week name
   */
  getDayOfWeekName(): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[this.getDayOfWeek()];
  }

  /**
   * Get the month name
   */
  getMonthName(): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[this.value.getMonth()];
  }

  /**
   * Check if date is today
   */
  isToday(): boolean {
    const today = new Date();
    return this.toDateString() === today.toISOString().split("T")[0];
  }

  /**
   * Check if date is yesterday
   */
  isYesterday(): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.toDateString() === yesterday.toISOString().split("T")[0];
  }

  /**
   * Check if date is in the past
   */
  isPast(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.value < today;
  }

  /**
   * Check if date is in the future
   */
  isFuture(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.value > today;
  }

  /**
   * Check if date is this month
   */
  isThisMonth(): boolean {
    const today = new Date();
    return (
      this.getYear() === today.getFullYear() &&
      this.getMonth() === today.getMonth() + 1
    );
  }

  /**
   * Check if date is this year
   */
  isThisYear(): boolean {
    const today = new Date();
    return this.getYear() === today.getFullYear();
  }

  /**
   * Get days difference from another date
   */
  daysDifference(other: TransactionDate): number {
    const timeDiff = this.value.getTime() - other.getValue().getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Add days to the date
   */
  addDays(days: number): TransactionDate {
    const newDate = new Date(this.value);
    newDate.setDate(newDate.getDate() + days);
    return TransactionDate.create(newDate);
  }

  /**
   * Subtract days from the date
   */
  subtractDays(days: number): TransactionDate {
    return this.addDays(-days);
  }

  /**
   * Check if date equals another
   */
  equals(other: TransactionDate): boolean {
    return this.toDateString() === other.toDateString();
  }

  /**
   * Check if date is before another
   */
  isBefore(other: TransactionDate): boolean {
    return this.value < other.getValue();
  }

  /**
   * Check if date is after another
   */
  isAfter(other: TransactionDate): boolean {
    return this.value > other.getValue();
  }

  /**
   * Check if date is before or equal to another
   */
  isBeforeOrEqual(other: TransactionDate): boolean {
    return this.value <= other.getValue();
  }

  /**
   * Check if date is after or equal to another
   */
  isAfterOrEqual(other: TransactionDate): boolean {
    return this.value >= other.getValue();
  }

  /**
   * Get formatted string for display
   */
  toDisplayString(): string {
    if (this.isToday()) {
      return "Today";
    }
    if (this.isYesterday()) {
      return "Yesterday";
    }
    if (this.isThisYear()) {
      return this.value.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return this.value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  toString(): string {
    return this.toDateString();
  }
}
