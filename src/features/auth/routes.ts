import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

export const authRoutes = {
  signIn: {
    path: "/sign-in",
    title: "Login - Finvesta",
    description: "Access your Finvesta account",
    generatePath: (params?: { redirectUrl?: string }) =>
      params?.redirectUrl
        ? `/sign-in?redirect_url=${encodeURIComponent(params.redirectUrl)}`
        : "/sign-in",
  } as DynamicRoute<{ redirectUrl?: string }>,

  signUp: {
    path: "/sign-up",
    title: "Create Account - Finvesta",
    description: "Create your account to manage your personal finances",
  } as BaseRoute,

  forgotPassword: {
    path: "/forgot-password",
    title: "Forgot Password - Finvesta",
    description: "Recover access to your account",
  } as BaseRoute,

  resetPassword: {
    path: "/reset-password",
    title: "New Password - Finvesta",
    description: "Set a new password for your account",
    generatePath: (params: { token: string }) =>
      `/reset-password?token=${params.token}`,
  } as DynamicRoute<{ token: string }>,
} as const;
