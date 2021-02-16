module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // typescript will handle this for us
    'no-undef': 'off',

    // I know what I'm doing
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
