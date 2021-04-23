/**
 * @author luyulong
 */
module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
  }) => {
    const svgRegex = /\.svg$/;

    const svgRules = {
      test: svgRegex,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: 10,
          },
        }
      ],
    };

    const oneOfRule = webpackConfig.module.rules.find((rule) =>
      Array.isArray(rule.oneOf)
    );

    oneOfRule.oneOf.unshift(svgRules);

    return webpackConfig;
  },
};
