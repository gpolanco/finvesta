/*
 * Database entity types generated for Finvesta.
 * These interfaces match the schema defined in tasks/001-setup/subtask-5-database.md.
 * Keep them in sync whenever the database schema changes.
 */

export interface Profile {
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

export type AccountType = "bank" | "crypto" | "investment" | "cash" | "savings";

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  provider?: string;
  balance: number;
  currency: string; // ISO currency code (e.g. "EUR")
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id?: string; // null when global default
  name: string;
  type: "income" | "expense" | "investment";
  parent_id?: string | null;
  color: string; // HEX string
  is_default: boolean;
  created_at: string;
}

export type TransactionType = "income" | "expense" | "transfer" | "investment";

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id?: string | null;
  type: TransactionType;
  amount: number;
  description: string;
  notes?: string;
  transaction_date: string; // YYYY-MM-DD
  to_account_id?: string | null; // destination for transfers
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  action_suggested?: string;
  trigger_value?: number;
  is_read: boolean;
  is_dismissed: boolean;
  expires_at?: string;
  created_at: string;
}

// Aggregate type to make life easier when using Supabase
export interface DatabaseEntities {
  profiles: Profile;
  accounts: Account;
  categories: Category;
  transactions: Transaction;
  alerts: Alert;
}
