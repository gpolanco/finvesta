import { describe, it, expect } from "vitest";
import { CategoryDescription } from "@/core/domain/category/value-objects/category-description";
import { CategoryDescriptionTooLongError } from "@/core/domain/category/errors/category-errors";

describe("CategoryDescription", () => {
  describe("create", () => {
    it("should create description with valid text", () => {
      const description = CategoryDescription.create(
        "This is a valid description"
      );
      expect(description.getValue()).toBe("This is a valid description");
    });

    it("should return undefined for empty string", () => {
      const description = CategoryDescription.create("");
      expect(description.getValue()).toBeUndefined();
    });

    it("should return undefined for undefined input", () => {
      const description = CategoryDescription.create(undefined);
      expect(description.getValue()).toBeUndefined();
    });

    it("should return undefined for whitespace only", () => {
      const description = CategoryDescription.create("   ");
      expect(description.getValue()).toBeUndefined();
    });

    it("should trim whitespace", () => {
      const description = CategoryDescription.create("  Description  ");
      expect(description.getValue()).toBe("Description");
    });

    it("should accept description at maximum length", () => {
      const maxLengthDesc = "A".repeat(200);
      const description = CategoryDescription.create(maxLengthDesc);
      expect(description.getValue()).toBe(maxLengthDesc);
    });

    it("should throw error for description too long", () => {
      const tooLongDesc = "A".repeat(201);
      expect(() => CategoryDescription.create(tooLongDesc)).toThrow(
        CategoryDescriptionTooLongError
      );
    });
  });

  describe("hasValue", () => {
    it("should return true for valid description", () => {
      const description = CategoryDescription.create("Valid description");
      expect(description.hasValue()).toBe(true);
    });

    it("should return false for empty description", () => {
      const description = CategoryDescription.create("");
      expect(description.hasValue()).toBe(false);
    });

    it("should return false for undefined description", () => {
      const description = CategoryDescription.create(undefined);
      expect(description.hasValue()).toBe(false);
    });
  });

  describe("getLength", () => {
    it("should return correct length for valid description", () => {
      const description = CategoryDescription.create("Test description");
      expect(description.getLength()).toBe(16);
    });

    it("should return 0 for empty description", () => {
      const description = CategoryDescription.create("");
      expect(description.getLength()).toBe(0);
    });

    it("should return 0 for undefined description", () => {
      const description = CategoryDescription.create(undefined);
      expect(description.getLength()).toBe(0);
    });
  });

  describe("isEmpty", () => {
    it("should return false for valid description", () => {
      const description = CategoryDescription.create("Valid description");
      expect(description.isEmpty()).toBe(false);
    });

    it("should return true for empty description", () => {
      const description = CategoryDescription.create("");
      expect(description.isEmpty()).toBe(true);
    });

    it("should return true for undefined description", () => {
      const description = CategoryDescription.create(undefined);
      expect(description.isEmpty()).toBe(true);
    });
  });

  describe("getTruncated", () => {
    it("should return full description when under limit", () => {
      const description = CategoryDescription.create("Short description");
      expect(description.getTruncated(50)).toBe("Short description");
    });

    it("should return truncated description when over limit", () => {
      const description = CategoryDescription.create(
        "This is a very long description that exceeds the limit"
      );
      const truncated = description.getTruncated(20);
      expect(truncated).toBe("This is a very long ...");
      expect(truncated.length).toBe(23); // 20 + "..."
    });

    it("should return empty string for empty description", () => {
      const description = CategoryDescription.create("");
      expect(description.getTruncated(50)).toBe("");
    });

    it("should use default limit of 50", () => {
      const description = CategoryDescription.create("A".repeat(60));
      const truncated = description.getTruncated();
      expect(truncated).toBe("A".repeat(50) + "...");
    });
  });

  describe("equals", () => {
    it("should return true for same descriptions", () => {
      const desc1 = CategoryDescription.create("Same description");
      const desc2 = CategoryDescription.create("Same description");
      expect(desc1.equals(desc2)).toBe(true);
    });

    it("should return false for different descriptions", () => {
      const desc1 = CategoryDescription.create("First description");
      const desc2 = CategoryDescription.create("Second description");
      expect(desc1.equals(desc2)).toBe(false);
    });

    it("should return true for both empty descriptions", () => {
      const desc1 = CategoryDescription.create("");
      const desc2 = CategoryDescription.create("");
      expect(desc1.equals(desc2)).toBe(true);
    });

    it("should return true for both undefined descriptions", () => {
      const desc1 = CategoryDescription.create(undefined);
      const desc2 = CategoryDescription.create(undefined);
      expect(desc1.equals(desc2)).toBe(true);
    });

    it("should return false when one is empty and other has value", () => {
      const desc1 = CategoryDescription.create("");
      const desc2 = CategoryDescription.create("Has value");
      expect(desc1.equals(desc2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return description value for valid description", () => {
      const description = CategoryDescription.create("Valid description");
      expect(description.toString()).toBe("Valid description");
    });

    it("should return empty string for empty description", () => {
      const description = CategoryDescription.create("");
      expect(description.toString()).toBe("");
    });

    it("should return empty string for undefined description", () => {
      const description = CategoryDescription.create(undefined);
      expect(description.toString()).toBe("");
    });
  });
});
