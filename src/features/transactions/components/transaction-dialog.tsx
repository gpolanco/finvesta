"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/components/ui/dialog";
import { Button } from "@/features/shared/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionForm } from "./transaction-form";
import type { Transaction } from "@/features/transactions/types";
import type { Account, Category } from "@/features/accounts/types";

interface TransactionDialogProps {
  accounts: Account[];
  categories: Category[];
  transaction?: Transaction;
  defaultAccountId?: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function TransactionDialog({
  accounts,
  categories,
  transaction,
  defaultAccountId,
  trigger,
  onSuccess,
}: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          accounts={accounts}
          categories={categories}
          transaction={transaction}
          defaultAccountId={defaultAccountId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
