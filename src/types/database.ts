/*
 * Database entity types generated for Finvesta.
 * These interfaces match the schema defined in tasks/001-setup/subtask-5-database.md.
 * Keep them in sync whenever the database schema changes.
 */

import type { AccountType } from "@/features/shared/types/account-types";

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  monthly_income: number; // EUR amount (e.g. 3730)
  monthly_savings_target: number; // EUR amount (e.g. 1500)
  max_crypto_percentage: number; // e.g. 15 => 15%
  max_liquid_no_return: number; // EUR amount (e.g. 20000)
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

interface DbBase {
  id: string;
  user_id: string;
  created_at: string;
  updated_at?: string;
}

interface Account extends DbBase {
  name: string;
  type: AccountType;
  provider?: string;
  balance: number;
  currency: string; // ISO currency code (e.g. "EUR")
  is_active: boolean;
}

interface Category extends DbBase {
  name: string;
  type: "income" | "expense" | "investment";
  parent_id?: string | null;
  color: string; // HEX string
  is_default: boolean;
  description?: string;
}

type TransactionType = "income" | "expense" | "transfer" | "investment";

interface Transaction extends DbBase {
  account_id: string;
  category_id?: string | null;
  type: TransactionType;
  amount: number;
  description: string;
  notes?: string;
  transaction_date: string; // YYYY-MM-DD
  to_account_id?: string | null; // destination for transfers
}

interface Alert extends DbBase {
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  action_suggested?: string;
  trigger_value?: number;
  is_read: boolean;
  is_dismissed: boolean;
  expires_at?: string;
}

// Individual exports for direct use
export type { Profile, Account, Category, Transaction, Alert, TransactionType };

// Aggregate type to make life easier when using Supabase
export interface DataBaseTypes {
  Profile: Profile;
  Account: Account;
  Category: Category;
  Transaction: Transaction;
  Alert: Alert;
}
