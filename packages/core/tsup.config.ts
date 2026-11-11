import { defineConfig } from 'tsup';

const components = [
  'alert',
  'badge',
  'button',
  'card',
  'icon-button',
  'input',
  'kbd',
  'label',
  'progress',
  'separator',
  'sheet',
  'skeleton',
  'switch',
  'text-link',
];

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ...Object.fromEntries(components.map((name) => [`${name}/index`, `src/${name}/index.ts`])),
    'sheet/behavior': 'src/sheet/behavior.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
});
