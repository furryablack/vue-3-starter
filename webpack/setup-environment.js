const {existsSync} = require("fs");
const {config: dotEnvConfig} = require("dotenv");
const dotEnvExpand = require("dotenv-expand");

const {
    IS_DEVELOPMENT, IS_PRODUCTION, IS_TEST,
} = require("./environment");
const PATHS = require("./paths");

const ENV_FILES = [
    IS_DEVELOPMENT && PATHS.APP_ENV_DEVELOPMENT,
    IS_PRODUCTION && PATHS.APP_ENV_PRODUCTION,
    IS_TEST && PATHS.APP_ENV_TEST,
    IS_TEST && PATHS.APP_ENV_PRODUCTION,
    PATHS.APP_ENV,
].filter(Boolean);

ENV_FILES.forEach(envFile => {
    const localEnvFile = `${envFile}.local`;
    if (existsSync(localEnvFile)) {
        dotEnvExpand(dotEnvConfig({path: localEnvFile}));
    }
    if (existsSync(`${envFile}`)) {
        dotEnvExpand(dotEnvConfig({path: `${envFile}`}));
    }
});
