import js from '@eslint/js';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintConfigPrettier from '@vue/eslint-config-prettier';

export default [
  {
    files: [
      '**/*.vue',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    ignores: [
      "**/public",
      "**/node_modules",
    ],
  },
  js.configs.recommended,
  ...vueTsEslintConfig({
    supportedScriptLangs: {
      ts: true,
      js: true,
    },
    rootDir: import.meta.dirname,
  }),
  eslintConfigPrettier,

  // custom overrides
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {},
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          es6: true,
          classes: true,
        },
      },
    },
    rules: {
      // "no-console": 0,
      // indent: "off",
      // "space-before-function-paren": 0,
      //
      // "no-unused-vars": ["error", {
      //   vars: "all",
      //   args: "none",
      //   ignoreRestSiblings: false,
      //   argsIgnorePattern: "^h$",
      // }],
      //
      // "vue/multi-word-component-names": 0,
      //
      // "@typescript-eslint/no-explicit-any": 1,
    },
  },
];
