import {
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";

import type { TransactionWithDetails } from "@/features/transactions/types";
import { FormatDate } from "@/features/shared/components/formatters/format-date";
import { FormatNumber } from "@/features/shared/components/formatters/format-number";

interface TransactionListProps {
  transactions: TransactionWithDetails[];
  onEdit?: (transaction: TransactionWithDetails) => void;
  onDelete?: (transactionId: string) => void;
  showAccount?: boolean;
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
  showAccount = false,
}: TransactionListProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "expense":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case "investment":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "income":
        return "Ingreso";
      case "expense":
        return "Gasto";
      case "investment":
        return "Inversión";
      default:
        return type;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      case "investment":
        return "text-blue-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  {getTransactionIcon(transaction.transactionType)}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: transaction.category.color }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">
                      {transaction.description}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {getTransactionTypeLabel(transaction.transactionType)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{transaction.category.name}</span>
                    {showAccount && (
                      <>
                        <span>•</span>
                        <span>{transaction.account.name}</span>
                      </>
                    )}
                    <span>•</span>
                    <FormatDate date={transaction.transactionDate} showTime />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${getAmountColor(
                    transaction.transactionType
                  )}`}
                >
                  <FormatNumber
                    value={transaction.amount}
                    style="currency"
                    prefix={
                      transaction.transactionType === "expense" ? "-" : "+"
                    }
                    showCurrency
                  />
                </span>

                <div className="flex items-center gap-1">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(transaction)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
