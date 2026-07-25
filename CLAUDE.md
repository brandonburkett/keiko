# CLAUDE.md

Keiko, a training aid that semi-randomly displays MJER waza names. A **Vue 3** SPA built with Vite.

## Commands

- `npm run dev`, dev server (http://localhost:5173)
- `npm run build`, type-check plus production build to `dist/`
- `npm run build-only`, skip the type-check, this is what CI runs
- `npm run preview`, serve the built site
- `npm run type-check`, `vue-tsc` over the app and tests
- `npm run test:unit`, Vitest single run. `npm run test:watch` for watch mode
- `npm run lint`, ESLint. `npm run prettier:write`, format (`prettier:check` to verify)

## Architecture

- Client-rendered SPA, no SSR. `index.html` mounts `src/main.ts`, which installs Pinia and the router, then mounts `App.vue`.
- Routing in `src/router/index.ts` with `createWebHistory`. `/` is eager, `/training` is lazy-imported so it code-splits into its own chunk.
- All state lives in one Pinia options store, `src/stores/wazaStore.ts`. It holds the waza list as literal seed state, plus `completed`, `selectedSeries`, and `selectedOrder`.
  - Getters derive everything, `total`, `remaining`, `percentComplete`, and `nextWaza`. Filtering by series is repeated across those getters, so a change to that logic touches several of them.
  - `nextWaza` returns null when the selected series is finished, callers must handle that.
  - Actions are the only writers, `markComplete`, `resetComplete`, `setSeriesFocus`, `setOrder`. Completion keys are `` `${seriesKey}-${order}` ``.
  - State is in-memory only, a reload starts over.
- Views in `src/views/` compose reusable pieces from `src/components/`. `PageFull.vue` is the layout wrapper (header, slot, footer), the rest are small presentational components.
- **Tailwind 4** is the styling system, configured through the `@tailwindcss/vite` plugin. Theme customizations live in the `@theme` block inside `App.vue`, not a `tailwind.config.js`. There is no separate CSS file, components carry utility classes inline.
- Mobile Safari viewport handling matters here, use `svh` units (`h-svh`, `calc(100svh-8rem)`), not `vh` or `dvh`.
- Deployed as static files to S3 behind CloudFront. History-mode routing means the bucket must serve `index.html` for unknown paths.

## Conventions

- TypeScript strict throughout. Vue 3 `<script setup lang="ts">` SFCs, Composition API only.
- Props are typed with an `interface Props` plus `withDefaults(defineProps<Props>(), {...})`.
- Imports: `@/*` → `src/*` alias for cross-folder imports, same-folder stays relative (`./`).
- Components are PascalCase `.vue` files, stores are camelCase `.ts`.
- Node 24.18.0 (`.nvmrc`), `engines` requires >= 24. CircleCI runs the same image.
- Project structure and code style (braces, early returns, `??` over `||`, no `any`) live in [docs/CODE_STYLE.md](docs/CODE_STYLE.md).
- Known follow-ups are tracked in [docs/BACKLOG.md](docs/BACKLOG.md).

## Tests

- Vitest with jsdom, run from `--root src/`, so specs live under `src/`.
- Colocate specs next to the code, `wazaStore.ts` pairs with `wazaStore.spec.ts`.
- Pinia stores need a fresh instance per test, `setActivePinia(createPinia())` in `beforeEach`.
- `nextWaza` uses `Math.random()` in random mode, assert on properties that hold for any pick (series, membership) or force sequential order.

## Commits

- Before committing, run `npm run type-check`, `npm run lint`, and `npm run test:unit`, and make sure all pass. The pre-commit hook runs lint-staged over staged files, it is not a full check.
- Single-line [Conventional Commits](https://www.conventionalcommits.org/) subject, e.g. `feat: add okuden series toggle`. No body unless essential.
- Keep the `Co-Authored-By:` footer on every commit.

## Pull requests

- PRs use `.github/pull_request_template.md`: Description, Screenshots, Special considerations / tech debt / regressions.
- Screenshots, for visible changes: `npm run build && npm run preview`, capture the affected views at mobile and desktop widths, then drag them into the PR body.

## Comments

- If code is self-documenting, do not leave a comment.
- If leaving a comment, explain why, not what. One short line, and only for non-obvious rationale. Be concise.
- No narration or restating the code. No references to old/removed files or paths.
- Avoid explaining what callers will do.
- No emdashes or semicolons, prefer commas.
- Do not leave commented-out code behind, delete it, git remembers.

## Writing style

Applies to prose you write here (README, docs) and to chat replies:

- No emdashes. Use commas, or split into two sentences.
- Avoid semicolons, use them only when truly necessary.
- Prefer short, simple sentences joined with commas.
- Prefer bullets over long paragraphs. Be concise.

## Deploy

- CircleCI (`cimg/node:24.18.0`) on push to `master`: `npm install` → `npm run build-only` → S3 sync → CloudFront invalidation.
- `aws s3 sync ./dist s3://$AWS_S3_BUCKET --delete` with a flat `max-age=86400` Cache-Control on everything.
- The deploy job does not run type-check, lint, or tests, so those have to pass locally before merge.
