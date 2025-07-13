import { z } from "zod";
import { accountTypeSchema } from "@/features/shared/types/account-types";
import { currencySchema } from "@/features/shared/types/currency-types";

// Account validations - using shared schemas

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Name can only contain letters, numbers, spaces, hyphens and underscores"
    ),
  type: accountTypeSchema,
  provider: z
    .string()
    .max(50, "Provider cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  balance: z
    .number()
    .min(0, "Balance cannot be negative")
    .max(10000000, "Balance cannot exceed €10,000,000"),
  currency: currencySchema,
});

export const updateAccountSchema = createAccountSchema.extend({
  id: z.string().uuid("Invalid account ID"),
});

export type AccountTypeValues = z.infer<typeof accountTypeSchema>;
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>;

// Transaction validations (keep for future reference)
export const createTransactionSchema = z.object({
  accountId: z.string().uuid("Select a valid account"),
  categoryId: z.string().uuid("Select a valid category"),
  type: z.enum(["income", "expense", "transfer", "investment"], {
    required_error: "Select a transaction type",
  }),
  amount: z
    .number()
    .min(0.01, "Amount must be greater than 0")
    .max(1000000, "Amount cannot exceed €1,000,000"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters"),
  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  transactionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  toAccountId: z.string().uuid("Select a valid destination account").optional(),
});

export const updateTransactionSchema = createTransactionSchema.extend({
  id: z.string().uuid("Invalid transaction ID"),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;
