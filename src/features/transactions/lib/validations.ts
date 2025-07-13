import { z } from "zod";
import { transactionTypeSchema } from "@/features/shared/types/transaction-types";

const baseTransactionSchema = z.object({
  accountId: z.string().uuid("Select a valid account"),
  categoryId: z.string().uuid("Select a valid category"),
  amount: z
    .number()
    .positive("The amount must be greater than 0")
    .max(1000000, "The amount cannot exceed €1,000,000"),
  description: z
    .string()
    .min(1, "The description is required")
    .max(200, "The description cannot exceed 200 characters"),
  transactionType: transactionTypeSchema,
  transactionDate: z
    .string()
    .min(1, "The date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const oneYearAgo = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      return parsedDate <= now && parsedDate >= oneYearAgo;
    }, "The date must be between one year ago and today"),
});

export const createTransactionSchema = baseTransactionSchema;

export const updateTransactionSchema = baseTransactionSchema.partial();

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;
