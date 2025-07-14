"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { ACCOUNT_TYPE_OPTIONS } from "@/features/shared/types/account-types";
import {
  CURRENCY_OPTIONS,
  safeCurrency,
} from "@/features/shared/types/currency-types";
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
  createAccountSchema,
  updateAccountSchema,
  type CreateAccountFormData,
  type UpdateAccountFormData,
} from "@/features/accounts/lib/validations";
import { Account } from "@/features/accounts/types";
import { ServiceBaseResponse } from "@/features/shared/services/types/service-base";

interface AccountFormProps {
  account?: Account | null;
  onCancel?: () => void;
  onSubmit?: (
    data: CreateAccountFormData | UpdateAccountFormData
  ) => Promise<ServiceBaseResponse<Account>>;
  isLoading?: boolean;
}

// Using shared account type options with React element icons
const accountTypes = ACCOUNT_TYPE_OPTIONS.map((option) => ({
  ...option,
  icon: <option.icon className="w-4 h-4" />,
}));

// Using shared currency options
const currencies = CURRENCY_OPTIONS;

export function AccountForm({
  account,
  onSubmit,
  isLoading,
  onCancel,
}: AccountFormProps) {
  const isEditing = !!account;

  const form = useForm<CreateAccountFormData | UpdateAccountFormData>({
    resolver: zodResolver(
      isEditing ? updateAccountSchema : createAccountSchema
    ),
    defaultValues:
      isEditing && account
        ? {
            id: account.id,
            name: account.name,
            type: account.type,
            provider: account.provider || "",
            balance: account.balance,
            currency: safeCurrency(account.currency),
          }
        : {
            name: "",
            type: "bank" as const,
            provider: "",
            balance: 0,
            currency: safeCurrency(undefined),
          },
  });

  const handleSubmit = async (
    data: CreateAccountFormData | UpdateAccountFormData
  ) => {
    if (!onSubmit) return;

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Name */}
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
                  placeholder="e.g: BBVA Checking Account"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Provider */}
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g: BBVA, Coinbase, Revolut"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Initial/Current Balance */}
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Balance {isEditing ? "current" : "initial"}{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10000000"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Currency <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update" : "Create"} account
          </Button>
        </div>
      </form>
    </Form>
  );
}
