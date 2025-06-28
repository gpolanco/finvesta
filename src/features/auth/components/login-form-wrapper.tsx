"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "./login-form";

export function LoginFormWrapper() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || undefined;

  return <LoginForm redirectUrl={redirectUrl} />;
}
