/**
 * Constants specific to the Category bounded context
 */

export const CATEGORY_CONSTRAINTS = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9\s\-_&]+$/,
  },
  DESCRIPTION: {
    MAX_LENGTH: 200,
  },
  COLOR: {
    PATTERN: /^#[0-9A-F]{6}$/i,
    DEFAULT: "#6B7280",
  },
} as const;

// Category Type Constants
export const CATEGORY_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
  TRANSFER: "transfer",
} as const;

export const CATEGORY_TYPE_VALUES = Object.values(CATEGORY_TYPES);

// Category Type Labels
export const CATEGORY_TYPE_LABELS = {
  [CATEGORY_TYPES.INCOME]: "Income",
  [CATEGORY_TYPES.EXPENSE]: "Expense",
  [CATEGORY_TYPES.INVESTMENT]: "Investment",
  [CATEGORY_TYPES.TRANSFER]: "Transfer",
} as const;

// Category Type Colors
export const CATEGORY_TYPE_COLORS = {
  [CATEGORY_TYPES.INCOME]: "green",
  [CATEGORY_TYPES.EXPENSE]: "red",
  [CATEGORY_TYPES.INVESTMENT]: "blue",
  [CATEGORY_TYPES.TRANSFER]: "purple",
} as const;

// Default Category Colors
export const DEFAULT_CATEGORY_COLORS = [
  "#EF4444", // red-500
  "#F97316", // orange-500
  "#EAB308", // yellow-500
  "#22C55E", // green-500
  "#06B6D4", // cyan-500
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#6B7280", // gray-500
  "#84CC16", // lime-500
] as const;

export const CATEGORY_MESSAGES = {
  VALIDATION: {
    NAME_REQUIRED: "Category name is required",
    NAME_TOO_SHORT: `Category name must be at least ${CATEGORY_CONSTRAINTS.NAME.MIN_LENGTH} characters`,
    NAME_TOO_LONG: `Category name cannot exceed ${CATEGORY_CONSTRAINTS.NAME.MAX_LENGTH} characters`,
    NAME_INVALID_CHARS: "Category name contains invalid characters",
    DESCRIPTION_TOO_LONG: `Description cannot exceed ${CATEGORY_CONSTRAINTS.DESCRIPTION.MAX_LENGTH} characters`,
    COLOR_INVALID: "Color must be a valid hex color code",
    TYPE_INVALID: "Invalid category type",
    USER_ID_REQUIRED: "User ID is required",
    CATEGORY_ID_REQUIRED: "Category ID is required",
  },
  BUSINESS: {
    DUPLICATE_NAME: "A category with this name already exists",
    CANNOT_DELETE_DEFAULT: "Cannot delete default category",
    CANNOT_DELETE_IN_USE:
      "Cannot delete category that is being used by transactions",
    ACCESS_DENIED: "Access denied to this category",
    CATEGORY_NOT_FOUND: "Category not found",
    CATEGORY_ALREADY_EXISTS: "Category already exists",
    MAX_CATEGORIES_REACHED: "Maximum categories limit reached",
  },
} as const;

// Category type options for easy access
export const CATEGORY_TYPE_OPTIONS = Object.entries(CATEGORY_TYPE_LABELS).map(
  ([value, label]) => ({
    value,
    label,
    color: CATEGORY_TYPE_COLORS[value as keyof typeof CATEGORY_TYPE_COLORS],
  })
);
