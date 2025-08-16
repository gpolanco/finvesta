/**
 * Constants specific to the Transaction bounded context
 */

export const TRANSACTION_CONSTRAINTS = {
  DESCRIPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 200,
    PATTERN: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
  },
  AMOUNT: {
    MIN: -999999999,
    MAX: 999999999,
    DECIMAL_PLACES: 2,
  },
  DATE: {
    MIN: new Date("1900-01-01"), // January 1, 1900
    MAX: new Date("2100-12-30"), // December 30, 2100
  },
} as const;

// Transaction Type Constants
export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
  TRANSFER: "transfer",
} as const;

export const TRANSACTION_TYPE_VALUES = Object.values(TRANSACTION_TYPES);

// Transaction Type Labels
export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.INCOME]: "Income",
  [TRANSACTION_TYPES.EXPENSE]: "Expense",
  [TRANSACTION_TYPES.INVESTMENT]: "Investment",
  [TRANSACTION_TYPES.TRANSFER]: "Transfer",
} as const;

// Transaction Type Colors
export const TRANSACTION_TYPE_COLORS = {
  [TRANSACTION_TYPES.INCOME]: "green",
  [TRANSACTION_TYPES.EXPENSE]: "red",
  [TRANSACTION_TYPES.INVESTMENT]: "blue",
  [TRANSACTION_TYPES.TRANSFER]: "gray",
} as const;

// Transaction Type Icons
export const TRANSACTION_TYPE_ICONS = {
  [TRANSACTION_TYPES.INCOME]: "ArrowUpRight",
  [TRANSACTION_TYPES.EXPENSE]: "ArrowDownRight",
  [TRANSACTION_TYPES.INVESTMENT]: "TrendingUp",
  [TRANSACTION_TYPES.TRANSFER]: "ArrowRightLeft",
} as const;

// Transaction Type Badge Colors
export const TRANSACTION_TYPE_BADGE_COLORS = {
  [TRANSACTION_TYPES.INCOME]: "bg-green-50 text-green-700 border-green-200",
  [TRANSACTION_TYPES.EXPENSE]: "bg-red-50 text-red-700 border-red-200",
  [TRANSACTION_TYPES.INVESTMENT]: "bg-blue-50 text-blue-700 border-blue-200",
  [TRANSACTION_TYPES.TRANSFER]: "bg-gray-50 text-gray-700 border-gray-200",
} as const;

// Transaction Type Icon Colors
export const TRANSACTION_TYPE_ICON_COLORS = {
  [TRANSACTION_TYPES.INCOME]: "text-green-600",
  [TRANSACTION_TYPES.EXPENSE]: "text-red-600",
  [TRANSACTION_TYPES.INVESTMENT]: "text-blue-600",
  [TRANSACTION_TYPES.TRANSFER]: "text-gray-600",
} as const;

// Transaction Type Amount Colors
export const TRANSACTION_TYPE_AMOUNT_COLORS = {
  [TRANSACTION_TYPES.INCOME]: "text-green-600",
  [TRANSACTION_TYPES.EXPENSE]: "text-red-600",
  [TRANSACTION_TYPES.INVESTMENT]: "text-blue-600",
  [TRANSACTION_TYPES.TRANSFER]: "text-gray-600",
} as const;

// Transaction Type Primary Colors
export const TRANSACTION_TYPE_PRIMARY_COLORS = {
  [TRANSACTION_TYPES.INCOME]: "green",
  [TRANSACTION_TYPES.EXPENSE]: "red",
  [TRANSACTION_TYPES.INVESTMENT]: "blue",
  [TRANSACTION_TYPES.TRANSFER]: "gray",
} as const;

// Transaction Type Amount Prefixes
export const TRANSACTION_TYPE_AMOUNT_PREFIXES = {
  [TRANSACTION_TYPES.INCOME]: "+",
  [TRANSACTION_TYPES.EXPENSE]: "-",
  [TRANSACTION_TYPES.INVESTMENT]: "+",
  [TRANSACTION_TYPES.TRANSFER]: "",
} as const;

export const TRANSACTION_MESSAGES = {
  VALIDATION: {
    ACCOUNT_ID_REQUIRED: "Account ID is required",
    CATEGORY_ID_REQUIRED: "Category ID is required",
    AMOUNT_REQUIRED: "Amount is required",
    AMOUNT_INVALID: "Amount must be a valid number",
    AMOUNT_TOO_LOW: "Amount cannot be less than -999,999,999",
    AMOUNT_TOO_HIGH: "Amount cannot exceed 999,999,999",
    DESCRIPTION_REQUIRED: "Description is required",
    DESCRIPTION_TOO_SHORT: `Description must be at least ${TRANSACTION_CONSTRAINTS.DESCRIPTION.MIN_LENGTH} character`,
    DESCRIPTION_TOO_LONG: `Description cannot exceed ${TRANSACTION_CONSTRAINTS.DESCRIPTION.MAX_LENGTH} characters`,
    DESCRIPTION_INVALID_CHARS: "Description contains invalid characters",
    TRANSACTION_TYPE_INVALID: "Invalid transaction type",
    TRANSACTION_DATE_REQUIRED: "Transaction date is required",
    TRANSACTION_DATE_INVALID: "Transaction date is invalid",
    TRANSACTION_DATE_TOO_OLD: "Transaction date cannot be before 1900",
    TRANSACTION_DATE_TOO_FUTURE: "Transaction date cannot be after 2100",
    USER_ID_REQUIRED: "User ID is required",
    TRANSACTION_ID_REQUIRED: "Transaction ID is required",
  },
  BUSINESS: {
    ACCOUNT_NOT_FOUND: "Account not found",
    CATEGORY_NOT_FOUND: "Category not found",
    CATEGORY_TYPE_MISMATCH: "Category type does not match transaction type",
    INSUFFICIENT_BALANCE: "Insufficient account balance for this transaction",
    TRANSACTION_NOT_FOUND: "Transaction not found",
    ACCESS_DENIED: "Access denied to this transaction",
    CANNOT_DELETE_RECONCILED: "Cannot delete reconciled transaction",
    DUPLICATE_TRANSACTION: "Duplicate transaction detected",
    INVALID_TRANSFER: "Invalid transfer: accounts must be different",
    MAX_TRANSACTIONS_REACHED: "Maximum transactions limit reached",
  },
} as const;

// Transaction type options for easy access
export const TRANSACTION_TYPE_OPTIONS = Object.entries(
  TRANSACTION_TYPE_LABELS
).map(([value, label]) => ({
  value,
  label,
  color: TRANSACTION_TYPE_COLORS[value as keyof typeof TRANSACTION_TYPE_COLORS],
  icon: TRANSACTION_TYPE_ICONS[value as keyof typeof TRANSACTION_TYPE_ICONS],
  badgeColor:
    TRANSACTION_TYPE_BADGE_COLORS[
      value as keyof typeof TRANSACTION_TYPE_BADGE_COLORS
    ],
  iconColor:
    TRANSACTION_TYPE_ICON_COLORS[
      value as keyof typeof TRANSACTION_TYPE_ICON_COLORS
    ],
  amountColor:
    TRANSACTION_TYPE_AMOUNT_COLORS[
      value as keyof typeof TRANSACTION_TYPE_AMOUNT_COLORS
    ],
  primaryColor:
    TRANSACTION_TYPE_PRIMARY_COLORS[
      value as keyof typeof TRANSACTION_TYPE_PRIMARY_COLORS
    ],
  amountPrefix:
    TRANSACTION_TYPE_AMOUNT_PREFIXES[
      value as keyof typeof TRANSACTION_TYPE_AMOUNT_PREFIXES
    ],
}));
