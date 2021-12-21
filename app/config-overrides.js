const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: function override(config, _) {
    for(let i = 0; i < config.plugins.length; i++) {
      const current = config.plugins[i];
      if (current instanceof webpack.DefinePlugin) {
        config.plugins[i] = new webpack.DefinePlugin({
          ...current,
          'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://localhost/api'),
        })
      }
    }
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...config.resolve.plugins,
          new TsconfigPathsPlugin(),
        ]
      },
      plugins: [
        ...config.plugins,
      ],
    }
  },
}
