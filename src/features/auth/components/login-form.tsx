"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Suspense } from "react";
import { z } from "zod";

import { useAuth } from "@/features/auth/context/auth-context";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import { Alert, AlertDescription } from "@/features/shared/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/shared/components/ui/form";
import { appRoutes } from "@/features/routes";

interface LoginFormProps {
  redirectUrl?: string;
}

const loginSchema = z.object({
  email: z.string().email("Por favor, ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginFormContent({ redirectUrl }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, error, clearError, user, loading } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user && !loading) {
      const targetUrl = redirectUrl || appRoutes.dashboard.overview.path;
      router.push(targetUrl);
    }
  }, [user, loading, redirectUrl, router]);

  const onSubmit = async (data: LoginFormData) => {
    clearError();

    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Bienvenido de vuelta
        </h1>
        <p className="text-gray-600 mt-2">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      {/* Error general */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a
            href="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Regístrate aquí
          </a>
        </p>
        <p className="text-sm">
          <a
            href="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginForm({ redirectUrl }: LoginFormProps) {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <LoginFormContent redirectUrl={redirectUrl} />
    </Suspense>
  );
}
