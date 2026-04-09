/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  semi: true,
  printWidth: 100,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};
