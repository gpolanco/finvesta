import { InvalidCategoryColorError } from "@/core/domain/category/errors/category-errors";
import { CATEGORY_CONSTRAINTS } from "@/core/domain/category/constants/category-constants";

/**
 * Value Object for Category Color
 * Encapsulates the business concept of category colors with validation
 */
export class CategoryColor {
  private constructor(private readonly value: string) {}

  /**
   * Create a new CategoryColor with validation
   */
  static create(value: string): CategoryColor {
    if (!value || value.trim().length === 0) {
      return new CategoryColor(CATEGORY_CONSTRAINTS.COLOR.DEFAULT);
    }

    const trimmedValue = value.trim();

    if (!CATEGORY_CONSTRAINTS.COLOR.PATTERN.test(trimmedValue)) {
      throw new InvalidCategoryColorError(
        "Color must be a valid hex color code (e.g., #FF0000)"
      );
    }

    return new CategoryColor(trimmedValue);
  }

  /**
   * Create a random color from the default palette
   */
  static createRandom(): CategoryColor {
    const colors = [
      "#EF4444", // red-500
      "#F97316", // orange-500
      "#EAB308", // yellow-500
      "#22C55E", // green-500
      "#06B6D4", // cyan-500
      "#3B82F6", // blue-500
      "#8B5CF6", // violet-500
      "#EC4899", // pink-500
      "#6B7280", // gray-500
      "#84CC16", // lime-500
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return new CategoryColor(colors[randomIndex]);
  }

  /**
   * Get the hex color value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Get the color in different formats
   */
  getHex(): string {
    return this.value;
  }

  getRgb(): string {
    const hex = this.value.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Check if color equals another
   */
  equals(other: CategoryColor): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  /**
   * Check if color is light or dark
   */
  isLight(): boolean {
    const hex = this.value.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }

  /**
   * Get contrasting text color (black or white)
   */
  getContrastColor(): string {
    return this.isLight() ? "#000000" : "#FFFFFF";
  }

  /**
   * Check if color is the default
   */
  isDefault(): boolean {
    return this.value === CATEGORY_CONSTRAINTS.COLOR.DEFAULT;
  }

  toString(): string {
    return this.value;
  }
}
