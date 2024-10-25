// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['node_modules/**', 'build/**/*'],
  },
  {
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        "@typescript-eslint/ban-ts-comment": ["error", {"ts-ignore": "allow-with-description"}]
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
    ],
  }),
];