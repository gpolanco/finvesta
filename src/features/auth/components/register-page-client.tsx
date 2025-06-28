"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { RegisterForm } from "./register-form";
import { RegisterSuccess } from "./register-success";

export function RegisterPageClient() {
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
      </CardContent>
    </Card>
  );
}
