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
      try {
        await deleteTransaction(transaction.id);
        toast.success("Transacción eliminada correctamente");
        setOpen(false);
        onSuccess?.();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al eliminar la transacción"
        );
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Transacción</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar esta transacción?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: transaction.category.color }}
              />
              <div className="flex-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category.name} • €{transaction.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
