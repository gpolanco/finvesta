"use client";

import {
  Category,
  CategoryType,
  getCategoryTypeLabel,
  getCategoryTypeColors,
} from "@/features/categories/types";
import { Badge } from "@/features/shared/components/ui/badge";
import { CategoryFormDialog } from "./category-form-dialog";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import { Tag } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
}

// Using centralized category type utilities

export function CategoryList({ categories }: CategoryListProps) {
  // Group categories by type
  const groupedCategories = categories.reduce((acc, category) => {
    const type = category.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedCategories).map(([type, typeCategories]) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              {getCategoryTypeLabel(type as CategoryType)}
              <Badge
                variant="outline"
                className={getCategoryTypeColors(type as CategoryType)}
              >
                {typeCategories.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {typeCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{category.name}</p>
                      {category.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Por defecto
                        </Badge>
                      )}
                    </div>
                  </div>

                  {!category.isDefault && (
                    <div className="flex items-center gap-1">
                      <CategoryFormDialog
                        category={category}
                        showText={false}
                        buttonVariant="ghost"
                      />

                      <DeleteCategoryDialog category={category} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
