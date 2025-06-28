import { AppSidebar } from "@/features/shared/components/app-sidebar";
import { ChartAreaInteractive } from "@/features/shared/components/chart-area-interactive";
import { DataTable } from "@/features/shared/components/data-table";
import { SectionCards } from "@/features/shared/components/section-cards";
import { SiteHeader } from "@/features/shared/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/features/shared/components/ui/sidebar";

// import data from "./data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
