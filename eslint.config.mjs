import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintConfigPrettier from '@vue/eslint-config-prettier';

export default defineConfig([
  // aws is the AWS CLI that CircleCI unzips into the project during CI, not our source
  globalIgnores(['dist/**', 'coverage/**', 'public/**', 'aws/**', 'awscliv2.zip']),

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
