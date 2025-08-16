/**
 * Constants specific to the Accounts bounded context
 */

export const ACCOUNT_CONSTRAINTS = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z0-9\s\-_]+$/,
  },
  BALANCE: {
    MIN: -999999999,
    MAX: 999999999,
    DECIMAL_PLACES: 2,
  },
  CURRENCY: {
    SUPPORTED: ["EUR", "USD"] as const,
    PATTERN: /^[A-Z]{3}$/,
  },
} as const;

// Account Type Constants
export const ACCOUNT_TYPES = {
  BANK: "bank",
  CRYPTO: "crypto",
  INVESTMENT: "investment",
  CASH: "cash",
  SAVINGS: "savings",
} as const;

export const ACCOUNT_TYPE_VALUES = Object.values(ACCOUNT_TYPES);

// Account Type Labels
export const ACCOUNT_TYPE_LABELS = {
  [ACCOUNT_TYPES.BANK]: "Bank",
  [ACCOUNT_TYPES.CRYPTO]: "Cryptocurrency",
  [ACCOUNT_TYPES.INVESTMENT]: "Investment",
  [ACCOUNT_TYPES.CASH]: "Cash",
  [ACCOUNT_TYPES.SAVINGS]: "Savings",
} as const;

// Account Type Colors
export const ACCOUNT_TYPE_COLORS = {
  [ACCOUNT_TYPES.BANK]: "blue",
  [ACCOUNT_TYPES.CRYPTO]: "yellow",
  [ACCOUNT_TYPES.INVESTMENT]: "green",
  [ACCOUNT_TYPES.CASH]: "gray",
  [ACCOUNT_TYPES.SAVINGS]: "purple",
} as const;

export const ACCOUNT_MESSAGES = {
  VALIDATION: {
    NAME_REQUIRED: "Account name is required",
    NAME_TOO_SHORT: `Account name must be at least ${ACCOUNT_CONSTRAINTS.NAME.MIN_LENGTH} characters`,
    NAME_TOO_LONG: `Account name cannot exceed ${ACCOUNT_CONSTRAINTS.NAME.MAX_LENGTH} characters`,
    NAME_INVALID_CHARS: "Account name contains invalid characters",
    BALANCE_INVALID: "Balance must be a valid number",
    BALANCE_TOO_LOW: "Balance cannot be less than -999,999,999",
    BALANCE_TOO_HIGH: "Balance cannot exceed 999,999,999",
    CURRENCY_INVALID: "Currency must be a valid 3-letter ISO code",
    CURRENCY_NOT_SUPPORTED: "Currency is not supported",
    USER_ID_REQUIRED: "User ID is required",
    ACCOUNT_ID_REQUIRED: "Account ID is required",
    ACCOUNT_TYPE_INVALID: "Invalid account type",
  },
  BUSINESS: {
    DUPLICATE_NAME: "An account with this name already exists",
    CANNOT_DELETE_ACTIVE:
      "Cannot delete account with non-zero balance. Deactivate it first.",
    ACCESS_DENIED: "Access denied to this account",
    ACCOUNT_NOT_FOUND: "Account not found",
    ACCOUNT_ALREADY_DEACTIVATED: "Account is already deactivated",
    MAX_ACCOUNTS_REACHED: "Maximum accounts limit reached",
  },
} as const;

// Currency constants for easy access
export const SUPPORTED_CURRENCIES = ACCOUNT_CONSTRAINTS.CURRENCY.SUPPORTED;
