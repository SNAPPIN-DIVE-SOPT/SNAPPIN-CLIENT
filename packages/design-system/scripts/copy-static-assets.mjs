import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const distRoot = path.join(packageRoot, 'dist');
const assetDirs = ['lotties', 'svg', 'svg-fill'];

await mkdir(path.join(distRoot, 'assets'), { recursive: true });

for (const dir of assetDirs) {
  const source = path.join(packageRoot, 'src', 'assets', dir);
  const target = path.join(distRoot, 'assets', dir);

  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
}
