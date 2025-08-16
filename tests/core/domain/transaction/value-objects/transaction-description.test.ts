import { describe, it, expect } from "vitest";
import { TransactionDescription } from "@/core/domain/transaction/value-objects/transaction-description";
import {
  TransactionDescriptionTooLongError,
  TransactionDescriptionInvalidCharactersError,
  TransactionDescriptionRequiredError,
} from "@/core/domain/transaction/errors/transaction-errors";

describe("TransactionDescription", () => {
  describe("create", () => {
    it("should create a valid description", () => {
      const description = TransactionDescription.create("Valid description");
      expect(description.getValue()).toBe("Valid description");
    });

    it("should trim whitespace", () => {
      const description = TransactionDescription.create(
        "  Trimmed description  "
      );
      expect(description.getValue()).toBe("Trimmed description");
    });

    it("should throw error for empty string", () => {
      expect(() => TransactionDescription.create("")).toThrow(
        TransactionDescriptionRequiredError
      );
    });

    it("should throw error for whitespace only", () => {
      expect(() => TransactionDescription.create("   ")).toThrow(
        TransactionDescriptionRequiredError
      );
    });

    it("should throw error for too short description", () => {
      expect(() => TransactionDescription.create("")).toThrow(
        TransactionDescriptionRequiredError
      );
    });

    it("should throw error for too long description", () => {
      const longDescription = "A".repeat(201);
      expect(() => TransactionDescription.create(longDescription)).toThrow(
        TransactionDescriptionTooLongError
      );
    });

    it("should throw error for invalid characters", () => {
      expect(() => TransactionDescription.create("Description@")).toThrow(
        TransactionDescriptionInvalidCharactersError
      );
      expect(() => TransactionDescription.create("Description#")).toThrow(
        TransactionDescriptionInvalidCharactersError
      );
    });

    it("should accept valid characters", () => {
      const validDescriptions = [
        "Salary payment",
        "Grocery shopping",
        "Investment portfolio",
        "Transfer between accounts",
        "Monthly rent payment",
        "Coffee break",
        "Gas station",
        "Online purchase",
        "ATM withdrawal",
      ];

      validDescriptions.forEach((desc) => {
        expect(() => TransactionDescription.create(desc)).not.toThrow();
      });
    });

    it("should handle edge case of minimum length", () => {
      const description = TransactionDescription.create("A");
      expect(description.getValue()).toBe("A");
    });

    it("should handle edge case of maximum length", () => {
      const maxDescription = "A".repeat(200);
      const description = TransactionDescription.create(maxDescription);
      expect(description.getValue()).toBe(maxDescription);
    });
  });

  describe("getValue", () => {
    it("should return the description value", () => {
      const description = TransactionDescription.create("Test description");
      expect(description.getValue()).toBe("Test description");
    });
  });

  describe("hasValue", () => {
    it("should return true for valid description", () => {
      const description = TransactionDescription.create("Test description");
      expect(description.hasValue()).toBe(true);
    });

    it("should return false for empty description", () => {
      const description = TransactionDescription.create("A");
      expect(description.hasValue()).toBe(true); // Even single character is valid
    });
  });

  describe("getLength", () => {
    it("should return correct length", () => {
      const description = TransactionDescription.create("Test description");
      expect(description.getLength()).toBe(16);
    });

    it("should return correct length after trimming", () => {
      const description = TransactionDescription.create("  Trimmed  ");
      expect(description.getLength()).toBe(7);
    });
  });

  describe("isEmpty", () => {
    it("should return false for valid description", () => {
      const description = TransactionDescription.create("Test description");
      expect(description.isEmpty()).toBe(false);
    });

    it("should return false for single character", () => {
      const description = TransactionDescription.create("A");
      expect(description.isEmpty()).toBe(false);
    });
  });

  describe("getTruncated", () => {
    it("should return full description when under limit", () => {
      const description = TransactionDescription.create("Short description");
      const truncated = description.getTruncated(50);
      expect(truncated).toBe("Short description");
    });

    it("should return truncated description when over limit", () => {
      const description = TransactionDescription.create(
        "This is a very long description that should be truncated"
      );
      const truncated = description.getTruncated(20);
      expect(truncated).toBe("This is a very long ...");
    });

    it("should use default max length when not specified", () => {
      const description = TransactionDescription.create(
        "This is a description"
      );
      const truncated = description.getTruncated();
      expect(truncated).toBe("This is a description");
    });

    it("should handle empty description", () => {
      const description = TransactionDescription.create("A");
      const truncated = description.getTruncated(10);
      expect(truncated).toBe("A");
    });
  });

  describe("equals", () => {
    it("should return true for equal descriptions", () => {
      const desc1 = TransactionDescription.create("Same description");
      const desc2 = TransactionDescription.create("Same description");
      expect(desc1.equals(desc2)).toBe(true);
    });

    it("should return false for different descriptions", () => {
      const desc1 = TransactionDescription.create("First description");
      const desc2 = TransactionDescription.create("Second description");
      expect(desc1.equals(desc2)).toBe(false);
    });

    it("should handle case sensitivity", () => {
      const desc1 = TransactionDescription.create("Description");
      const desc2 = TransactionDescription.create("description");
      expect(desc1.equals(desc2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the description value", () => {
      const description = TransactionDescription.create("Test description");
      expect(description.toString()).toBe("Test description");
    });

    it("should return empty string for empty description", () => {
      const description = TransactionDescription.create("A");
      expect(description.toString()).toBe("A");
    });
  });

  describe("edge cases", () => {
    it("should handle special characters correctly", () => {
      const specialChars = [
        "Salary (monthly)",
        "Grocery shopping - essentials",
        "Investment portfolio, stocks",
        "Transfer between accounts!",
        "Monthly rent payment?",
        "Coffee break...",
        "Gas station - premium fuel",
        "Online purchase - electronics",
        "ATM withdrawal - cash",
      ];

      specialChars.forEach((desc) => {
        expect(() => TransactionDescription.create(desc)).not.toThrow();
        const transactionDesc = TransactionDescription.create(desc);
        expect(transactionDesc.getValue()).toBe(desc);
      });
    });

    it("should handle numbers and mixed content", () => {
      const mixedContent = [
        "Payment 12345",
        "Order 2024-001",
        "Invoice 2024.01.15",
        "Transaction ID TXN-123",
        "Reference REF-456-789",
      ];

      mixedContent.forEach((desc) => {
        expect(() => TransactionDescription.create(desc)).not.toThrow();
        const transactionDesc = TransactionDescription.create(desc);
        expect(transactionDesc.getValue()).toBe(desc);
      });
    });
  });
});
