"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { TransactionForm } from "./transaction-form";
import type { Transaction } from "@/features/transactions/types";
import type { Account } from "@/features/accounts/types";
import type { Category } from "@/features/categories/types";
import { FormDialog } from "@/features/shared/components/form-dialog";

interface TransactionDialogProps {
  accounts: Account[];
  categories: Category[];
  transaction?: Transaction;
  onSuccess?: () => void;
  showText?: boolean;
  icon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
}

export function TransactionDialog({
  accounts,
  categories,
  transaction,
  onSuccess,
  showText = true,
  icon,
  buttonVariant = "default",
}: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const isEditing = !!transaction;

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <FormDialog
      title={transaction ? "Edit Transaction" : "Add Transaction"}
      trigger={
        <Button
          variant={buttonVariant}
          size={showText ? "default" : "sm"}
          className={showText ? "" : "h-8 w-8 p-0"}
        >
          {icon ||
            (isEditing ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            ))}
          {showText && <span>{isEditing ? "Edit" : "Add"} Transaction</span>}
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
    >
      <TransactionForm
        accounts={accounts}
        categories={categories}
        transaction={transaction}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </FormDialog>
  );
}
