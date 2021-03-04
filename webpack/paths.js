const {realpathSync} = require("fs");
const {normalize} = require("path");

exports.PROJECT_ROOT = normalize(realpathSync(`${__dirname}/..`));

exports.APP_ENV = normalize(`${exports.PROJECT_ROOT}/.env`);
exports.APP_ENV_PRODUCTION = normalize(`${exports.PROJECT_ROOT}/.env.production`);
exports.APP_ENV_DEVELOPMENT = normalize(`${exports.PROJECT_ROOT}/.env.development`);
exports.APP_ENV_TEST = normalize(`${exports.PROJECT_ROOT}/.env.test`);

exports.EXTENSIONS = [".ts", ".js", ".mjs", ".vue", ".json", ".less"];

exports.APP_SOURCE = normalize(`${exports.PROJECT_ROOT}/app-source`);
exports.APP_SOURCE_ENTRY = normalize(`${exports.APP_SOURCE}/entry`);
exports.APP_DIST = normalize(`${exports.PROJECT_ROOT}/app-dist`);
exports.APP_DIST_STATIC = normalize(`${exports.APP_DIST}/static`);
exports.APP_STATIC = normalize(`${exports.PROJECT_ROOT}/app-static`);
exports.APP_HTML = normalize(`${exports.APP_STATIC}/index.html`);
exports.APP_ANALYZER_STATS = normalize(`${exports.APP_DIST}/analyzer-stats.json`);

exports.OUTPUT_DEV = {
    JS: normalize("js/[name].bundle.js"),
    JS_CHUNK: normalize("js/[name].chunk.js"),
    ASSETS: normalize("assets/[name].[ext]"),
};

exports.OUTPUT = {
    JS: normalize("js/[name].bundle.[contenthash:8].js"),
    JS_CHUNK: normalize("js/[name].chunk.[contenthash:8].js"),
    ASSETS: normalize("assets/[name].[contenthash:8].[ext]"),
    CSS: normalize("css/[name].bundle.[contenthash:8].css"),
    CSS_CHUNK: normalize("css/[name].chunk.[contenthash:8].css"),
};
