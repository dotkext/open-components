#!/usr/bin/env node
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { components, registryName } from '../registry.config.mjs';
import { validateRegistry } from './validate.mjs';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(packageRoot, '../..');

/** Rewrite workspace imports so the vendored files work in a consumer project. */
function rewriteImports(content, componentName) {
  return content
    .replaceAll("'@open-components/utils'", "'@/lib/utils'")
    .replaceAll('"@open-components/utils"', '"@/lib/utils"')
    .replaceAll(`'@open-components/core/${componentName}'`, `'./${componentName}-variants'`)
    .replaceAll(`"@open-components/core/${componentName}"`, `"./${componentName}-variants"`);
}

function parseDeclarations(block) {
  const declarations = {};
  for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    declarations[match[1]] = match[2].trim();
  }
  return declarations;
}

async function readTokens() {
  const css = await readFile(join(workspaceRoot, 'packages/tokens/src/tokens.css'), 'utf8');
  const root = css.match(/:root\s*{([^}]*)}/s)?.[1] ?? '';
  const dark = css.match(/\.dark\s*{([^}]*)}/s)?.[1] ?? '';
  const lightVars = parseDeclarations(root);
  const darkVars = parseDeclarations(dark);
  const { radius, ...light } = lightVars;
  return {
    theme: radius ? { radius } : {},
    light,
    dark: darkVars,
  };
}

async function buildItem(component) {
  const reactSource = await readFile(join(workspaceRoot, 'packages', component.react), 'utf8');
  const variantsSource = await readFile(
    join(workspaceRoot, 'packages', component.variants),
    'utf8',
  );

  let reactContent = reactSource;
  const extraFiles = [];

  for (const extra of component.extraFiles ?? []) {
    const source = await readFile(join(workspaceRoot, 'packages', extra.source), 'utf8');
    reactContent = reactContent
      .replaceAll(`'${extra.specifier}'`, `'${extra.importPath}'`)
      .replaceAll(`"${extra.specifier}"`, `"${extra.importPath}"`);
    extraFiles.push({
      path: extra.target,
      type: 'registry:lib',
      target: extra.target,
      content: rewriteImports(source, component.name),
    });
  }

  return {
    name: component.name,
    type: 'registry:ui',
    title: component.title,
    description: component.description,
    dependencies: component.dependencies,
    registryDependencies: ['utils'],
    files: [
      {
        path: `components/ui/${component.name}.tsx`,
        type: 'registry:ui',
        target: `components/ui/${component.name}.tsx`,
        content: rewriteImports(reactContent, component.name),
      },
      {
        path: `components/ui/${component.name}-variants.ts`,
        type: 'registry:lib',
        target: `components/ui/${component.name}-variants.ts`,
        content: rewriteImports(variantsSource, component.name),
      },
      ...extraFiles,
    ],
  };
}

async function buildUtilsItem() {
  const content = await readFile(join(packageRoot, 'templates/utils.ts'), 'utf8');
  return {
    name: 'utils',
    type: 'registry:lib',
    title: 'cn utility',
    description: 'Tailwind class merger used by OpenComponents components.',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [],
    files: [
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
        target: 'lib/utils.ts',
        content,
      },
    ],
  };
}

async function buildThemeItem() {
  const cssVars = await readTokens();
  return {
    name: 'theme',
    type: 'registry:theme',
    title: 'OpenComponents theme',
    description: 'shadcn-compatible design tokens used by every OpenComponents renderer.',
    cssVars,
    dependencies: [],
    registryDependencies: [],
    files: [],
  };
}

const outFlagIndex = process.argv.indexOf('--out');
const positionals = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const outArg =
  outFlagIndex !== -1 && process.argv[outFlagIndex + 1]
    ? process.argv[outFlagIndex + 1]
    : positionals[0];
const outDir = outArg ? resolve(process.cwd(), outArg) : join(packageRoot, 'dist');
const rDir = join(outDir, 'r');

await rm(outDir, { recursive: true, force: true });
await mkdir(rDir, { recursive: true });

const items = [await buildUtilsItem(), await buildThemeItem()];
for (const component of components) {
  items.push(await buildItem(component));
}

const index = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: registryName,
  homepage: 'https://github.com/open-components/open-components',
  items: items.map(
    ({ name, type, title, description, dependencies, registryDependencies, files }) => ({
      name,
      type,
      title,
      description,
      dependencies,
      registryDependencies,
      files: files.map(({ path, type: fileType, target }) => ({ path, type: fileType, target })),
    }),
  ),
};

await writeFile(join(outDir, 'registry.json'), `${JSON.stringify(index, null, 2)}\n`);
for (const item of items) {
  await writeFile(join(rDir, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`);
}

await validateRegistry(outDir);
console.log(`[registry] built ${items.length} items into ${outDir}`);
