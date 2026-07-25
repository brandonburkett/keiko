# Backlog

Deferred follow-ups. Not blocking, tackled as time allows.

## Priority

| Priority  | Item                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| 🔴 High   | [Pick one Tailwind integration](#pick-one-tailwind-integration)                           |
| 🟡 Medium | [Held major upgrades](#held-major-upgrades)                                               |
| 🟡 Medium | [Delete dead code](#delete-dead-code)                                                     |
| 🟢 Low    | [Deduplicate the series filter in the store](#deduplicate-the-series-filter-in-the-store) |
| 🟢 Low    | [Persist progress across reloads](#persist-progress-across-reloads)                       |
| 🟢 Low    | [Refresh the README](#refresh-the-readme)                                                 |
| 🟢 Low    | [Dev-only audit advisories](#dev-only-audit-advisories)                                   |

## Pick one Tailwind integration

- `vite.config.mts` uses `@tailwindcss/vite` and `postcss.config.cjs` uses `@tailwindcss/postcss`,
  so Tailwind is wired in twice. Keep the Vite plugin, drop the PostCSS config.
- `autoprefixer` and `postcss` are declared as dependencies but are not in the plugin list, so
  autoprefixing never actually runs. Tailwind 4 prefixes via lightningcss, so removing them is
  likely correct, verify against `browserslist` first.

## Held major upgrades

Deliberately held back in the July 2026 refresh, each needs its own pass:

- `eslint` 10 and `@eslint/js` 10, drops the `/* eslint-env */` shim and changes config defaults.
- `typescript` 7, the native port, needs `vue-tsc` and the Vue ESLint configs to catch up.
- `vite` 8, verify the Tailwind plugin and the S3 asset hashing still behave.
- `pinia` 4 and `vue-router` 5, both have breaking API changes to audit against the store and router.

## Delete dead code

- `src/App.vue` still carries the commented-out `setFullHeight` block, superseded by `h-svh`.
- `src/types/interfaces.ts` is an empty file.

## Deduplicate the series filter in the store

- `total`, `percentComplete`, `remaining`, and `nextWaza` each re-derive "the list for the
  selected series" with the same three lines. Extract one getter and have the rest read it.

## Persist progress across reloads

- `completed` is in-memory only, so a refresh mid-session loses the training run.
- localStorage would be enough, no backend needed.

## Refresh the README

- The TODO section lists work that is now done (tailwind and vite, lint-staged and husky, example
  vitest). Prune it and drop the Volar Take Over Mode instructions, they predate the current tooling.

## Dev-only audit advisories

- `npm audit` reports 9 high advisories, all transitive DoS issues in `minimatch` and
  `brace-expansion` reached through `eslint` and `@vue/test-utils` → `js-beautify`.
- Nothing ships to the browser bundle. Clears when those upstream packages update, no action needed
  beyond rechecking after the ESLint 10 upgrade.
