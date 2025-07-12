import { z } from "zod";

export const createTransactionSchema = z.object({
  accountId: z.string().uuid("Selecciona una cuenta válida"),
  categoryId: z.string().uuid("Selecciona una categoría válida"),
  amount: z
    .number()
    .positive("El importe debe ser mayor que 0")
    .max(1000000, "El importe no puede exceder €1,000,000"),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(200, "La descripción no puede exceder 200 caracteres"),
  transactionType: z.enum(["income", "expense", "investment"], {
    required_error: "Selecciona un tipo de transacción",
  }),
  transactionDate: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const oneYearAgo = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      return parsedDate <= now && parsedDate >= oneYearAgo;
    }, "La fecha debe estar entre hace un año y hoy"),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;
