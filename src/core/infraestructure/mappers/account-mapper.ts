import { Account as PrismaAccount, Prisma } from "@prisma/client";
import { Account as DomainAccount } from "@/core/domain/accounts/models/account";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { Currency } from "@/core/domain/accounts/value-objects/currency";

/**
 * Mapper to convert between Database Account and Domain Account
 */
export class AccountMapper {
  /**
   * Convert Database Account to Domain Account
   */
  static toDomain(databaseAccount: PrismaAccount): DomainAccount {
    return {
      id: databaseAccount.id,
      name: AccountName.create(databaseAccount.name),
      type: AccountType.fromString(databaseAccount.type),
      provider: undefined, // Not in Prisma schema
      balance: AccountBalance.create(Number(databaseAccount.balance)),
      currency: Currency.create(databaseAccount.currency),
      isActive: databaseAccount.isActive,
      userId: "default", // Not in Prisma schema, using default
      createdAt: databaseAccount.createdAt,
      updatedAt: databaseAccount.updatedAt,
    };
  }

  /**
   * Convert Domain Account to Database Account (for creation/updates)
   */
  static toDatabase(
    domainAccount: Omit<DomainAccount, "id" | "createdAt" | "updatedAt">
  ): Omit<PrismaAccount, "id" | "createdAt" | "updatedAt" | "isActive"> {
    return {
      name: domainAccount.name.getValue(),
      balance: new Prisma.Decimal(domainAccount.balance.getValue()),
      type: domainAccount.type.getValue(),
      currency: domainAccount.currency.getCode(),
      description: null, // Not in domain model
    };
  }

  /**
   * Convert Domain Account to Database Account (for updates)
   */
  static toDatabaseUpdate(
    domainAccount: Partial<
      Omit<DomainAccount, "id" | "createdAt" | "updatedAt">
    >
  ): Partial<
    Omit<PrismaAccount, "id" | "createdAt" | "updatedAt" | "isActive">
  > {
    const update: Partial<
      Omit<PrismaAccount, "id" | "createdAt" | "updatedAt" | "isActive">
    > = {};

    if (domainAccount.name) update.name = domainAccount.name.getValue();
    if (domainAccount.balance !== undefined)
      update.balance = new Prisma.Decimal(domainAccount.balance.getValue());
    if (domainAccount.type) update.type = domainAccount.type.getValue();
    if (domainAccount.currency)
      update.currency = domainAccount.currency.getCode();

    return update;
  }
}
