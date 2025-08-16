import { InvalidCategoryTypeError } from "@/core/domain/category/errors/category-errors";
import {
  CATEGORY_TYPES,
  CATEGORY_TYPE_LABELS,
  CATEGORY_TYPE_COLORS,
} from "@/core/domain/category/constants/category-constants";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";

/**
 * Value Object for Category Type
 * Encapsulates the business concept of category types with their properties
 */
export class CategoryType {
  private constructor(
    private readonly value: string,
    private readonly label: string,
    private readonly icon: LucideIcon,
    private readonly color: string
  ) {}

  // Factory methods for each category type
  static income(): CategoryType {
    return new CategoryType(
      CATEGORY_TYPES.INCOME,
      CATEGORY_TYPE_LABELS[CATEGORY_TYPES.INCOME],
      TrendingUp,
      CATEGORY_TYPE_COLORS[CATEGORY_TYPES.INCOME]
    );
  }

  static expense(): CategoryType {
    return new CategoryType(
      CATEGORY_TYPES.EXPENSE,
      CATEGORY_TYPE_LABELS[CATEGORY_TYPES.EXPENSE],
      TrendingDown,
      CATEGORY_TYPE_COLORS[CATEGORY_TYPES.EXPENSE]
    );
  }

  static investment(): CategoryType {
    return new CategoryType(
      CATEGORY_TYPES.INVESTMENT,
      CATEGORY_TYPE_LABELS[CATEGORY_TYPES.INVESTMENT],
      PiggyBank,
      CATEGORY_TYPE_COLORS[CATEGORY_TYPES.INVESTMENT]
    );
  }

  static transfer(): CategoryType {
    return new CategoryType(
      CATEGORY_TYPES.TRANSFER,
      CATEGORY_TYPE_LABELS[CATEGORY_TYPES.TRANSFER],
      ArrowLeftRight,
      CATEGORY_TYPE_COLORS[CATEGORY_TYPES.TRANSFER]
    );
  }

  // Getter methods
  getValue(): string {
    return this.value;
  }

  getLabel(): string {
    return this.label;
  }

  getIcon(): LucideIcon {
    return this.icon;
  }

  getColor(): string {
    return this.color;
  }

  // Comparison methods
  equals(other: CategoryType): boolean {
    return this.value === other.value;
  }

  isIncome(): boolean {
    return this.value === CATEGORY_TYPES.INCOME;
  }

  isExpense(): boolean {
    return this.value === CATEGORY_TYPES.EXPENSE;
  }

  isInvestment(): boolean {
    return this.value === CATEGORY_TYPES.INVESTMENT;
  }

  isTransfer(): boolean {
    return this.value === CATEGORY_TYPES.TRANSFER;
  }

  // Static factory from string (for external data)
  static fromString(value: string): CategoryType {
    switch (value) {
      case CATEGORY_TYPES.INCOME:
        return CategoryType.income();
      case CATEGORY_TYPES.EXPENSE:
        return CategoryType.expense();
      case CATEGORY_TYPES.INVESTMENT:
        return CategoryType.investment();
      case CATEGORY_TYPES.TRANSFER:
        return CategoryType.transfer();
      default:
        throw new InvalidCategoryTypeError();
    }
  }

  // Get all available types
  static getAllTypes(): CategoryType[] {
    return [
      CategoryType.income(),
      CategoryType.expense(),
      CategoryType.investment(),
      CategoryType.transfer(),
    ];
  }

  // Get type options for UI
  static getTypeOptions(): Array<{
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
  }> {
    return CategoryType.getAllTypes().map((type) => ({
      value: type.getValue(),
      label: type.getLabel(),
      icon: type.getIcon(),
      color: type.getColor(),
    }));
  }

  toString(): string {
    return this.value;
  }
}
