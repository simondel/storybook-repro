// import "../projects/angular-components/src/scss/all.scss";
module.exports = {
  stories: ['../projects/angular-components/src/**/*.stories.ts'],
  addons: [
      '@storybook/addon-storysource',
      '@storybook/addon-knobs',
      '@storybook/addon-viewport',
      '@storybook/addon-actions',
      '@storybook/addon-controls'
  ],
  features: {
    postcss: false,
  },
};
