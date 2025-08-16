import { describe, it, expect, vi, beforeEach } from "vitest";
import { AccountFactory } from "@/core/domain/accounts/factories/account-factory";
import { AccountRepository } from "@/core/domain/accounts/repositories/account-repository";
import { Account } from "@/core/domain/accounts/models/account";
import { AccountName } from "@/core/domain/accounts/value-objects/account-name";
import { AccountType } from "@/core/domain/accounts/value-objects/account-type";
import { AccountBalance } from "@/core/domain/accounts/value-objects/account-balance";
import { Currency } from "@/core/domain/accounts/value-objects/currency";
import {
  DuplicateAccountNameError,
  AccountNotFoundError,
} from "@/core/domain/accounts/errors/account-errors";

describe("AccountFactory", () => {
  let mockRepository: AccountRepository;
  let accountFactory: AccountFactory;

  beforeEach(() => {
    mockRepository = {
      findByUserId: vi.fn(),
      findById: vi.fn(),
      findByIdAndUserId: vi.fn(),
      findByNameAndUserId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      deactivate: vi.fn(),
      delete: vi.fn(),
      exists: vi.fn(),
      nameExists: vi.fn(),
    } as unknown as AccountRepository;

    accountFactory = new AccountFactory(mockRepository);
  });

  describe("create", () => {
    const validCreateParams = {
      name: "Test Account",
      type: "bank",
      provider: "Test Bank",
      balance: 1000.5,
      currency: "EUR",
      userId: "user-123",
    };

    it("should create account successfully", async () => {
      const mockAccount = {
        id: "acc-123",
        name: AccountName.create("Test Account"),
        type: AccountType.bank(),
        provider: "Test Bank",
        balance: AccountBalance.create(1000.5),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: undefined,
      };

      vi.mocked(mockRepository.nameExists).mockResolvedValue(false);
      vi.mocked(mockRepository.create).mockResolvedValue(mockAccount);

      const result = await accountFactory.create(validCreateParams);

      expect(mockRepository.nameExists).toHaveBeenCalledWith(
        expect.any(AccountName),
        "user-123"
      );
      expect(mockRepository.create).toHaveBeenCalledWith({
        name: expect.any(AccountName),
        type: expect.any(AccountType),
        provider: "Test Bank",
        balance: expect.any(AccountBalance),
        currency: expect.any(Currency),
        isActive: true,
        userId: "user-123",
      });
      expect(result).toEqual(mockAccount);
    });

    it("should throw error for duplicate name", async () => {
      vi.mocked(mockRepository.nameExists).mockResolvedValue(true);

      await expect(accountFactory.create(validCreateParams)).rejects.toThrow(
        DuplicateAccountNameError
      );

      expect(mockRepository.nameExists).toHaveBeenCalled();
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it("should create account without provider", async () => {
      const paramsWithoutProvider = { ...validCreateParams };
      delete paramsWithoutProvider.provider;

      const mockAccount = {
        id: "acc-123",
        name: AccountName.create("Test Account"),
        type: AccountType.bank(),
        provider: undefined,
        balance: AccountBalance.create(1000.5),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: undefined,
      };

      vi.mocked(mockRepository.nameExists).mockResolvedValue(false);
      vi.mocked(mockRepository.create).mockResolvedValue(mockAccount);

      const result = await accountFactory.create(paramsWithoutProvider);

      expect(result).toEqual(mockAccount);
    });
  });

  describe("update", () => {
    const validUpdateParams = {
      name: "Updated Account",
      type: "crypto",
      balance: 2000.75,
      currency: "USD",
    };

    it("should update account successfully", async () => {
      const existingAccount = {
        id: "acc-123",
        name: AccountName.create("Old Name"),
        type: AccountType.bank(),
        provider: "Old Bank",
        balance: AccountBalance.create(1000),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const updatedAccount = {
        ...existingAccount,
        name: AccountName.create("Updated Account"),
        type: AccountType.crypto(),
        balance: AccountBalance.create(2000.75),
        currency: Currency.create("USD"),
      };

      vi.mocked(mockRepository.findByIdAndUserId).mockResolvedValue(
        existingAccount
      );
      vi.mocked(mockRepository.nameExists).mockResolvedValue(false);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedAccount);

      const result = await accountFactory.update(
        "acc-123",
        "user-123",
        validUpdateParams
      );

      expect(mockRepository.findByIdAndUserId).toHaveBeenCalledWith(
        "acc-123",
        "user-123"
      );
      expect(mockRepository.nameExists).toHaveBeenCalledWith(
        expect.any(AccountName),
        "user-123",
        "acc-123"
      );
      expect(mockRepository.update).toHaveBeenCalledWith("acc-123", {
        name: expect.any(AccountName),
        type: expect.any(AccountType),
        balance: expect.any(AccountBalance),
        currency: expect.any(Currency),
      });
      expect(result).toEqual(updatedAccount);
    });

    it("should throw error for account not found", async () => {
      vi.mocked(mockRepository.findByIdAndUserId).mockResolvedValue(null);

      await expect(
        accountFactory.update("acc-123", "user-123", validUpdateParams)
      ).rejects.toThrow(AccountNotFoundError);

      expect(mockRepository.findByIdAndUserId).toHaveBeenCalled();
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("should throw error for duplicate name during update", async () => {
      const existingAccount = {
        id: "acc-123",
        name: AccountName.create("Old Name"),
        type: AccountType.bank(),
        provider: "Old Bank",
        balance: AccountBalance.create(1000),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: undefined,
      };

      vi.mocked(mockRepository.findByIdAndUserId).mockResolvedValue(
        existingAccount
      );
      vi.mocked(mockRepository.nameExists).mockResolvedValue(true);

      await expect(
        accountFactory.update("acc-123", "user-123", { name: "Updated Name" })
      ).rejects.toThrow(DuplicateAccountNameError);

      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("should update only provided fields", async () => {
      const existingAccount = {
        id: "acc-123",
        name: AccountName.create("Old Name"),
        type: AccountType.bank(),
        provider: "Old Bank",
        balance: AccountBalance.create(1000),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const updatedAccount = {
        ...existingAccount,
        name: AccountName.create("Updated Name"),
      };

      vi.mocked(mockRepository.findByIdAndUserId).mockResolvedValue(
        existingAccount
      );
      vi.mocked(mockRepository.nameExists).mockResolvedValue(false);
      vi.mocked(mockRepository.update).mockResolvedValue(updatedAccount);

      const result = await accountFactory.update("acc-123", "user-123", {
        name: "Updated Name",
      });

      expect(mockRepository.update).toHaveBeenCalledWith("acc-123", {
        name: expect.any(AccountName),
      });
      expect(result).toEqual(updatedAccount);
    });
  });

  describe("fromDatabase", () => {
    it("should convert database data to domain object", () => {
      const dbData = {
        id: "acc-123",
        name: "Test Account",
        type: "bank",
        provider: "Test Bank",
        balance: 1000.5,
        currency: "EUR",
        is_active: true,
        user_id: "user-123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-02T00:00:00Z",
      };

      const result = AccountFactory.fromDatabase(dbData);

      expect(result.id).toBe("acc-123");
      expect(result.name.getValue()).toBe("Test Account");
      expect(result.type.getValue()).toBe("bank");
      expect(result.provider).toBe("Test Bank");
      expect(result.balance.getValue()).toBe(1000.5);
      expect(result.currency.getCode()).toBe("EUR");
      expect(result.isActive).toBe(true);
      expect(result.userId).toBe("user-123");
      expect(result.createdAt).toEqual(new Date("2024-01-01T00:00:00Z"));
      expect(result.updatedAt).toEqual(new Date("2024-01-02T00:00:00Z"));
    });

    it("should handle missing updated_at", () => {
      const dbData = {
        id: "acc-123",
        name: "Test Account",
        type: "bank",
        provider: "Test Bank",
        balance: 1000.5,
        currency: "EUR",
        is_active: true,
        user_id: "user-123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: undefined,
      };

      const result = AccountFactory.fromDatabase(dbData);

      expect(result.updatedAt).toBeUndefined();
    });
  });

  describe("toDatabase", () => {
    it("should convert domain object to database format", () => {
      const account: Account = {
        id: "acc-123",
        name: AccountName.create("Test Account"),
        type: AccountType.bank(),
        provider: "Test Bank",
        balance: AccountBalance.create(1000.5),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
      };

      const result = AccountFactory.toDatabase(account);

      expect(result).toEqual({
        id: "acc-123",
        name: "Test Account",
        type: "bank",
        provider: "Test Bank",
        balance: 1000.5,
        currency: "EUR",
        is_active: true,
        user_id: "user-123",
        created_at: "2024-01-01T00:00:00.000Z",
        updated_at: "2024-01-02T00:00:00.000Z",
      });
    });

    it("should handle missing updated_at", () => {
      const account: Account = {
        id: "acc-123",
        name: AccountName.create("Test Account"),
        type: AccountType.bank(),
        provider: "Test Bank",
        balance: AccountBalance.create(1000.5),
        currency: Currency.create("EUR"),
        isActive: true,
        userId: "user-123",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: undefined,
      };

      const result = AccountFactory.toDatabase(account);

      expect(result.updated_at).toBeUndefined();
    });
  });
});
