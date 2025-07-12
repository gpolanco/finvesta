"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import type { EmailOtpType } from "@supabase/supabase-js";
import { appRoutes } from "@/features/routes";

export const ConfirmEmailHandler = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type") as EmailOtpType | null;

      if (token_hash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
          });

          if (error) {
            console.error("Error confirming email:", error);
            setStatus("error");
          } else {
            setStatus("success");
            // Redirect to dashboard after successful confirmation
            setTimeout(() => {
              router.push(appRoutes.dashboard.overview.path);
            }, 2000);
          }
        } catch (error) {
          console.error("Error in confirmation:", error);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router, supabase.auth]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Confirming your email...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2">Email Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Your email has been confirmed successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h1 className="text-2xl font-bold mb-2">Confirmation Failed</h1>
        <p className="text-gray-600 mb-4">
          There was an error confirming your email. The link may be invalid or
          expired.
        </p>
        <button
          onClick={() => router.push(appRoutes.auth.signIn.path)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};
