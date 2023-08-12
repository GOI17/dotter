class InvalidEnvVariable extends Error {
  /**
   * @param {string} envVariable
   */
  constructor(envVariable) {
    super();
    this.message = `${envVariable} is not defined`;
  }
}

const requireEnvs = ["DOTTER_HOME_PATH"];

const getEnv = () => {
  const env = process.env;
  requireEnvs.forEach((requireEnv) => {
    if (!env.hasOwnProperty(requireEnv)) {
      throw new InvalidEnvVariable(requireEnv);
    }
  });

  return env;
};

export { getEnv };
