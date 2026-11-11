import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ITEM_TYPES = new Set([
  'registry:ui',
  'registry:lib',
  'registry:block',
  'registry:component',
  'registry:file',
  'registry:style',
  'registry:theme',
  'registry:hook',
  'registry:page',
]);

/**
 * Structural validation of the generated registry, mirroring the constraints of
 * the shadcn registry schema. Throws on the first problem found.
 */
export async function validateRegistry(outDir) {
  const index = JSON.parse(await readFile(join(outDir, 'registry.json'), 'utf8'));

  if (index.$schema !== 'https://ui.shadcn.com/schema/registry.json') {
    throw new Error('registry.json: unexpected $schema');
  }
  if (typeof index.name !== 'string' || index.name.length === 0) {
    throw new Error('registry.json: missing name');
  }
  if (!Array.isArray(index.items) || index.items.length === 0) {
    throw new Error('registry.json: missing items');
  }

  const names = new Set();
  for (const item of index.items) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.name)) {
      throw new Error(`Invalid item name: ${item.name}`);
    }
    if (names.has(item.name)) {
      throw new Error(`Duplicate item name: ${item.name}`);
    }
    names.add(item.name);
    if (!ITEM_TYPES.has(item.type)) {
      throw new Error(`Item "${item.name}" has invalid type: ${item.type}`);
    }
  }

  const registryItems = new Set(
    (await readdir(join(outDir, 'r'))).map((file) => file.replace(/\.json$/, '')),
  );

  for (const item of index.items) {
    const full = JSON.parse(await readFile(join(outDir, 'r', `${item.name}.json`), 'utf8'));
    if (full.name !== item.name) {
      throw new Error(`Item file name mismatch for "${item.name}"`);
    }
    for (const dependency of full.registryDependencies ?? []) {
      if (!names.has(dependency)) {
        throw new Error(`Item "${item.name}" depends on unknown registry item "${dependency}"`);
      }
    }
    if (full.type === 'registry:ui') {
      if (!Array.isArray(full.files) || full.files.length === 0) {
        throw new Error(`UI item "${item.name}" has no files`);
      }
      for (const file of full.files) {
        if (!file.path || !file.content || !ITEM_TYPES.has(file.type)) {
          throw new Error(`Item "${item.name}" has an invalid file entry`);
        }
        if (file.content.includes('@open-components/')) {
          throw new Error(
            `Item "${item.name}" file ${file.path} still references workspace packages`,
          );
        }
      }
    }
    if (!registryItems.has(item.name)) {
      throw new Error(`Missing generated item file for "${item.name}"`);
    }
  }

  console.log(`[registry] validated ${index.items.length} items`);
}
