const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 1. Add the fallback for child_process
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "child_process": false,
      };

      // 2. Add the plugin to strip 'node:' prefix
      webpackConfig.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        })
      );

      return webpackConfig;
    },
  },
};