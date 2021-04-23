const CracoAntDesignPlugin = require("craco-antd");
const CracoLessModulePlugin = require("./plugin/craco-less/index.ts");
const CracoAntMobilePlugin = require("./plugin/craco-antd-mobile/index.ts");
const CracoSvgPlugin = require("./plugin/craco-svg/index.ts");
const CracoMainJsPlugin = require("./plugin/craco-split-mainjs/index.ts");

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  style: {
    modules: {
      localIdentName: "",
    },
    css: {
      loaderOptions: {
        /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
      },
      // loaderOptions: (cssLoaderOptions, { env, paths }) => {
      //   return cssLoaderOptions;
      // },
    },
    sass: {
      loaderOptions: {
        /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
      },
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        return sassLoaderOptions;
      },
    },
    postcss: {
      mode: "extends" /* (default value) */ || "file",
      plugins: [],
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        },
      },
      loaderOptions: {
        /* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
      },
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        return postcssLoaderOptions;
      },
    },
  },
  eslint: {
    enable: true /* (default value) */,
    mode: "extends" /* (default value) */ || "file",
    configure: {
      /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
    },
    configure: (eslintConfig, { env, paths }) => {
      return eslintConfig;
    },
    pluginOptions: {
      /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
    },
    // pluginOptions: (eslintOptions, { env, paths }) => {
    //   return eslintOptions;
    // },
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: {
      /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
    },
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */,
  },
  webpack: {
    alias: {},
    plugins: {
      add: [] /* An array of plugins */,
      remove: [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
    },
    configure: {
      target: "electron-renderer",
      /* Any webpack configuration options: https://webpack.js.org/configuration */
    },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: {
      /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */
    },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return jestConfig;
    },
  },
  devServer: {
    /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */
  },
  // devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
  //   return devServerConfig;
  // },
  plugins: [
    // 合理分割js分块
    // 合并所有css文件为一个
    {
      plugin: CracoMainJsPlugin,
    },
    // 提供less编译与module.less模块化支持
    {
      plugin: CracoLessModulePlugin,
      options: {
        modifyVars: {},
      },
    },
    // svg To Base64
    {
      plugin: CracoSvgPlugin,
    },
    // 提供antd tree-shaking
    {
      plugin: CracoAntDesignPlugin,
      options: {
        babelPluginImportOptions: {
          libraryDirectory: "es",
          style: true,
        },
      },
    },
    // 提供antd-mobile tree-shaking
    {
      plugin: CracoAntMobilePlugin,
    },
  ],
};
