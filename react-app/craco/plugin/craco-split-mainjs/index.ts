/**
 * @author luyulong
 */
module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    webpackConfig.optimization.splitChunks = {
      chunks: undefined,
      minSize: 20 * 1024,
      maxInitialRequests: 20,
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/].*(react|react-dom|dva|redux|history).*\.js$/,
          name: "react+dva",
          priority: 3,
        },
        antdGroup: {
          chunks: "all",
          test: /[\\/]node_modules[\\/].*(ant|antd).*\.js$/,
          name: "antGroup",
          priority: 3,
        },
        rcGroup: {
          chunks: "all",
          test: /[\\/]node_modules[\\/].*(rc|rmc).*\.js$/,
          name: "rcGroup",
          priority: 2,
        },
        styles: {
          chunks: "all",
          test: /\.[^module]\.(css|less|scss|sass)$/,
          name: "styles",
          enforce: true,
          priority: 1,
        },
      },
    };

    return webpackConfig;
  },
};
