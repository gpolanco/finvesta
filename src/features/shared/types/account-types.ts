import { z } from "zod";
import {
  Banknote,
  Bitcoin,
  PiggyBank,
  Wallet,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

// Account Type Constants
export const ACCOUNT_TYPES = {
  BANK: "bank",
  CRYPTO: "crypto",
  INVESTMENT: "investment",
  CASH: "cash",
  SAVINGS: "savings",
} as const;

export const ACCOUNT_TYPE_VALUES = Object.values(ACCOUNT_TYPES);

// TypeScript type
export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];

// Zod schema
export const accountTypeSchema = z.enum(
  ACCOUNT_TYPE_VALUES as [AccountType, ...AccountType[]],
  {
    errorMap: () => ({ message: "Select an account type" }),
  }
);

// Color configurations for each account type
export const ACCOUNT_TYPE_COLORS = {
  [ACCOUNT_TYPES.BANK]: {
    icon: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    primary: "blue",
  },
  [ACCOUNT_TYPES.CRYPTO]: {
    icon: "text-yellow-600",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
    primary: "yellow",
  },
  [ACCOUNT_TYPES.INVESTMENT]: {
    icon: "text-green-600",
    badge: "bg-green-50 text-green-700 border-green-200",
    primary: "green",
  },
  [ACCOUNT_TYPES.SAVINGS]: {
    icon: "text-purple-600",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    primary: "purple",
  },
  [ACCOUNT_TYPES.CASH]: {
    icon: "text-gray-600",
    badge: "bg-gray-50 text-gray-700 border-gray-200",
    primary: "gray",
  },
} as const;

// Form options with labels and icons
export const ACCOUNT_TYPE_OPTIONS = [
  {
    value: ACCOUNT_TYPES.BANK,
    label: "Bank",
    icon: Banknote,
  },
  {
    value: ACCOUNT_TYPES.CRYPTO,
    label: "Cryptocurrency",
    icon: Bitcoin,
  },
  {
    value: ACCOUNT_TYPES.INVESTMENT,
    label: "Investment",
    icon: PiggyBank,
  },
  {
    value: ACCOUNT_TYPES.CASH,
    label: "Cash",
    icon: CreditCard,
  },
  {
    value: ACCOUNT_TYPES.SAVINGS,
    label: "Savings",
    icon: Wallet,
  },
] as const;

// Utility functions
export function getAccountTypeLabel(type: AccountType): string {
  const option = ACCOUNT_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.label || type;
}

export function getAccountTypeIcon(type: AccountType): LucideIcon {
  const option = ACCOUNT_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.icon || CreditCard;
}

export function getAccountTypeColors(type: AccountType) {
  return ACCOUNT_TYPE_COLORS[type] || ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.CASH];
}

export function getAccountTypeIconColor(type: AccountType): string {
  return getAccountTypeColors(type).icon;
}

export function getAccountTypeBadgeColor(type: AccountType): string {
  return getAccountTypeColors(type).badge;
}

export function getAccountTypePrimaryColor(type: AccountType): string {
  return getAccountTypeColors(type).primary;
}

export function isValidAccountType(value: string): value is AccountType {
  return ACCOUNT_TYPE_VALUES.includes(value as AccountType);
}

export function safeAccountType(value: string): AccountType {
  return isValidAccountType(value) ? value : ACCOUNT_TYPES.CASH;
}
