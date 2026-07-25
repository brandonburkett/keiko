import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintConfigPrettier from '@vue/eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist/**', 'coverage/**', 'public/**']),

  js.configs.recommended,
  ...vueTsEslintConfig({
    supportedScriptLangs: { ts: true, js: true },
    rootDir: import.meta.dirname,
  }),
  eslintConfigPrettier,

  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: { globals: globals.browser },
  },

  // config files at the root run in node, not the browser
  {
    files: ['*.config.{mjs,mts}'],
    languageOptions: { globals: globals.node },
  },
]);
