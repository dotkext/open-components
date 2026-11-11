#!/usr/bin/env node
/**
 * Scaffolds a new component across the core, React, Web Component and Angular
 * packages, and wires up the barrels, tsup entries, package exports and registry
 * manifest.
 *
 * Usage:
 *   pnpm gen:component <kebab-case-name> [--dry-run]
 *
 * Docs pages and demos still need to be added manually (see AGENTS.md).
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const name = args.find((arg) => !arg.startsWith('--'));

if (!name || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error('Usage: pnpm gen:component <kebab-case-name> [--dry-run]');
  process.exit(1);
}

const pascal = name
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');
const camel = name.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
const tag = `oc-${name}`;
const dryRunBanner = dryRun ? '[dry-run] ' : '';

const files = {
  [`packages/core/src/${name}/variants.ts`]: `import { cva, type VariantProps } from 'class-variance-authority';

export const ${camel}Variants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border bg-background',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ${pascal}Variant = NonNullable<VariantProps<typeof ${camel}Variants>['variant']>;
export type ${pascal}Size = NonNullable<VariantProps<typeof ${camel}Variants>['size']>;
`,
  [`packages/core/src/${name}/index.ts`]: `export { ${camel}Variants } from './variants';
export type { ${pascal}Size, ${pascal}Variant } from './variants';
`,
  [`packages/ui-react/src/${name}/${name}.tsx`]: `import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { ${camel}Variants } from '@open-components/core/${name}';
import { cn } from '@open-components/utils';

export type ${pascal}Props = ComponentProps<'div'> & VariantProps<typeof ${camel}Variants>;

export function ${pascal}({ className, variant, size, ...props }: ${pascal}Props) {
  return (
    <div
      data-slot="${name}"
      className={cn(${camel}Variants({ variant, size }), className)}
      {...props}
    />
  );
}
`,
  [`packages/ui-react/src/${name}/index.ts`]: `export { ${pascal} } from './${name}';
export type { ${pascal}Props } from './${name}';
`,
  [`packages/ui-web/src/${name}/${name}.ts`]: `import { html } from 'lit';
import {
  ${camel}Variants,
  type ${pascal}Size,
  type ${pascal}Variant,
} from '@open-components/core/${name}';
import { OcElement } from '../base';

export class Oc${pascal} extends OcElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
  };

  variant: ${pascal}Variant = 'default';
  size: ${pascal}Size = 'default';

  protected override variantClasses(): string {
    return ${camel}Variants({ variant: this.variant, size: this.size });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('data-slot', '${name}');
  }

  protected override render() {
    return html\`\`;
  }
}

if (!customElements.get('${tag}')) {
  customElements.define('${tag}', Oc${pascal});
}
`,
  [`packages/ui-web/src/${name}/index.ts`]: `export { Oc${pascal} } from './${name}';
`,
  [`packages/ui-angular/src/${name}/${name}.directive.ts`]: `import { computed, Directive, input } from '@angular/core';
import {
  ${camel}Variants,
  type ${pascal}Size,
  type ${pascal}Variant,
} from '@open-components/core/${name}';
import { cn } from '@open-components/utils';

@Directive({
  selector: 'div[oc${pascal}]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"${name}"',
  },
})
export class Oc${pascal} {
  readonly variant = input<${pascal}Variant>('default');
  readonly size = input<${pascal}Size>('default');

  protected readonly classes = computed(() =>
    cn(${camel}Variants({ variant: this.variant(), size: this.size() })),
  );
}
`,
};

const barrelExports = [
  {
    path: 'packages/core/src/index.ts',
    line: `export * from './${name}/index';`,
  },
  {
    path: 'packages/ui-react/src/index.ts',
    line: `export * from './${name}/index';`,
  },
  {
    path: 'packages/ui-web/src/index.ts',
    line: `export * from './${name}/index';`,
  },
  {
    path: 'packages/ui-angular/src/public-api.ts',
    line: `export { Oc${pascal} } from './${name}/${name}.directive';`,
  },
];

const exportMap = `    "./${name}": {
      "types": "./dist/${name}/index.d.ts",
      "import": "./dist/${name}/index.js"
    },`;

for (const [path, content] of Object.entries(files)) {
  const absolute = join(root, path);
  if (existsSync(absolute)) {
    console.error(`Refusing to overwrite existing file: ${path}`);
    process.exit(1);
  }
  console.log(`${dryRunBanner}create ${path}`);
  if (!dryRun) {
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, content);
  }
}

for (const barrel of barrelExports) {
  const absolute = join(root, barrel.path);
  const source = await readFile(absolute, 'utf8');
  if (source.includes(barrel.line)) continue;
  console.log(`${dryRunBanner}append ${barrel.path}`);
  if (!dryRun) {
    await writeFile(absolute, `${source.trimEnd()}\n${barrel.line}\n`);
  }
}

for (const packageFile of [
  'packages/core/package.json',
  'packages/ui-react/package.json',
  'packages/ui-web/package.json',
]) {
  const absolute = join(root, packageFile);
  const source = await readFile(absolute, 'utf8');
  if (source.includes(`"./${name}"`)) continue;
  console.log(`${dryRunBanner}update exports in ${packageFile}`);
  if (!dryRun) {
    await writeFile(
      absolute,
      source.replace(
        '    "./package.json": "./package.json"',
        `${exportMap}\n    "./package.json": "./package.json"`,
      ),
    );
  }
}

for (const tsupFile of [
  'packages/core/tsup.config.ts',
  'packages/ui-react/tsup.config.ts',
  'packages/ui-web/tsup.config.ts',
]) {
  const absolute = join(root, tsupFile);
  const source = await readFile(absolute, 'utf8');
  if (source.includes(`'${name}'`)) continue;
  console.log(`${dryRunBanner}add tsup entry in ${tsupFile}`);
  if (!dryRun) {
    await writeFile(
      absolute,
      source.replace(/const components = \[\n/, `const components = [\n  '${name}',\n`),
    );
  }
}

const registryConfig = join(root, 'packages/registry/registry.config.mjs');
const registrySource = await readFile(registryConfig, 'utf8');
if (!registrySource.includes(`name: '${name}'`)) {
  const entry = `  {
    name: '${name}',
    title: '${pascal}',
    description: 'TODO: describe the ${pascal} component.',
    react: 'ui-react/src/${name}/${name}.tsx',
    variants: 'core/src/${name}/variants.ts',
    dependencies: ['class-variance-authority'],
  },
`;
  console.log(`${dryRunBanner}add registry entry for ${name}`);
  if (!dryRun) {
    await writeFile(registryConfig, registrySource.replace(/\n\];\s*$/, `\n${entry}];\n`));
  }
}

console.log(`
${dryRunBanner}Next steps:
  1. Design the variants in packages/core/src/${name}/variants.ts
  2. Add tests (core variants + React + Web Components)
  3. Add a docs entry in apps/docs/src/lib/site.ts and snippets.ts
  4. Add a demo to apps/docs/src/components/Showcase.tsx
  5. Run: pnpm build && pnpm test && pnpm lint && pnpm typecheck
  6. Run: pnpm --filter @open-components/registry validate:shadcn
  7. Add a changeset: pnpm changeset
`);
