"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
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
import { Account } from "@/features/accounts/types";
import { deleteAccountAction } from "@/features/accounts/actions";

interface DeleteAccountDialogProps {
  account: Account;
}

export function DeleteAccountDialog({ account }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteAccountAction({ id: account.id });

      if (response.success) {
        toast.success("Account deleted successfully");
        setIsOpen(false);
        // revalidatePath en el action se encarga de actualizar la UI
      } else {
        toast.error(response.error || "Failed to delete account");
      }
    });
  };

  const hasBalance = account.balance > 0;

  return (
    <Dialog open={isOpen} onOpenChange={!isPending ? setIsOpen : undefined}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the account{" "}
            <strong>&quot;{account.name}&quot;</strong>?
            {hasBalance && (
              <span className="text-red-600 font-medium">
                {" "}
                This account has a balance of{" "}
                {account.balance.toLocaleString("es-ES", {
                  style: "currency",
                  currency: account.currency,
                })}
                . You must transfer or withdraw all funds before deleting.
              </span>
            )}
            {!hasBalance && " This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending || hasBalance}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
