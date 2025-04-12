import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // Applies to JS and JSX files
    languageOptions: {
      globals: {
        ...globals.node, // Adds Node.js globals
        ...globals.browser, // Adds browser globals (useful for React Native)
        __DEV__: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        sourceType: 'module', // Use ES modules
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
  js.configs.recommended, // Recommended config for JavaScript
  {
    plugins: {
      react: react, // Plugin object for React
    },
    rules: {
      ...react.configs.recommended.rules, // Include recommended React rules
    },
  },
  {
    plugins: {
      'react-native': reactNative, // Plugin object for React Native
    },
    rules: {
      'react-native/no-unused-styles': 'error', // Prevents unused styles
      'react-native/split-platform-components': 'error', // Splits components by platform
      'react-native/no-inline-styles': 'error', // Prevents inline styles
      'react-native/no-color-literals': 'error', // Prevents color literals
      'react/react-in-jsx-scope': 'off', // No need to import React with JSX
      'no-console': 'warn', // Warns for console.log()
      'max-depth': ['warn', 3], // 🚨 Aviso com mais de 3 níveis de aninhamento
      'import/no-unresolved': [
        'error',
        {
          caseSensitive: true, // Garantir que a verificação seja sensível a maiúsculas/minúsculas
        },
      ],
      //'complexity': ['warn', 5], // (opcional) Limita complexidade ciclomática
    },
  },
  {
    plugins: {
      import: importPlugin, // Adicionando o plugin import
    },
  },
  {
    rules: {
      ...prettier.rules, // Disable conflicting rules for Prettier
    },
  },
];
