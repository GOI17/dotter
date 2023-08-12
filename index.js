const processType = process.argv[2];

if (!processType) {
  throw new Error(
    "Please use a valid process type. Ex. --install or --unistall",
  );
}

const scripts = {
  install: () => {
    import("./scripts/install.js").then((module) => {
      const { install } = module;
      install();
    });
  },
};

import("./core/process_sanitizer.js").then((module) => {
  const { sanitize } = module;
  const process = sanitize(processType, "--");
  scripts[process]();
});
