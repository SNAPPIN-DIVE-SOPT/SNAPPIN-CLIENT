/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@snappin/design-system$': '<rootDir>/../../packages/design-system/src/ui/index.ts',
    '^@snappin/design-system/(.*)$': '<rootDir>/../../packages/design-system/src/$1',
    '^@snappin/shared/(.*)$': '<rootDir>/../../packages/shared/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
