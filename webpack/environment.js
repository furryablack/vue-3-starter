const PATHS = require("./paths");

exports.NODE_ENV = process.env.NODE_ENV;
const IS_DEVELOPMENT = (exports.IS_DEVELOPMENT = exports.NODE_ENV === "development");
const IS_PRODUCTION = (exports.IS_PRODUCTION = exports.NODE_ENV === "production");
const IS_TEST = (exports.IS_TEST = exports.NODE_ENV === "test");

const PACKAGE = require(`${PATHS.PROJECT_ROOT}/package.json`);

exports.getRawEnvironment = () => {
    return Object.keys(process.env).reduce(
        (acc, key) => {
            acc[key] = parseEnvironmentVariable(process.env[key]);
            return acc;
        },
        {
            IS_DEVELOPMENT,
            IS_PRODUCTION,
            IS_TEST,
            PACKAGE_NAME: PACKAGE.name,
            PACKAGE_VERSION: PACKAGE.version,
        },
    );
};

exports.stringifyEnvironment = (rawEnvironment) => {
    return {
        "process.env": Object.keys(rawEnvironment).reduce((acc, key) => {
            acc[key] = JSON.stringify(rawEnvironment[key]);
            return acc;
        }, {}),
    };
};

function parseEnvironmentVariable(variable) {
    try {
        return JSON.parse(variable);
    } catch (err) {
        return variable.toString();
    }
}
