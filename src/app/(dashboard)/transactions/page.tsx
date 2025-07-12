import { Suspense } from "react";
import { TransactionList } from "@/features/transactions/components/transaction-list";
import { TransactionListSkeleton } from "@/features/transactions/components/transaction-list-skeleton";
import { getAllTransactions } from "@/features/transactions/actions";
import { getAccounts, getCategories } from "@/features/accounts/actions";
import { PageWrapper } from "@/features/shared/components/page-wrapper";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { EmptyContent } from "@/features/shared/components/empty-content";
import { appRoutes } from "@/features/routes";
import { CreditCard } from "lucide-react";

export default async function TransactionsPage() {
  const [accounts, transactions, categories] = await Promise.all([
    getAccounts(),
    getAllTransactions(),
    getCategories(),
  ]);

  if (transactions.length === 0) {
    return (
      <PageWrapper
        title={appRoutes.transactions.list.title}
        description={appRoutes.transactions.list.description}
      >
        <EmptyContent
          title="You don't have any transactions registered"
          description="Add your first transaction to start managing your finances and tracking your portfolio"
          icon={CreditCard}
        >
          <TransactionDialog accounts={accounts} categories={categories} />
        </EmptyContent>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={appRoutes.transactions.list.title}
      description={appRoutes.transactions.list.description}
    >
      <Suspense fallback={<TransactionListSkeleton />}>
        <TransactionList transactions={transactions} showAccount={true} />
      </Suspense>
    </PageWrapper>
  );
}
