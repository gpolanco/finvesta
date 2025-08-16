import { describe, it, expect } from "vitest";
import { CategoryColor } from "@/core/domain/category/value-objects/category-color";
import { InvalidCategoryColorError } from "@/core/domain/category/errors/category-errors";

describe("CategoryColor", () => {
  describe("create", () => {
    it("should create a valid hex color", () => {
      const color = CategoryColor.create("#FF0000");
      expect(color.getValue()).toBe("#FF0000");
    });

    it("should create color with lowercase hex", () => {
      const color = CategoryColor.create("#ff0000");
      expect(color.getValue()).toBe("#ff0000");
    });

    it("should return default color for empty string", () => {
      const color = CategoryColor.create("");
      expect(color.getValue()).toBe("#6B7280");
    });

    it("should return default color for undefined", () => {
      const color = CategoryColor.create(undefined as any);
      expect(color.getValue()).toBe("#6B7280");
    });

    it("should return default color for whitespace", () => {
      const color = CategoryColor.create("   ");
      expect(color.getValue()).toBe("#6B7280");
    });

    it("should throw error for invalid hex format", () => {
      expect(() => CategoryColor.create("FF0000")).toThrow(
        InvalidCategoryColorError
      );
      expect(() => CategoryColor.create("#FF00")).toThrow(
        InvalidCategoryColorError
      );
      expect(() => CategoryColor.create("#FF00000")).toThrow(
        InvalidCategoryColorError
      );
      expect(() => CategoryColor.create("#GG0000")).toThrow(
        InvalidCategoryColorError
      );
    });

    it("should throw error for non-hex colors", () => {
      expect(() => CategoryColor.create("red")).toThrow(
        InvalidCategoryColorError
      );
      expect(() => CategoryColor.create("rgb(255,0,0)")).toThrow(
        InvalidCategoryColorError
      );
    });
  });

  describe("createRandom", () => {
    it("should create a random color from default palette", () => {
      const color = CategoryColor.createRandom();
      const hexValue = color.getValue();

      // Should be a valid hex color
      expect(hexValue).toMatch(/^#[0-9A-F]{6}$/i);

      // Should be one of the default colors
      const defaultColors = [
        "#EF4444",
        "#F97316",
        "#EAB308",
        "#22C55E",
        "#06B6D4",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#6B7280",
        "#84CC16",
      ];
      expect(defaultColors).toContain(hexValue);
    });
  });

  describe("getHex", () => {
    it("should return the hex value", () => {
      const color = CategoryColor.create("#FF0000");
      expect(color.getHex()).toBe("#FF0000");
    });
  });

  describe("getRgb", () => {
    it("should return correct RGB format", () => {
      const color = CategoryColor.create("#FF0000");
      expect(color.getRgb()).toBe("rgb(255, 0, 0)");
    });

    it("should handle different colors", () => {
      const color = CategoryColor.create("#00FF00");
      expect(color.getRgb()).toBe("rgb(0, 255, 0)");
    });
  });

  describe("equals", () => {
    it("should return true for same colors", () => {
      const color1 = CategoryColor.create("#FF0000");
      const color2 = CategoryColor.create("#FF0000");
      expect(color1.equals(color2)).toBe(true);
    });

    it("should return false for different colors", () => {
      const color1 = CategoryColor.create("#FF0000");
      const color2 = CategoryColor.create("#00FF00");
      expect(color1.equals(color2)).toBe(false);
    });

    it("should be case-insensitive", () => {
      const color1 = CategoryColor.create("#FF0000");
      const color2 = CategoryColor.create("#ff0000");
      expect(color1.equals(color2)).toBe(true);
    });
  });

  describe("isLight", () => {
    it("should correctly identify light colors", () => {
      const lightColor = CategoryColor.create("#FFFFFF");
      expect(lightColor.isLight()).toBe(true);

      const lightColor2 = CategoryColor.create("#FFFF00");
      expect(lightColor2.isLight()).toBe(true);
    });

    it("should correctly identify dark colors", () => {
      const darkColor = CategoryColor.create("#000000");
      expect(darkColor.isLight()).toBe(false);

      const darkColor2 = CategoryColor.create("#0000FF");
      expect(darkColor2.isLight()).toBe(false);
    });
  });

  describe("getContrastColor", () => {
    it("should return black for light colors", () => {
      const lightColor = CategoryColor.create("#FFFFFF");
      expect(lightColor.getContrastColor()).toBe("#000000");
    });

    it("should return white for dark colors", () => {
      const darkColor = CategoryColor.create("#000000");
      expect(darkColor.getContrastColor()).toBe("#FFFFFF");
    });
  });

  describe("isDefault", () => {
    it("should return true for default color", () => {
      const defaultColor = CategoryColor.create("");
      expect(defaultColor.isDefault()).toBe(true);
    });

    it("should return false for non-default colors", () => {
      const customColor = CategoryColor.create("#FF0000");
      expect(customColor.isDefault()).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the hex value", () => {
      const color = CategoryColor.create("#FF0000");
      expect(color.toString()).toBe("#FF0000");
    });
  });
});
