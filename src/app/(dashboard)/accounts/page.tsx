import { Suspense } from "react";
import { AccountList } from "@/features/accounts/components/account-list";
import { AccountListSkeleton } from "@/features/accounts/components/account-skeleton";
import { getAccounts } from "@/features/accounts/actions/get-accounts";
import { appRoutes } from "@/features/routes";
import { PageWrapper } from "@/features/shared/components/page-wrapper";

export default async function AccountsPage() {
  const accounts = await getAccounts();

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
