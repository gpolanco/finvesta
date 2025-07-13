import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  type: z.enum(["income", "expense", "investment"], {
    required_error: "Select a category type",
  }),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Select a valid color"),
  isDefault: z.boolean(),
  description: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
