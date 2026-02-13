import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['node_modules', '.next', 'out', 'public']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],

      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'error',
      'react/prop-types': 'off', 

      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-shadow': 'off', 
      '@typescript-eslint/no-shadow': 'error',

      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        }
      ],
      'import/no-default-export': 'off', 
      'import/prefer-default-export': 'off',

      'no-console': ['warn', { allow: ['error', 'warn'] }], 
      'no-alert': 'off', 
      'max-len': ['warn', { code: 120, ignoreUrls: true }],
    }
  }
);