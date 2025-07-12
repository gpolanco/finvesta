interface FormatDateProps {
  date: Date | string;
  options?: Intl.DateTimeFormatOptions;
  showTime?: boolean;
  locale?: string;
}

export function FormatDate({
  date,
  options,
  showTime = false,
  locale = "es-ES",
}: FormatDateProps): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  };

  const formattedDate = new Intl.DateTimeFormat(locale, formatOptions).format(
    dateObj
  );
  const formattedTime = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);

  if (showTime) {
    return `${formattedDate} ${formattedTime}`;
  }

  return formattedDate;
}
