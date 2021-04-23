/**
 * @author luyulong
 * less支持、module.less模块化支持
 */
// react-scripts 已经依赖，项目无需安装
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

// react-scripts 内部使用
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    // cracoConfig,
    pluginOptions,
    context: { env, paths },
  }) => {
    const lessRegex = /\.less$/;
    const lessModuleRegex = /\.module\.less$/;

    const sharedLessRules = [
      isDev && require.resolve("style-loader"),
      isProd && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        options: paths.publicUrlOrPath.startsWith(".")
          ? { publicPath: "../../" }
          : {},
      },
    ].filter(Boolean);

    const lessLoaderOptions = {
      lessOptions: {
        modifyVars: pluginOptions?.modifyVars || {},
        javascriptEnabled: true,
      },
    };

    const lessRules = {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: [
        ...sharedLessRules,
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            sourceMap: isDev,
          },
        },
        {
          loader: require.resolve("less-loader"),
          options: lessLoaderOptions,
        },
      ],
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    };

    const lessModuleRules = {
      test: lessModuleRegex,
      use: [
        ...sharedLessRules,
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            sourceMap: isDev,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
        },
        {
          loader: require.resolve("less-loader"),
          options: lessLoaderOptions,
        },
      ],
    };

    const oneOfRule = webpackConfig.module.rules.find((rule) =>
      Array.isArray(rule.oneOf)
    );

    oneOfRule.oneOf.unshift(lessRules);
    oneOfRule.oneOf.unshift(lessModuleRules);

    return webpackConfig;
  },
};
