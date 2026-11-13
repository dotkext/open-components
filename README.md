# OpenComponents

One design system. Three native renderers. shadcn-registry compatible.

OpenComponents ships the same UI components as **Web Components**, **React** components, and
**Angular** directives. A framework-agnostic core holds the component logic and CVA variants, while
each renderer stays thin. Design tokens are shadcn-compatible CSS variables, so every renderer
themes identically.

```
                ┌───────────────┐
                │  design tokens │  CSS variables (OKLCH) + Tailwind v4 @theme
                └───────┬───────┘
                        │
                ┌───────▼───────┐
                │  headless core │  CVA variants + behavior
                └───┬───┬───┬───┘
                    │   │   │
        ┌───────────┘   │   └───────────┐
┌───────▼──────┐ ┌──────▼───────┐ ┌─────▼────────┐
│  ui-web      │ │  ui-react     │ │  ui-angular  │
│  <oc-button> │ │  <Button />   │ │  ocButton    │
└──────────────┘ └──────┬───────┘ └──────────────┘
                        │
                ┌───────▼───────┐
                │ shadcn registry │  copy React source into any project
                └───────────────┘
```

## Features

- **Native implementations** — Lit custom elements (light DOM), React 19 function components,
  Angular 20 standalone attribute directives. No wrappers or runtime bridges.
- **One source of truth** — CVA variants and component logic live in `@open-components/core`.
- **Tailwind v4 + `cn()`** — every renderer merges consumer classes with tailwind-merge.
- **shadcn-compatible tokens** — OKLCH CSS variables, `.dark` theme, `@theme inline` mapping.
- **shadcn registry** — install the React source with the shadcn CLI, including the shared variant
  module and `cn()` helper.
- **Docs & showcase** — Astro site with live React and Web Component previews plus framework code
  tabs, and a hosted registry at `/registry.json`.

## Components

| Component         | Web Component                    | React                          | Angular                           |
| ----------------- | -------------------------------- | ------------------------------ | --------------------------------- |
| Button            | `<oc-button>`                    | `<Button />`                   | `button[ocButton]`                |
| Badge             | `<oc-badge>`                     | `<Badge />`                    | `span[ocBadge]`                   |
| Card              | `<oc-card>` + parts              | `<Card />` + parts             | `div[ocCard]` + parts             |
| Input             | `<oc-input>`                     | `<Input />`                    | `input[ocInput]`                  |
| Label             | `<oc-label>`                     | `<Label />`                    | `label[ocLabel]`                  |
| Alert             | `<oc-alert>` + parts             | `<Alert />` + parts            | `div[ocAlert]` + parts            |
| Separator         | `<oc-separator>`                 | `<Separator />`                | `div[ocSeparator]`                |
| Skeleton          | `<oc-skeleton>`                  | `<Skeleton />`                 | `div[ocSkeleton]`                 |
| Sheet             | `<oc-sheet>` + parts             | `<Sheet />` + parts            | `oc-sheet`                        |
| Switch            | `<oc-switch>`                    | `<Switch />`                   | `button[ocSwitch]`                |
| Progress          | `<oc-progress>`                  | `<Progress />`                 | `oc-progress`                     |
| Icon Button       | `<oc-icon-button>`               | `<IconButton />`               | `button[ocIconButton]`            |
| Kbd               | `<oc-kbd>`                       | `<Kbd />`                      | `kbd[ocKbd]`                      |
| Text Link         | `<oc-link>`                      | `<TextLink />`                 | `a[ocTextLink]`                   |
| Collapsible       | `<oc-collapsible>` + parts       | `<Collapsible />` + parts      | `div[ocCollapsible]`              |
| Tabs              | `<oc-tabs>` + parts              | `<Tabs />` + parts             | `div[ocTabs]` + parts             |
| Steps             | `<oc-steps>` + parts             | `<Steps />` + parts            | `oc-steps` + parts                |
| Dropdown Menu     | `<oc-dropdown-menu>` + parts     | `<DropdownMenu />` + parts     | `div[ocDropdownMenu]` + parts     |
| Segmented Control | `<oc-segmented-control>` + items | `<SegmentedControl />` + items | `div[ocSegmentedControl]` + items |
| Code Block        | `<oc-code-block>`                | `<CodeBlock />`                | `oc-code-block`                   |

## Quick start

### React

```bash
pnpm add @open-components/ui-react
```

```tsx
import { Button } from '@open-components/ui-react';

export function App() {
  return <Button variant="outline">Save changes</Button>;
}
```

Or copy the source with the registry:

```json
// components.json
{
  "registries": {
    "@open-components": "https://<docs-host>/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @open-components/button
```

### Angular

```bash
pnpm add @open-components/ui-angular
```

```ts
import { OcButton } from '@open-components/ui-angular';

@Component({
  standalone: true,
  imports: [OcButton],
  template: `<button ocButton variant="outline">Save changes</button>`,
})
export class AppComponent {}
```

### Web Components

```bash
pnpm add @open-components/ui-web
```

```ts
import '@open-components/ui-web';
// or a single element: import '@open-components/ui-web/button';
```

```html
<oc-button variant="outline">Save changes</oc-button>
```

### Tailwind & tokens

```css
@import 'tailwindcss';
@import '@open-components/tokens/tokens.css';
@import '@open-components/tokens/theme.css';

@source '../../node_modules/@open-components/core/src';
@source '../../node_modules/@open-components/ui-react/src';
```

Add the `dark` class to `<html>` to switch themes.

## Repository layout

```
apps/
  docs/                Astro showcase & docs (serves the registry)
  playground-web/      Web Components playground
  playground-react/    React playground
  playground-angular/  Angular playground
packages/
  tokens/              design tokens
  utils/               cn(), CVA re-exports
  core/                headless logic + variants
  ui-web/              Lit custom elements
  ui-react/            React components (registry source)
  ui-angular/          Angular directives
  registry/            shadcn registry builder
scripts/
  gen-component.mjs    component scaffolder
```

Workspace versions are shared through **pnpm catalogs** in `pnpm-workspace.yaml`; internal packages
use `workspace:*`.

## Development

```bash
pnpm install
pnpm dev            # docs + playgrounds
pnpm build          # packages + apps
pnpm test
pnpm typecheck
pnpm lint
pnpm gen:component my-component
```

See [AGENTS.md](./AGENTS.md) for the architecture rules, golden rules, and the component
definition-of-done.

## Deployment

The docs site is a fully static Astro build. `.github/workflows/deploy-docs.yml` publishes
`apps/docs/dist` to GitHub Pages. The workflow uses `actions/configure-pages` to detect the Pages
origin and base path automatically (project pages use `/<repo>/`, custom domains use `/`) and
passes them to Astro as `SITE_URL` / `DOCS_BASE`, so internal links and assets work in both cases.
It attempts to enable Pages with the `GitHub Actions` source; if that is not permitted, enable it
once under **Settings → Pages → Build and deployment → Source: GitHub Actions**. The generated
`registry.json` and `r/*.json` are served from the same origin, so the shadcn CLI can consume the
registry without any extra server.

## Roadmap

- Playwright visual regression and cross-framework e2e (M6)
- Angular Vitest/AnalogJS unit-test harness
- More primitives and overlays (combobox, toast, command palette) using floating-ui in core
- Prebuilt CSS bundle for npm consumers (registry installs are already self-contained)

## License

MIT © OpenComponents contributors
