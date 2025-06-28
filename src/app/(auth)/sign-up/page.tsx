import { Suspense } from "react";

import { RegisterFormWrapper } from "@/features/auth/components/register-form-wrapper";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterFormWrapper />
      </Suspense>
    </div>
  );
}
