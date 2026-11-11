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
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'react/jsx-runtime', /^@open-components\//],
});
