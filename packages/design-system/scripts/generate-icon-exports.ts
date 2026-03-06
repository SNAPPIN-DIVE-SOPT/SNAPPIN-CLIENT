import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { transform } from '@svgr/core';
import { format } from 'prettier';

const ROOT_DIR = process.cwd();
const ASSET_DIR = join(ROOT_DIR, 'src/assets');
const SVG_DIR = join(ASSET_DIR, 'svg');
const SVG_FILL_DIR = join(ASSET_DIR, 'svg-fill');
const COMPONENT_DIR = join(ASSET_DIR, 'components');
const INDEX_FILE = join(ASSET_DIR, 'index.ts');

const HEADER_COMMENT = ['/**', ' * ⚠️ 자동 생성된 파일입니다. 직접 수정하지 마세요.', ' */'].join(
  '\n',
);

function toComponentName(filename: string): string {
  const nameWithoutExt = filename.replace(/\.svg$/i, '');
  return nameWithoutExt
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function normalizeFillAttributes(svg: string): string {
  return svg.replace(/fill="(?!none\b)[^"]*"/gi, 'fill="currentColor"');
}

function extractViewBox(svg: string): string | null {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
  return viewBoxMatch ? viewBoxMatch[1] : null;
}

async function ensureCleanComponentsDir() {
  await rm(COMPONENT_DIR, { recursive: true, force: true });
  await mkdir(COMPONENT_DIR, { recursive: true });
}

type GeneratedIcon = {
  file: string;
  componentName: string;
};

type GenerateIconOptions = {
  dir: string;
  normalizeFill: boolean;
};

async function generateIconComponent(
  file: string,
  options: GenerateIconOptions,
): Promise<GeneratedIcon> {
  const componentName = toComponentName(file);
  const svgPath = join(options.dir, file);

  const svgRaw = await readFile(svgPath, 'utf-8');
  const viewBox = extractViewBox(svgRaw);

  const inputSvg = options.normalizeFill ? normalizeFillAttributes(svgRaw) : svgRaw;

  const jsCode = await transform(
    inputSvg,
    {
      typescript: true,
      jsxRuntime: 'automatic',
      expandProps: 'end',
      prettier: false,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    },
    { componentName },
  );

  // viewBox가 없으면 추가(원본에 있었는데 svgr 결과에서 빠진 경우 대비)
  let finalCode = jsCode;
  if (viewBox && !jsCode.includes('viewBox')) {
    finalCode = jsCode.replace(/<svg\s+([^>]*)>/, `<svg $1 viewBox="${viewBox}">`);
  }

  const pretty = await format(finalCode, {
    parser: 'babel-ts',
    singleQuote: true,
    semi: true,
    printWidth: 80,
  });

  // import type ... 아래에 빈 줄 하나 보장
  const withImportSpacing = pretty.replace(
    /(import\s+type\s+\{[^}]+\}\s+from\s+'react';\n)(?!\n)/,
    '$1\n',
  );

  const final = `${HEADER_COMMENT}\n\n${withImportSpacing}`;
  const outputPath = join(COMPONENT_DIR, `${componentName}.tsx`);
  await writeFile(outputPath, final, 'utf-8');

  return { file, componentName };
}

async function generateIndexFile(icons: GeneratedIcon[]) {
  const imports = `import type { SVGProps } from 'react';`;
  const iconType = `export type IconProps = SVGProps<SVGSVGElement>;`;

  const exportLines = icons
    .map((icon) => icon.componentName)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `export { default as ${name} } from './components/${name}';`)
    .join('\n');

  const content = `${HEADER_COMMENT}\n${imports}\n\n${iconType}\n\n${exportLines}\n`;
  await writeFile(INDEX_FILE, content, 'utf-8');
}

export default async function generate() {
  try {
    const svgFiles = (await readdir(SVG_DIR)).filter((f) => f.endsWith('.svg')).sort();
    const svgFillFiles = (await readdir(SVG_FILL_DIR)).filter((f) => f.endsWith('.svg')).sort();

    await ensureCleanComponentsDir();

    const iconsFromSvg = await Promise.all(
      svgFiles.map((file) => generateIconComponent(file, { dir: SVG_DIR, normalizeFill: true })),
    );

    // ✅ svg-fill은 "그냥 변환" + index에만 포함
    const iconsFromSvgFill = await Promise.all(
      svgFillFiles.map((file) =>
        generateIconComponent(file, { dir: SVG_FILL_DIR, normalizeFill: false }),
      ),
    );

    await generateIndexFile([...iconsFromSvg, ...iconsFromSvgFill]);

    console.info('🎉 아이콘 컴포넌트를 성공적으로 생성했습니다 (svg + svg-fill)');
  } catch (e) {
    console.error('❌ 에러:', e);
    process.exit(1);
  }
}

void generate();
