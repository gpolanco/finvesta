import { PrismaClient } from "@prisma/client";
import { Repository } from "./base/repository";
import { Transaction as DomainTransaction } from "@/core/domain/transaction/models/transaction";
import {
  DatabaseOperationError,
  TransactionNotFoundInDatabaseError,
} from "./errors";
import { TransactionMapper } from "../mappers";

export class TransactionRepository implements Repository<DomainTransaction> {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    data: Omit<DomainTransaction, "id" | "createdAt" | "updatedAt">
  ): Promise<DomainTransaction> {
    try {
      const prismaData = TransactionMapper.toDatabase(data);
      const result = await this.prisma.transaction.create({
        data: prismaData,
      });
      return TransactionMapper.toDomain(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("create", "Transaction", error);
      }
      throw new DatabaseOperationError("create", "Transaction");
    }
  }

  async findById(id: string): Promise<DomainTransaction | null> {
    try {
      const result = await this.prisma.transaction.findUnique({
        where: { id },
      });
      return result ? TransactionMapper.toDomain(result) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findById", "Transaction", error);
      }
      throw new DatabaseOperationError("findById", "Transaction");
    }
  }

  async findAll(): Promise<DomainTransaction[]> {
    try {
      const results = await this.prisma.transaction.findMany({
        where: { isActive: true },
        orderBy: { date: "desc" },
      });
      return results.map(TransactionMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findAll", "Transaction", error);
      }
      throw new DatabaseOperationError("findAll", "Transaction");
    }
  }

  async update(
    id: string,
    data: Partial<Omit<DomainTransaction, "id" | "createdAt" | "updatedAt">>
  ): Promise<DomainTransaction> {
    try {
      const prismaData = TransactionMapper.toDatabaseUpdate(data);
      const result = await this.prisma.transaction.update({
        where: { id },
        data: {
          ...prismaData,
          updatedAt: new Date(),
        },
      });
      return TransactionMapper.toDomain(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new TransactionNotFoundInDatabaseError(id);
        }
        throw new DatabaseOperationError("update", "Transaction", error);
      }
      throw new DatabaseOperationError("update", "Transaction");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.transaction.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new TransactionNotFoundInDatabaseError(id);
        }
        throw new DatabaseOperationError("delete", "Transaction", error);
      }
      throw new DatabaseOperationError("delete", "Transaction");
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const result = await this.prisma.transaction.findUnique({
        where: { id },
        select: { id: true },
      });
      return !!result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("exists", "Transaction", error);
      }
      throw new DatabaseOperationError("exists", "Transaction");
    }
  }

  // Métodos específicos para Transaction
  async findByAccountId(accountId: string): Promise<DomainTransaction[]> {
    try {
      const results = await this.prisma.transaction.findMany({
        where: {
          accountId,
          isActive: true,
        },
        orderBy: { date: "desc" },
      });
      return results.map(TransactionMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "findByAccountId",
          "Transaction",
          error
        );
      }
      throw new DatabaseOperationError("findByAccountId", "Transaction");
    }
  }

  async findByCategoryId(categoryId: string): Promise<DomainTransaction[]> {
    try {
      const results = await this.prisma.transaction.findMany({
        where: {
          categoryId,
          isActive: true,
        },
        orderBy: { date: "desc" },
      });
      return results.map(TransactionMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "findByCategoryId",
          "Transaction",
          error
        );
      }
      throw new DatabaseOperationError("findByCategoryId", "Transaction");
    }
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<DomainTransaction[]> {
    try {
      const results = await this.prisma.transaction.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
          isActive: true,
        },
        orderBy: { date: "desc" },
      });
      return results.map(TransactionMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "findByDateRange",
          "Transaction",
          error
        );
      }
      throw new DatabaseOperationError("findByDateRange", "Transaction");
    }
  }

  async getActiveTransactions(): Promise<DomainTransaction[]> {
    try {
      const results = await this.prisma.transaction.findMany({
        where: { isActive: true },
        orderBy: { date: "desc" },
        include: {
          account: true,
          category: true,
        },
      });
      return results.map(TransactionMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError(
          "getActiveTransactions",
          "Transaction",
          error
        );
      }
      throw new DatabaseOperationError("getActiveTransactions", "Transaction");
    }
  }
}
