import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { scanAllComponents } from '../parsers/component-scanner';
import type { ComponentCategory } from '../types';

export function registerListComponents(server: McpServer): void {
  server.registerTool(
    'list_components',
    {
      description:
        'Lista todos os componentes disponíveis no design system com seus metadados (categoria, se tem stories, se tem SCSS, quantidade de props, subcomponentes). Use para descobrir quais componentes existem antes de buscar detalhes.',
      inputSchema: z.object({
        category: z
          .enum(['ui', 'admin', 'all'])
          .optional()
          .default('all')
          .describe(
            'Filtrar por categoria: "ui" para componentes de interface, "admin" para componentes administrativos, "all" para todos'
          ),
      }),
    },
    async ({ category }): Promise<CallToolResult> => {
      const components = await scanAllComponents(category as ComponentCategory);

      const lines: string[] = [];
      lines.push(`# Componentes do Design System (${components.length} encontrados)`);
      lines.push(`Categoria: **${category}**\n`);

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

        lines.push(`\n## ${group.label} (${group.items.length})\n`);
        lines.push('| Componente | Export | Props | Subcomponentes | Stories | SCSS |');
        lines.push('|-----------|--------|-------|----------------|---------|------|');

        for (const c of group.items) {
          const sub = c.subcomponents.length > 0 ? c.subcomponents.join(', ') : '—';
          lines.push(
            `| ${c.name} | \`${c.exportName}\` | ${c.propsCount} | ${sub} | ${c.hasStories ? '✓' : '—'} | ${c.hasScss ? '✓' : '—'} |`
          );
        }
      }

      lines.push('\n---');
      lines.push(
        '> Use `get_component_bundle` com o nome do componente para ver o código, props detalhadas e exemplos de uso.'
      );

      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    }
  );
}
