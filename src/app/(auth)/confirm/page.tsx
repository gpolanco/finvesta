import { Suspense } from "react";
import ConfirmEmailHandler from "@/features/auth/components/confirm-email-handler";

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmEmailHandler />
      </Suspense>
    </div>
  );
}
