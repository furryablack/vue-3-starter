const {merge: webpackMerge} = require("webpack-merge");

require("./setup-environment");

const {setupEntire} = require("./setup-entire");
const {setupRules} = require("./setup-rules");
const {setupPlugins} = require("./setup-plugins");
const PATTERNS = require("./patterns");

const setupConfiguration = () => {
    const entire = setupEntire();
    const module = {
        module: {
            noParse: PATTERNS.NO_PARSE,
            rules: setupRules(),
        },
    };
    const plugins = setupPlugins();
    return webpackMerge(entire, module, {plugins});
};

module.exports = setupConfiguration();
