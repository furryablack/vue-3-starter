const {exec, exit} = require("shelljs");

const {APP_ANALYZER_STATS, ANALYZER_PORT} = require("../webpack/external");

if (
    exec(`webpack-bundle-analyzer ${APP_ANALYZER_STATS} --port ${ANALYZER_PORT} --no-open `)
        .code !== 0
) {
    exit(1);
}
