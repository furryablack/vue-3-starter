require("./setup-environment");

const {getRawEnvironment} = require("./environment");
const {APP_ANALYZER_STATS} = require("./paths");

const {ANALYZER_PORT} = getRawEnvironment();

module.exports = {
    APP_ANALYZER_STATS,
    ANALYZER_PORT,
};
