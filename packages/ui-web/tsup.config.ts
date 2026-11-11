import { defineConfig } from 'tsup';

const components = [
  'alert',
  'badge',
  'button',
  'card',
  'code-block',
  'collapsible',
  'dropdown-menu',
  'icon-button',
  'input',
  'kbd',
  'label',
  'progress',
  'segmented-control',
  'separator',
  'sheet',
  'skeleton',
  'steps',
  'switch',
  'tabs',
  'text-link',
];

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ...Object.fromEntries(components.map((name) => [`${name}/index`, `src/${name}/index.ts`])),
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['lit', /^lit\//, /^@open-components\//],
});
