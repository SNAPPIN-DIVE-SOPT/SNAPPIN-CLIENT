/* global console, process */

import { readdir, readFile, writeFile } from 'fs/promises';
import { dirname, extname, join, relative } from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = join(ROOT_DIR, 'src');
const PACKAGE_JSON_PATH = join(ROOT_DIR, 'package.json');
const INDEX_FILE_NAME = 'index.ts';
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const HEADER_COMMENT = ['/**', ' * ⚠️ 자동 생성된 파일입니다. 직접 수정하지 마세요.', ' */'].join(
  '\n',
);

// 경로 구분자를 POSIX 형식으로 통일한다.
function toPosixPath(path) {
  return path.replaceAll('\\', '/');
}

// 파일 경로를 index.ts 기준의 export 경로로 변환한다.
function getExportTargetPath(filePath, indexPath) {
  const relativePath = relative(dirname(indexPath), filePath);
  const normalizedPath = toPosixPath(relativePath);
  const withoutExtension = normalizedPath.replace(/\.[^.]+$/u, '');

  return withoutExtension.startsWith('.') ? withoutExtension : `./${withoutExtension}`;
}

// index.ts 안에서 이미 export 중인 모듈 경로를 수집한다.
function getReferencedModules(indexSource) {
  const matches = indexSource.matchAll(/from\s+['"]([^'"]+)['"]/g);
  return new Set(Array.from(matches, ([, modulePath]) => modulePath));
}

// 같은 디렉터리의 소스 파일만 가져오되 index.ts는 제외한다.
async function getSiblingSourceFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => SOURCE_EXTENSIONS.has(extname(entry.name)))
    .filter((entry) => entry.name !== INDEX_FILE_NAME)
    .map((entry) => join(dirPath, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

// 같은 디렉터리 파일들 중 아직 export 되지 않은 라인만 생성한다.
function createExportLines(filePaths, indexPath, referencedModules) {
  return filePaths
    .map((filePath) => getExportTargetPath(filePath, indexPath))
    .filter((modulePath) => !referencedModules.has(modulePath))
    .map((modulePath) => `export * from '${modulePath}';`);
}

// 자동 생성 헤더를 제거해 실제 export 내용만 비교 대상으로 만든다.
function normalizeIndexSource(indexSource) {
  const withoutComment = indexSource
    .replace(`${HEADER_COMMENT}\n\n`, '')
    .replace(`${HEADER_COMMENT}\n`, '');

  return withoutComment.trim();
}

// 디렉터리의 index.ts를 생성하거나 누락된 export를 추가한다.
async function syncIndexFile(dirPath) {
  const indexPath = join(dirPath, INDEX_FILE_NAME);
  const siblingSourceFiles = await getSiblingSourceFiles(dirPath);

  if (siblingSourceFiles.length === 0) {
    return { indexPath, addedCount: 0, created: false, changed: false };
  }

  const indexSource = await readFile(indexPath, 'utf-8').catch((error) => {
    if (error?.code === 'ENOENT') {
      return '';
    }

    throw error;
  });
  const normalizedSource = normalizeIndexSource(indexSource);
  const hasHeaderComment = indexSource.startsWith(HEADER_COMMENT);
  const referencedModules = getReferencedModules(normalizedSource);
  const missingExportLines = createExportLines(siblingSourceFiles, indexPath, referencedModules);
  const isNewIndexFile = indexSource.length === 0;

  if (missingExportLines.length === 0 && hasHeaderComment) {
    return { indexPath, addedCount: 0, created: false, changed: false };
  }

  const trimmedSource = normalizedSource.trimEnd();
  const body =
    trimmedSource.length > 0
      ? `${trimmedSource}\n\n${missingExportLines.join('\n')}`.trimEnd()
      : missingExportLines.join('\n');
  const nextSource = body.length > 0 ? `${HEADER_COMMENT}\n\n${body}\n` : `${HEADER_COMMENT}\n`;

  await writeFile(indexPath, nextSource, 'utf-8');

  return {
    indexPath,
    addedCount: missingExportLines.length,
    created: isNewIndexFile,
    changed: true,
  };
}

// 소스 파일이 있는 디렉터리를 재귀적으로 찾는다.
async function findSourceDirectories(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const sourceDirectories = [];
  const hasSiblingSourceFiles = entries.some(
    (entry) =>
      entry.isFile() &&
      entry.name !== INDEX_FILE_NAME &&
      SOURCE_EXTENSIONS.has(extname(entry.name)),
  );

  if (hasSiblingSourceFiles) {
    sourceDirectories.push(dirPath);
  }

  for (const entry of entries) {
    const entryPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      sourceDirectories.push(...(await findSourceDirectories(entryPath)));
    }
  }

  return sourceDirectories.sort((left, right) => left.localeCompare(right));
}

// src 바로 아래 디렉터리를 package.json exports 엔트리 형태로 변환한다.
function createPackageExportEntry(dirPath) {
  const relativeDirPath = toPosixPath(relative(SRC_DIR, dirPath));

  return [`./${relativeDirPath}`, `./src/${relativeDirPath}/${INDEX_FILE_NAME}`];
}

// package.json exports를 현재 src 공개 디렉터리 구조에 맞게 동기화한다.
async function syncPackageExports(sourceDirectories) {
  const packageJsonSource = await readFile(PACKAGE_JSON_PATH, 'utf-8');
  const packageJson = JSON.parse(packageJsonSource);
  const nextExports = { ...(packageJson.exports ?? {}) };
  let hasChanges = false;

  for (const dirPath of sourceDirectories) {
    if (dirname(dirPath) !== SRC_DIR) {
      continue;
    }

    const [exportKey, exportValue] = createPackageExportEntry(dirPath);

    if (nextExports[exportKey] === exportValue) {
      continue;
    }

    nextExports[exportKey] = exportValue;
    hasChanges = true;
  }

  if (!hasChanges) {
    return;
  }

  packageJson.exports = Object.fromEntries(
    Object.entries(nextExports).sort(([left], [right]) => left.localeCompare(right)),
  );

  await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf-8');
}

// index.ts 생성 및 package exports 동기화를 순서대로 실행한다.
async function main() {
  const sourceDirectories = await findSourceDirectories(SRC_DIR);
  await Promise.all(sourceDirectories.map(syncIndexFile));
  await syncPackageExports(sourceDirectories);

  console.info('🎉 @snappin/shared generate를 성공적으로 완료하였습니다.');
}

main().catch((error) => {
  console.error('❌ 에러:', error);
  process.exit(1);
});
