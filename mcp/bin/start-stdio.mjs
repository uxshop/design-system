#!/usr/bin/env node

// mcp/start-stdio.ts
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// mcp/server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

// mcp/tools/get-component-bundle.ts
import { z } from 'zod';

// mcp/parsers/component-scanner.ts
import { access, readFile, readdir } from 'node:fs/promises';

// mcp/parsers/vue-props-extractor.ts
function extractPropsBlock(scriptContent) {
  const definePropsRef = scriptContent.match(/defineProps\s*<\s*(\w+)\s*>/);
  if (definePropsRef) {
    const interfaceName = definePropsRef[1];
    const namedInterfaceRegex = new RegExp(`(?:export\\s+)?interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`);
    const namedInterface = scriptContent.match(namedInterfaceRegex);
    if (namedInterface) return namedInterface[1];
  }
  const withDefaultsInline = scriptContent.match(/withDefaults\s*\(\s*defineProps\s*<\s*\{([\s\S]*?)\}\s*>\s*\(\s*\)/);
  if (withDefaultsInline) return withDefaultsInline[1];
  const inlineDefineProps = scriptContent.match(/defineProps\s*<\s*\{([\s\S]*?)\}\s*>\s*\(\s*\)/);
  if (inlineDefineProps) return inlineDefineProps[1];
  return null;
}
function extractDefaults(scriptContent) {
  const defaults = {};
  const withDefaultsBlock = scriptContent.match(
    /withDefaults\s*\(\s*defineProps[\s\S]*?\)\s*,\s*\{([\s\S]*?)\n\s*\}\s*\)/
  );
  if (!withDefaultsBlock) return defaults;
  const block = withDefaultsBlock[1];
  const lineRegex = /^\s*(\w+)\s*:\s*(.+?)\s*(?:,\s*)?$/gm;
  let match;
  while ((match = lineRegex.exec(block)) !== null) {
    defaults[match[1]] = match[2].trim();
  }
  return defaults;
}
function parsePropLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return null;
  const propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?)\s*$/);
  if (!propMatch) return null;
  const [, name, optional, type] = propMatch;
  return {
    name,
    type: type.replace(/,$/, '').trim(),
    required: optional !== '?',
  };
}
function extractPropsFromVue(vueContent) {
  const scriptMatch = vueContent.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/);
  if (!scriptMatch) return [];
  const scriptContent = scriptMatch[1];
  const propsBlock = extractPropsBlock(scriptContent);
  if (!propsBlock) return [];
  const defaults = extractDefaults(scriptContent);
  const props = [];
  const lines = propsBlock.split('\n');
  for (const line of lines) {
    const parsed = parsePropLine(line);
    if (!parsed) continue;
    props.push({
      name: parsed.name,
      type: parsed.type,
      required: parsed.required,
      default: defaults[parsed.name],
    });
  }
  return props;
}

// mcp/parsers/component-scanner.ts
var srcRoot = new URL('../../src', import.meta.url).pathname;
var indexTs = `${srcRoot}/index.ts`;
function parseIndexTs(content) {
  const entries = [];
  const exportRegex = /export\s+\{([^}]+)\}\s+from\s+'([^']+)'/g;
  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const namesBlock = match[1];
    const importPath = match[2];
    if (!namesBlock || !importPath) continue;
    const isUi = importPath.includes('/components/ui/');
    const isAdmin = importPath.includes('/components/admin/');
    if (!isUi && !isAdmin) continue;
    const category = isUi ? 'ui' : 'admin';
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
function getMainComponentName(dirPath) {
  return dirPath.split('/').pop() ?? '';
}
function toPascalCase(kebab) {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
async function fileExists(path) {
  return access(path)
    .then(() => true)
    .catch(() => false);
}
async function readFileSafe(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}
async function findSubcomponents(dirPath, mainComponentName) {
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
var catalogCache = null;
var indexEntriesCache = null;
async function getIndexEntries() {
  if (indexEntriesCache) return indexEntriesCache;
  const content = await readFile(indexTs, 'utf-8');
  indexEntriesCache = parseIndexTs(content);
  return indexEntriesCache;
}
async function scanAllComponents(category = 'all') {
  if (catalogCache) {
    return category === 'all' ? catalogCache : catalogCache.filter((c) => c.category === category);
  }
  const entries = await getIndexEntries();
  const seenDirs = /* @__PURE__ */ new Set();
  const catalog = [];
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
async function findComponentDir(name) {
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
async function readComponentBundle(name) {
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

// mcp/tools/get-component-bundle.ts
function registerGetComponentBundle(server2) {
  server2.registerTool(
    'get_component_bundle',
    {
      description:
        'Retorna o pacote completo de um componente do design system: codigo Vue (com props TypeScript), exemplos de uso do Storybook (.stories.ts), estilos SCSS e lista de subcomponentes. Use esta tool para entender como usar ou implementar um componente.',
      inputSchema: z.object({
        name: z
          .string()
          .describe(
            'Nome do componente (PascalCase ou kebab-case). Exemplos: Button, Modal, FormTextfield, form-textfield, Alert, Dropdown'
          ),
      }),
    },
    async ({ name }) => {
      const bundle = await readComponentBundle(name.trim());
      if (!bundle) {
        return {
          content: [
            {
              type: 'text',
              text: `Componente "${name}" nao encontrado. Use a tool list_components para ver todos os componentes dispon\xEDveis.`,
            },
          ],
          isError: true,
        };
      }
      const sections = [];
      sections.push(`# Componente: ${bundle.name}`);
      sections.push(`- **Categoria**: ${bundle.category}`);
      sections.push(`- **Caminho**: ${bundle.dirPath}`);
      if (bundle.subcomponents.length > 0) {
        sections.push(`- **Subcomponentes**: ${bundle.subcomponents.join(', ')}`);
      }
      sections.push('\n## Import');
      sections.push(`\`\`\`typescript
import { ${bundle.name} } from '@tray-tecnologia/design-system'
\`\`\``);
      if (bundle.props.length > 0) {
        sections.push('\n## Props');
        const propsTable = [
          '| Prop | Tipo | Obrigat\xF3rio | Default |',
          '|------|------|-------------|---------|',
          ...bundle.props.map(
            (p) => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Sim' : 'N\xE3o'} | ${p.default ?? '\u2014'} |`
          ),
        ];
        sections.push(propsTable.join('\n'));
      }
      if (bundle.files.stories) {
        sections.push('\n## Exemplos de Uso (Storybook)');
        sections.push('```typescript');
        sections.push(bundle.files.stories);
        sections.push('```');
      }
      if (bundle.files.vue) {
        sections.push('\n## C\xF3digo do Componente (Vue SFC)');
        sections.push('```vue');
        sections.push(bundle.files.vue);
        sections.push('```');
      }
      if (bundle.files.scss) {
        sections.push('\n## Estilos (SCSS)');
        sections.push('```scss');
        sections.push(bundle.files.scss);
        sections.push('```');
      }
      return {
        content: [{ type: 'text', text: sections.join('\n') }],
      };
    }
  );
}

// mcp/tools/list-components.ts
import { z as z2 } from 'zod';
function registerListComponents(server2) {
  server2.registerTool(
    'list_components',
    {
      description:
        'Lista todos os componentes dispon\xEDveis no design system com seus metadados (categoria, se tem stories, se tem SCSS, quantidade de props, subcomponentes). Use para descobrir quais componentes existem antes de buscar detalhes.',
      inputSchema: z2.object({
        category: z2
          .enum(['ui', 'admin', 'all'])
          .optional()
          .default('all')
          .describe(
            'Filtrar por categoria: "ui" para componentes de interface, "admin" para componentes administrativos, "all" para todos'
          ),
      }),
    },
    async ({ category }) => {
      const components = await scanAllComponents(category);
      const lines = [];
      lines.push(`# Componentes do Design System (${components.length} encontrados)`);
      lines.push(`Categoria: **${category}**
`);
      const byCategory = {
        ui: components.filter((c) => c.category === 'ui'),
        admin: components.filter((c) => c.category === 'admin'),
      };
      const groups =
        category === 'all'
          ? [
              { label: 'UI', items: byCategory.ui },
              { label: 'Admin', items: byCategory.admin },
            ]
          : [{ label: category.toUpperCase(), items: components }];
      for (const group of groups) {
        if (group.items.length === 0) continue;
        lines.push(`
## ${group.label} (${group.items.length})
`);
        lines.push('| Componente | Export | Props | Subcomponentes | Stories | SCSS |');
        lines.push('|-----------|--------|-------|----------------|---------|------|');
        for (const c of group.items) {
          const sub = c.subcomponents.length > 0 ? c.subcomponents.join(', ') : '\u2014';
          lines.push(
            `| ${c.name} | \`${c.exportName}\` | ${c.propsCount} | ${sub} | ${c.hasStories ? '\u2713' : '\u2014'} | ${c.hasScss ? '\u2713' : '\u2014'} |`
          );
        }
      }
      lines.push('\n---');
      lines.push(
        '> Use `get_component_bundle` com o nome do componente para ver o c\xF3digo, props detalhadas e exemplos de uso.'
      );
      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    }
  );
}

// mcp/tools/search-components.ts
import { z as z3 } from 'zod';
var semanticMap = {
  formulario: [
    'FormTextfield',
    'FormSelect',
    'FormCheckbox',
    'FormRadio',
    'FormTextarea',
    'FormRange',
    'FormTags',
    'FormCurrency',
    'FormDatepicker',
    'FormColorpicker',
    'FormSpinbutton',
    'FormAutocomplete',
    'FormRichtext',
    'FormLabel',
    'FormHelper',
    'FormValidation',
    'FormLayout',
    'FormLayoutItem',
    'FormWrapper',
  ],
  form: [
    'FormTextfield',
    'FormSelect',
    'FormCheckbox',
    'FormRadio',
    'FormTextarea',
    'FormRange',
    'FormTags',
    'FormCurrency',
    'FormDatepicker',
    'FormColorpicker',
    'FormSpinbutton',
    'FormAutocomplete',
    'FormRichtext',
    'FormLabel',
    'FormHelper',
    'FormValidation',
    'FormLayout',
    'FormLayoutItem',
    'FormWrapper',
  ],
  input: ['FormTextfield', 'FormTextarea', 'FormAutocomplete', 'FormSelect'],
  select: ['FormSelect', 'FormAutocomplete', 'Select', 'FormSelectOption'],
  feedback: ['Toast', 'Alert', 'Dialog', 'Spinner', 'ProgressBar', 'ProgressIndeterminate', 'Callout', 'CalloutCard'],
  notificacao: ['Toast', 'Alert', 'Dialog'],
  alerta: ['Alert', 'Toast', 'CalloutCard'],
  modal: ['Modal', 'ModalItem', 'Dialog'],
  dialogo: ['Dialog', 'Modal'],
  navegacao: ['Tab', 'TabItem', 'Breadcrumb', 'Pagination', 'Sidebar', 'Link', 'Dropdown'],
  menu: ['Dropdown', 'Sidebar', 'Tab', 'TabItem'],
  layout: ['Stack', 'Card', 'CardItem', 'CardSection', 'Divider', 'Grid', 'Container', 'Row', 'Col', 'Aside'],
  grid: ['Container', 'Row', 'Col'],
  card: ['Card', 'CardItem', 'CardSection', 'CardTitle', 'CardAnnotation', 'CardActive', 'CardSeo', 'CardInfoLink'],
  botao: ['Button', 'ButtonGroup', 'IconButton', 'ButtonAction', 'ButtonActionList'],
  button: ['Button', 'ButtonGroup', 'IconButton', 'ButtonAction', 'ButtonActionList'],
  icone: ['Icon', 'IconButton'],
  imagem: ['Image', 'Avatar'],
  avatar: ['Avatar'],
  loading: [
    'Spinner',
    'Skeleton',
    'SkeletonTable',
    'SkeletonList',
    'ProgressBar',
    'ProgressIndeterminate',
    'PanelSkeleton',
  ],
  skeleton: ['Skeleton', 'SkeletonTable', 'SkeletonList', 'PanelSkeleton'],
  tabela: ['Table', 'TableRow', 'TableCell', 'TableHeadCell', 'TableList', 'TableListItem', 'TableListTable'],
  lista: ['ListGroup', 'ListGroupItem', 'TableList', 'TableListItem', 'DescriptionList', 'DescriptionListItem'],
  badge: ['Badge', 'Tag', 'TagList'],
  tag: ['Tag', 'TagList', 'Badge'],
  paginacao: ['Pagination', 'InfiniteScroll'],
  scroll: ['CustomScroll', 'InfiniteScroll'],
  dropdown: ['Dropdown', 'DropdownItem', 'DropdownItemButton', 'DropdownSection', 'DropdownDivider'],
  tipografia: ['TextStyle'],
  texto: ['TextStyle', 'Link', 'Badge', 'Tag'],
  separador: ['Divider'],
  progresso: ['ProgressBar', 'ProgressIndeterminate', 'RatingStar'],
  avaliacao: ['RatingStar'],
  timeline: ['Timeline'],
  cor: ['ColorThumb', 'FormColorpicker'],
  admin: [
    'Layout',
    'Sidebar',
    'Titlebar',
    'Topbar',
    'Savebar',
    'Page',
    'PageActions',
    'PageHelper',
    'PageHelperVideo',
    'PageHelperArticles',
    'PageMessageSupport',
    'EmptyData',
  ],
  sidebar: ['Sidebar', 'SidebarHeader'],
  estatisticas: ['StatsGroup', 'StatsItem'],
  seo: ['Seo', 'CardSeo'],
  usuario: ['UserProfileCard', 'UserButton', 'Avatar'],
  plataforma: ['PlatformSelect', 'BrowserSelect'],
  media: ['MediaCard', 'Image', 'YoutubePlayer'],
  youtube: ['YoutubePlayer'],
  mapa: ['Gmaps'],
  codigo: ['Codemirror'],
  excluir: ['RowExclude', 'Dialog'],
  busca: ['QuickSearch', 'FormAutocomplete'],
};
function fuzzyMatch(query, components) {
  const q = query.toLowerCase().replace(/[-_\s]/g, '');
  return components.filter((c) => {
    const name = c.name.toLowerCase();
    const exportName = c.exportName.toLowerCase();
    return name.includes(q) || q.includes(name) || exportName.includes(q);
  });
}
function semanticSearch(query, components) {
  const q = query.toLowerCase();
  const componentNames = /* @__PURE__ */ new Set();
  for (const [keyword, names] of Object.entries(semanticMap)) {
    if (q.includes(keyword) || keyword.includes(q)) {
      names.forEach((n) => componentNames.add(n.toLowerCase()));
    }
  }
  if (componentNames.size === 0) return [];
  return components.filter(
    (c) => componentNames.has(c.name.toLowerCase()) || componentNames.has(c.exportName.toLowerCase())
  );
}
function registerSearchComponents(server2) {
  server2.registerTool(
    'search_components',
    {
      description:
        'Busca componentes do design system por nome ou por funcionalidade/conceito. Suporta busca sem\xE2ntica em portugu\xEAs (ex: "formulario", "navegacao", "feedback") e busca por nome parcial (ex: "form", "button", "modal").',
      inputSchema: z3.object({
        query: z3
          .string()
          .describe(
            'Termo de busca. Pode ser nome parcial (ex: "form", "modal") ou conceito funcional em portugu\xEAs (ex: "formulario", "feedback", "navegacao", "layout", "tabela", "botao", "loading")'
          ),
        category: z3
          .enum(['ui', 'admin', 'all'])
          .optional()
          .default('all')
          .describe('Filtrar resultados por categoria'),
      }),
    },
    async ({ query, category }) => {
      const allComponents = await scanAllComponents(category);
      const trimmed = query.trim();
      const semanticResults = semanticSearch(trimmed, allComponents);
      const fuzzyResults = fuzzyMatch(trimmed, allComponents);
      const combined = /* @__PURE__ */ new Map();
      for (const c of [...semanticResults, ...fuzzyResults]) {
        combined.set(c.name, c);
      }
      const results = Array.from(combined.values());
      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Nenhum componente encontrado para "${query}".

Use \`list_components\` para ver todos os componentes dispon\xEDveis.`,
            },
          ],
        };
      }
      const lines = [];
      lines.push(`# Busca: "${query}" \u2014 ${results.length} resultado(s)
`);
      lines.push('| Componente | Categoria | Props | Subcomponentes | Stories |');
      lines.push('|-----------|-----------|-------|----------------|---------|');
      for (const c of results) {
        const sub = c.subcomponents.length > 0 ? c.subcomponents.join(', ') : '\u2014';
        lines.push(
          `| \`${c.name}\` | ${c.category} | ${c.propsCount} | ${sub} | ${c.hasStories ? '\u2713' : '\u2014'} |`
        );
      }
      lines.push('\n---');
      lines.push('> Use `get_component_bundle` com o nome do componente para ver detalhes completos.');
      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    }
  );
}

// mcp/tools/get-design-tokens.ts
import { z as z4 } from 'zod';

// mcp/parsers/css-token-parser.ts
import sass from 'sass';
var tokensScssPath = new URL('../../src/scss/tokens/tokens.scss', import.meta.url).pathname;
var categoryCommentMap = {
  'Borders Radius': 'borders',
  Borders: 'borders',
  Colors: 'colors',
  'Font Size': 'typography',
  'Font Weight': 'typography',
  Typograph: 'typography',
  'Line Height': 'typography',
  'Z-index': 'z-index',
  'Motions Duration': 'motion',
  Motions: 'motion',
  Shadows: 'shadows',
  Spacings: 'spacing',
};
function detectCategory(tokenName, currentCategory) {
  if (tokenName.startsWith('--s-border-radius')) return 'borders';
  if (tokenName.startsWith('--s-border')) return 'borders';
  if (tokenName.startsWith('--s-color') || tokenName.startsWith('--b-color')) return 'colors';
  if (tokenName.startsWith('--s-font-size')) return 'typography';
  if (tokenName.startsWith('--s-font-weight')) return 'typography';
  if (tokenName.startsWith('--s-typography')) return 'typography';
  if (tokenName.startsWith('--s-line-height')) return 'typography';
  if (tokenName.startsWith('--s-index')) return 'z-index';
  if (tokenName.startsWith('--s-motion')) return 'motion';
  if (tokenName.startsWith('--s-shadow')) return 'shadows';
  if (tokenName.startsWith('--s-spacing')) return 'spacing';
  return currentCategory;
}
function detectBrand(selectorContext) {
  if (selectorContext.includes('data-company=tray')) return 'tray';
  if (selectorContext.includes('data-company=bagy')) return 'bagy';
  if (selectorContext.includes('data-company=rede')) return 'rede';
  return void 0;
}
function detectTheme(selectorContext) {
  if (selectorContext.includes('data-theme=dark')) return 'dark';
  return 'light';
}
var compiledCssCache = null;
var tokensCache = null;
async function compileScssToCss() {
  if (compiledCssCache) return compiledCssCache;
  const result = await sass.compileAsync(tokensScssPath);
  compiledCssCache = result.css;
  return compiledCssCache;
}
async function parseDesignTokens() {
  if (tokensCache) return tokensCache;
  const content = await compileScssToCss();
  const tokens = [];
  let currentCategory = 'colors';
  let currentSelectorContext = '';
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    const selectorMatch = trimmed.match(/^([^{]+)\{$/);
    if (selectorMatch) {
      currentSelectorContext = selectorMatch[1].trim();
      continue;
    }
    if (trimmed === '}') {
      currentSelectorContext = '';
      continue;
    }
    const categoryComment = trimmed.match(/@tokens\s+(.+)/);
    if (categoryComment) {
      const label = categoryComment[1].trim();
      const mapped = Object.entries(categoryCommentMap).find(([key]) =>
        label.toLowerCase().includes(key.toLowerCase())
      );
      if (mapped) currentCategory = mapped[1];
      continue;
    }
    if (trimmed.startsWith('@tokens-end')) {
      continue;
    }
    const varMatch = trimmed.match(/^(--[\w-]+)\s*:\s*(.+?)\s*;/);
    if (!varMatch) continue;
    const [, name, rawValue] = varMatch;
    if (!name || !rawValue) continue;
    const value = rawValue.trim();
    const category = detectCategory(name, currentCategory);
    const brand = detectBrand(currentSelectorContext);
    const theme = detectTheme(currentSelectorContext);
    let group;
    const parts = name.replace(/^--[sb]-/, '').split('-');
    if (parts.length >= 2) {
      group = parts.slice(0, 2).join('-');
    }
    tokens.push({ name, value, category, group, theme, brand });
  }
  tokensCache = tokens;
  return tokens;
}
async function getTokensByCategory(category, brand) {
  const all = await parseDesignTokens();
  return all.filter((token) => {
    if (category !== 'all' && token.category !== category) return false;
    if (brand && token.brand !== void 0 && token.brand !== brand) return false;
    return true;
  });
}
async function getTokensAsText() {
  return compileScssToCss();
}

// mcp/tools/get-design-tokens.ts
var categoryDescriptions = {
  colors: 'Cores semanticas (background, fill, border, content) e cores de brand por empresa',
  spacing:
    'Espacamentos padrao (quark: 4px, nano: 8px, xx-small: 12px, x-small: 16px, small: 24px, medium: 32px, large: 40px, x-large: 48px, xx-large: 56px, huge: 64px)',
  borders:
    'Bordas (none, light 1px, thin 2px, strong 4px, heavy 8px) e border-radius (none, small 4px, medium 8px, large 16px, pill 50%)',
  shadows: 'Sombras por nivel (level-1 ao level-4)',
  typography:
    'Tipografia (font-size, font-weight, line-height, typography shorthands para heading/label/paragraph/caption)',
  motion: 'Animacoes: duracoes (fast 300ms, default 500ms, moderate 750ms, slow 1000ms) e curvas de easing',
  'z-index':
    'Z-index em escala (default: 1, low: 2, medium-low: 3, medium: 4, medium-high: 5, high: 6, very-high: 7, max: 8)',
};
function registerGetDesignTokens(server2) {
  server2.registerTool(
    'get_design_tokens',
    {
      description:
        'Retorna os tokens de design do design system (vari\xE1veis CSS --s-*). Tokens s\xE3o usados para garantir consist\xEAncia visual: cores, espa\xE7amentos, bordas, sombras, tipografia, motion e z-index. Sempre use tokens em vez de valores hardcoded.',
      inputSchema: z4.object({
        category: z4
          .enum(['colors', 'spacing', 'borders', 'shadows', 'typography', 'motion', 'z-index', 'all'])
          .optional()
          .default('all')
          .describe('Categoria de tokens a retornar'),
        brand: z4
          .enum(['default', 'tray', 'bagy', 'rede'])
          .optional()
          .describe(
            'Filtrar por brand espec\xEDfica. "default" retorna tokens sem brand, omitir retorna todos. Brands dispon\xEDveis: tray (azul), bagy (rosa), rede (laranja)'
          ),
        format: z4
          .enum(['structured', 'css'])
          .optional()
          .default('structured')
          .describe('"structured" retorna lista organizada, "css" retorna o arquivo CSS bruto completo'),
      }),
    },
    async ({ category, brand, format }) => {
      if (format === 'css') {
        const cssText = await getTokensAsText();
        return {
          content: [
            {
              type: 'text',
              text: `# Tokens CSS do Design System

\`\`\`css
${cssText}
\`\`\``,
            },
          ],
        };
      }
      const tokens = await getTokensByCategory(category, brand);
      if (tokens.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Nenhum token encontrado para categoria "${category}"${brand ? ` e brand "${brand}"` : ''}.`,
            },
          ],
        };
      }
      const grouped = /* @__PURE__ */ new Map();
      for (const token of tokens) {
        const key = token.category;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(token);
      }
      const lines = [];
      lines.push(
        `# Tokens de Design${category !== 'all' ? ` \u2014 ${category}` : ''}${brand ? ` (brand: ${brand})` : ''}`
      );
      lines.push(`
Total: ${tokens.length} tokens
`);
      lines.push('> **Regra**: Sempre use vari\xE1veis CSS `--s-*` em vez de valores hardcoded.\n');
      for (const [cat, catTokens] of grouped) {
        const desc = categoryDescriptions[cat];
        lines.push(`
## ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        if (desc)
          lines.push(`*${desc}*
`);
        const byTheme = {
          light: catTokens.filter((t) => t.theme === 'light' || t.theme === 'both' || !t.theme),
          dark: catTokens.filter((t) => t.theme === 'dark'),
        };
        if (byTheme.light.length > 0) {
          lines.push('\n```css');
          for (const token of byTheme.light) {
            const brandLabel = token.brand ? ` /* brand: ${token.brand} */` : '';
            lines.push(`${token.name}: ${token.value};${brandLabel}`);
          }
          lines.push('```');
        }
        if (byTheme.dark.length > 0) {
          lines.push('\n**Dark mode overrides:**');
          lines.push('```css');
          for (const token of byTheme.dark) {
            lines.push(`${token.name}: ${token.value};`);
          }
          lines.push('```');
        }
      }
      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    }
  );
}

// mcp/resources/tokens-resource.ts
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
var tokenCategories = ['colors', 'spacing', 'borders', 'shadows', 'typography', 'motion', 'z-index'];
function registerTokensResources(server2) {
  server2.registerResource(
    'design-tokens-css',
    'design-system://tokens/css',
    {
      title: 'Tokens CSS do Design System',
      description:
        'Arquivo CSS completo com todas as vari\xE1veis CSS (--s-*) do design system: cores, espa\xE7amentos, bordas, sombras, tipografia, motion e z-index. Inclui varia\xE7\xF5es de brand (tray, bagy, rede) e dark mode.',
      mimeType: 'text/css',
    },
    async () => {
      const text = await getTokensAsText();
      return {
        contents: [{ uri: 'design-system://tokens/css', mimeType: 'text/css', text }],
      };
    }
  );
  const tokenTemplate = new ResourceTemplate('design-system://tokens/{category}', {
    list: async () => ({
      resources: tokenCategories.map((cat) => ({
        uri: `design-system://tokens/${cat}`,
        name: `Tokens de ${cat}`,
        description: `Vari\xE1veis CSS de ${cat} do design system`,
        mimeType: 'application/json',
      })),
    }),
  });
  server2.registerResource(
    'design-tokens-by-category',
    tokenTemplate,
    {
      title: 'Tokens por Categoria',
      description:
        'Tokens do design system filtrados por categoria. Categorias dispon\xEDveis: colors, spacing, borders, shadows, typography, motion, z-index.',
      mimeType: 'application/json',
    },
    async (uri, { category }) => {
      const cat = category;
      const tokens = await getTokensByCategory(cat);
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify({ category: cat, count: tokens.length, tokens }, null, 2),
          },
        ],
      };
    }
  );
}

// mcp/resources/catalog-resource.ts
function registerCatalogResource(server2) {
  server2.registerResource(
    'component-catalog',
    'design-system://catalog',
    {
      title: 'Cat\xE1logo de Componentes',
      description:
        'Lista completa de todos os componentes do design system com metadados: nome, categoria (ui/admin), caminho, se tem stories/SCSS, quantidade de props e subcomponentes dispon\xEDveis.',
      mimeType: 'application/json',
    },
    async () => {
      const components = await scanAllComponents('all');
      const catalog = {
        version: '1.0.0',
        total: components.length,
        ui: components.filter((c) => c.category === 'ui').length,
        admin: components.filter((c) => c.category === 'admin').length,
        components,
      };
      return {
        contents: [
          {
            uri: 'design-system://catalog',
            mimeType: 'application/json',
            text: JSON.stringify(catalog, null, 2),
          },
        ],
      };
    }
  );
}

// mcp/resources/types-resource.ts
import { readFile as readFile2 } from 'node:fs/promises';
var typesPath = new URL('../../src/types/Types.ts', import.meta.url).pathname;
function registerTypesResource(server2) {
  server2.registerResource(
    'design-system-types',
    'design-system://types',
    {
      title: 'Tipos TypeScript do Design System',
      description:
        'Tipos TypeScript globais do design system: Size (sm|md|lg), Variant (primary|success|danger|link|plain|default), Spacing, Alignment, Target, InputMode, DestructVariant. Use estes tipos ao criar componentes ou ao passar props.',
      mimeType: 'text/plain',
    },
    async () => {
      const text = await readFile2(typesPath, 'utf-8');
      return {
        contents: [
          {
            uri: 'design-system://types',
            mimeType: 'text/plain',
            text: `# Tipos TypeScript \u2014 @tray-tecnologia/design-system

\`\`\`typescript
${text}
\`\`\``,
          },
        ],
      };
    }
  );
}

// mcp/prompts/use-component.ts
import { z as z5 } from 'zod';
function registerUseComponentPrompt(server2) {
  server2.registerPrompt(
    'use-component',
    {
      title: 'Como usar um componente do Design System',
      description:
        'Gera um guia completo e contextualizado de como usar um componente espec\xEDfico do design system: props, exemplos de c\xF3digo, subcomponentes e tokens CSS relevantes.',
      argsSchema: {
        componentName: z5.string().describe('Nome do componente. Ex: Button, Modal, FormTextfield, Alert, Dropdown'),
      },
    },
    async ({ componentName }) => {
      const bundle = await readComponentBundle(componentName);
      if (!bundle) {
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `O componente "${componentName}" n\xE3o foi encontrado no design system. Use a tool list_components para ver todos os componentes dispon\xEDveis.`,
              },
            },
          ],
        };
      }
      const sections = [];
      sections.push(`# Guia de Uso: ${bundle.name}`);
      sections.push(
        `
Voc\xEA est\xE1 trabalhando com o **${bundle.name}** do design system \`@tray-tecnologia/design-system\`.
`
      );
      sections.push('## Import');
      sections.push(`\`\`\`typescript
import { ${bundle.name} } from '@tray-tecnologia/design-system'
\`\`\``);
      if (bundle.subcomponents.length > 0) {
        sections.push('\n## Subcomponentes dispon\xEDveis');
        sections.push(`O \`${bundle.name}\` \xE9 composto pelos seguintes subcomponentes:`);
        sections.push(bundle.subcomponents.map((s) => `- \`${s}\``).join('\n'));
        sections.push(`
\`\`\`typescript
import { ${bundle.name}, ${bundle.subcomponents.join(', ')} } from '@tray-tecnologia/design-system'
\`\`\``);
      }
      if (bundle.props.length > 0) {
        sections.push('\n## Props dispon\xEDveis');
        const required = bundle.props.filter((p) => p.required);
        const optional = bundle.props.filter((p) => !p.required);
        if (required.length > 0) {
          sections.push('\n### Obrigat\xF3rias');
          sections.push('| Prop | Tipo |');
          sections.push('|------|------|');
          required.forEach((p) => sections.push(`| \`${p.name}\` | \`${p.type}\` |`));
        }
        if (optional.length > 0) {
          sections.push('\n### Opcionais');
          sections.push('| Prop | Tipo | Default |');
          sections.push('|------|------|---------|');
          optional.forEach((p) => sections.push(`| \`${p.name}\` | \`${p.type}\` | ${p.default ?? '\u2014'} |`));
        }
      }
      if (bundle.files.stories) {
        sections.push('\n## Exemplos de uso (do Storybook)');
        sections.push('```typescript');
        sections.push(bundle.files.stories);
        sections.push('```');
      }
      sections.push('\n## Regras de uso');
      sections.push(`- Sempre importe de \`@tray-tecnologia/design-system\``);
      sections.push('- Use tokens CSS `--s-*` para espa\xE7amentos, cores e tipografia (nunca valores hardcoded)');
      sections.push('- Utilize as variantes padr\xE3o: `primary`, `success`, `danger`, `plain`, `link`, `default`');
      sections.push('- Use os tamanhos padr\xE3o via prop `size`: `sm`, `md`, `lg`');
      sections.push('- Respeite o tema: tokens se adaptam automaticamente para dark mode via `data-theme="dark"`');
      sections.push('- Respeite o brand: cores de destaque mudam por `data-company` (tray, bagy, rede)');
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: sections.join('\n'),
            },
          },
        ],
      };
    }
  );
}

// mcp/prompts/create-component.ts
function registerCreateComponentPrompt(server2) {
  server2.registerPrompt(
    'create-component',
    {
      title: 'Criar componente usando o Design System',
      description:
        'Guia completo de como criar um novo componente Vue que usa o design system corretamente: tokens, nomenclatura, padr\xF5es de props/emits, temas e brand.',
    },
    async () => {
      const [spacingTokens, colorTokens, borderTokens] = await Promise.all([
        getTokensByCategory('spacing'),
        getTokensByCategory('colors'),
        getTokensByCategory('borders'),
      ]);
      const spacingList = spacingTokens
        .slice(0, 10)
        .map((t) => `  ${t.name}: ${t.value};`)
        .join('\n');
      const colorSample = colorTokens
        .filter((t) => !t.brand && t.theme !== 'dark')
        .slice(0, 12)
        .map((t) => `  ${t.name}: ${t.value};`)
        .join('\n');
      const borderSample = borderTokens
        .filter((t) => !t.brand)
        .slice(0, 8)
        .map((t) => `  ${t.name}: ${t.value};`)
        .join('\n');
      const content = `# Guia: Criar Componente com o Design System @tray-tecnologia/design-system

## Stack obrigat\xF3ria
- Vue 3 Composition API com \`<script setup lang="ts">\`
- TypeScript estrito
- SCSS para estilos (importando tokens)

## Estrutura de um componente

\`\`\`vue
<script setup lang="ts">
import type { Size, Variant } from '@tray-tecnologia/design-system'

interface Props {
  variant?: Variant        // 'primary' | 'success' | 'danger' | 'link' | 'plain' | 'default'
  size?: Size              // 'sm' | 'md' | 'lg'
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div class="my-component" :class="[\`-\${props.size}\`, \`-\${props.variant || 'default'}\`]">
    <slot>{{ props.label }}</slot>
  </div>
</template>

<style lang="scss">
@import './MyComponent.scss';
</style>
\`\`\`

## Tokens de Espa\xE7amento (use SEMPRE em vez de px hardcoded)

\`\`\`css
/* Prefixo: --s-spacing-* */
${spacingList}
\`\`\`

**Exemplo:**
\`\`\`scss
.my-component {
  padding: var(--s-spacing-x-small);   // 16px
  margin-bottom: var(--s-spacing-nano); // 8px
  gap: var(--s-spacing-quark);          // 4px
}
\`\`\`

## Tokens de Cor (use SEMPRE em vez de hex hardcoded)

\`\`\`css
/* Exemplos de tokens sem\xE2nticos de cor: */
${colorSample}
\`\`\`

**Exemplo:**
\`\`\`scss
.my-component {
  background: var(--s-color-fill-default);
  color: var(--s-color-content-default);
  border: var(--s-border-light);
  border-color: var(--s-color-border-default);
}
\`\`\`

## Tokens de Borda

\`\`\`css
${borderSample}
\`\`\`

## Padr\xF5es de nomenclatura CSS

- Componentes UI: classe base \`ui-{nome}\` (ex: \`ui-button\`, \`ui-modal\`)
- Componentes Admin: classe base \`admin-{nome}\`
- Modificadores: prefixo \`-\` (ex: \`-primary\`, \`-sm\`, \`-disabled\`, \`-loading\`)
- Elementos internos: \`ui-{nome}-{elemento}\` (ex: \`ui-button-label\`, \`ui-modal-body\`)

## Variantes dispon\xEDveis (type Variant)

\`\`\`typescript
type Variant = 'primary' | 'success' | 'danger' | 'link' | 'plain' | 'default'
\`\`\`

## Tamanhos dispon\xEDveis (type Size)

\`\`\`typescript
type Size = 'sm' | 'md' | 'lg'
\`\`\`

## Tipos globais dispon\xEDveis

\`\`\`typescript
import type { Size, Variant, Spacing, Alignment, Target, InputMode } from '@tray-tecnologia/design-system'
\`\`\`

## Dark mode

O dark mode \xE9 aplicado automaticamente via \`[data-theme=dark]\`. Os tokens j\xE1 tem overrides definidos:
\`\`\`scss
// N\xC3O fa\xE7a isso:
.my-component { background: #ffffff; }

// FA\xC7A isso (o token se adapta automaticamente):
.my-component { background: var(--s-color-fill-default); }
\`\`\`

## Brand (multi-empresa)

Cores de destaque mudam por \`data-company\`:
- \`tray\` \u2192 azul (\`--b-color-base: #1c89f3\`)
- \`bagy\` \u2192 rosa (\`--b-color-base: #FA3D8B\`)
- \`rede\` \u2192 laranja (\`--b-color-base: #d97706\`)

Use \`var(--b-color-base)\` para cor de destaque que se adapta \xE0 empresa.
Use \`var(--s-color-fill-highlight)\` (que referencia \`--b-color-base\`) para backgrounds de destaque.

## Importando componentes do Design System no seu componente

\`\`\`typescript
import Button from '@tray-tecnologia/design-system'
import { Button, Icon, Spinner } from '@tray-tecnologia/design-system'
\`\`\`
`;
      return {
        messages: [
          {
            role: 'user',
            content: { type: 'text', text: content },
          },
        ],
      };
    }
  );
}

// mcp/prompts/apply-tokens.ts
function registerApplyTokensPrompt(server2) {
  server2.registerPrompt(
    'apply-tokens',
    {
      title: 'Como aplicar tokens de design corretamente',
      description:
        'Guia focado em como usar os tokens CSS do design system corretamente em estilos SCSS/CSS. Inclui todas as categorias, como tokens mudam por brand e dark mode.',
    },
    async () => {
      const allTokens = await parseDesignTokens();
      const byCategory = /* @__PURE__ */ new Map();
      for (const token of allTokens) {
        if (!byCategory.has(token.category)) byCategory.set(token.category, []);
        byCategory.get(token.category).push(token);
      }
      function formatTokens(tokens, limit = 15) {
        return tokens
          .filter((t) => !t.brand && t.theme !== 'dark')
          .slice(0, limit)
          .map((t) => `  ${t.name}: ${t.value};`)
          .join('\n');
      }
      const content = `# Guia: Aplicar Tokens de Design

## Regra fundamental
**Nunca use valores hardcoded em estilos.** Use sempre vari\xE1veis CSS \`--s-*\` (tokens sem\xE2nticos).

| \u274C Errado | \u2705 Correto |
|-----------|-----------|
| \`padding: 16px\` | \`padding: var(--s-spacing-x-small)\` |
| \`color: #293b50\` | \`color: var(--s-color-content-default)\` |
| \`border-radius: 8px\` | \`border-radius: var(--s-border-radius-medium)\` |
| \`box-shadow: 0 4px 8px ...\` | \`box-shadow: var(--s-shadow-level-1)\` |
| \`font-weight: 600\` | \`font-weight: var(--s-font-weight-semibold)\` |
| \`transition: 300ms ease\` | \`transition: var(--s-motion-duration-fast) var(--s-motion-ease-out)\` |

---

## Espa\xE7amentos (--s-spacing-*)

\`\`\`css
${formatTokens(byCategory.get('spacing') ?? [], 20)}
\`\`\`

**Uso:**
\`\`\`scss
.component {
  padding: var(--s-spacing-x-small);  // 16px \u2014 espa\xE7amento interno padr\xE3o
  gap: var(--s-spacing-nano);          // 8px \u2014 gap entre elementos
  margin-bottom: var(--s-spacing-small); // 24px \u2014 margem entre se\xE7\xF5es
}
\`\`\`

---

## Cores (--s-color-*)

As cores s\xE3o organizadas em grupos sem\xE2nticos:

### Backgrounds
\`\`\`css
${formatTokens(
  (byCategory.get('colors') ?? []).filter((t) => t.name.includes('background')),
  5
)}
\`\`\`

### Fills (backgrounds de elementos)
\`\`\`css
${formatTokens(
  (byCategory.get('colors') ?? []).filter((t) => t.name.includes('fill') && !t.name.includes('dark')),
  8
)}
\`\`\`

### Borders
\`\`\`css
${formatTokens(
  (byCategory.get('colors') ?? []).filter((t) => t.name.includes('border')),
  8
)}
\`\`\`

### Content (textos)
\`\`\`css
${formatTokens(
  (byCategory.get('colors') ?? []).filter((t) => t.name.includes('content') && !t.name.includes('dark')),
  8
)}
\`\`\`

---

## Bordas (--s-border-*)

\`\`\`css
${formatTokens(byCategory.get('borders') ?? [], 15)}
\`\`\`

**Uso:**
\`\`\`scss
.component {
  border: var(--s-border-light);                     // 1px
  border-radius: var(--s-border-radius-medium);      // 8px
  outline: var(--s-border-thin) var(--s-color-border-highlight);
}
\`\`\`

---

## Sombras (--s-shadow-*)

\`\`\`css
${formatTokens(byCategory.get('shadows') ?? [], 6)}
\`\`\`

---

## Tipografia (--s-typography-*, --s-font-*)

\`\`\`css
${formatTokens(byCategory.get('typography') ?? [], 20)}
\`\`\`

**Uso:**
\`\`\`scss
.title { font: var(--s-typography-heading-medium); }
.label { font: var(--s-typography-label-medium); }
.body  { font: var(--s-typography-paragraph-regular); }
\`\`\`

---

## Motion (--s-motion-*)

\`\`\`css
${formatTokens(byCategory.get('motion') ?? [], 12)}
\`\`\`

**Uso:**
\`\`\`scss
.component {
  transition: all var(--s-motion-duration-fast) var(--s-motion-ease-out);
}
\`\`\`

---

## Z-Index (--s-index-*)

\`\`\`css
${formatTokens(byCategory.get('z-index') ?? [], 10)}
\`\`\`

---

## Brand colors (--b-color-*)

Cores que **mudam por empresa** via \`data-company\`:

| Token | Tray | Bagy | Rede | Suite (default) |
|-------|------|------|------|-----------------|
| \`--b-color-base\` | #1c89f3 | #FA3D8B | #d97706 | #446285 |
| \`--b-color-medium\` | #3d9cf5 | #FB5197 | #e19238 | #859ebd |
| \`--b-color-light\` | #e8f3fe | #FEECF3 | #fbf1e6 | #f5f7fa |
| \`--b-color-dark\` | #061b31 | #300718 | #2b1801 | #0e141b |

**Use tokens sem\xE2nticos** que referenciam as cores de brand:
\`\`\`scss
.highlight {
  background: var(--s-color-fill-highlight);    // usa --b-color-base
  color: var(--s-color-content-on-color);       // branco (contraste)
}
\`\`\`

---

## Dark mode

Os tokens se adaptam automaticamente quando \`data-theme="dark"\` est\xE1 no elemento pai.

\`\`\`scss
// N\xE3o precisa fazer nada especial \u2014 os tokens j\xE1 t\xEAm overrides:
.component {
  background: var(--s-color-fill-default);  // branco no light, escuro no dark
  color: var(--s-color-content-default);    // escuro no light, claro no dark
}
\`\`\`
`;
      return {
        messages: [
          {
            role: 'user',
            content: { type: 'text', text: content },
          },
        ],
      };
    }
  );
}

// mcp/server.ts
var appName = 'design-system-mcp';
var appVersion = '2.0.0';
function createMcpServer() {
  const server2 = new McpServer(
    { name: appName, version: appVersion },
    { capabilities: { tools: {}, resources: {}, prompts: {} } }
  );
  registerGetComponentBundle(server2);
  registerListComponents(server2);
  registerSearchComponents(server2);
  registerGetDesignTokens(server2);
  registerTokensResources(server2);
  registerCatalogResource(server2);
  registerTypesResource(server2);
  registerUseComponentPrompt(server2);
  registerCreateComponentPrompt(server2);
  registerApplyTokensPrompt(server2);
  return server2;
}

// mcp/start-stdio.ts
var server = createMcpServer();
var transport = new StdioServerTransport();
await server.connect(transport);
console.error(`\u{1F680} ${appName} v${appVersion} \u2014 MCP Server running (stdio)`);
