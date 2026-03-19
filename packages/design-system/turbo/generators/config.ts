import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { PlopTypes } from '@turbo/gen';

const designSystemRoot = process.cwd();
const templatesDir = resolve(designSystemRoot, 'turbo', 'generators', 'templates');
const uiDir = resolve(designSystemRoot, 'src', 'ui');
const uiIndexPath = resolve(uiDir, 'index.ts');
type GeneratorAnswers = {
  name?: string;
};

function createAppendIndexAction(
  plop: PlopTypes.NodePlopAPI,
  path: string,
  getExportLine: (name: string) => string,
): PlopTypes.CustomActionFunction {
  return (answers) => {
    const { name } = (answers ?? {}) as GeneratorAnswers;
    const componentName = typeof name === 'string' ? name : '';

    if (!componentName) {
      throw new Error('Component name is required to update the barrel file.');
    }

    const exportLine = getExportLine(plop.getHelper('kebabCase')(componentName));
    const currentContent = readFileSync(path, 'utf8');

    if (currentContent.includes(exportLine)) {
      return `${path} already exports ${componentName}`;
    }

    const nextContent = `${currentContent.trimEnd()}\n${exportLine}\n`;
    writeFileSync(path, nextContent, 'utf8');
    return `${path} updated`;
  };
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('react-component', {
    description: 'Adds a new react component to the design system',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: resolve(uiDir, '{{kebabCase name}}', '{{pascalCase name}}.tsx'),
        templateFile: resolve(templatesDir, 'component.hbs'),
      },
      {
        type: 'add',
        path: resolve(uiDir, '{{kebabCase name}}', 'index.ts'),
        templateFile: resolve(templatesDir, 'index.hbs'),
      },
      createAppendIndexAction(plop, uiIndexPath, (name) => `export * from './${name}/index';`),
    ],
  });
}
