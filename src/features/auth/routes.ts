import { BaseRoute, DynamicRoute } from "@/features/shared/types/route-type";

export const authRoutes = {
  signIn: {
    path: "/sign-in",
    title: "Iniciar Sesión - Finvesta",
    description: "Accede a tu cuenta de finanzas personales",
    generatePath: (params?: { redirectUrl?: string }) =>
      params?.redirectUrl
        ? `/sign-in?redirect_url=${encodeURIComponent(params.redirectUrl)}`
        : "/sign-in",
  } as DynamicRoute<{ redirectUrl?: string }>,

  signUp: {
    path: "/sign-up",
    title: "Crear Cuenta - Finvesta",
    description: "Crea tu cuenta para gestionar tus finanzas personales",
  } as BaseRoute,

  forgotPassword: {
    path: "/forgot-password",
    title: "Recuperar Contraseña - Finvesta",
    description: "Recupera el acceso a tu cuenta",
  } as BaseRoute,

  resetPassword: {
    path: "/reset-password",
    title: "Nueva Contraseña - Finvesta",
    description: "Establece una nueva contraseña para tu cuenta",
    generatePath: (params: { token: string }) =>
      `/reset-password?token=${params.token}`,
  } as DynamicRoute<{ token: string }>,
} as const;
