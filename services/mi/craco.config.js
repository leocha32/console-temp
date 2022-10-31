const fs = require('fs');
const emotionPresetOptions = {};
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPresetOptions,
);
const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const absolutePath = path.join(__dirname, '../mi-ui');
const evalSourceMap = require('react-dev-utils/evalSourceMapMiddleware');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const noopServiceWorker = require('react-dev-utils/noopServiceWorkerMiddleware');
const TerserPlugin = require('terser-webpack-plugin');
const posixPath = require('path/posix');

module.exports = {
  devServer: (devServerConfig, { env, paths }) => {
    devServerConfig = {
      hot: true,
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app);
        }

        middlewares.push(
          evalSourceMap(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorker(paths.publicUrlOrPath),
        );

        return middlewares;
      },
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
          target: 'https://mi-console-api-dev-dkptan5aba-du.a.run.app',
          changeOrigin: true,
          secure: false,
        },
      },
    };

    return devServerConfig;
  },

  webpack: {
    alias: {},
    plugins: [],
    alias: {
      $components: posixPath.resolve(__dirname, 'src/components'),
      $constants: posixPath.resolve(__dirname, 'src/constants'),
      $modules: posixPath.resolve(__dirname, 'src/modules'),
      $pages: posixPath.resolve(__dirname, 'src/pages'),
      $recoils: posixPath.resolve(__dirname, 'src/recoils'),
      $types: posixPath.resolve(__dirname, 'src/types'),
      $utils: posixPath.resolve(__dirname, 'src/utils'),
    },
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
    plugins: [...emotionBabelPreset.plugins],
  },
};
