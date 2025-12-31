import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();

const TARGET_DIRS = ['src/ui'].map((p) => path.join(PROJECT_ROOT, p));

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

const IGNORE_FILE_PATTERNS: RegExp[] = [
  /\.d\.ts$/i,
  /\.(test|spec)\.(ts|tsx|js|jsx)$/i,
  /\.stories\.(ts|tsx|js|jsx)$/i,
];

const ALLOWED_EXT = new Set(['.ts', '.tsx']);

function shouldIgnoreFile(fileName: string) {
  if (fileName === INDEX_FILENAME) return true;
  return IGNORE_FILE_PATTERNS.some((re) => re.test(fileName));
}

function isCodeFile(fileName: string) {
  return ALLOWED_EXT.has(path.extname(fileName));
}

function relExportPath(fromDir: string, target: string) {
  const rel = path.relative(fromDir, target).replaceAll('\\', '/');
  const noExt = rel.replace(/\.(ts|tsx|js|jsx)$/, '');
  return rel.startsWith('.') ? noExt : `./${noExt}`;
}

function uniqSort(lines: string[]) {
  return Array.from(new Set(lines)).sort((a, b) => a.localeCompare(b));
}

function hasAnyExportableCode(dir: string): boolean {
  if (!fs.existsSync(dir)) return false;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return false;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);

    if (ent.isDirectory()) {
      if (IGNORE_DIR_NAMES.has(ent.name)) continue;
      if (hasAnyExportableCode(full)) return true;
    } else if (ent.isFile()) {
      if (!isCodeFile(ent.name)) continue;
      if (shouldIgnoreFile(ent.name)) continue;
      return true;
    }
  }
  return false;
}

function collectDirs(root: string): string[] {
  const dirs: string[] = [];
  if (!fs.existsSync(root)) return dirs;

  const stack = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    dirs.push(cur);

    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch (error) {
      console.error(`❌ 디렉토리 읽기 실패: ${path.relative(PROJECT_ROOT, cur)}`, error);
      continue;
    }

    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      if (IGNORE_DIR_NAMES.has(ent.name)) continue;
      stack.push(path.join(cur, ent.name));
    }
  }
  return dirs;
}

function generateIndexForDir(dir: string) {
  if (!fs.existsSync(dir)) return;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    console.error(`❌ 디렉토리 읽기 실패: ${path.relative(PROJECT_ROOT, dir)}`, error);
    return;
  }

  const exportLines: string[] = [];

  for (const ent of entries) {
    if (!ent.isFile()) continue;
    if (!isCodeFile(ent.name)) continue;
    if (shouldIgnoreFile(ent.name)) continue;

    exportLines.push(`export * from "${relExportPath(dir, path.join(dir, ent.name))}";`);
  }

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (IGNORE_DIR_NAMES.has(ent.name)) continue;

    const sub = path.join(dir, ent.name);
    if (!hasAnyExportableCode(sub)) continue;

    exportLines.push(`export * from "${relExportPath(dir, sub)}";`);
  }

  const finalLines = uniqSort(exportLines);
  const indexPath = path.join(dir, INDEX_FILENAME);

  if (finalLines.length === 0) {
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
      console.log(`🗑️  index.ts 삭제: ${path.relative(PROJECT_ROOT, indexPath)}`);
    }
    return;
  }

  const content =
    `// ⚠️ 자동 생성된 파일입니다. 직접 수정하지 마세요.\n` + finalLines.join('\n') + '\n';

  const prev = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  if (prev !== content) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ index.ts 생성/갱신: ${path.relative(PROJECT_ROOT, indexPath)}`);
  }
}

function main() {
  const existingTargets = TARGET_DIRS.filter(fs.existsSync);

  if (existingTargets.length === 0) {
    console.log('ℹ️ 대상 폴더가 없어 barrel 생성을 건너뜁니다.');
    return;
  }

  for (const target of existingTargets) {
    const dirs = collectDirs(target).sort((a, b) => b.length - a.length);
    for (const dir of dirs) generateIndexForDir(dir);
  }

  console.log('🎉 지정한 폴더의 barrel export 생성이 완료되었습니다.');
}

main();
