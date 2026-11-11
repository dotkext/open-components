# `@open-components/registry`

Generates the [shadcn registry](https://ui.shadcn.com/docs/registry) artifacts for OpenComponents.

- `registry.config.mjs` — maps each component to its React source and the shared headless variant module.
- `scripts/build.mjs` — produces `registry.json` (index) and `r/<item>.json` (full items with file contents), rewriting `@open-components/*` imports so the vendored files are self-contained in a consumer project.
- `scripts/validate.mjs` — structural validation of the generated output.

Also generated: the `utils` item (`cn()` helper) and the `theme` item (`cssVars` parsed from `@open-components/tokens`).

## Usage

```bash
pnpm build            # writes ./dist
node scripts/build.mjs --out ../../apps/docs/public   # writes straight into the docs site
```

Consumers configure the registry in their shadcn config:

```json
{
  "registries": {
    "@open-components": "https://<docs-host>/r/{name}.json"
  }
}
```

then run `npx shadcn@latest add @open-components/button`.
