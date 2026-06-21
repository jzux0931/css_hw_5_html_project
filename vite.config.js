import { resolve, relative } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

const HTML_DIRECTORIES_TO_SKIP = new Set([
  '.git',
  '.agents',
  'dist',
  'node_modules',
]);

function collectHtmlEntries(directory, entries = {}) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    if (HTML_DIRECTORIES_TO_SKIP.has(item.name)) {
      continue;
    }

    const absolutePath = resolve(directory, item.name);

    if (item.isDirectory()) {
      collectHtmlEntries(absolutePath, entries);
      continue;
    }

    if (!item.isFile() || !item.name.endsWith('.html')) {
      continue;
    }

    const entryName = relative(resolve('.'), absolutePath)
      .replace(/\\/g, '/')
      .replace(/\.html$/, '');

    entries[entryName] = absolutePath;
  }

  return entries;
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: collectHtmlEntries(resolve('.')),
    },
  },
});
