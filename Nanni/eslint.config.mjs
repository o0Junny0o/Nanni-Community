import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/node_modules/**'], // Ignorar node_modules para evitar erros de parse
  },
  // Configuração recomendada básica do ESLint
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['**/node_modules/**'],
    languageOptions: {
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      // Resolver de módulos:
      'import/resolver': {
        node: {
          paths: ['node_modules'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        'react-native': {
          paths: ['node_modules'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      // Regras de React Native
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',

      // Regras Gerais
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'max-depth': ['warn', 3],
      // 'complexity': ['warn', 5], // opcional

      // Import
      'import/no-unresolved': [
        'error',
        {
          caseSensitive: true,
        },
      ],
      'import/no-duplicates': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'off',
    },
  },
  {
    files: ['src/service/firebase/conexao.js'],
    rules: {
      'import/named': 'off',
    },
  },
  {
    rules: {
      ...prettier.rules, // Desativa regras que conflitam com o Prettier
    },
  },
];
