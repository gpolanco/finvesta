import { z } from "zod";

// Category Type Constants
export const CATEGORY_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
  TRANSFER: "transfer",
} as const;

export const CATEGORY_TYPE_VALUES = Object.values(CATEGORY_TYPES);

// TypeScript type
export type CategoryType = (typeof CATEGORY_TYPES)[keyof typeof CATEGORY_TYPES];

// Zod schema
export const categoryTypeSchema = z.enum(
  CATEGORY_TYPE_VALUES as [CategoryType, ...CategoryType[]],
  {
    required_error: "Select a category type",
  }
);

// Form options with labels
export const CATEGORY_TYPE_OPTIONS = [
  {
    value: CATEGORY_TYPES.INCOME,
    label: "Income",
  },
  {
    value: CATEGORY_TYPES.EXPENSE,
    label: "Expense",
  },
  {
    value: CATEGORY_TYPES.INVESTMENT,
    label: "Investment",
  },
  {
    value: CATEGORY_TYPES.TRANSFER,
    label: "Transfer",
  },
] as const;

// Utility functions
export function getCategoryTypeLabel(type: CategoryType): string {
  const option = CATEGORY_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.label || type;
}

export function getCategoryTypeColors(type: CategoryType) {
  switch (type) {
    case CATEGORY_TYPES.INCOME:
      return "bg-green-100 text-green-800";
    case CATEGORY_TYPES.EXPENSE:
      return "bg-red-100 text-red-800";
    case CATEGORY_TYPES.INVESTMENT:
      return "bg-blue-100 text-blue-800";
    case CATEGORY_TYPES.TRANSFER:
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Legacy types for backward compatibility (to be removed eventually)
export type CategoryTypeKey = keyof typeof CATEGORY_TYPES;
export type CategoryTypeValues = CategoryType; // Alias for the new type

export interface Category {
  id: string;
  name: string;
  description?: string;
  type: CategoryType;
  color: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;
}
