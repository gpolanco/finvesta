import { Transaction as PrismaTransaction, Prisma } from "@prisma/client";
import { Transaction as DomainTransaction } from "@/core/domain/transaction/models/transaction";
import { TransactionAmount } from "@/core/domain/transaction/value-objects/transaction-amount";
import { TransactionDate } from "@/core/domain/transaction/value-objects/transaction-date";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import { TransactionType } from "@/core/domain/transaction/value-objects/transaction-type";

export class TransactionMapper {
  static toDomain(prismaTransaction: PrismaTransaction): DomainTransaction {
    return {
      id: prismaTransaction.id,
      accountId: prismaTransaction.accountId,
      categoryId: prismaTransaction.categoryId || "",
      amount: TransactionAmount.create(Number(prismaTransaction.amount)),
      description: TransactionDescription.create(prismaTransaction.description),
      transactionType: TransactionType.fromString(prismaTransaction.type),
      transactionDate: TransactionDate.create(prismaTransaction.date),
      isReconciled: false, // Default value since not in Prisma schema
      userId: "", // Default value since not in Prisma schema
      createdAt: prismaTransaction.createdAt,
      updatedAt: prismaTransaction.updatedAt,
    };
  }

  static toDatabase(
    domainTransaction: Omit<DomainTransaction, "id" | "createdAt" | "updatedAt">
  ): Omit<PrismaTransaction, "id" | "createdAt" | "updatedAt"> {
    return {
      description: domainTransaction.description.getValue(),
      amount: new Prisma.Decimal(domainTransaction.amount.getValue()),
      type: domainTransaction.transactionType.getValue(),
      date: domainTransaction.transactionDate.getValue(),
      categoryId: domainTransaction.categoryId || null,
      accountId: domainTransaction.accountId,
      isActive: true, // Default value
    };
  }

  static toDatabaseUpdate(
    domainTransaction: Partial<
      Omit<DomainTransaction, "id" | "createdAt" | "updatedAt">
    >
  ): Partial<Omit<PrismaTransaction, "id" | "createdAt" | "updatedAt">> {
    const updateData: Partial<
      Omit<PrismaTransaction, "id" | "createdAt" | "updatedAt">
    > = {};

    if (domainTransaction.description !== undefined) {
      updateData.description = domainTransaction.description.getValue();
    }

    if (domainTransaction.amount !== undefined) {
      updateData.amount = new Prisma.Decimal(
        domainTransaction.amount.getValue()
      );
    }

    if (domainTransaction.transactionType !== undefined) {
      updateData.type = domainTransaction.transactionType.getValue();
    }

    if (domainTransaction.transactionDate !== undefined) {
      updateData.date = domainTransaction.transactionDate.getValue();
    }

    if (domainTransaction.categoryId !== undefined) {
      updateData.categoryId = domainTransaction.categoryId || null;
    }

    if (domainTransaction.accountId !== undefined) {
      updateData.accountId = domainTransaction.accountId;
    }

    return updateData;
  }
}
