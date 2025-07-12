import { Account } from "@/types/database";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";
import { cn } from "@/features/shared/lib/utils";
import { Banknote, Bitcoin, PiggyBank, CreditCard, Wallet } from "lucide-react";

interface AccountListProps {
  accounts: Account[];
}

function getTypeIcon(type: Account["type"]) {
  switch (type) {
    case "bank":
      return <Banknote className="w-5 h-5 text-blue-600" aria-hidden="true" />;
    case "crypto":
      return <Bitcoin className="w-5 h-5 text-yellow-600" aria-hidden="true" />;
    case "investment":
      return (
        <PiggyBank className="w-5 h-5 text-green-600" aria-hidden="true" />
      );
    case "savings":
      return <Wallet className="w-5 h-5 text-purple-600" aria-hidden="true" />;
    case "cash":
      return (
        <CreditCard className="w-5 h-5 text-gray-600" aria-hidden="true" />
      );
    default:
      return null;
  }
}

function getTypeColor(type: Account["type"]) {
  switch (type) {
    case "bank":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "crypto":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "investment":
      return "bg-green-50 text-green-700 border-green-200";
    case "savings":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "cash":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export function AccountList({ accounts }: AccountListProps) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label={`Lista de ${accounts.length} cuentas financieras`}
    >
      {accounts.map((account) => (
        <Card
          key={account.id}
          className="flex flex-col h-full hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
          role="listitem"
          tabIndex={0}
          aria-label={`Cuenta ${account.name}, tipo ${
            account.type
          }, saldo ${account.balance.toLocaleString("es-ES", {
            style: "currency",
            currency: account.currency,
          })}`}
        >
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex-shrink-0">{getTypeIcon(account.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {account.name}
              </h3>
              {account.provider && (
                <p className="text-xs text-gray-500 truncate">
                  {account.provider}
                </p>
              )}
            </div>
            <Badge
              variant="outline"
              className={cn(
                "capitalize font-medium text-xs px-2.5 py-0.5",
                getTypeColor(account.type)
              )}
            >
              {account.type === "bank" && "Banco"}
              {account.type === "crypto" && "Cripto"}
              {account.type === "investment" && "Inversión"}
              {account.type === "savings" && "Ahorro"}
              {account.type === "cash" && "Efectivo"}
            </Badge>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end pt-0">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {account.balance.toLocaleString("es-ES", {
                style: "currency",
                currency: account.currency,
              })}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {account.currency}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
