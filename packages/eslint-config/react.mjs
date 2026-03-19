import fs from 'node:fs';
import path from 'node:path';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import baseConfig from './base.mjs';

const projectRoot = process.cwd();
const toPosixPath = (value) => value.replaceAll('\\', '/');
const tsconfigCandidates = ['tsconfig.json', 'tsconfig.storybook.json']
  .map((file) => path.join(projectRoot, file))
  .filter((file) => fs.existsSync(file))
  .map(toPosixPath);

export default [
  ...baseConfig,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: tsconfigCandidates,
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    },
  },
];
