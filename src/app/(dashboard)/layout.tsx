import { getUserServer } from "@/features/auth/lib/get-user-server";
import { appRoutes } from "@/features/routes";
import { AppSidebar } from "@/features/shared/components/app-sidebar";
import { SiteHeader } from "@/features/shared/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/features/shared/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserServer();

  if (!user) {
    redirect(appRoutes.auth.signIn.path);
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
