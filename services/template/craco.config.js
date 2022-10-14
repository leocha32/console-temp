const emotionPresetOptions = {};

const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, emotionPresetOptions);

const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const absolutePath = path.join(__dirname, '../mi-ui');

module.exports = {
  devServer: {
    allowedHosts: 'all',
    proxy: {
      '/v2/*': {
        target: 'https://mi-console-api-dev-dkptan5aba-du.a.run.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];
        match.loader.include = include.concat(absolutePath);
      }
      return webpackConfig;
    },
  },
  babel: {
    plugins: [...emotionBabelPreset.plugins],
  },
};
