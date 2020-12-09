module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
