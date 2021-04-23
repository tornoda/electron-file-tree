/**
 * @author luyulong
 * antd-mobile tree-shaking
 * 注意： 如果项目中不依赖craco-antd，请安装babel-plugin-import
 */
module.exports = {
  overrideCracoConfig: ({ cracoConfig, pluginOptions }) => {
    if (!cracoConfig.babel) cracoConfig.babel = {};
    if (!cracoConfig.babel.plugins) cracoConfig.babel.plugins = [];
    const babelPluginImportOptionsForAntMobile = {
      libraryName: "antd-mobile",
      libraryDirectory: "es",
      style: true,
    };

    if (pluginOptions && pluginOptions.babelPluginImportOptionsForAntMobile) {
      Object.assign(
        babelPluginImportOptionsForAntMobile,
        pluginOptions.babelPluginImportOptions
      );
    }
    cracoConfig.babel.plugins.push([
      "import",
      babelPluginImportOptionsForAntMobile,
      "antd-mobile",
    ]);
    return cracoConfig;
  },
};
