import { z } from "zod";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/features/auth/types";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "The email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .min(1, "The password is required")
    .min(6, "The password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "The name is required")
      .min(2, "The name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "The email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "The password is required")
      .min(6, "The password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "The password must contain at least one lowercase letter, one uppercase letter and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "The email is required")
    .email("Invalid email format"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "The password is required")
      .min(6, "The password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "The password must contain at least one lowercase letter, one uppercase letter and one number"
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Asegurar que los tipos Zod sean compatibles con los tipos de la aplicación
export const _typeCheck: LoginCredentials = {} as LoginFormData;
export const _typeCheck2: Omit<RegisterCredentials, "confirmPassword"> =
  {} as Omit<RegisterFormData, "confirmPassword">;
