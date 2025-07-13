import { z } from "zod";

// Currency constants and types
export const CURRENCIES = {
  EUR: "EUR",
  USD: "USD",
  GBP: "GBP",
  BTC: "BTC",
  ETH: "ETH",
} as const;

// Currency array for iteration
export const CURRENCY_VALUES = Object.values(CURRENCIES);

// TypeScript type
export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];

// Zod schema for currencies
export const currencySchema = z.enum(["EUR", "USD", "GBP", "BTC", "ETH"], {
  required_error: "Select a currency",
});

// Currency options for forms with labels
export const CURRENCY_OPTIONS = [
  { value: CURRENCIES.EUR, label: "Euro (EUR)" },
  { value: CURRENCIES.USD, label: "Dollar (USD)" },
  { value: CURRENCIES.GBP, label: "Pound (GBP)" },
  { value: CURRENCIES.BTC, label: "Bitcoin (BTC)" },
  { value: CURRENCIES.ETH, label: "Ethereum (ETH)" },
] as const;

// Utility functions for currencies
export function getCurrencyLabel(currency: Currency): string {
  const option = CURRENCY_OPTIONS.find((opt) => opt.value === currency);
  return option?.label || currency;
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    BTC: "₿",
    ETH: "Ξ",
  };
  return symbols[currency] || currency;
}

// Default currency
export const DEFAULT_CURRENCY = CURRENCIES.EUR;

// Helper to validate if a string is a valid currency
export function isValidCurrency(value: string): value is Currency {
  return CURRENCY_VALUES.includes(value as Currency);
}

// Helper to safely get currency with fallback
export function safeCurrency(value?: string): Currency {
  return isValidCurrency(value || "") ? (value as Currency) : DEFAULT_CURRENCY;
}

// Type for Zod infer
export type CurrencyValues = z.infer<typeof currencySchema>;
