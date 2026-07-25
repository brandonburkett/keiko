import js from '@eslint/js';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintConfigPrettier from '@vue/eslint-config-prettier';

export default [
  // standalone ignores object, this is the global ignore list
  { ignores: ['dist/**', 'coverage/**', 'public/**'] },
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

  // CommonJS config files, flat config dropped support for /* eslint-env node */
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
];
