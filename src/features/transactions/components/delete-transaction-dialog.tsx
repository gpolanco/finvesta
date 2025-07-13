"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/features/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/components/ui/dialog";

import { deleteTransaction } from "../actions/delete-transaction";
import type { TransactionWithDetails } from "../types";

interface DeleteTransactionDialogProps {
  transaction: TransactionWithDetails;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function DeleteTransactionDialog({
  transaction,
  trigger,
  onSuccess,
}: DeleteTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteTransaction(transaction.id);

      if (response.success) {
        toast.success("Transaction deleted successfully");
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(response.error || "Error deleting transaction");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              {transaction.category && (
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: transaction.category.color }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {transaction.category
                    ? `${
                        transaction.category.name
                      } • €${transaction.amount.toFixed(2)}`
                    : `€${transaction.amount.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
