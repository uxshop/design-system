import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getTokensAsText, getTokensByCategory } from '../parsers/css-token-parser';
import type { TokenCategory } from '../types';

const tokenCategories: TokenCategory[] = ['colors', 'spacing', 'borders', 'shadows', 'typography', 'motion', 'z-index'];

export function registerTokensResources(server: McpServer): void {
  server.registerResource(
    'design-tokens-css',
    'design-system://tokens/css',
    {
      title: 'Tokens CSS do Design System',
      description:
        'Arquivo CSS completo com todas as variáveis CSS (--s-*) do design system: cores, espaçamentos, bordas, sombras, tipografia, motion e z-index. Inclui variações de brand (tray, bagy, rede) e dark mode.',
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
        description: `Variáveis CSS de ${cat} do design system`,
        mimeType: 'application/json',
      })),
    }),
  });

  server.registerResource(
    'design-tokens-by-category',
    tokenTemplate,
    {
      title: 'Tokens por Categoria',
      description:
        'Tokens do design system filtrados por categoria. Categorias disponíveis: colors, spacing, borders, shadows, typography, motion, z-index.',
      mimeType: 'application/json',
    },
    async (uri, { category }) => {
      const cat = category as string as TokenCategory;
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
