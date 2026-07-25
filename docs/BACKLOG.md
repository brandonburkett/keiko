# Backlog

Deferred follow-ups. Not blocking, tackled as time allows.

## Priority

| Priority  | Item                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| 🔴 High   | [Completed count is not scoped to the selected series](#completed-count-is-not-scoped-to-the-selected-series) |
| 🟡 Medium | [Add an S3 lifecycle rule for assets/](#add-an-s3-lifecycle-rule-for-assets)                                  |
| 🟡 Medium | [Delete dead code](#delete-dead-code)                                                                         |
| 🟡 Medium | [TypeScript 7](#typescript-7)                                                                                 |
| 🟢 Low    | [Deduplicate the series filter in the store](#deduplicate-the-series-filter-in-the-store)                     |
| 🟢 Low    | [Persist progress across reloads](#persist-progress-across-reloads)                                           |
| 🟢 Low    | [Widen the prettier globs](#widen-the-prettier-globs)                                                         |
| 🟢 Low    | [Refresh the README](#refresh-the-readme)                                                                     |
| 🟢 Low    | [Drop the js-beautify override](#drop-the-js-beautify-override)                                               |

## Add an S3 lifecycle rule for assets/

- `production.sh` syncs `dist/assets` without `--delete`, so a client holding the previous
  `index.html` can still fetch the hashes it names. Orphaned hashes otherwise accumulate forever.
- Deferring is safe, nothing breaks without the rule. The prefix just grows by one build's worth
  of assets per deploy, roughly 150kB, so this is housekeeping rather than a fix.
- Add a bucket lifecycle rule expiring `assets/` objects after a year, matching the immutable
  Cache-Control. `put-bucket-lifecycle-configuration` replaces every existing rule, so read the
  current config first.
- The rule only expires orphans because each CI build writes fresh mtimes, so `aws s3 sync`
  re-uploads and re-dates the whole current asset set every deploy.

## Delete dead code

- `src/App.vue` still carries the commented-out `setFullHeight` block, superseded by `h-svh`.
- `src/types/interfaces.ts` is an empty file.

## TypeScript 7

- Held at 5.9 in the July 2026 refresh. The native port needs `vue-tsc` and the Vue ESLint configs
  to support it first, recheck their peer ranges before trying.

## Completed count is not scoped to the selected series

- `completedTotal`, `remaining`, and `percentComplete` all use `Object.keys(state.completed).length`,
  which counts completions across every series, but compare it against the selected series only.
- Complete a few shoden waza, then `setSeriesFocus('chuden')` without `resetComplete`, and remaining
  is short by the shoden count and percent can exceed 100.
- Not reachable in the current UI, `TrainingView` sets the series once on mount and Restart resets
  before going home. It becomes a real bug the moment series can be switched mid-session.
- Fix by filtering `completed` keys by the selected series, then add the regression tests.

## Deduplicate the series filter in the store

- `total`, `percentComplete`, `remaining`, and `nextWaza` each re-derive "the list for the
  selected series" with the same three lines. Extract one getter and have the rest read it.

## Persist progress across reloads

- `completed` is in-memory only, so a refresh mid-session loses the training run.
- localStorage would be enough, no backend needed.

## Widen the prettier globs

- `prettier:write` and `prettier:check` target `{js,vue,css,scss}`, so no `.ts`, `.mts`, or `.mjs`
  file has ever been formatted by them, and there is no `.scss` in the repo.
- Widening to `{js,mjs,cjs,ts,mts,vue,css}` is correct but reformats existing TypeScript on the
  first run, so do it as its own commit.

## Refresh the README

- The TODO section lists work that is now done (tailwind and vite, lint-staged and husky, example
  vitest). Prune it and drop the Volar Take Over Mode instructions, they predate the current tooling.

## Drop the js-beautify override

- `overrides` pins `js-beautify` to v2 so `@vue/test-utils` stops resolving the vulnerable
  `editorconfig` and `glob` chain. Remove it once test-utils depends on js-beautify 2 directly.
- Verify with `npm audit` (expect zero) and the `wrapper.html()` assertion in `BaseButton.test.ts`.
