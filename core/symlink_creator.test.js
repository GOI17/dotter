import { rename, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "vitest";
import yaml from "js-yaml";

import { setupSymlinks } from './symlink_creator.js';

describe("Validate yaml files", () => {
  const originalPath = path.join(
    cwd(),
    "dotfiles_template",
    "symlinks",
    "conf.yaml",
  );
  const wrongPath = path.join(
    cwd(),
    "dotfiles_template",
    "symlinks",
    "_conf.yaml",
  );

  beforeEach(() => {
    rename(originalPath, wrongPath, (err) => {
      if (err) throw err;
    });
  });

  afterEach(() => {
    rename(wrongPath, originalPath, (err) => {
      if (err) throw err;
    });
  });

  test("validate if conf.yaml exists", () => {
    expect(() => setupSymlinks()).toThrowError("Missing conf.yaml");
  });
});

describe("Read the yaml content", () => {
  const originalPath = path.join(
    cwd(),
    "dotfiles_template",
    "symlinks",
    "conf.yaml",
  );
  const wrongPath = path.join(
    cwd(),
    "dotfiles_template",
    "symlinks",
    "_conf.yaml",
  );
  const expectedYamlContent = {
    links: {
      file_to_copy: "path_where_the_file_will_copied",
    },
  };

  beforeAll(() => {
    rename(originalPath, wrongPath, (err) => {
      if (err) throw err;
    });

    const yamlStr = yaml.dump(expectedYamlContent);

    writeFileSync(originalPath, yamlStr, "utf8");
  });

  afterAll(() => {
    rmSync(originalPath);
    rename(wrongPath, originalPath, (err) => {
      if (err) throw err;
    });
  });

  test("should read the yaml file located on dotfiles_template/symlinks", () => {
    expect(setupSymlinks());
  });

  test("should read the content of the yaml file located on dotfiles_template/symlinks", () => {
    expect(setupSymlinks()).toStrictEqual(expectedYamlContent);
  });

  test("should read the first property of the yaml file located on dotfiles_template/symlinks", () => {
    expect(setupSymlinks().links["file_to_copy"]).toBe(
      expectedYamlContent.links.file_to_copy,
    );
  });
});
