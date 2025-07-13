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

  const accountDialog = <AccountFormDialog />;
  const hasAccounts = accounts.length > 0;

  return (
    <PageWrapper
      title={appRoutes.accounts.list.title}
      description={appRoutes.accounts.list.description}
      actions={hasAccounts ? accountDialog : undefined}
    >
      <Suspense fallback={<AccountListSkeleton />}>
        {hasAccounts ? (
          <AccountList accounts={accounts} />
        ) : (
          <EmptyContent
            title="You don't have any accounts registered"
            description="Add your first account to start managing your finances and tracking your portfolio"
            icon={PiggyBank}
          >
            {accountDialog}
          </EmptyContent>
        )}
      </Suspense>
    </PageWrapper>
  );
}
