"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/shared/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { FileText } from "lucide-react";

interface DataTableProps {
  data?: unknown[];
}

export function DataTable({ data }: DataTableProps) {
  // Datos de ejemplo para Finvesta
  const sampleTransactions = data || [
    {
      id: 1,
      date: "2024-12-19",
      description: "Salario",
      amount: "+€3,730",
      category: "Ingresos",
    },
    {
      id: 2,
      date: "2024-12-18",
      description: "Compra Bitcoin",
      amount: "-€500",
      category: "Cripto",
    },
    {
      id: 3,
      date: "2024-12-17",
      description: "Supermercado",
      amount: "-€85",
      category: "Gastos",
    },
    {
      id: 4,
      date: "2024-12-16",
      description: "Transferencia a ahorro",
      amount: "-€1,500",
      category: "Ahorro",
    },
    {
      id: 5,
      date: "2024-12-15",
      description: "Dividendos fondo",
      amount: "+€45",
      category: "Inversiones",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <div>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>
              Últimos movimientos de tus cuentas financieras
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Importe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleTransactions.map(
              (
                transaction: any // eslint-disable-line @typescript-eslint/no-explicit-any
              ) => {
                if (typeof transaction !== "object" || !transaction) {
                  return null;
                }

                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.date}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted">
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono ${
                        transaction.amount.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Tabla completa de transacciones será implementada en el próximo
            subtask
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
