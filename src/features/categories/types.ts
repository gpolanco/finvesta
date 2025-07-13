export const CategoryType = {
  INCOME: "income",
  EXPENSE: "expense",
  INVESTMENT: "investment",
} as const;

export type CategoryTypeKey = keyof typeof CategoryType;
export type CategoryTypeValues = (typeof CategoryType)[CategoryTypeKey];

export interface Category {
  id: string;
  name: string;
  description?: string;
  type: CategoryTypeValues;
  color: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;
}
