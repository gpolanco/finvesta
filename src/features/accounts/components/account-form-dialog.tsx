"use client";

import { useState, useTransition } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { AccountForm } from "@/features/accounts/components/account-form";
import { Account } from "@/features/accounts/types";
import { FormDialog } from "@/features/shared/components/form-dialog";
import { Button } from "@/features/shared/components/ui/button";
import {
  createAccountAction,
  updateAccountAction,
} from "@/features/accounts/actions";
import {
  CreateAccountFormData,
  UpdateAccountFormData,
} from "@/features/accounts/lib/validations";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

interface AccountFormDialogProps {
  account?: Account | null;
  showText?: boolean;
  icon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
}

export const AccountFormDialog = ({
  account,
  showText = true,
  icon,
  buttonVariant = "ghost",
}: AccountFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isEditing = !!account;

  const handleSubmit = async (
    data: CreateAccountFormData | UpdateAccountFormData
  ) => {
    return new Promise<ServiceBaseResponse<Account>>((resolve) => {
      startTransition(async () => {
        if (isEditing && account) {
          const updateData: UpdateAccountFormData =
            "id" in data
              ? (data as UpdateAccountFormData)
              : { id: account.id, ...data };
          const response = await updateAccountAction(updateData);

          if (response.success) {
            toast.success("Account updated successfully");
            setIsOpen(false);
          } else {
            toast.error(response.error || "Failed to update account");
          }

          resolve(response);
        } else {
          const response = await createAccountAction(data);

          if (response.success) {
            toast.success("Account created successfully");
            setIsOpen(false);
          } else {
            toast.error(response.error || "Failed to create account");
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
      onOpenChange={!isPending ? setIsOpen : () => {}}
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
