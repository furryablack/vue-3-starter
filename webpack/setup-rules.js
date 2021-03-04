const ExtractCssChunks = require("mini-css-extract-plugin");
const PostCssPresetEnv = require("postcss-preset-env");
const PostCssFlexbugs = require("postcss-flexbugs-fixes");
const CssNano = require("cssnano");

const {getRawEnvironment} = require("./environment");
const PATHS= require("./paths");
const PATTERNS = require("./patterns");

const {
    IS_DEVELOPMENT, IS_PRODUCTION,
    NEED_SOURCE_MAPS, NEED_MINIMIZE,
} = getRawEnvironment();

exports.setupRules = () => ([
    {
        test: PATTERNS.CODE_VUE,
        use: ["vue-loader"],
        include: PATHS.APP_SOURCE,
    },

    {
        oneOf: [
            {
                test: PATTERNS.CODE_JS,
                exclude: /node_modules/,
                loader: "babel-loader",
            },

            {
                test: PATTERNS.CODE_TS,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [PATTERNS.CODE_VUE],
                            transpileOnly: true,
                            happyPackMode: false,
                        },
                    },
                ],
            },

            {
                test: PATTERNS.CODE_LESS,
                use: [
                    IS_DEVELOPMENT && "style-loader",
                    IS_PRODUCTION && ExtractCssChunks.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: NEED_SOURCE_MAPS,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    PostCssFlexbugs,
                                    PostCssPresetEnv({
                                        autoprefixer: {
                                            flexbox: "no-2009",
                                        },
                                        stage: 2,
                                    }),
                                    NEED_MINIMIZE && CssNano(),
                                ].filter(Boolean),
                                sourceMap: NEED_SOURCE_MAPS,
                            },
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: NEED_SOURCE_MAPS,
                        },
                    },
                ].filter(Boolean),
            },

            {
                test: PATTERNS.IMAGES,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },

            {
                loader: "file-loader",
                include: PATHS.APP_SOURCE,
                exclude: [
                    PATTERNS.CODE_JS,
                    PATTERNS.CODE_TS,
                    PATTERNS.CODE_LESS,
                    PATTERNS.CODE_VUE,
                    /\.(json|html)$/,
                ],
                options: {
                    name: (IS_DEVELOPMENT && PATHS.OUTPUT_DEV.ASSETS) || PATHS.OUTPUT.ASSETS,
                },
            },
        ],
    },
].filter(Boolean));
