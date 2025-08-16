import { describe, it, expect } from "vitest";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { Banknote, Bitcoin, PiggyBank, Wallet, CreditCard } from "lucide-react";

describe("AccountType", () => {
  describe("factory methods", () => {
    it("should create bank account type", () => {
      const bankType = AccountType.bank();
      expect(bankType.getValue()).toBe("bank");
      expect(bankType.getLabel()).toBe("Bank");
      expect(bankType.getIcon()).toBe(Banknote);
      expect(bankType.getColor()).toBe("blue");
    });

    it("should create crypto account type", () => {
      const cryptoType = AccountType.crypto();
      expect(cryptoType.getValue()).toBe("crypto");
      expect(cryptoType.getLabel()).toBe("Cryptocurrency");
      expect(cryptoType.getIcon()).toBe(Bitcoin);
      expect(cryptoType.getColor()).toBe("yellow");
    });

    it("should create investment account type", () => {
      const investmentType = AccountType.investment();
      expect(investmentType.getValue()).toBe("investment");
      expect(investmentType.getLabel()).toBe("Investment");
      expect(investmentType.getIcon()).toBe(PiggyBank);
      expect(investmentType.getColor()).toBe("green");
    });

    it("should create cash account type", () => {
      const cashType = AccountType.cash();
      expect(cashType.getValue()).toBe("cash");
      expect(cashType.getLabel()).toBe("Cash");
      expect(cashType.getIcon()).toBe(CreditCard);
      expect(cashType.getColor()).toBe("gray");
    });

    it("should create savings account type", () => {
      const savingsType = AccountType.savings();
      expect(savingsType.getValue()).toBe("savings");
      expect(savingsType.getLabel()).toBe("Savings");
      expect(savingsType.getIcon()).toBe(Wallet);
      expect(savingsType.getColor()).toBe("purple");
    });
  });

  describe("fromString", () => {
    it("should create account type from valid string", () => {
      expect(AccountType.fromString("bank")).toEqual(AccountType.bank());
      expect(AccountType.fromString("crypto")).toEqual(AccountType.crypto());
      expect(AccountType.fromString("investment")).toEqual(
        AccountType.investment()
      );
      expect(AccountType.fromString("cash")).toEqual(AccountType.cash());
      expect(AccountType.fromString("savings")).toEqual(AccountType.savings());
    });

    it("should throw error for invalid string", () => {
      expect(() => AccountType.fromString("invalid")).toThrow(
        "Invalid account type"
      );
      expect(() => AccountType.fromString("")).toThrow("Invalid account type");
      expect(() => AccountType.fromString("BANK")).toThrow(
        "Invalid account type"
      );
    });
  });

  describe("comparison methods", () => {
    it("should correctly identify bank type", () => {
      const bankType = AccountType.bank();
      expect(bankType.isBank()).toBe(true);
      expect(bankType.isCrypto()).toBe(false);
      expect(bankType.isInvestment()).toBe(false);
      expect(bankType.isCash()).toBe(false);
      expect(bankType.isSavings()).toBe(false);
    });

    it("should correctly identify crypto type", () => {
      const cryptoType = AccountType.crypto();
      expect(cryptoType.isBank()).toBe(false);
      expect(cryptoType.isCrypto()).toBe(true);
      expect(cryptoType.isInvestment()).toBe(false);
      expect(cryptoType.isCash()).toBe(false);
      expect(cryptoType.isSavings()).toBe(false);
    });

    it("should correctly identify investment type", () => {
      const investmentType = AccountType.investment();
      expect(investmentType.isBank()).toBe(false);
      expect(investmentType.isCrypto()).toBe(false);
      expect(investmentType.isInvestment()).toBe(true);
      expect(investmentType.isCash()).toBe(false);
      expect(investmentType.isSavings()).toBe(false);
    });

    it("should correctly identify cash type", () => {
      const cashType = AccountType.cash();
      expect(cashType.isBank()).toBe(false);
      expect(cashType.isCrypto()).toBe(false);
      expect(cashType.isInvestment()).toBe(false);
      expect(cashType.isCash()).toBe(true);
      expect(cashType.isSavings()).toBe(false);
    });

    it("should correctly identify savings type", () => {
      const savingsType = AccountType.savings();
      expect(savingsType.isBank()).toBe(false);
      expect(savingsType.isCrypto()).toBe(false);
      expect(savingsType.isInvestment()).toBe(false);
      expect(savingsType.isCash()).toBe(false);
      expect(savingsType.isSavings()).toBe(true);
    });
  });

  describe("getAllTypes", () => {
    it("should return all account types", () => {
      const allTypes = AccountType.getAllTypes();
      expect(allTypes).toHaveLength(5);
      expect(allTypes).toContainEqual(AccountType.bank());
      expect(allTypes).toContainEqual(AccountType.crypto());
      expect(allTypes).toContainEqual(AccountType.investment());
      expect(allTypes).toContainEqual(AccountType.cash());
      expect(allTypes).toContainEqual(AccountType.savings());
    });
  });

  describe("getTypeOptions", () => {
    it("should return type options for UI", () => {
      const options = AccountType.getTypeOptions();
      expect(options).toHaveLength(5);

      const bankOption = options.find((opt) => opt.value === "bank");
      expect(bankOption).toEqual({
        value: "bank",
        label: "Bank",
        icon: Banknote,
        color: "blue",
      });
    });
  });

  describe("equals", () => {
    it("should return true for equal account types", () => {
      const type1 = AccountType.bank();
      const type2 = AccountType.bank();
      expect(type1.equals(type2)).toBe(true);
    });

    it("should return false for different account types", () => {
      const type1 = AccountType.bank();
      const type2 = AccountType.crypto();
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the account type value as string", () => {
      const bankType = AccountType.bank();
      expect(bankType.toString()).toBe("bank");
    });
  });
});
