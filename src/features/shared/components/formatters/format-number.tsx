import {
  DEFAULT_CURRENCY,
  getCurrencySymbol,
  type Currency,
} from "@/features/shared/types/currency-types";
import { cn } from "@/features/shared/lib/utils";

interface FormatNumberProps {
  value: number | string;
  options?: Intl.NumberFormatOptions;
  style?: "currency" | "percent" | "decimal";
  currency?: Currency;
  locale?: string;
  prefix?: string;
  suffix?: string;
  showCurrency?: boolean;
  className?: string;
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
  className,
}: FormatNumberProps): React.ReactNode {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  const formatOptions: Intl.NumberFormatOptions = {
    style,
    currency,
    ...options,
  };

  const formattedNumber = new Intl.NumberFormat(locale, formatOptions).format(
    numberValue
  );

  // Only add currency symbol manually if showCurrency is true AND style is not "currency"
  // (because "currency" style already includes the currency symbol)
  const shouldAddCurrencySymbol = showCurrency && style !== "currency";

  return (
    <span
      className={cn(className, {
        "font-semibold": style === "currency",
      })}
    >
      {`${prefix || ""}${formattedNumber}${suffix || ""}${
        shouldAddCurrencySymbol ? getCurrencySymbol(currency) : ""
      }`}
    </span>
  );
}
