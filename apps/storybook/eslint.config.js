import { config } from '@repo/eslint-config/base'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  ignores: ['dist'],
	root: true,
	extends: ["@repo/eslint-config/library.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
	  project: true,
	},
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
  