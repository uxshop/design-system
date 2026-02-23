import { access, readFile, readdir } from 'node:fs/promises';
import type { ComponentBundle, ComponentCatalogEntry, ComponentCategory } from '../types';
import { extractPropsFromVue } from './vue-props-extractor';

const srcRoot = new URL('../../src', import.meta.url).pathname;
const indexTs = `${srcRoot}/index.ts`;

interface IndexEntry {
  exportName: string;
  category: 'ui' | 'admin';
  dirPath: string;
  filePath: string;
}

function parseIndexTs(content: string): IndexEntry[] {
  const entries: IndexEntry[] = [];
  const exportRegex = /export\s+\{([^}]+)\}\s+from\s+'([^']+)'/g;

  let match: RegExpExecArray | null;
  while ((match = exportRegex.exec(content)) !== null) {
    const namesBlock = match[1];
    const importPath = match[2];

    if (!namesBlock || !importPath) continue;

    const isUi = importPath.includes('/components/ui/');
    const isAdmin = importPath.includes('/components/admin/');

    if (!isUi && !isAdmin) continue;

    const category: 'ui' | 'admin' = isUi ? 'ui' : 'admin';
    const normalizedPath = importPath.replace(/^\.\//, '');
    const fullPath = `${srcRoot}/${normalizedPath}`;

    const isFilePath = /\.(vue|ts)$/.test(normalizedPath);
    const dirPath = isFilePath ? fullPath.substring(0, fullPath.lastIndexOf('/')) : fullPath;

    const names = namesBlock
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);
    for (const raw of names) {
      const asMatch = raw.match(/(?:default\s+as\s+)?(\w+)\s*$/);
      if (!asMatch) continue;
      entries.push({ exportName: asMatch[1], category, dirPath, filePath: fullPath });
    }
  }

  return entries;
}

function getMainComponentName(dirPath: string): string {
  return dirPath.split('/').pop() ?? '';
}

function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

async function fileExists(path: string): Promise<boolean> {
  return access(path)
    .then(() => true)
    .catch(() => false);
}

async function readFileSafe(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

async function findSubcomponents(dirPath: string, mainComponentName: string): Promise<string[]> {
  try {
    const files = await readdir(dirPath);
    return files
      .filter((f) => f.endsWith('.vue'))
      .map((f) => f.replace('.vue', ''))
      .filter((name) => name !== mainComponentName);
  } catch {
    return [];
  }
}

let catalogCache: ComponentCatalogEntry[] | null = null;
let indexEntriesCache: IndexEntry[] | null = null;

async function getIndexEntries(): Promise<IndexEntry[]> {
  if (indexEntriesCache) return indexEntriesCache;

  const content = await readFile(indexTs, 'utf-8');
  indexEntriesCache = parseIndexTs(content);
  return indexEntriesCache;
}

export async function scanAllComponents(category: ComponentCategory = 'all'): Promise<ComponentCatalogEntry[]> {
  if (catalogCache) {
    return category === 'all' ? catalogCache : catalogCache.filter((c) => c.category === category);
  }

  const entries = await getIndexEntries();
  const seenDirs = new Set<string>();
  const catalog: ComponentCatalogEntry[] = [];

  for (const entry of entries) {
    if (seenDirs.has(entry.dirPath)) continue;
    seenDirs.add(entry.dirPath);

    const dirName = getMainComponentName(entry.dirPath);
    const componentName = toPascalCase(dirName);

    const vueFile = `${entry.dirPath}/${componentName}.vue`;
    const storiesFile = `${entry.dirPath}/${componentName}.stories.ts`;
    const scssFile = `${entry.dirPath}/${componentName}.scss`;

    const [hasVue, hasStories, hasScss] = await Promise.all([
      fileExists(vueFile),
      fileExists(storiesFile),
      fileExists(scssFile),
    ]);

    let propsCount = 0;
    if (hasVue) {
      const content = await readFileSafe(vueFile);
      if (content) {
        const props = extractPropsFromVue(content);
        propsCount = props.length;
      }
    }

    const subcomponents = await findSubcomponents(entry.dirPath, componentName);

    catalog.push({
      name: componentName,
      exportName: entry.exportName,
      category: entry.category,
      dirPath: entry.dirPath,
      hasStories,
      hasScss,
      subcomponents,
      propsCount,
    });
  }

  catalogCache = catalog;
  return category === 'all' ? catalog : catalog.filter((c) => c.category === category);
}

export async function findComponentDir(name: string): Promise<string | null> {
  const entries = await getIndexEntries();
  const normalized = name.toLowerCase();

  for (const entry of entries) {
    const dirName = getMainComponentName(entry.dirPath).toLowerCase();
    const pascalName = toPascalCase(dirName).toLowerCase();

    if (
      entry.exportName.toLowerCase() === normalized ||
      pascalName === normalized ||
      dirName === normalized ||
      dirName.replace(/-/g, '') === normalized.replace(/-/g, '')
    ) {
      return entry.dirPath;
    }
  }

  for (const entry of entries) {
    const dirName = getMainComponentName(entry.dirPath).toLowerCase();
    if (dirName.includes(normalized) || normalized.includes(dirName)) {
      return entry.dirPath;
    }
  }

  return null;
}

export async function readComponentBundle(name: string): Promise<ComponentBundle | null> {
  const dirPath = await findComponentDir(name);
  if (!dirPath) return null;

  const dirName = getMainComponentName(dirPath);
  const componentName = toPascalCase(dirName);

  const category = dirPath.includes('/components/ui/') ? 'ui' : 'admin';

  const [vueContent, storiesContent, scssContent] = await Promise.all([
    readFileSafe(`${dirPath}/${componentName}.vue`),
    readFileSafe(`${dirPath}/${componentName}.stories.ts`),
    readFileSafe(`${dirPath}/${componentName}.scss`),
  ]);

  const props = vueContent ? extractPropsFromVue(vueContent) : [];
  const subcomponents = await findSubcomponents(dirPath, componentName);

  return {
    name: componentName,
    category,
    dirPath,
    files: {
      vue: vueContent,
      stories: storiesContent,
      scss: scssContent,
    },
    props,
    subcomponents,
    hasStories: storiesContent !== null,
    hasScss: scssContent !== null,
  };
}
