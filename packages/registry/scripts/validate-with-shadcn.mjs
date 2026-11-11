#!/usr/bin/env node
/**
 * Validates the generated registry with the official shadcn CLI.
 *
 * The CLI's `build` command expects a project layout, so we stage a temporary
 * directory with `registry.json` plus the vendored files and run it there.
 * Requires network access (the CLI is downloaded on demand).
 */
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(packageRoot, 'dist');

const index = JSON.parse(await readFile(join(dist, 'registry.json'), 'utf8'));
const staging = await mkdtemp(join(tmpdir(), 'oc-registry-'));

await writeFile(
  join(staging, 'package.json'),
  JSON.stringify({ name: 'open-components-registry-validation', private: true }, null, 2),
);
await writeFile(join(staging, 'registry.json'), JSON.stringify(index, null, 2));

for (const item of index.items) {
  const full = JSON.parse(await readFile(join(dist, 'r', `${item.name}.json`), 'utf8'));
  for (const file of full.files ?? []) {
    const target = join(staging, file.path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, file.content ?? '');
  }
}

const result = spawnSync('npx', ['--yes', 'shadcn@latest', 'build'], {
  cwd: staging,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.status === 0) {
  console.log('[registry] official shadcn CLI validation passed');
  await rm(staging, { recursive: true, force: true });
  process.exit(0);
}

console.error(`[registry] shadcn CLI validation failed (staging kept at ${staging})`);
process.exit(result.status ?? 1);
