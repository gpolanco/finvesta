import { Suspense } from "react";
import Link from "next/link";

import { appRoutes } from "@/features/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { LoginFormWrapper } from "@/features/auth/components/login-form-wrapper";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-center">
            Accede a tu cuenta de Finvesta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<div>Cargando...</div>}>
            <LoginFormWrapper />
          </Suspense>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                href={appRoutes.auth.signUp.path}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
