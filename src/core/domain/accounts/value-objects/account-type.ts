import { InvalidAccountTypeError } from "@/core/domain/accounts/errors/account-errors";
import {
  ACCOUNT_TYPES,
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPE_COLORS,
} from "@/core/domain/accounts/constants/account-constants";
import {
  Banknote,
  Bitcoin,
  PiggyBank,
  Wallet,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

/**
 * Value Object for Account Type
 * Encapsulates the business concept of account types with their properties
 */
export class AccountType {
  private constructor(
    private readonly value: string,
    private readonly label: string,
    private readonly icon: LucideIcon,
    private readonly color: string
  ) {}

  // Factory methods for each account type
  static bank(): AccountType {
    return new AccountType(
      ACCOUNT_TYPES.BANK,
      ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.BANK],
      Banknote,
      ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.BANK]
    );
  }

  static crypto(): AccountType {
    return new AccountType(
      ACCOUNT_TYPES.CRYPTO,
      ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.CRYPTO],
      Bitcoin,
      ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.CRYPTO]
    );
  }

  static investment(): AccountType {
    return new AccountType(
      ACCOUNT_TYPES.INVESTMENT,
      ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.INVESTMENT],
      PiggyBank,
      ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.INVESTMENT]
    );
  }

  static cash(): AccountType {
    return new AccountType(
      ACCOUNT_TYPES.CASH,
      ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.CASH],
      CreditCard,
      ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.CASH]
    );
  }

  static savings(): AccountType {
    return new AccountType(
      ACCOUNT_TYPES.SAVINGS,
      ACCOUNT_TYPE_LABELS[ACCOUNT_TYPES.SAVINGS],
      Wallet,
      ACCOUNT_TYPE_COLORS[ACCOUNT_TYPES.SAVINGS]
    );
  }

  // Getter methods
  getValue(): string {
    return this.value;
  }

  getLabel(): string {
    return this.label;
  }

  getIcon(): LucideIcon {
    return this.icon;
  }

  getColor(): string {
    return this.color;
  }

  // Comparison methods
  equals(other: AccountType): boolean {
    return this.value === other.value;
  }

  isBank(): boolean {
    return this.value === ACCOUNT_TYPES.BANK;
  }

  isCrypto(): boolean {
    return this.value === ACCOUNT_TYPES.CRYPTO;
  }

  isInvestment(): boolean {
    return this.value === ACCOUNT_TYPES.INVESTMENT;
  }

  isCash(): boolean {
    return this.value === ACCOUNT_TYPES.CASH;
  }

  isSavings(): boolean {
    return this.value === ACCOUNT_TYPES.SAVINGS;
  }

  // Static factory from string (for external data)
  static fromString(value: string): AccountType {
    switch (value) {
      case ACCOUNT_TYPES.BANK:
        return AccountType.bank();
      case ACCOUNT_TYPES.CRYPTO:
        return AccountType.crypto();
      case ACCOUNT_TYPES.INVESTMENT:
        return AccountType.investment();
      case ACCOUNT_TYPES.CASH:
        return AccountType.cash();
      case ACCOUNT_TYPES.SAVINGS:
        return AccountType.savings();
      default:
        throw new InvalidAccountTypeError();
    }
  }

  // Get all available types
  static getAllTypes(): AccountType[] {
    return [
      AccountType.bank(),
      AccountType.crypto(),
      AccountType.investment(),
      AccountType.cash(),
      AccountType.savings(),
    ];
  }

  // Get type options for UI
  static getTypeOptions(): Array<{
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
  }> {
    return AccountType.getAllTypes().map((type) => ({
      value: type.getValue(),
      label: type.getLabel(),
      icon: type.getIcon(),
      color: type.getColor(),
    }));
  }

  toString(): string {
    return this.value;
  }
}
