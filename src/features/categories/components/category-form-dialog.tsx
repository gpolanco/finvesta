"use client";

import { useState, useTransition } from "react";
import { Pencil, Plus } from "lucide-react";

import { CategoryForm } from "@/features/categories/components/category-form";
import { Category } from "@/features/categories/types";
import { FormDialog } from "@/features/shared/components/form-dialog";
import { Button } from "@/features/shared/components/ui/button";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/features/categories/actions";
import {
  CreateCategoryFormData,
  UpdateCategoryFormData,
} from "@/features/categories/lib/validations";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

interface CategoryFormDialogProps {
  category?: Category | null;
  showText?: boolean;
  icon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost" | "link";
}

export const CategoryFormDialog = ({
  category,
  showText = true,
  icon,
  buttonVariant = "default",
}: CategoryFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isEditing = !!category;

  const handleSubmit = async (
    data: CreateCategoryFormData | UpdateCategoryFormData
  ) => {
    return new Promise<ServiceBaseResponse<Category>>((resolve) => {
      startTransition(async () => {
        if (isEditing && category) {
          const response = await updateCategoryAction({
            id: category.id,
            ...data,
          });

          if (response.success) {
            setIsOpen(false);
          }

          resolve(response);
        } else {
          const response = await createCategoryAction(
            data as CreateCategoryFormData
          );

          if (response.success) {
            setIsOpen(false);
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
      title={category ? "Edit category" : "Add new category"}
      trigger={
        <Button variant={buttonVariant}>
          {icon ||
            (isEditing ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            ))}
          {showText && <span>{isEditing ? "Edit" : "Add"} category</span>}
        </Button>
      }
    >
      <CategoryForm
        category={category}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isPending}
      />
    </FormDialog>
  );
};
