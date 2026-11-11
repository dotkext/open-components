import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const r = (path) => fileURLToPath(new URL(path, import.meta.url));

// GitHub Pages serves the site under /<repo>/ unless a custom domain is used.
const base = process.env.DOCS_BASE ?? '/';

export default defineConfig({
  site: 'https://open-components.github.io',
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: '@open-components/core/sheet/behavior',
          replacement: r('../../packages/core/src/sheet/behavior.ts'),
        },
        {
          find: '@open-components/core/tabs/behavior',
          replacement: r('../../packages/core/src/tabs/behavior.ts'),
        },
        {
          find: '@open-components/core/dropdown-menu/behavior',
          replacement: r('../../packages/core/src/dropdown-menu/behavior.ts'),
        },
        {
          find: /^@open-components\/core\/(.*)$/,
          replacement: r('../../packages/core/src/$1/index.ts'),
        },
        { find: '@open-components/core', replacement: r('../../packages/core/src/index.ts') },
        {
          find: /^@open-components\/ui-react\/(.*)$/,
          replacement: r('../../packages/ui-react/src/$1/index.ts'),
        },
        {
          find: '@open-components/ui-react',
          replacement: r('../../packages/ui-react/src/index.ts'),
        },
        { find: '@open-components/ui-web', replacement: r('../../packages/ui-web/src/index.ts') },
        { find: '@open-components/utils', replacement: r('../../packages/utils/src/index.ts') },
        {
          find: /^@open-components\/tokens\/(.*)$/,
          replacement: r('../../packages/tokens/src/$1'),
        },
      ],
    },
  },
});
