const {DefinePlugin, HotModuleReplacementPlugin} = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const {VueLoaderPlugin} = require("vue-loader");
const {CleanWebpackPlugin: CleanPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ExtractCssChunks = require("mini-css-extract-plugin");

const {getRawEnvironment, stringifyEnvironment} = require("./environment");
const PATHS = require("./paths");

const ENVIRONMENT_RAW = getRawEnvironment();
const {
    NODE_ENV,
    IS_PRODUCTION, IS_DEVELOPMENT,
    NEED_MINIMIZE, NEED_ANALYZE,
    PUBLIC_PATH, PACKAGE_NAME, PACKAGE_VERSION,
} = ENVIRONMENT_RAW;

exports.setupPlugins = () => ([
    !IS_DEVELOPMENT && new CleanPlugin(),

    new DefinePlugin(stringifyEnvironment(ENVIRONMENT_RAW)),
    new DefinePlugin(
        {
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
        },
    ),

    IS_PRODUCTION && NEED_ANALYZE && new BundleAnalyzerPlugin({
        analyzerMode: "file",
        defaultSizes: "parsed",
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: PATHS.APP_ANALYZER_STATS,
        logLevel: "info",
    }),

    new HtmlPlugin({
        template: PATHS.APP_HTML,
        templateParameters: {
            PUBLIC_PATH,
            PACKAGE_NAME,
        },
        minify: (NEED_MINIMIZE ? {
            removeComments: true,
            collapseWhitespace: true,
        } : false),
    }),

    new VueLoaderPlugin(),

    new CopyPlugin({
        patterns: [
            {
                from: PATHS.APP_STATIC,
                to: PATHS.APP_DIST_STATIC,
                toType: "dir",
                globOptions: {
                    ignore: ["**/index.html"],
                },
            },
        ],
    }),

    IS_PRODUCTION && new ExtractCssChunks({
        filename: PATHS.OUTPUT.CSS,
        chunkFilename: PATHS.OUTPUT.CSS_CHUNK,
    }),

    new ForkTsCheckerWebpackPlugin({
        typescript: {
            extensions: {
                vue: {
                    enabled: true,
                    compiler: "@vue/compiler-sfc",
                },
            },
            diagnosticOptions: {
                semantic: true,
                syntactic: false,
            },
        },
    }),

    IS_DEVELOPMENT && new HotModuleReplacementPlugin(),

    new WebpackBar({name: `[${NODE_ENV}] ${PACKAGE_NAME} ${PACKAGE_VERSION}`}),
].filter(Boolean));
