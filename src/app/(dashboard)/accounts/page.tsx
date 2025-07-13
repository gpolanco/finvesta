import { Suspense } from "react";
import { AccountList } from "@/features/accounts/components/account-list";
import { AccountListSkeleton } from "@/features/accounts/components/account-skeleton";
import { AccountFormDialog } from "@/features/accounts/components/account-form-dialog";
import { getAccounts } from "@/features/accounts/actions/get-accounts";
import { appRoutes } from "@/features/routes";
import { PageWrapper } from "@/features/shared/components/page-wrapper";
import { PiggyBank } from "lucide-react";
import { EmptyContent } from "@/features/shared/components/empty-content";

export default async function AccountsPage() {
  const accounts = await getAccounts();

  if (accounts.length === 0) {
    return (
      <PageWrapper
        title={appRoutes.accounts.list.title}
        description={appRoutes.accounts.list.description}
        actions={<AccountFormDialog />}
      >
        <EmptyContent
          title="You don't have any accounts registered"
          description="Add your first account to start managing your finances and tracking your portfolio"
          icon={PiggyBank}
        >
          <AccountFormDialog />
        </EmptyContent>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={appRoutes.accounts.list.title}
      description={appRoutes.accounts.list.description}
      actions={<AccountFormDialog />}
    >
      <Suspense fallback={<AccountListSkeleton />}>
        <AccountList accounts={accounts} />
      </Suspense>
    </PageWrapper>
  );
}
