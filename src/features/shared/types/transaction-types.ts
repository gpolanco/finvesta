import { z } from "zod";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ArrowRightLeft,
  type LucideIcon,
} from "lucide-react";

// Transaction Type Constants
export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
  TRANSFER: "transfer",
} as const;

export const TRANSACTION_TYPE_VALUES = Object.values(TRANSACTION_TYPES);

// TypeScript type
export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

// Zod schema
export const transactionTypeSchema = z.enum(
  TRANSACTION_TYPE_VALUES as [TransactionType, ...TransactionType[]],
  {
    errorMap: () => ({ message: "Select a transaction type" }),
  }
);

// Color configurations for each transaction type
export const TRANSACTION_TYPE_COLORS = {
  [TRANSACTION_TYPES.INCOME]: {
    icon: "text-green-600",
    amount: "text-green-600",
    badge: "bg-green-50 text-green-700 border-green-200",
    primary: "green",
  },
  [TRANSACTION_TYPES.EXPENSE]: {
    icon: "text-red-600",
    amount: "text-red-600",
    badge: "bg-red-50 text-red-700 border-red-200",
    primary: "red",
  },
  [TRANSACTION_TYPES.INVESTMENT]: {
    icon: "text-blue-600",
    amount: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    primary: "blue",
  },
  [TRANSACTION_TYPES.TRANSFER]: {
    icon: "text-gray-600",
    amount: "text-gray-600",
    badge: "bg-gray-50 text-gray-700 border-gray-200",
    primary: "gray",
  },
} as const;

// Form options with labels and icons
export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TRANSACTION_TYPES.INCOME,
    label: "Income",
    icon: ArrowUpRight,
  },
  {
    value: TRANSACTION_TYPES.EXPENSE,
    label: "Expense",
    icon: ArrowDownRight,
  },
  {
    value: TRANSACTION_TYPES.INVESTMENT,
    label: "Investment",
    icon: TrendingUp,
  },
  {
    value: TRANSACTION_TYPES.TRANSFER,
    label: "Transfer",
    icon: ArrowRightLeft,
  },
] as const;

// Utility functions
export function getTransactionTypeLabel(type: TransactionType): string {
  const option = TRANSACTION_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.label || type;
}

export function getTransactionTypeIcon(type: TransactionType): LucideIcon {
  const option = TRANSACTION_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.icon || ArrowUpRight;
}

export function getTransactionTypeColors(type: TransactionType) {
  return (
    TRANSACTION_TYPE_COLORS[type] ||
    TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.INCOME]
  );
}

export function getTransactionTypeIconColor(type: TransactionType): string {
  return getTransactionTypeColors(type).icon;
}

export function getTransactionTypeAmountColor(type: TransactionType): string {
  return getTransactionTypeColors(type).amount;
}

export function getTransactionTypeBadgeColor(type: TransactionType): string {
  return getTransactionTypeColors(type).badge;
}

export function getTransactionTypePrimaryColor(type: TransactionType): string {
  return getTransactionTypeColors(type).primary;
}

export function isValidTransactionType(
  value: string
): value is TransactionType {
  return TRANSACTION_TYPE_VALUES.includes(value as TransactionType);
}

export function safeTransactionType(value: string): TransactionType {
  return isValidTransactionType(value) ? value : TRANSACTION_TYPES.INCOME;
}

// Helper function to get amount prefix based on transaction type
export function getTransactionAmountPrefix(type: TransactionType): string {
  switch (type) {
    case TRANSACTION_TYPES.EXPENSE:
      return "-";
    case TRANSACTION_TYPES.INCOME:
    case TRANSACTION_TYPES.INVESTMENT:
      return "+";
    case TRANSACTION_TYPES.TRANSFER:
      return "";
    default:
      return "";
  }
}
