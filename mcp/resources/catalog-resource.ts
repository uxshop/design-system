import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { scanAllComponents } from '../parsers/component-scanner';

export function registerCatalogResource(server: McpServer): void {
  server.registerResource(
    'component-catalog',
    'design-system://catalog',
    {
      title: 'Catálogo de Componentes',
      description:
        'Lista completa de todos os componentes do design system com metadados: nome, categoria (ui/admin), caminho, se tem stories/SCSS, quantidade de props e subcomponentes disponíveis.',
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
