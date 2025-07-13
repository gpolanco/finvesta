import { TransactionWithDetails } from "@/features/transactions/types";
import { DataBaseTypes } from "@/types/database";
import { AccountType } from "@/features/shared/types/account-types";
import { TransactionType } from "@/features/shared/types/transaction-types";
import { CategoryType } from "@/features/categories/types";

// Tipo para los datos que vienen de la base de datos (snake_case)
interface DbTransactionWithDetails {
  id: string;
  account_id: string;
  category_id: string;
  amount: number;
  description: string;
  type: TransactionType;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  account: {
    id: string;
    name: string;
    type: AccountType;
    provider: string;
  };
  category: {
    id: string;
    name: string;
    type: CategoryType;
    color: string;
  };
}

export const TransactionMapper = {
  toDomain: (
    dbTransaction: DbTransactionWithDetails
  ): TransactionWithDetails => ({
    id: dbTransaction.id,
    accountId: dbTransaction.account_id,
    categoryId: dbTransaction.category_id,
    amount: dbTransaction.amount,
    description: dbTransaction.description,
    transactionType: dbTransaction.type, // ← Mapeo crítico de DB field a domain field
    transactionDate: dbTransaction.transaction_date,
    createdAt: dbTransaction.created_at,
    updatedAt: dbTransaction.updated_at,
    account: {
      id: dbTransaction.account.id,
      name: dbTransaction.account.name,
      type: dbTransaction.account.type,
      provider: dbTransaction.account.provider,
    },
    category: {
      id: dbTransaction.category.id,
      name: dbTransaction.category.name,
      type: dbTransaction.category.type,
      color: dbTransaction.category.color,
    },
  }),

  toDatabase: (
    transaction: TransactionWithDetails,
    userId: string
  ): DataBaseTypes["Transaction"] => ({
    id: transaction.id,
    user_id: userId,
    account_id: transaction.accountId,
    category_id: transaction.categoryId,
    amount: transaction.amount,
    description: transaction.description,
    type: transaction.transactionType,
    transaction_date: transaction.transactionDate,
    created_at: transaction.createdAt,
    updated_at: transaction.updatedAt,
  }),
};
