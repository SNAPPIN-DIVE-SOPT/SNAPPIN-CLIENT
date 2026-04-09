import config from '@snappin/eslint-config/next';

export default [
  ...config,
  {
    ignores: ['storybook-static/**'],
  },
];
