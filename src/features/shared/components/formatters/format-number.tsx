interface FormatNumberProps {
  value: number | string;
  options?: Intl.NumberFormatOptions;
  style?: "currency" | "percent" | "decimal";
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  showCurrency?: boolean;
}

const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
};

export function FormatNumber({
  value,
  options,
  style = "decimal",
  currency = "EUR",
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
    showCurrency
      ? currencySymbols[currency as keyof typeof currencySymbols]
      : ""
  }`;
}
