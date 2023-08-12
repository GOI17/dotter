import { cwd } from "node:process";
import path from "node:path";
import { existsSync } from "node:fs";

import { getYAMLContent } from "../lib/yaml_reader.js";

/**
 *
 * @returns {Object<any>}
 */
const setupSymlinks = () => {
  const globalSymlinksPath = path.join(
    cwd(),
    "dotfiles_template",
    "symlinks",
    "conf.yaml",
  );
  if (!existsSync(globalSymlinksPath)) throw new Error("Missing conf.yaml");
  const yaml = getYAMLContent(globalSymlinksPath);

  return yaml;
};

export { setupSymlinks };