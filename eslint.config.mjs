import typescriptParser from '@typescript-eslint/parser';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginMaterialUI from 'eslint-plugin-material-ui';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    languageOptions: {
      parser: typescriptParser,  // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Define global variables if needed
      },
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': eslintPluginTypescript,
      'react-hooks': eslintPluginReactHooks,
      'material-ui': eslintPluginMaterialUI,
    },
    rules: {
      'react/prop-types': 'off',  // TypeScript does the type checking
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn about unused variables
    },
  },
];
