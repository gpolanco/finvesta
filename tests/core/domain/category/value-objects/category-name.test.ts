import { describe, it, expect } from "vitest";
import { CategoryName } from "@/core/domain/category/value-objects/category-name";
import {
  CategoryNameTooShortError,
  CategoryNameTooLongError,
  CategoryNameInvalidCharactersError,
} from "@/core/domain/category/errors/category-errors";

describe("CategoryName", () => {
  describe("create", () => {
    it("should create a valid category name", () => {
      const name = CategoryName.create("Food");
      expect(name.getValue()).toBe("Food");
    });

    it("should trim whitespace", () => {
      const name = CategoryName.create("  Food  ");
      expect(name.getValue()).toBe("Food");
    });

    it("should throw error for empty string", () => {
      expect(() => CategoryName.create("")).toThrow(CategoryNameTooShortError);
    });

    it("should throw error for whitespace only", () => {
      expect(() => CategoryName.create("   ")).toThrow(
        CategoryNameTooShortError
      );
    });

    it("should throw error for too short name", () => {
      expect(() => CategoryName.create("A")).toThrow(CategoryNameTooShortError);
    });

    it("should throw error for too long name", () => {
      const longName = "A".repeat(51);
      expect(() => CategoryName.create(longName)).toThrow(
        CategoryNameTooLongError
      );
    });

    it("should throw error for invalid characters", () => {
      expect(() => CategoryName.create("Food@")).toThrow(
        CategoryNameInvalidCharactersError
      );
      expect(() => CategoryName.create("Food!")).toThrow(
        CategoryNameInvalidCharactersError
      );
      expect(() => CategoryName.create("Food#")).toThrow(
        CategoryNameInvalidCharactersError
      );
    });

    it("should accept valid characters", () => {
      expect(() => CategoryName.create("Food & Drinks")).not.toThrow();
      expect(() => CategoryName.create("Food-Drink")).not.toThrow();
      expect(() => CategoryName.create("Food_Drink")).not.toThrow();
    });
  });

  describe("getDisplayValue", () => {
    it("should return capitalized value", () => {
      const name = CategoryName.create("food");
      expect(name.getDisplayValue()).toBe("Food");
    });

    it("should handle already capitalized names", () => {
      const name = CategoryName.create("Food");
      expect(name.getDisplayValue()).toBe("Food");
    });
  });

  describe("equals", () => {
    it("should return true for same names (case-insensitive)", () => {
      const name1 = CategoryName.create("Food");
      const name2 = CategoryName.create("food");
      expect(name1.equals(name2)).toBe(true);
    });

    it("should return false for different names", () => {
      const name1 = CategoryName.create("Food");
      const name2 = CategoryName.create("Transport");
      expect(name1.equals(name2)).toBe(false);
    });
  });

  describe("contains", () => {
    it("should return true for contained substring", () => {
      const name = CategoryName.create("Food & Drinks");
      expect(name.contains("Food")).toBe(true);
      expect(name.contains("drinks")).toBe(true);
    });

    it("should return false for non-contained substring", () => {
      const name = CategoryName.create("Food");
      expect(name.contains("Transport")).toBe(false);
    });
  });

  describe("getLength", () => {
    it("should return correct length", () => {
      const name = CategoryName.create("Food");
      expect(name.getLength()).toBe(4);
    });
  });

  describe("isEmpty", () => {
    it("should return false for valid names", () => {
      const name = CategoryName.create("Food");
      expect(name.isEmpty()).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the value", () => {
      const name = CategoryName.create("Food");
      expect(name.toString()).toBe("Food");
    });
  });
});
