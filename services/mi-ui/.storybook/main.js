const emotionPresetOptions = {};

const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, emotionPresetOptions);
module.exports = {
  babel: async (options) => ({
    ...options,
    ...{
      plugins: [...emotionBabelPreset.plugins],
    },
  }),
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    check: true,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
