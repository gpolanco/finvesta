import { describe, it, expect } from "vitest";
import {
  TRANSACTION_CONSTRAINTS,
  TRANSACTION_TYPES,
  TRANSACTION_TYPE_VALUES,
  TRANSACTION_TYPE_LABELS,
  TRANSACTION_TYPE_COLORS,
  TRANSACTION_TYPE_ICONS,
  TRANSACTION_TYPE_BADGE_COLORS,
  TRANSACTION_TYPE_ICON_COLORS,
  TRANSACTION_TYPE_AMOUNT_COLORS,
  TRANSACTION_TYPE_PRIMARY_COLORS,
  TRANSACTION_TYPE_AMOUNT_PREFIXES,
  TRANSACTION_MESSAGES,
  TRANSACTION_TYPE_OPTIONS,
} from "@/core/domain/transaction/constants/transaction-constants";

describe("Transaction Constants", () => {
  describe("TRANSACTION_CONSTRAINTS", () => {
    it("should have correct description constraints", () => {
      expect(TRANSACTION_CONSTRAINTS.DESCRIPTION.MIN_LENGTH).toBe(1);
      expect(TRANSACTION_CONSTRAINTS.DESCRIPTION.MAX_LENGTH).toBe(200);
      expect(TRANSACTION_CONSTRAINTS.DESCRIPTION.PATTERN).toBeInstanceOf(
        RegExp
      );
    });

    it("should have correct amount constraints", () => {
      expect(TRANSACTION_CONSTRAINTS.AMOUNT.MIN).toBe(-999999999);
      expect(TRANSACTION_CONSTRAINTS.AMOUNT.MAX).toBe(999999999);
      expect(TRANSACTION_CONSTRAINTS.AMOUNT.DECIMAL_PLACES).toBe(2);
    });

    it("should have correct date constraints", () => {
      expect(TRANSACTION_CONSTRAINTS.DATE.MIN).toBeInstanceOf(Date);
      expect(TRANSACTION_CONSTRAINTS.DATE.MAX).toBeInstanceOf(Date);

      // Check that dates are valid Date objects (can be negative for dates before 1970)
      expect(TRANSACTION_CONSTRAINTS.DATE.MIN.getTime()).toBeGreaterThan(
        -Infinity
      );
      expect(TRANSACTION_CONSTRAINTS.DATE.MAX.getTime()).toBeGreaterThan(
        -Infinity
      );
      expect(TRANSACTION_CONSTRAINTS.DATE.MIN.getTime()).toBeLessThan(Infinity);
      expect(TRANSACTION_CONSTRAINTS.DATE.MAX.getTime()).toBeLessThan(Infinity);

      // Check that MIN date is before MAX date
      expect(TRANSACTION_CONSTRAINTS.DATE.MIN.getTime()).toBeLessThan(
        TRANSACTION_CONSTRAINTS.DATE.MAX.getTime()
      );

      // Check that dates are within reasonable bounds (allowing for timezone variations)
      // MIN date should be around 1900 (allowing for timezone adjustments)
      const minYear = TRANSACTION_CONSTRAINTS.DATE.MIN.getFullYear();
      expect(minYear).toBeGreaterThanOrEqual(1899);
      expect(minYear).toBeLessThanOrEqual(1900);

      // MAX date should be around 2100 (allowing for timezone adjustments)
      const maxYear = TRANSACTION_CONSTRAINTS.DATE.MAX.getFullYear();
      expect(maxYear).toBeGreaterThanOrEqual(2100);
      expect(maxYear).toBeLessThanOrEqual(2101);

      // Additional validation: check that dates are not NaN
      expect(TRANSACTION_CONSTRAINTS.DATE.MIN.getTime()).not.toBeNaN();
      expect(TRANSACTION_CONSTRAINTS.DATE.MAX.getTime()).not.toBeNaN();
    });
  });

  describe("TRANSACTION_TYPES", () => {
    it("should have all required transaction types", () => {
      expect(TRANSACTION_TYPES.INCOME).toBe("income");
      expect(TRANSACTION_TYPES.EXPENSE).toBe("expense");
      expect(TRANSACTION_TYPES.INVESTMENT).toBe("investment");
      expect(TRANSACTION_TYPES.TRANSFER).toBe("transfer");
    });

    it("should have correct number of types", () => {
      const typeCount = Object.keys(TRANSACTION_TYPES).length;
      expect(typeCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_VALUES", () => {
    it("should contain all transaction type values", () => {
      expect(TRANSACTION_TYPE_VALUES).toContain("income");
      expect(TRANSACTION_TYPE_VALUES).toContain("expense");
      expect(TRANSACTION_TYPE_VALUES).toContain("investment");
      expect(TRANSACTION_TYPE_VALUES).toContain("transfer");
    });

    it("should have correct length", () => {
      expect(TRANSACTION_TYPE_VALUES).toHaveLength(4);
    });
  });

  describe("TRANSACTION_TYPE_LABELS", () => {
    it("should have correct labels for each type", () => {
      expect(TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INCOME]).toBe("Income");
      expect(TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "Expense"
      );
      expect(TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "Investment"
      );
      expect(TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "Transfer"
      );
    });

    it("should have all types covered", () => {
      const labelCount = Object.keys(TRANSACTION_TYPE_LABELS).length;
      expect(labelCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_COLORS", () => {
    it("should have correct colors for each type", () => {
      expect(TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.INCOME]).toBe("green");
      expect(TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.EXPENSE]).toBe("red");
      expect(TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "blue"
      );
      expect(TRANSACTION_TYPE_COLORS[TRANSACTION_TYPES.TRANSFER]).toBe("gray");
    });

    it("should have all types covered", () => {
      const colorCount = Object.keys(TRANSACTION_TYPE_COLORS).length;
      expect(colorCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_ICONS", () => {
    it("should have correct icon names for each type", () => {
      expect(TRANSACTION_TYPE_ICONS[TRANSACTION_TYPES.INCOME]).toBe(
        "ArrowUpRight"
      );
      expect(TRANSACTION_TYPE_ICONS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "ArrowDownRight"
      );
      expect(TRANSACTION_TYPE_ICONS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "TrendingUp"
      );
      expect(TRANSACTION_TYPE_ICONS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "ArrowRightLeft"
      );
    });

    it("should have all types covered", () => {
      const iconCount = Object.keys(TRANSACTION_TYPE_ICONS).length;
      expect(iconCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_BADGE_COLORS", () => {
    it("should have correct badge colors for each type", () => {
      expect(TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.INCOME]).toBe(
        "bg-green-50 text-green-700 border-green-200"
      );
      expect(TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "bg-red-50 text-red-700 border-red-200"
      );
      expect(TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "bg-blue-50 text-blue-700 border-blue-200"
      );
      expect(TRANSACTION_TYPE_BADGE_COLORS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "bg-gray-50 text-gray-700 border-gray-200"
      );
    });

    it("should have all types covered", () => {
      const badgeColorCount = Object.keys(TRANSACTION_TYPE_BADGE_COLORS).length;
      expect(badgeColorCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_ICON_COLORS", () => {
    it("should have correct icon colors for each type", () => {
      expect(TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.INCOME]).toBe(
        "text-green-600"
      );
      expect(TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "text-red-600"
      );
      expect(TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "text-blue-600"
      );
      expect(TRANSACTION_TYPE_ICON_COLORS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "text-gray-600"
      );
    });

    it("should have all types covered", () => {
      const iconColorCount = Object.keys(TRANSACTION_TYPE_ICON_COLORS).length;
      expect(iconColorCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_AMOUNT_COLORS", () => {
    it("should have correct amount colors for each type", () => {
      expect(TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.INCOME]).toBe(
        "text-green-600"
      );
      expect(TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "text-red-600"
      );
      expect(TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.INVESTMENT]).toBe(
        "text-blue-600"
      );
      expect(TRANSACTION_TYPE_AMOUNT_COLORS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "text-gray-600"
      );
    });

    it("should have all types covered", () => {
      const amountColorCount = Object.keys(
        TRANSACTION_TYPE_AMOUNT_COLORS
      ).length;
      expect(amountColorCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_PRIMARY_COLORS", () => {
    it("should have correct primary colors for each type", () => {
      expect(TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.INCOME]).toBe(
        "green"
      );
      expect(TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.EXPENSE]).toBe(
        "red"
      );
      expect(
        TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.INVESTMENT]
      ).toBe("blue");
      expect(TRANSACTION_TYPE_PRIMARY_COLORS[TRANSACTION_TYPES.TRANSFER]).toBe(
        "gray"
      );
    });

    it("should have all types covered", () => {
      const primaryColorCount = Object.keys(
        TRANSACTION_TYPE_PRIMARY_COLORS
      ).length;
      expect(primaryColorCount).toBe(4);
    });
  });

  describe("TRANSACTION_TYPE_AMOUNT_PREFIXES", () => {
    it("should have correct amount prefixes for each type", () => {
      expect(TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.INCOME]).toBe(
        "+"
      );
      expect(TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.EXPENSE]).toBe(
        "-"
      );
      expect(
        TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.INVESTMENT]
      ).toBe("+");
      expect(TRANSACTION_TYPE_AMOUNT_PREFIXES[TRANSACTION_TYPES.TRANSFER]).toBe(
        ""
      );
    });

    it("should have all types covered", () => {
      const prefixCount = Object.keys(TRANSACTION_TYPE_AMOUNT_PREFIXES).length;
      expect(prefixCount).toBe(4);
    });
  });

  describe("TRANSACTION_MESSAGES", () => {
    describe("VALIDATION", () => {
      it("should have account validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.ACCOUNT_ID_REQUIRED).toBe(
          "Account ID is required"
        );
      });

      it("should have category validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.CATEGORY_ID_REQUIRED).toBe(
          "Category ID is required"
        );
      });

      it("should have amount validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.AMOUNT_REQUIRED).toBe(
          "Amount is required"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.AMOUNT_INVALID).toBe(
          "Amount must be a valid number"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.AMOUNT_TOO_LOW).toBe(
          "Amount cannot be less than -999,999,999"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.AMOUNT_TOO_HIGH).toBe(
          "Amount cannot exceed 999,999,999"
        );
      });

      it("should have description validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_REQUIRED).toBe(
          "Description is required"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_SHORT).toBe(
          "Description must be at least 1 character"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_TOO_LONG).toBe(
          "Description cannot exceed 200 characters"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.DESCRIPTION_INVALID_CHARS).toBe(
          "Description contains invalid characters"
        );
      });

      it("should have transaction type validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_TYPE_INVALID).toBe(
          "Invalid transaction type"
        );
      });

      it("should have date validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_REQUIRED).toBe(
          "Transaction date is required"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_INVALID).toBe(
          "Transaction date is invalid"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_TOO_OLD).toBe(
          "Transaction date cannot be before 1900"
        );
        expect(
          TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_DATE_TOO_FUTURE
        ).toBe("Transaction date cannot be after 2100");
      });

      it("should have other validation messages", () => {
        expect(TRANSACTION_MESSAGES.VALIDATION.USER_ID_REQUIRED).toBe(
          "User ID is required"
        );
        expect(TRANSACTION_MESSAGES.VALIDATION.TRANSACTION_ID_REQUIRED).toBe(
          "Transaction ID is required"
        );
      });
    });

    describe("BUSINESS", () => {
      it("should have business rule messages", () => {
        expect(TRANSACTION_MESSAGES.BUSINESS.ACCOUNT_NOT_FOUND).toBe(
          "Account not found"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.CATEGORY_NOT_FOUND).toBe(
          "Category not found"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.CATEGORY_TYPE_MISMATCH).toBe(
          "Category type does not match transaction type"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.INSUFFICIENT_BALANCE).toBe(
          "Insufficient account balance for this transaction"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.TRANSACTION_NOT_FOUND).toBe(
          "Transaction not found"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.ACCESS_DENIED).toBe(
          "Access denied to this transaction"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.CANNOT_DELETE_RECONCILED).toBe(
          "Cannot delete reconciled transaction"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.DUPLICATE_TRANSACTION).toBe(
          "Duplicate transaction detected"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.INVALID_TRANSFER).toBe(
          "Invalid transfer: accounts must be different"
        );
        expect(TRANSACTION_MESSAGES.BUSINESS.MAX_TRANSACTIONS_REACHED).toBe(
          "Maximum transactions limit reached"
        );
      });
    });
  });

  describe("TRANSACTION_TYPE_OPTIONS", () => {
    it("should contain all transaction types with complete information", () => {
      expect(TRANSACTION_TYPE_OPTIONS).toHaveLength(4);

      const incomeOption = TRANSACTION_TYPE_OPTIONS.find(
        (opt) => opt.value === "income"
      );
      expect(incomeOption).toEqual({
        value: "income",
        label: "Income",
        icon: "ArrowUpRight",
        color: "green",
        badgeColor: "bg-green-50 text-green-700 border-green-200",
        iconColor: "text-green-600",
        amountColor: "text-green-600",
        primaryColor: "green",
        amountPrefix: "+",
      });

      const expenseOption = TRANSACTION_TYPE_OPTIONS.find(
        (opt) => opt.value === "expense"
      );
      expect(expenseOption).toEqual({
        value: "expense",
        label: "Expense",
        icon: "ArrowDownRight",
        color: "red",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        iconColor: "text-red-600",
        amountColor: "text-red-600",
        primaryColor: "red",
        amountPrefix: "-",
      });

      const investmentOption = TRANSACTION_TYPE_OPTIONS.find(
        (opt) => opt.value === "investment"
      );
      expect(investmentOption).toEqual({
        value: "investment",
        label: "Investment",
        icon: "TrendingUp",
        color: "blue",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        iconColor: "text-blue-600",
        amountColor: "text-blue-600",
        primaryColor: "blue",
        amountPrefix: "+",
      });

      const transferOption = TRANSACTION_TYPE_OPTIONS.find(
        (opt) => opt.value === "transfer"
      );
      expect(transferOption).toEqual({
        value: "transfer",
        label: "Transfer",
        icon: "ArrowRightLeft",
        color: "gray",
        badgeColor: "bg-gray-50 text-gray-700 border-gray-200",
        iconColor: "text-gray-600",
        amountColor: "text-gray-600",
        primaryColor: "gray",
        amountPrefix: "",
      });
    });

    it("should have consistent structure across all options", () => {
      TRANSACTION_TYPE_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty("value");
        expect(option).toHaveProperty("label");
        expect(option).toHaveProperty("icon");
        expect(option).toHaveProperty("color");
        expect(option).toHaveProperty("badgeColor");
        expect(option).toHaveProperty("iconColor");
        expect(option).toHaveProperty("amountColor");
        expect(option).toHaveProperty("primaryColor");
        expect(option).toHaveProperty("amountPrefix");
      });
    });
  });

  describe("Consistency", () => {
    it("should have consistent number of types across all constants", () => {
      const typeCount = Object.keys(TRANSACTION_TYPES).length;
      const labelCount = Object.keys(TRANSACTION_TYPE_LABELS).length;
      const colorCount = Object.keys(TRANSACTION_TYPE_COLORS).length;
      const iconCount = Object.keys(TRANSACTION_TYPE_ICONS).length;
      const badgeColorCount = Object.keys(TRANSACTION_TYPE_BADGE_COLORS).length;
      const iconColorCount = Object.keys(TRANSACTION_TYPE_ICON_COLORS).length;
      const amountColorCount = Object.keys(
        TRANSACTION_TYPE_AMOUNT_COLORS
      ).length;
      const primaryColorCount = Object.keys(
        TRANSACTION_TYPE_PRIMARY_COLORS
      ).length;
      const prefixCount = Object.keys(TRANSACTION_TYPE_AMOUNT_PREFIXES).length;

      expect(typeCount).toBe(labelCount);
      expect(typeCount).toBe(colorCount);
      expect(typeCount).toBe(iconCount);
      expect(typeCount).toBe(badgeColorCount);
      expect(typeCount).toBe(iconColorCount);
      expect(typeCount).toBe(amountColorCount);
      expect(typeCount).toBe(primaryColorCount);
      expect(typeCount).toBe(prefixCount);
    });

    it("should have all type values in TRANSACTION_TYPE_VALUES", () => {
      Object.values(TRANSACTION_TYPES).forEach((type) => {
        expect(TRANSACTION_TYPE_VALUES).toContain(type);
      });
    });

    it("should have all types covered in labels and colors", () => {
      Object.values(TRANSACTION_TYPES).forEach((type) => {
        expect(TRANSACTION_TYPE_LABELS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_COLORS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_ICONS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_BADGE_COLORS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_ICON_COLORS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_AMOUNT_COLORS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_PRIMARY_COLORS).toHaveProperty(type);
        expect(TRANSACTION_TYPE_AMOUNT_PREFIXES).toHaveProperty(type);
      });
    });
  });
});
