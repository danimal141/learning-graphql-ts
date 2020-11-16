module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'linebreak-style': ['error', 'unix'],
    'space-infix-ops': 'error',
    'no-multiple-empty-lines': [2, { 'max': 1 }],
    indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
