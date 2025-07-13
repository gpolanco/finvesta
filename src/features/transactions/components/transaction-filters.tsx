"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/components/ui/select";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/features/shared/components/ui/collapsible";

import type { Account } from "@/features/accounts/types";
import type { Category } from "@/features/categories/types";
import {
  getAccountTypeLabel,
  getAccountTypeIcon,
} from "@/features/shared/types/account-types";
import { TRANSACTION_TYPE_OPTIONS } from "@/features/shared/types/transaction-types";

export interface TransactionFilters {
  search: string;
  accountId: string;
  categoryId: string;
  transactionType: string;
  dateFrom: string;
  dateTo: string;
}

interface TransactionFiltersProps {
  accounts: Account[];
  categories: Category[];
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  resultCount?: number;
}

export function TransactionFilters({
  accounts,
  categories,
  filters,
  onFiltersChange,
  resultCount,
}: TransactionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && value.trim() !== "" && value !== "all"
  ).length;

  const handleFilterChange = (key: keyof TransactionFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === "all" ? "" : value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      accountId: "",
      categoryId: "",
      transactionType: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Search Bar - Always Visible */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions by description..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filter Toggle & Status */}
        <div className="flex items-center justify-between mb-4">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 px-1.5 py-0.5 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4 space-y-4">
              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Account Filter */}
                <div className="space-y-2">
                  <label
                    htmlFor="account-filter"
                    className="text-sm font-medium"
                  >
                    Account
                  </label>
                  <Select
                    value={filters.accountId || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("accountId", value)
                    }
                  >
                    <SelectTrigger id="account-filter">
                      <SelectValue placeholder="All accounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All accounts</SelectItem>
                      {accounts.map((account) => {
                        const IconComponent = getAccountTypeIcon(account.type);
                        const typeLabel = getAccountTypeLabel(account.type);
                        return (
                          <SelectItem key={account.id} value={account.id}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span className="truncate">
                                {account.name} ({typeLabel})
                              </span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label
                    htmlFor="category-filter"
                    className="text-sm font-medium"
                  >
                    Category
                  </label>
                  <Select
                    value={filters.categoryId || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("categoryId", value)
                    }
                  >
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Transaction Type Filter */}
                <div className="space-y-2">
                  <label htmlFor="type-filter" className="text-sm font-medium">
                    Type
                  </label>
                  <Select
                    value={filters.transactionType || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("transactionType", value)
                    }
                  >
                    <SelectTrigger id="type-filter">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) =>
                        handleFilterChange("dateFrom", e.target.value)
                      }
                      className="text-sm"
                      placeholder="From"
                    />
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) =>
                        handleFilterChange("dateTo", e.target.value)
                      }
                      className="text-sm"
                      placeholder="To"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {/* Results Count */}
        {resultCount !== undefined && (
          <div className="text-sm text-muted-foreground">
            {resultCount === 1
              ? "1 transaction found"
              : `${resultCount} transactions found`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
