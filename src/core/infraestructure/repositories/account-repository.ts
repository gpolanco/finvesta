import { PrismaClient } from "@prisma/client";
import { Repository } from "./base/repository";
import { Account } from "@/core/domain/accounts";
import { AccountMapper } from "../mappers";
import {
  DatabaseOperationError,
  DuplicateEntityError,
  AccountNotFoundInDatabaseError,
} from "./errors";

export class AccountRepository implements Repository<Account> {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    data: Omit<Account, "id" | "createdAt" | "updatedAt">
  ): Promise<Account> {
    try {
      const prismaData = AccountMapper.toDatabase(data);
      const result = await this.prisma.account.create({
        data: prismaData,
      });
      return AccountMapper.toDomain(result);
    } catch (error) {
      if (error instanceof Error) {
        // Check for duplicate name constraint
        if (error.message.includes("Unique constraint failed")) {
          throw new DuplicateEntityError(
            "Account",
            "name",
            data.name.getValue()
          );
        }
        throw new DatabaseOperationError("create", "Account", error);
      }
      throw new DatabaseOperationError("create", "Account");
    }
  }

  async findById(id: string): Promise<Account | null> {
    try {
      const result = await this.prisma.account.findUnique({
        where: { id },
      });
      return result ? AccountMapper.toDomain(result) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findById", "Account", error);
      }
      throw new DatabaseOperationError("findById", "Account");
    }
  }

  async findAll(): Promise<Account[]> {
    try {
      const results = await this.prisma.account.findMany({
        where: { isActive: true },
      });
      return results.map(AccountMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findAll", "Account", error);
      }
      throw new DatabaseOperationError("findAll", "Account");
    }
  }

  async update(
    id: string,
    data: Partial<Omit<Account, "id" | "createdAt" | "updatedAt">>
  ): Promise<Account> {
    try {
      const prismaData = AccountMapper.toDatabaseUpdate(data);
      const result = await this.prisma.account.update({
        where: { id },
        data: {
          ...prismaData,
          updatedAt: new Date(),
        },
      });
      return AccountMapper.toDomain(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new AccountNotFoundInDatabaseError(id);
        }
        if (error.message.includes("Unique constraint failed")) {
          throw new DuplicateEntityError(
            "Account",
            "name",
            data.name?.getValue() || "unknown"
          );
        }
        throw new DatabaseOperationError("update", "Account", error);
      }
      throw new DatabaseOperationError("update", "Account");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.account.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          throw new AccountNotFoundInDatabaseError(id);
        }
        throw new DatabaseOperationError("delete", "Account", error);
      }
      throw new DatabaseOperationError("delete", "Account");
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const result = await this.prisma.account.findUnique({
        where: { id },
        select: { id: true },
      });
      return !!result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("exists", "Account", error);
      }
      throw new DatabaseOperationError("exists", "Account");
    }
  }

  // Métodos específicos para Account
  async findByName(name: string): Promise<Account | null> {
    try {
      const result = await this.prisma.account.findFirst({
        where: {
          name,
          isActive: true,
        },
      });
      return result ? AccountMapper.toDomain(result) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findByName", "Account", error);
      }
      throw new DatabaseOperationError("findByName", "Account");
    }
  }

  async findByType(type: string): Promise<Account[]> {
    try {
      const results = await this.prisma.account.findMany({
        where: {
          type,
          isActive: true,
        },
      });
      return results.map(AccountMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("findByType", "Account", error);
      }
      throw new DatabaseOperationError("findByType", "Account");
    }
  }

  async getActiveAccounts(): Promise<Account[]> {
    try {
      const results = await this.prisma.account.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      });
      return results.map(AccountMapper.toDomain);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseOperationError("getActiveAccounts", "Account", error);
      }
      throw new DatabaseOperationError("getActiveAccounts", "Account");
    }
  }
}
