var path = require('path');

module.exports = function({ config }) {
    config.module.rules.push({
      test: /\.stories\.ts$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    },
    {
      test:/\.scss$/,
      loaders: ['sass-loader'],
      include: path.resolve(__dirname, "../projects/angular-components/src/scss")
    });

    return config;
  };
