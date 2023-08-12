import yaml from "js-yaml";
import fs from "node:fs";

import { logger } from "./logger.js";

/**
 * @param {string} path
 */
const getYAMLContent = (path) => {
  try {
    logger.info(`Reading ${path}`);
    const file = fs.readFileSync(path);
    const fileParsed = yaml.load(file);

    return fileParsed;
  } catch (error) {
    logger.fatal("Error while reading the yaml file");
  }
};

export { getYAMLContent };
