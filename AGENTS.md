# AGENTS.md

Guidance for AI agents and contributors working in the OpenComponents monorepo.

## Mission

OpenComponents is one design system with three native renderers. Every component must work as a
**Web Component**, a **React component**, and an **Angular directive**, sharing a single headless
definition and a single set of design tokens. The React sources are also published through a
**shadcn-compatible registry**.

## Repository map

```
apps/
  docs/                  Astro showcase & docs site; serves the registry JSON
  playground-web/        Vite app consuming @open-components/ui-web
  playground-react/      Vite app consuming @open-components/ui-react
  playground-angular/    Angular app consuming @open-components/ui-angular
packages/
  tokens/                CSS variables (OKLCH) + Tailwind v4 @theme mapping
  utils/                 cn() (clsx + tailwind-merge), cva re-exports — pure functions
  core/                  Headless logic + CVA variant definitions (single source of truth)
  ui-web/                Lit custom elements (light DOM, role/keyboard semantics)
  ui-react/              React 19 function components (registry source)
  ui-angular/            Angular standalone attribute directives (signal inputs)
  registry/              Registry manifest/builder → shadcn registry JSON
```

Dependency direction is strictly one-way:

```
tokens ─┐
utils ──┼──► core ──► ui-web
        │           ├─► ui-react
        │           └─► ui-angular
        └──► ui-*
```

`ui-web`, `ui-react` and `ui-angular` must never depend on each other.

## Golden rules (non-negotiable)

1. **Three implementations per component.** No component ships unless it exists in `ui-web`,
   `ui-react`, and `ui-angular`, has a docs page, and has a registry item.
2. **One source of variants.** Styling variants live in `packages/core/src/<component>/` and are
   imported by every renderer. Never fork a class list into a renderer.
3. **Tokens only.** Colors, radii and borders come from `@open-components/tokens`. Never hardcode a
   color or use a raw Tailwind palette color in component variants (consumer overrides are fine).
4. **cn() for merging.** All renderers merge consumer classes with `cn()` from
   `@open-components/utils` (React/Ng) or the `OcElement` base class (WC).
5. **API parity.** The same props/variants/sizes and the same data attributes (`data-slot`) across
   all three frameworks. Document any deliberate difference.
6. **Registry stays self-contained.** A generated registry item must not import
   `@open-components/*`. The builder rewrites imports; validation fails the build otherwise.
7. **Framework-free core.** `core`, `utils` and `tokens` must not import React, Angular or Lit.

## Commands

| Command                                                   | Purpose                                               |
| --------------------------------------------------------- | ----------------------------------------------------- |
| `pnpm install`                                            | Install the workspace (pnpm catalogs share versions)  |
| `pnpm dev`                                                | Run every dev task (docs + playgrounds) through Turbo |
| `pnpm build`                                              | Build every package and app                           |
| `pnpm test`                                               | Run all unit tests                                    |
| `pnpm typecheck`                                          | Typecheck every package/app                           |
| `pnpm lint`                                               | ESLint (flat config)                                  |
| `pnpm format`                                             | Prettier write                                        |
| `pnpm gen:component <name>`                               | Scaffold a new component across all packages          |
| `pnpm --filter @open-components/docs dev`                 | Docs site only                                        |
| `pnpm --filter @open-components/docs build`               | Docs + registry build (GitHub Pages artifact)         |
| `pnpm --filter @open-components/registry build`           | Generate `registry.json` + `r/*.json`                 |
| `pnpm --filter @open-components/registry validate:shadcn` | Validate with the official shadcn CLI                 |
| `pnpm changeset`                                          | Record a version bump                                 |

Turbo task graph: `build` → `typecheck`/`test` depend on `^build`; `dev` depends on `^build`.

## Adding a component

1. Run `pnpm gen:component <name>` (kebab-case). It creates the core variants, React component,
   Lit element and Angular directive.
2. Fill in the variant definitions in `packages/core/src/<name>/`.
3. Implement the renderers, keeping the same props and `data-slot`.
4. Add tests: core variants, React (Testing Library), Web Components (Vitest + jsdom).
5. Add the component to `apps/docs/src/lib/site.ts` and `snippets.ts`, and add a demo to
   `apps/docs/src/components/Showcase.tsx`.
6. Add an entry to `packages/registry/registry.config.mjs` if the generator did not.
7. Run `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`, and
   `pnpm --filter @open-components/registry validate:shadcn`.
8. Add a changeset (`pnpm changeset`, patch for fixes, minor for components).

## Definition of done for a component

- [ ] `core`: variants/constants + types + unit test
- [ ] `ui-react`: typed component, `data-slot`, `cn()` merge, test
- [ ] `ui-web`: light-DOM custom element, host class merging, keyboard/ARIA where interactive, test
- [ ] `ui-angular`: standalone attribute directive (or component), signal inputs, host class binding
- [ ] Docs page with React live preview, Web Component live preview, and React/Angular/Web snippets
- [ ] Registry item builds and validates (`validate:shadcn`)
- [ ] API parity table/notes if there are intentional differences
- [ ] Changeset added

## Styling architecture

- Tokens: `packages/tokens/src/tokens.css` (`:root` + `.dark`) and `theme.css`
  (`@theme inline`, radius scale, base layer).
- Variants: CVA in `core`; className merging with `tailwind-merge`.
- Web Components render into the **light DOM** (`createRenderRoot()` returns `this`). This is
  deliberate: the consumer's Tailwind stylesheet applies directly, and `class` utilities merge on
  the host. `OcElement.syncClasses()` keeps variant classes in sync while preserving consumer
  classes.
- Because colors resolve to CSS variables, components do not need `dark:` variants to react to the
  theme; the `.dark` class swaps variables.
- Interactive WC elements use ARIA roles on the host (`oc-button` → `role="button"`, keyboard
  activation). Native form participation is only available in React/Angular renderers; document it.

## Registry rules

- `packages/registry/registry.config.mjs` is the manifest. Each component declares its React source
  and its core variant module.
- The builder inlines both files into the item, rewrites `@open-components/utils` →
  `@/lib/utils` and `@open-components/core/<name>` → `./<name>-variants`, and emits `registry.json`
  plus `r/<item>.json`.
- `utils` and `theme` items are generated automatically (`cn()` helper and token `cssVars`).
- The docs build copies the registry into `apps/docs/public`, so the hosted registry stays in sync.
- Generated registry output is git-ignored. Never edit it by hand.

## Conventions

- TypeScript strict; ESM only; `paths`/`workspace:*` for internal imports.
- Subpath exports per component (`@open-components/ui-react/button`) plus a root barrel.
- File naming: kebab-case; Angular directives use `*.directive.ts`.
- React 19: ref-as-prop, no `forwardRef`.
- Angular 20: standalone directives, `input()` signals, OnPush-safe (no `NgZone` assumptions).
- Lit 3: decorator-free `static properties` API for maximum bundler compatibility.
- Prefer semantic HTML and `data-slot` attributes for styling/testing hooks.
- Tests live next to sources (`*.test.ts[x]`).

## Known limitations / roadmap

- Playwright visual regression and cross-framework e2e are planned (M6).
- Angular unit tests currently rely on a build + playground verification; a Vitest/AnalogJS harness
  is planned.
- The docs site shows live React and Web Component previews; Angular is documented through code
  snippets and the Angular playground (an Astro/AnalogJS live island is planned).
- Web Component buttons do not submit native forms (use React/Angular for forms).
- Shadow DOM is intentionally not used; style encapsulation is traded for Tailwind compatibility.
