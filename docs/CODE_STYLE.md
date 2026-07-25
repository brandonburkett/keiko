# Code style

Conventions for this repo, covering how the project is organized and how to write the Vue
and TypeScript. Prettier owns formatting, so the code rules below only cover the choices
Prettier does not make.

## Project structure

```text
src/
├─ views/            one .vue per route, composed from components
├─ components/       reusable presentational components, PageFull.vue is the layout wrapper
├─ stores/           Pinia stores plus their colocated *.test.ts
├─ router/           route table
├─ assets/           images imported by components
├─ types/            shared type declarations
└─ main.ts           mounts the app, installs Pinia and the router
public/              copied verbatim into dist (favicon)
docs/                project docs (this file, BACKLOG.md)
```

- Components and views are PascalCase `.vue`, everything else is camelCase `.ts`.
- Cross-folder imports use the `@/*` alias, same-folder imports stay relative (`./`).
- Tests colocate as `*.test.ts` next to the code they cover.

### Vue components

- `<script setup lang="ts">` and the Composition API. No Options API in components, no `defineComponent`.
- Type props with an `interface Props`, then `withDefaults(defineProps<Props>(), {...})`.
- Keep components small and presentational. Derived state belongs in store getters, not
  recomputed in several components.
- Tailwind utilities go inline in the template. Theme tokens live in the `@theme` block in
  `App.vue`, add a token there rather than a one-off hex value.
- Use `svh` units for full-height layout, mobile Safari gets `vh` wrong.

---

## Formatting is Prettier's job

- Prettier is the source of truth for formatting, do not hand-format code.
- Run `npm run prettier:write` before committing, or `npm run prettier:check` to verify.
- The pre-commit hook formats and lints staged files, config lives in `.prettierrc`.

### Small, focused files

Prefer small, single-purpose files over one large module. Split pure logic away from
component wiring so the logic can be unit-tested on its own.

- One clear responsibility per file.
- Keep pure, testable functions separate from the code that touches the DOM or the network.
- If a file is hard to test or hard to name, it is probably doing too much, so split it.

---

## TypeScript rules

### No single-letter names

Avoid single-letter variable names, a name should say what the value holds. It does not
need to be verbose, common abbreviations are fine (`len`, `btn`, `io`), and common
single-letter variables like `i`, `x`, and `y` are acceptable.

```ts
// avoid
const m = i % len;
list.forEach((w) => mark(w.order));

// good
const remainder = i % len;
list.forEach((waza) => mark(waza.order));
```

### Brace every `if`

Always wrap `if` bodies in braces, even a single statement. No bracketless ifs.

```ts
// good
if (!waza) {
  return;
}

// avoid
if (!waza) return;
```

### Early returns over `else`

Prefer guard clauses that return early. Drop the `else` when an early return makes it redundant.

```ts
// good
function label(waza) {
  if (!waza) {
    return 'none';
  }
  return waza.name;
}

// avoid
function label(waza) {
  if (!waza) {
    return 'none';
  } else {
    return waza.name;
  }
}
```

### Optional chaining only when truly optional

Use `?.` only when the value can genuinely be null or undefined. Reaching for it on a
value that is always present hides real bugs, a missing value should throw, not pass silently.

```ts
// good, nextWaza is null once the series is finished
const name = store.nextWaza?.name;

// avoid, `props` is always defined here
const size = props?.size;
// write: const size = props.size;
```

### Nullish coalescing over `||`

Prefer `??` when the fallback should apply only to null or undefined. `||` also fires on
`0`, `''`, and `false`, which is usually a bug.

```ts
// good, a real 0 is kept
const order = waza.order ?? 1;

// bug, 0 becomes 1
const order = waza.order || 1;
```

Use `||` only when you truly want the fallback for every falsy value.

### No `any`, sparing `as`

Never use `any` or `as any`. Reach for `unknown` and narrow, or write a real type. Avoid
`as` assertions in general, prefer proper types or a type guard.

```ts
// avoid, `any` throws away all type safety
const attrs = rest as Record<string, any>;
```

### Avoid non-null assertions

In `src`, do not use the `!` non-null assertion. Prefer an explicit check with an early
return so a missing value fails loudly at its source. Tests may use `!` on fixtures they control.

```ts
// good
const next = store.nextWaza;
if (!next) {
  return;
}
markComplete(next);

// avoid
markComplete(store.nextWaza!);
```

### `const` by default

Use `const`. Reach for `let` only when a value is genuinely reassigned.

### Avoid nested ternaries

A single ternary is fine and encouraged for a short either/or value. Just never nest them,
nested ternaries are hard to scan. For more than two branches, reach for early returns, an
if/else chain, or a small lookup, whichever reads most clearly.

```ts
// good, a single ternary
const label = loading ? 'Loading...' : props.label;

// avoid, nested ternary
const size = large ? 'lg' : medium ? 'md' : 'sm';

// good, use a lookup for more than two branches
const PADDING = { small: 'py-1 px-2', medium: 'py-2 px-5', large: 'py-3 px-6' };
const padding = PADDING[props.size];
```

### Prefer named exports

Use named exports in `.ts` files, not default exports. A named export keeps one name across
every import, so rename and find-references stay reliable, and editor auto-import works better.

Default exports are only for places a tool requires them, like `.vue` components, which the
SFC compiler default-exports for you, and the router module.

```ts
// good, named export, one name at every import
export const useWazaStore = defineStore('waza', {});
import { useWazaStore } from '@/stores/wazaStore';
```

### No commented-out code

Delete dead code instead of commenting it out. Git history is the archive. Commented-out
blocks go stale, mislead readers, and hide from refactors and type-checking.
