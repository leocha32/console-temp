const emotionPresetOptions = {};
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPresetOptions,
);
const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const absolutePath = path.join(__dirname, '../mi-ui');
const posixPath = require('path/posix');
const CircularDependencyPlugin = require('circular-dependency-plugin');

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
          target: env === 'development' ? process.env.DEV_API : process.env.PROD_API,
          // target: 'https://mi-console-api-v2-dev-dkptan5aba-du.a.run.app',
          changeOrigin: true,
          secure: false,
        },
        '/auth/*': {
          target: 'https://tools.coway.do',
          headers: {
            'Origin-System': 'cw-mi-console',
            'Origin-Token': 'x/WqEGFHcCkKP6n+G8W8HQ==',
          },
          pathRewrite: { '^/auth': '' },
          changeOrigin: true,
          secure: false,
        },
        '/profile/*': {
          target: 'https://profile.coway.do',
          headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml',
          },
          pathRewrite: { '^/profile': '' },
          changeOrigin: true,
          secure: false,
        },
      },
    };

    return devServerConfig;
  },
  webpack: {
    entry: './src/app.tsx',
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
    plugins: [
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.tsx|node_modules/,
        // include specific files based on a RegExp
        include: /src/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ],
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
