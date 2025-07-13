"use client";

import { useState, useTransition } from "react";
import { Pencil, Plus } from "lucide-react";

import { AccountForm } from "@/features/accounts/components/account-form";
import { Account } from "@/features/accounts/types";
import { FormDialog } from "@/features/shared/components/form-dialog";
import { Button } from "@/features/shared/components/ui/button";
import {
  createAccountAction,
  updateAccountAction,
} from "@/features/accounts/actions";
import { CreateAccountFormData } from "@/features/accounts/lib/validations";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

interface AccountFormDialogProps {
  account?: Account | null;
  showText?: boolean;
  icon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
  onOptimisticAdd?: (account: Account) => void;
  onOptimisticUpdate?: (account: Account) => void;
}

export const AccountFormDialog = ({
  account,
  showText = true,
  icon,
  buttonVariant = "default",
  onOptimisticAdd,
  onOptimisticUpdate,
}: AccountFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isEditing = !!account;

  const handleSubmit = async (data: CreateAccountFormData) => {
    return new Promise<ServiceBaseResponse<Account>>((resolve) => {
      startTransition(async () => {
        if (isEditing && account) {
          // Si hay callback optimistic, usarlo
          if (onOptimisticUpdate) {
            const optimisticAccount = { ...account, ...data };
            onOptimisticUpdate(optimisticAccount);
          }

          const response = await updateAccountAction({
            id: account.id,
            ...data,
          });

          if (response.success) {
            // Si hay optimistic update, retrasar el cierre
            if (onOptimisticUpdate) {
              setTimeout(() => setIsOpen(false), 100);
            } else {
              setIsOpen(false);
            }
          }

          resolve(response);
        } else {
          const response = await createAccountAction(data);

          if (response.success) {
            // Si hay callback optimistic y datos, usarlo
            if (onOptimisticAdd && response.data) {
              onOptimisticAdd(response.data);
              setTimeout(() => setIsOpen(false), 100);
            } else {
              setIsOpen(false);
            }
          }

          resolve(response);
        }
      });
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <FormDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={account ? "Edit account" : "Add new account"}
      trigger={
        <Button variant={buttonVariant}>
          {icon ||
            (isEditing ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            ))}
          {showText && (
            <span className="ml-2">{isEditing ? "Edit" : "Add"} account</span>
          )}
        </Button>
      }
    >
      <AccountForm
        account={account}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isPending}
      />
    </FormDialog>
  );
};
