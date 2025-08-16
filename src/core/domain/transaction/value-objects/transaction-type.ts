import { InvalidTransactionTypeError } from "@/core/domain/transaction/errors/transaction-errors";
import {
  TRANSACTION_TYPES,
  TRANSACTION_TYPE_LABELS,
  TRANSACTION_TYPE_COLORS,
  TRANSACTION_TYPE_ICONS,
  TRANSACTION_TYPE_BADGE_COLORS,
  TRANSACTION_TYPE_ICON_COLORS,
  TRANSACTION_TYPE_AMOUNT_COLORS,
  TRANSACTION_TYPE_PRIMARY_COLORS,
  TRANSACTION_TYPE_AMOUNT_PREFIXES,
} from "@/core/domain/transaction/constants/transaction-constants";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ArrowRightLeft,
  type LucideIcon,
} from "lucide-react";

/**
 * Value Object for Transaction Type
 * Encapsulates the business concept of transaction types with their properties
 */
export class TransactionType {
  private constructor(
    private readonly value: string,
    private readonly label: string,
    private readonly icon: LucideIcon,
    private readonly color: string,
    private readonly badgeColor: string,
    private readonly iconColor: string,
    private readonly amountColor: string,
    private readonly primaryColor: string,
    private readonly amountPrefix: string
  ) {}

  // Factory methods for each transaction type
  static income(): TransactionType {
    return new TransactionType(
      TRANSACTION_TYPES.INCOME,
      TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INCOME],
      ArrowUpRight,
      TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.INCOME],
      TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.INCOME],
      TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.INCOME],
      TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.INCOME],
      TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.INCOME],
      TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.INCOME]
    );
  }

  static expense(): TransactionType {
    return new TransactionType(
      TRANSACTION_TYPES.EXPENSE,
      TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.EXPENSE],
      ArrowDownRight,
      TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.EXPENSE],
      TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.EXPENSE],
      TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.EXPENSE],
      TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.EXPENSE],
      TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.EXPENSE],
      TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.EXPENSE]
    );
  }

  static investment(): TransactionType {
    return new TransactionType(
      TRANSACTION_TYPES.INVESTMENT,
      TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INVESTMENT],
      TrendingUp,
      TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.INVESTMENT],
      TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.INVESTMENT],
      TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.INVESTMENT],
      TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.INVESTMENT],
      TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.INVESTMENT],
      TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.INVESTMENT]
    );
  }

  static transfer(): TransactionType {
    return new TransactionType(
      TRANSACTION_TYPES.TRANSFER,
      TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.TRANSFER],
      ArrowRightLeft,
      TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.TRANSFER],
      TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.TRANSFER],
      TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.TRANSFER],
      TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.TRANSFER],
      TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.TRANSFER],
      TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.TRANSFER]
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

  getBadgeColor(): string {
    return this.badgeColor;
  }

  getIconColor(): string {
    return this.iconColor;
  }

  getAmountColor(): string {
    return this.amountColor;
  }

  getPrimaryColor(): string {
    return this.primaryColor;
  }

  getAmountPrefix(): string {
    return this.amountPrefix;
  }

  // Comparison methods
  equals(other: TransactionType): boolean {
    return this.value === other.value;
  }

  isIncome(): boolean {
    return this.value === TRANSACTION_TYPES.INCOME;
  }

  isExpense(): boolean {
    return this.value === TRANSACTION_TYPES.EXPENSE;
  }

  isInvestment(): boolean {
    return this.value === TRANSACTION_TYPES.INVESTMENT;
  }

  isTransfer(): boolean {
    return this.value === TRANSACTION_TYPES.TRANSFER;
  }

  // Static factory from string (for external data)
  static fromString(value: string): TransactionType {
    switch (value) {
      case TRANSACTION_TYPES.INCOME:
        return TransactionType.income();
      case TRANSACTION_TYPES.EXPENSE:
        return TransactionType.expense();
      case TRANSACTION_TYPES.INVESTMENT:
        return TransactionType.investment();
      case TRANSACTION_TYPES.TRANSFER:
        return TransactionType.transfer();
      default:
        throw new InvalidTransactionTypeError();
    }
  }

  // Get all available types
  static getAllTypes(): TransactionType[] {
    return [
      TransactionType.income(),
      TransactionType.expense(),
      TransactionType.investment(),
      TransactionType.transfer(),
    ];
  }

  // Get type options for UI
  static getTypeOptions(): Array<{
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
    badgeColor: string;
    iconColor: string;
    amountColor: string;
    primaryColor: string;
    amountPrefix: string;
  }> {
    return TransactionType.getAllTypes().map((type) => ({
      value: type.getValue(),
      label: type.getLabel(),
      icon: type.getIcon(),
      color: type.getColor(),
      badgeColor: type.getBadgeColor(),
      iconColor: type.getIconColor(),
      amountColor: type.getAmountColor(),
      primaryColor: type.getPrimaryColor(),
      amountPrefix: type.getAmountPrefix(),
    }));
  }

  toString(): string {
    return this.value;
  }
}
