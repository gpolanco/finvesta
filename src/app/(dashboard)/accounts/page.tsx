import { Suspense } from "react";
import { AccountList } from "@/features/accounts/components/account-list";
import { AccountListSkeleton } from "@/features/accounts/components/account-skeleton";
import { getAccounts } from "@/features/accounts/actions/get-accounts";
import { accountsRoutes, appRoutes } from "@/features/routes";
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
      >
        <EmptyContent
          title="You don't have any accounts registered"
          description="Add your first account to start managing your finances and tracking your portfolio"
          icon={PiggyBank}
          buttonText="Add account"
          createPath={accountsRoutes.create.path}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={appRoutes.accounts.list.title}
      description={appRoutes.accounts.list.description}
    >
      <Suspense fallback={<AccountListSkeleton />}>
        <AccountList accounts={accounts} />
      </Suspense>
    </PageWrapper>
  );
}
