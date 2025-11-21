import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import nextPlugin from 'eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').FlatConfig[]} */
export default [
  // Base configuration for JavaScript/TypeScript
  ...compat.extends('next/core-web-vitals'),

  // TypeScript specific rules
  ...compat.extends('next/typescript'),

  // Prettier (must be last to override other formatting rules)
  prettierConfig,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    rules: {
      // Import organization
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // React rules
      'react/no-unused-vars': 'error',
      'react/prop-types': 'off', // Using TypeScript instead

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',

      // Performance
      'react/jsx-no-jsx-as-prop': 'error',
      'react/void-dom-elements-no-children': 'error',

      // Code quality
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
    },
  },

  // Special rules for Next.js specific files
  {
    files: ['pages/**/*.{js,jsx,ts,tsx}', 'next.config.js'],

    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Special rules for test files
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],

    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore build output and dependencies
  {
    ignores: [
      '.next/',
      'out/',
      'node_modules/',
      'dist/',
      'build/',
      '*.min.js',
      'public/',
    ],
  },
];
