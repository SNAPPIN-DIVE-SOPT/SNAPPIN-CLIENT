import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const UI_DIR = path.join(PROJECT_ROOT, 'src/ui');
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
    console.log('ℹ️ src/ui 폴더가 없어 index 생성을 건너뜁니다.');
    return;
  }

  const entries = fs.readdirSync(UI_DIR, { withFileTypes: true });

  const exportLines: string[] = [];

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (IGNORE_DIR_NAMES.has(ent.name)) continue;

    const subDir = path.join(UI_DIR, ent.name);
    const subIndex = path.join(subDir, INDEX_FILENAME);

    // ✅ 하위 폴더에 index.ts가 있는 경우만 export
    if (!fs.existsSync(subIndex)) continue;

    exportLines.push(`export * from './${ent.name}/index';`);
  }

  if (exportLines.length === 0) {
    console.log('ℹ️ export 할 하위 ui 모듈이 없습니다.');
    return;
  }

  const content =
    `// ⚠️ 자동 생성된 파일입니다. 직접 수정하지 마세요.\n` + exportLines.sort().join('\n') + '\n';

  const indexPath = path.join(UI_DIR, INDEX_FILENAME);
  const prev = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';

  if (prev !== content) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ ui/index.ts 생성/갱신 완료`);
  }
}

generateUiRootIndex();
