import { test, expect, describe, afterEach, beforeEach, vi } from "vitest";

import { getEnv } from "./env.js";

test("should validate if the list of required environment variables are set", () => {
  expect(() => getEnv()).toThrowError(/^DOTTER_HOME_PATH is not defined$/);
});

describe("Have a list of environment variables", () => {
  beforeEach(() => {
    vi.stubEnv("DOTTER_HOME_PATH", "d/home/docs");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("return the valid environment variables", () => {
    expect(getEnv()).toHaveProperty("DOTTER_HOME_PATH");
    expect(getEnv().DOTTER_HOME_PATH).toBe("d/home/docs");
  });
});
