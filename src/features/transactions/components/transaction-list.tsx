"use client";

import { useState, useMemo } from "react";

import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";

import type { TransactionWithDetails } from "@/features/transactions/types";
import type { Account } from "@/features/accounts/types";
import type { Category } from "@/features/categories/types";
import { FormatDate } from "@/features/shared/components/formatters/format-date";
import { FormatNumber } from "@/features/shared/components/formatters/format-number";
import {
  TransactionFilters,
  type TransactionFilters as ITransactionFilters,
} from "./transaction-filters";
import { TransactionDialog } from "./transaction-dialog";
import { DeleteTransactionDialog } from "./delete-transaction-dialog";
import {
  getTransactionTypeLabel,
  getTransactionTypeIcon,
  getTransactionTypeAmountColor,
  getTransactionTypeIconColor,
  getTransactionAmountPrefix,
  type TransactionType,
} from "@/features/shared/types/transaction-types";

interface TransactionListProps {
  transactions: TransactionWithDetails[];
  accounts: Account[];
  categories: Category[];
  showAccount?: boolean;
}

export function TransactionList({
  transactions,
  accounts,
  categories,
  showAccount = false,
}: TransactionListProps) {
  const [filters, setFilters] = useState<ITransactionFilters>({
    search: "",
    accountId: "",
    categoryId: "",
    transactionType: "",
    dateFrom: "",
    dateTo: "",
  });

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Search filter
      if (filters.search && filters.search.trim() !== "") {
        const searchLower = filters.search.toLowerCase();
        if (!transaction.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Account filter
      if (filters.accountId && filters.accountId !== "") {
        if (transaction.accountId !== filters.accountId) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId && filters.categoryId !== "") {
        if (transaction.categoryId !== filters.categoryId) {
          return false;
        }
      }

      // Transaction type filter
      if (filters.transactionType && filters.transactionType !== "") {
        if (transaction.transactionType !== filters.transactionType) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateFrom && filters.dateFrom !== "") {
        const transactionDate = new Date(transaction.transactionDate);
        const fromDate = new Date(filters.dateFrom);
        if (transactionDate < fromDate) {
          return false;
        }
      }

      if (filters.dateTo && filters.dateTo !== "") {
        const transactionDate = new Date(transaction.transactionDate);
        const toDate = new Date(filters.dateTo);
        if (transactionDate > toDate) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  const handleFiltersChange = (newFilters: ITransactionFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      {/* Filters Section */}
      <TransactionFilters
        accounts={accounts}
        categories={categories}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultCount={filteredTransactions.length}
      />

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => {
          const IconComponent = getTransactionTypeIcon(
            transaction.transactionType as TransactionType
          );
          const iconColor = getTransactionTypeIconColor(
            transaction.transactionType as TransactionType
          );
          const amountColor = getTransactionTypeAmountColor(
            transaction.transactionType as TransactionType
          );
          const typeLabel = getTransactionTypeLabel(
            transaction.transactionType as TransactionType
          );
          const amountPrefix = getTransactionAmountPrefix(
            transaction.transactionType as TransactionType
          );

          return (
            <Card key={transaction.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${iconColor}`} />
                      {transaction.category && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: transaction.category.color,
                          }}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {transaction.description && (
                          <h4 className="font-medium truncate">
                            {transaction.description}
                          </h4>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {typeLabel}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {transaction.category && (
                          <>
                            <span>{transaction.category.name}</span>
                            <span>•</span>
                          </>
                        )}
                        {showAccount && (
                          <>
                            <span>{transaction.account.name}</span>
                            <span>•</span>
                          </>
                        )}
                        <FormatDate
                          date={transaction.transactionDate}
                          showTime
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`font-semibold ${amountColor}`}>
                      <FormatNumber
                        value={transaction.amount}
                        style="currency"
                        prefix={amountPrefix}
                      />
                    </span>

                    <div className="flex items-center gap-1">
                      <TransactionDialog
                        accounts={accounts}
                        categories={categories}
                        transaction={transaction}
                        showText={false}
                        buttonVariant="ghost"
                      />
                      <DeleteTransactionDialog transaction={transaction} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
