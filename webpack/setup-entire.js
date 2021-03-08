const TerserPlugin = require("terser-webpack-plugin");

const {getRawEnvironment} = require("./environment");
const PATHS = require("./paths");

const {
    NODE_ENV,
    PACKAGE_NAME,
    IS_DEVELOPMENT,
    IS_PRODUCTION,
    NEED_ANALYZE,
    NEED_SOURCE_MAPS,
    NEED_MINIMIZE,
    PUBLIC_PATH,
    WDS_HOST,
    WDS_PORT,
    WDS_HTTPS,
} = getRawEnvironment();

exports.setupEntire = () => ({
    name: PACKAGE_NAME,
    target: "web",
    mode: NODE_ENV,
    bail: IS_PRODUCTION,
    context: PATHS.PROJECT_ROOT,
    devtool:
        (NEED_SOURCE_MAPS && IS_PRODUCTION && "source-map") ||
        (IS_DEVELOPMENT && "eval-source-map"),
    profile: IS_PRODUCTION && NEED_ANALYZE,
    stats: "errors-only",
    resolve: {
        extensions: PATHS.EXTENSIONS,
        alias: {
            "@": PATHS.APP_SOURCE,
            "effector-inspector": IS_DEVELOPMENT
                ? "effector-inspector"
                : `${PATHS.PROJECT_ROOT}/webpack/noop/effector-inspector`,
        },
    },
    entry: {
        app: PATHS.APP_SOURCE_ENTRY,
    },
    output: {
        path: PATHS.APP_DIST,
        pathinfo: IS_DEVELOPMENT,
        publicPath: PUBLIC_PATH,
        filename: (IS_DEVELOPMENT && PATHS.OUTPUT_DEV.JS) || PATHS.OUTPUT.JS,
        chunkFilename: (IS_DEVELOPMENT && PATHS.OUTPUT_DEV.JS_CHUNK) || PATHS.OUTPUT.JS_CHUNK,
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: NEED_MINIMIZE,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        comments: false,
                        safari10: true,
                    },
                    compress: {
                        comparisons: false,
                    },
                },
            }),
        ],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            minSize: 0,
            maxAsyncRequests: 15,
            maxInitialRequests: 15,
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                },
            },
        },
    },
    ...(IS_DEVELOPMENT
        ? {
              devServer: {
                  hot: true,
                  contentBase: PATHS.APP_DIST,
                  publicPath: PUBLIC_PATH,
                  open: false,
                  compress: true,
                  clientLogLevel: "error",
                  historyApiFallback: {
                      disableDotRule: true,
                  },
                  host: WDS_HOST,
                  port: WDS_PORT,
                  https: WDS_HTTPS,
              },
          }
        : {}),
});
