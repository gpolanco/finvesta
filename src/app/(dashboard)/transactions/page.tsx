import { Suspense } from "react";
import { TransactionListSkeleton } from "@/features/transactions/components/transaction-list-skeleton";
import { TransactionList } from "@/features/transactions/components/transaction-list";
import { getAllTransactions } from "@/features/transactions/actions";
import { getAccounts } from "@/features/accounts/actions";
import { PageWrapper } from "@/features/shared/components/page-wrapper";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { EmptyContent } from "@/features/shared/components/empty-content";
import { appRoutes } from "@/features/routes";
import { CreditCard } from "lucide-react";
import { getCategoriesAction } from "@/features/categories/actions/get-categories-actions";

export default async function TransactionsPage() {
  const [accounts, transactionsResponse, categoriesResponse] =
    await Promise.all([
      getAccounts(),
      getAllTransactions(),
      getCategoriesAction(),
    ]);

  const categories = categoriesResponse.success
    ? categoriesResponse.data || []
    : [];

  const transactions = transactionsResponse.success
    ? transactionsResponse.data || []
    : [];

  const transactionDialog = (
    <TransactionDialog accounts={accounts} categories={categories} />
  );

  const hasTransactions = transactions.length > 0;

  return (
    <PageWrapper
      title={appRoutes.transactions.list.title}
      description={appRoutes.transactions.list.description}
      actions={hasTransactions ? transactionDialog : undefined}
    >
      <Suspense fallback={<TransactionListSkeleton />}>
        {hasTransactions ? (
          <TransactionList
            transactions={transactions}
            accounts={accounts}
            categories={categories}
            showAccount={true}
          />
        ) : (
          <EmptyContent
            title="You don't have any transactions registered"
            description="Add your first transaction to start managing your finances and tracking your portfolio"
            icon={CreditCard}
          >
            {transactionDialog}
          </EmptyContent>
        )}
      </Suspense>
    </PageWrapper>
  );
}
