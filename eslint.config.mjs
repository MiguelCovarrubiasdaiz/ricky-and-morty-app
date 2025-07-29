import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Configuraciones base
  js.configs.recommended,
  ...compat.extends(
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'prettier'
  ),

  // Configuración TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
      tailwindcss: tailwindcss,
    },
    rules: {
      // Reglas de TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

      // Reglas generales
      'no-console': 'warn',
      'no-unused-vars': ['error', {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],

      // Reglas de React
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',

      //Configuración de Prettier
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      // Reglas para TailwindCSS
      'tailwindcss/classnames-order': 'error', // Ordenar clases de Tailwind
      'tailwindcss/no-custom-classname': 'off', // Desactivar reglas que previenen clases personalizadas
    },
  },

  // Ignora ciertos archivos y directorios
  {
    ignores: ['node_modules/**', '.next/**', 'build/**', 'dist/**', 'public/**', 'cache/**'],
  },
];

export default eslintConfig;
