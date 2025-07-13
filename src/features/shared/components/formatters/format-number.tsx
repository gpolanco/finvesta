import {
  DEFAULT_CURRENCY,
  getCurrencySymbol,
  type Currency,
} from "@/features/shared/types/currency-types";

interface FormatNumberProps {
  value: number | string;
  options?: Intl.NumberFormatOptions;
  style?: "currency" | "percent" | "decimal";
  currency?: Currency;
  locale?: string;
  prefix?: string;
  suffix?: string;
  showCurrency?: boolean;
}

export function FormatNumber({
  value,
  options,
  style = "decimal",
  currency = DEFAULT_CURRENCY,
  locale = "es-ES",
  prefix,
  suffix,
  showCurrency = false,
}: FormatNumberProps): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  const formatOptions: Intl.NumberFormatOptions = {
    style,
    currency,
    ...options,
  };

  const formattedNumber = new Intl.NumberFormat(locale, formatOptions).format(
    numberValue
  );

  return `${prefix}${formattedNumber}${suffix}${
    showCurrency ? getCurrencySymbol(currency) : ""
  }`;
}
