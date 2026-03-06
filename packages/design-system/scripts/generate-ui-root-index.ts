import * as fs from 'node:fs';
import * as path from 'node:path';

const PROJECT_ROOT = process.cwd();
const UI_DIR = path.join(PROJECT_ROOT, 'src', 'ui');
const ROOT_INDEX_PATH = path.join(PROJECT_ROOT, 'src', 'index.ts');
const INDEX_FILENAME = 'index.ts';

const IGNORE_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '__tests__',
  '__mocks__',
  '.turbo',
  '.stories',
]);

function generateUiRootIndex() {
  if (!fs.existsSync(UI_DIR)) {
    console.log('src/ui directory does not exist. Skipping root index generation.');
    return;
  }

  const entries = fs.readdirSync(UI_DIR, { withFileTypes: true });

  const exportLines: string[] = [];

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (IGNORE_DIR_NAMES.has(ent.name)) continue;

    const subDir = path.join(UI_DIR, ent.name);
    const subIndex = path.join(subDir, INDEX_FILENAME);

    if (!fs.existsSync(subIndex)) continue;

    exportLines.push(`export * from './ui/${ent.name}/index';`);
  }

  if (exportLines.length === 0) {
    console.log('No ui submodules with index.ts found.');
    return;
  }

  const content =
    `// This file is auto-generated. Do not edit manually.\n` +
    exportLines.sort().join('\n') +
    '\n';

  const prev = fs.existsSync(ROOT_INDEX_PATH) ? fs.readFileSync(ROOT_INDEX_PATH, 'utf8') : '';

  if (prev !== content) {
    fs.writeFileSync(ROOT_INDEX_PATH, content, 'utf8');
    console.log('src/index.ts generated/updated');
  }
}

generateUiRootIndex();
