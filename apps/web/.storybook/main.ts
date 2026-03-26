import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  viteFinal: async (config) => {
    config.resolve ??= {};
    const srcAlias = { '@': path.resolve(dirname, '../src') };
    config.resolve.alias = Array.isArray(config.resolve.alias)
      ? [...config.resolve.alias, srcAlias]
      : { ...(config.resolve.alias ?? {}), ...srcAlias };

    return config;
  },
};

export default config;
