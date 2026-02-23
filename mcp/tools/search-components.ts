import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { scanAllComponents } from '../parsers/component-scanner';
import type { ComponentCatalogEntry, ComponentCategory } from '../types';

const semanticMap: Record<string, string[]> = {
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

function fuzzyMatch(query: string, components: ComponentCatalogEntry[]): ComponentCatalogEntry[] {
  const q = query.toLowerCase().replace(/[-_\s]/g, '');
  return components.filter((c) => {
    const name = c.name.toLowerCase();
    const exportName = c.exportName.toLowerCase();
    return name.includes(q) || q.includes(name) || exportName.includes(q);
  });
}

function semanticSearch(query: string, components: ComponentCatalogEntry[]): ComponentCatalogEntry[] {
  const q = query.toLowerCase();
  const componentNames = new Set<string>();

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

export function registerSearchComponents(server: McpServer): void {
  server.registerTool(
    'search_components',
    {
      description:
        'Busca componentes do design system por nome ou por funcionalidade/conceito. Suporta busca semântica em português (ex: "formulario", "navegacao", "feedback") e busca por nome parcial (ex: "form", "button", "modal").',
      inputSchema: z.object({
        query: z
          .string()
          .describe(
            'Termo de busca. Pode ser nome parcial (ex: "form", "modal") ou conceito funcional em português (ex: "formulario", "feedback", "navegacao", "layout", "tabela", "botao", "loading")'
          ),
        category: z.enum(['ui', 'admin', 'all']).optional().default('all').describe('Filtrar resultados por categoria'),
      }),
    },
    async ({ query, category }): Promise<CallToolResult> => {
      const allComponents = await scanAllComponents(category as ComponentCategory);
      const trimmed = query.trim();

      const semanticResults = semanticSearch(trimmed, allComponents);
      const fuzzyResults = fuzzyMatch(trimmed, allComponents);

      const combined = new Map<string, ComponentCatalogEntry>();
      for (const c of [...semanticResults, ...fuzzyResults]) {
        combined.set(c.name, c);
      }

      const results = Array.from(combined.values());

      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Nenhum componente encontrado para "${query}".\n\nUse \`list_components\` para ver todos os componentes disponíveis.`,
            },
          ],
        };
      }

      const lines: string[] = [];
      lines.push(`# Busca: "${query}" — ${results.length} resultado(s)\n`);
      lines.push('| Componente | Categoria | Props | Subcomponentes | Stories |');
      lines.push('|-----------|-----------|-------|----------------|---------|');

      for (const c of results) {
        const sub = c.subcomponents.length > 0 ? c.subcomponents.join(', ') : '—';
        lines.push(`| \`${c.name}\` | ${c.category} | ${c.propsCount} | ${sub} | ${c.hasStories ? '✓' : '—'} |`);
      }

      lines.push('\n---');
      lines.push('> Use `get_component_bundle` com o nome do componente para ver detalhes completos.');

      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    }
  );
}
