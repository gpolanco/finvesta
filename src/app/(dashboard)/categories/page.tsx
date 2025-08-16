import { Tag } from "lucide-react";
import { PageWrapper } from "@/features/shared/components/page-wrapper";
import { EmptyContent } from "@/features/shared/components/empty-content";
import { categoriesRoutes } from "@/features/categories/routes";
import { CategoryList } from "@/features/categories/components/category-list";
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog";
import { getCategoriesAction } from "@/features/categories/actions";

export default async function CategoriesPage() {
  const response = await getCategoriesAction();
  const categories =
    response.success && response.data
      ? response.data.filter((category) => !category.isDefault)
      : [];

  if (categories.length === 0) {
    return (
      <EmptyContent
        title="Don't have any categories created"
        description="Create categories to organize your income, expenses and investments better"
        icon={Tag}
      >
        <CategoryFormDialog />
      </EmptyContent>
    );
  }

  return (
    <PageWrapper
      title={categoriesRoutes.list.title}
      description={categoriesRoutes.list.description}
      actions={<CategoryFormDialog />}
    >
      <CategoryList categories={categories} />
    </PageWrapper>
  );
}
