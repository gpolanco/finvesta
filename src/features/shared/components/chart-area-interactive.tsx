"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { TrendingUp } from "lucide-react";

export function ChartAreaInteractive() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráficos Financieros</CardTitle>
          <CardDescription>
            Visualización de la evolución de tu patrimonio
          </CardDescription>
        </div>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="flex aspect-auto h-[250px] w-full items-center justify-center rounded-lg border border-dashed border-muted-foreground/25">
          <div className="text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Gráficos financieros serán implementados en el próximo subtask
            </p>
            <p className="text-xs text-muted-foreground/75">
              Dashboard financiero específico para Finvesta
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
