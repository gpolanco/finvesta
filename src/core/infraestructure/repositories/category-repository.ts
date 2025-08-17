import { PrismaClient, Category as PrismaCategory } from "@prisma/client";
import { Repository } from "./base/repository";
import { Category as DomainCategory } from "@/core/domain/category/models/category";
import { CategoryMapper } from "../mappers";
import {
  DatabaseOperationError,
  DuplicateEntityError,
  CategoryNotFoundInDatabaseError,
} from "./errors";

export class CategoryRepository implements Repository<DomainCategory> {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    data: Omit<DomainCategory, "id" | "createdAt" | "updatedAt">
  ): Promise<DomainCategory> {
    try {
      const prismaData = CategoryMapper.toDatabase(data);
      const prismaCategory = await this.prisma.category.create({
        data: prismaData,
      });
      return CategoryMapper.toDomain(prismaCategory);
    } catch (error) {
      if (error instanceof Error) {
        // Check for duplicate name constraint
        if (error.message.includes("Unique constraint failed")) {
          throw new DuplicateEntityError(
            "Category",
            "name",
            data.name.getValue()
          );
        }
        throw new DatabaseOperationError("create", "Category", error);
      }
      throw new DatabaseOperationError("create", "Category");
    }
  }

  async findById(id: string): Promise<DomainCategory | null> {
    try {
      const prismaCategory = await this.prisma.category.findUnique({
        where: { id },
      });
      return prismaCategory ? CategoryMapper.toDomain(prismaCategory) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findById", "Category", error);
      }
      throw new DatabaseOperationError("findById", "Category");
    }
  }

  async findAll(): Promise<DomainCategory[]> {
    try {
      const prismaCategories = await this.prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      });
      return prismaCategories.map(CategoryMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findAll", "Category", error);
      }
      throw new DatabaseOperationError("findAll", "Category");
    }
  }

  async update(
    id: string,
    data: Partial<Omit<DomainCategory, "id" | "createdAt" | "updatedAt">>
  ): Promise<DomainCategory> {
    try {
      const prismaData = CategoryMapper.toDatabaseUpdate(data);
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: {
          ...prismaData,
          updatedAt: new Date(),
        },
      });
      return CategoryMapper.toDomain(updatedCategory);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new CategoryNotFoundInDatabaseError(id);
        }
        if (error.message.includes("Unique constraint failed")) {
          throw new DuplicateEntityError(
            "Category",
            "name",
            data.name?.getValue() || "unknown"
          );
        }
        throw new DatabaseOperationError("update", "Category", error);
      }
      throw new DatabaseOperationError("update", "Category");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.category.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new CategoryNotFoundInDatabaseError(id);
        }
        throw new DatabaseOperationError("delete", "Category", error);
      }
      throw new DatabaseOperationError("delete", "Category");
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const result = await this.prisma.category.findUnique({
        where: { id },
        select: { id: true },
      });
      return !!result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("exists", "Category", error);
      }
      throw new DatabaseOperationError("exists", "Category");
    }
  }

  // Métodos específicos para Category
  async findByName(name: string): Promise<DomainCategory | null> {
    try {
      const prismaCategory = await this.prisma.category.findFirst({
        where: {
          name,
          isActive: true,
        },
      });
      return prismaCategory ? CategoryMapper.toDomain(prismaCategory) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findByName", "Category", error);
      }
      throw new DatabaseOperationError("findByName", "Category");
    }
  }

  async findByType(type: string): Promise<DomainCategory[]> {
    try {
      const prismaCategories = await this.prisma.category.findMany({
        where: {
          type,
          isActive: true,
        },
        orderBy: { name: "asc" },
      });
      return prismaCategories.map(CategoryMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findByName", "Category", error);
      }
      throw new DatabaseOperationError("findByName", "Category");
    }
  }

  async getActiveCategories(): Promise<DomainCategory[]> {
    try {
      const prismaCategories = await this.prisma.category.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      });
      return prismaCategories.map(CategoryMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "getActiveCategories",
          "Category",
          error
        );
      }
      throw new DatabaseOperationError("getActiveCategories", "Category");
    }
  }

  /**
   * Get categories with transaction count (returns Prisma model for complex queries)
   */
  async getCategoriesWithTransactionCount(): Promise<
    (PrismaCategory & { _count: { transactions: number } })[]
  > {
    try {
      return await this.prisma.category.findMany({
        where: { isActive: true },
        include: {
          _count: {
            select: { transactions: true },
          },
        },
        orderBy: { name: "asc" },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "getCategoriesWithTransactionCount",
          "Category",
          error
        );
      }
      throw new DatabaseOperationError(
        "getCategoriesWithTransactionCount",
        "Category"
      );
    }
  }
}
