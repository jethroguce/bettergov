import { describe, it, expect, vi } from "vitest";
import { cn, formatDate, truncateText, getRandomNumber } from "./utils";

describe("Utils", () => {
  describe("cn function", () => {
    it("merges class names correctly", () => {
      expect(cn("text-red-500", "bg-blue-500")).toBe(
        "text-red-500 bg-blue-500"
      );
    });

    it("handles conditional classes", () => {
      expect(cn("base-class", true && "conditional-class")).toBe(
        "base-class conditional-class"
      );
      expect(cn("base-class", false && "conditional-class")).toBe("base-class");
    });

    it("handles Tailwind class conflicts", () => {
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles undefined and null values", () => {
      expect(cn("base-class", undefined, null, "other-class")).toBe(
        "base-class other-class"
      );
    });
  });

  describe("formatDate function", () => {
    it("formats date correctly for Philippine locale", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);

      // Should contain the date components in Philippine format
      expect(formatted).toContain("January");
      expect(formatted).toContain("15");
      expect(formatted).toContain("2024");
    });

    it("handles different dates", () => {
      const date1 = new Date("2024-12-25");
      const date2 = new Date("2024-06-12");

      expect(formatDate(date1)).toContain("December");
      expect(formatDate(date2)).toContain("June");
    });
  });

  describe("truncateText function", () => {
    it("returns original text when shorter than maxLength", () => {
      const text = "Short text";
      expect(truncateText(text, 20)).toBe(text);
    });

    it("truncates text when longer than maxLength", () => {
      const text = "This is a very long text that needs to be truncated";
      const result = truncateText(text, 20);

      expect(result).toBe("This is a very long ...");
      expect(result.length).toBe(23); // 20 + '...'
    });

    it("handles exact length match", () => {
      const text = "Exactly twenty chars";
      expect(truncateText(text, 20)).toBe(text);
    });

    it("handles empty string", () => {
      expect(truncateText("", 10)).toBe("");
    });

    it("handles zero maxLength", () => {
      expect(truncateText("Some text", 0)).toBe("...");
    });
  });

  describe("getRandomNumber function", () => {
    it("returns number within specified range", () => {
      // Mock Math.random to return 0.5
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const result = getRandomNumber(1, 10);
      expect(result).toBe(6); // Math.floor(0.5 * 10) + 1 = 5 + 1 = 6

      vi.restoreAllMocks();
    });

    it("returns minimum when Math.random returns 0", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const result = getRandomNumber(5, 15);
      expect(result).toBe(5);

      vi.restoreAllMocks();
    });

    it("returns maximum when Math.random returns close to 1", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.999);

      const result = getRandomNumber(1, 10);
      expect(result).toBe(10);

      vi.restoreAllMocks();
    });

    it("handles single number range", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const result = getRandomNumber(7, 7);
      expect(result).toBe(7);

      vi.restoreAllMocks();
    });

    it("returns numbers within range over multiple calls", () => {
      const min = 1;
      const max = 100;

      for (let i = 0; i < 10; i++) {
        const result = getRandomNumber(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
      }
    });
  });
});
