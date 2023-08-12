import { describe, test, expect } from "vitest";

import { sanitize } from "./process_sanitizer.js";

describe("Validate function params", () => {
  test("Should validate if text is undefined", () => {
    expect(() => sanitize()).toThrowError("text should be string");
  });

  test("Should validate if text is empty", () => {
    expect(() => sanitize("")).toThrowError("text can not be an empty string");
  });

  test("characters to trim should be required", () => {
    expect(() => sanitize("--install")).toThrowError(
      "charactersToTrim should be string",
    );
  });

  test("Should validate if characters to trim is empty", () => {
    expect(() => sanitize("install", "")).toThrowError(
      "charactersToTrim can not be an empty string",
    );
  });
});

describe("Validate returns using the prefix option", () => {
  const prefix = "--";
  const text = "install";
  const textWithPrefix = `${prefix}${text}`;

  test("Check if the given text includes the prefix", () => {
    expect(() => sanitize(textWithPrefix, "__")).toThrowError(
      `The given text: ${textWithPrefix} does not include __`,
    );
  });

  test(`Should return ${textWithPrefix} without ${prefix}`, () => {
    expect(sanitize(textWithPrefix, prefix)).toBe(text);
  });
});

describe("Validate returns using the sufix option", () => {
  const sufix = "--";
  const text = "install";
  const textWithSufix = `${text}${sufix}`;

  test("Check if the given text includes the sufix", () => {
    expect(() => sanitize(textWithSufix, "__")).toThrowError(
      `The given text: ${textWithSufix} does not include __`,
    );
  });

  test(`Should return ${textWithSufix} without ${sufix}`, () => {
    expect(sanitize(textWithSufix, sufix)).toBe(text);
  });
});
