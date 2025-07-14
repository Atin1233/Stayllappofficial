import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("px-2 py-1", "px-3")).toBe("py-1 px-3");
  });

  it("should handle conditional classes with objects", () => {
    expect(
      cn("base-class", { "conditional-class": true, "another-class": false }),
    ).toBe("base-class conditional-class");
  });

  it("should handle undefined and null values", () => {
    expect(cn("base-class", undefined, null, "other-class")).toBe(
      "base-class other-class",
    );
  });

  it("should override conflicting tailwind classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });
});
