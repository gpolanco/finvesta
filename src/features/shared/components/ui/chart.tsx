"use client";

// TODO: Este archivo será reescrito en el próximo subtask para usar Recharts específicamente para Finvesta
// Por ahora lo deshabilitamos para completar el layout base

export default function ChartPlaceholder() {
  return null;
}

// Temporal exports para evitar errores de importación
export type ChartConfig = Record<string, unknown>;

export const ChartContainer = ({
  children,
  config: _config, // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
}: {
  children: React.ReactNode;
  config?: ChartConfig;
  className?: string;
}) => <div className={className}>{children}</div>;
export const ChartTooltip = () => null;
export const ChartTooltipContent = () => null;
export const ChartLegend = () => null;
export const ChartLegendContent = () => null;
export const ChartStyle = () => null;
export function useChart() {
  return { config: {} };
}

// ... rest of file commented out for now
