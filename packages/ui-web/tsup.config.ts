import { defineConfig } from 'tsup';

const components = ['alert', 'badge', 'button', 'card', 'input', 'label', 'separator', 'skeleton'];

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
