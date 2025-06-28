import { Suspense } from "react";
import Link from "next/link";

import { appRoutes } from "@/features/routes";
import { RegisterPageClient } from "@/features/auth/components/register-page-client";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterPageClient />
      </Suspense>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
    </div>
  );
}
