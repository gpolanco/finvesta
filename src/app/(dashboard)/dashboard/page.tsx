import { appRoutes } from "@/features/routes";
import { ChartAreaInteractive } from "@/features/shared/components/chart-area-interactive";
import { DataTable } from "@/features/shared/components/data-table";
import { PageWrapper } from "@/features/shared/components/page-wrapper";
import { SectionCards } from "@/features/shared/components/section-cards";

export default function Page() {
  return (
    <PageWrapper
      title={appRoutes.dashboard.overview.title}
      description={appRoutes.dashboard.overview.description}
    >
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable />
      </div>
    </PageWrapper>
  );
}
