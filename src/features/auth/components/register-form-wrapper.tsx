"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { appRoutes } from "@/features/routes";
import { RegisterForm } from "./register-form";
import { RegisterSuccess } from "./register-success";

export function RegisterFormWrapper() {
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const handleSuccess = (email: string) => {
    setRegisteredEmail(email);
  };

  if (registeredEmail) {
    return <RegisterSuccess email={registeredEmail} />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Crear cuenta
        </CardTitle>
        <CardDescription className="text-center">
          Únete a Finvesta y empieza a gestionar tus finanzas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm onSuccess={handleSuccess} />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href={appRoutes.auth.signIn.path}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
