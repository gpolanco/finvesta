"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Palette } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/shared/components/ui/form";

import {
  createCategorySchema,
  UpdateCategoryFormData,
  type CreateCategoryFormData,
} from "@/features/categories/lib/validations";
import { Category } from "@/features/categories/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: Category | null;
  onCancel?: () => void;
  onSubmit?: (
    data: CreateCategoryFormData | UpdateCategoryFormData
  ) => Promise<ServiceBaseResponse<Category>>;
  isLoading?: boolean;
}

const categoryTypes = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
  { value: "investment", label: "Inversión" },
] as const;

const defaultColors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#6b7280",
];

export function CategoryForm({
  category,
  onSubmit,
  isLoading,
  onCancel,
}: CategoryFormProps) {
  const isEditing = !!category;

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: category?.name || "",
      type: category?.type ? category?.type : "expense",
      color: category?.color || "#6b7280",
      isDefault:
        typeof category?.isDefault === "boolean" ? category.isDefault : false,
    },
  });

  const handleSubmit = async (
    data: CreateCategoryFormData | UpdateCategoryFormData
  ) => {
    const response = await onSubmit?.(data);
    if (response?.success) {
      toast.success("Category updated successfully");
      onCancel?.();
    } else {
      toast.error(response?.error || "Error updating category");
      onCancel?.();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: Restaurants, Salary, Bitcoin..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Color
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: field.value }}
                    />
                    <Input
                      type="color"
                      {...field}
                      disabled={isLoading}
                      className="w-16 h-8 p-0 border-0 cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-9 gap-2">
                    {defaultColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-6 h-6 rounded-full border-2 ${
                          field.value === color
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => field.onChange(color)}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isEditing ? "Update" : "Create"} Category
          </Button>
        </div>
      </form>
    </Form>
  );
}
