"use client";

import { Account } from "@/features/accounts/types";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";
import { cn } from "@/features/shared/lib/utils";
import {
  getAccountTypeIcon,
  getAccountTypeIconColor,
  getAccountTypeBadgeColor,
  getAccountTypeLabel,
} from "@/features/shared/types/account-types";
import { AccountFormDialog } from "./account-form-dialog";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { FormatNumber } from "@/features/shared/components/formatters/format-number";
import { Currency } from "@/features/shared/types";

interface AccountListProps {
  accounts: Account[];
}
export function AccountList({ accounts }: AccountListProps) {
  return (
    <div className="space-y-4">
      {accounts.map((account) => {
        const IconComponent = getAccountTypeIcon(account.type);
        const iconColorClass = getAccountTypeIconColor(account.type);
        const badgeColorClass = getAccountTypeBadgeColor(account.type);
        const typeLabel = getAccountTypeLabel(account.type);

        return (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <IconComponent
                  className={cn("w-5 h-5", iconColorClass)}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-semibold text-lg">{account.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", badgeColorClass)}
                  >
                    {typeLabel}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AccountFormDialog account={account} showText={false} />
                <DeleteAccountDialog account={account} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {account.provider && (
                    <span className="block">{account.provider}</span>
                  )}
                  <span className="text-xs text-gray-500">
                    Currency: {account.currency}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    <FormatNumber
                      value={account.balance}
                      currency={account.currency as Currency}
                      style="currency"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
