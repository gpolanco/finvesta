import type { Account, Category } from "@/features/accounts/types";

// Transaction types for forms (using camelCase)
export type Transaction = {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number;
  description: string;
  transactionType: "income" | "expense" | "investment";
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionWithDetails = Transaction & {
  account: Pick<Account, "id" | "name" | "type" | "provider">;
  category: Pick<Category, "id" | "name" | "type" | "color">;
};

export type CreateTransactionData = {
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  transactionType: "income" | "expense" | "investment";
  transactionDate: string;
};

export type UpdateTransactionData = Partial<CreateTransactionData>;
