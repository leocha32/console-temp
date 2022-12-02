const emotionPresetOptions = {};
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPresetOptions,
);
const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const absolutePath = path.join(__dirname, '../mi-ui');
const posixPath = require('path/posix');

module.exports = {
  devServer: (devServerConfig, { env, paths }) => {
    devServerConfig = {
      hot: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      static: {
        directory: path.join(__dirname, 'dist'),
        publicPath: 'dist',
      },
      historyApiFallback: true,
      allowedHosts: 'all',
      proxy: {
        '/v2/*': {
          target: 'https://mi-console-api-v2-dev-dkptan5aba-du.a.run.app',
          changeOrigin: true,
          secure: false,
        },
      },
    };

    return devServerConfig;
  },
  webpack: {
    module: 'development',
    alias: {
      $components: posixPath.resolve(__dirname, 'src/components'),
      $constants: posixPath.resolve(__dirname, 'src/constants'),
      $modules: posixPath.resolve(__dirname, 'src/modules'),
      $pages: posixPath.resolve(__dirname, 'src/pages'),
      $recoils: posixPath.resolve(__dirname, 'src/recoils'),
      $types: posixPath.resolve(__dirname, 'src/types'),
      $utils: posixPath.resolve(__dirname, 'src/utils'),
    },
    plugins: [],
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(absolutePath);
      }
      return webpackConfig;
    },
  },
  babel: {
    presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return {
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
        ...babelLoaderOptions,
      };
    },
    plugins: [...emotionBabelPreset.plugins],
  },
};
