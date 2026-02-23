import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getTokensByCategory, getTokensAsText } from '../parsers/css-token-parser';
import type { TokenCategory, BrandName } from '../types';

const categoryDescriptions: Record<string, string> = {
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

export function registerGetDesignTokens(server: McpServer): void {
  server.registerTool(
    'get_design_tokens',
    {
      description:
        'Retorna os tokens de design do design system (variáveis CSS --s-*). Tokens são usados para garantir consistência visual: cores, espaçamentos, bordas, sombras, tipografia, motion e z-index. Sempre use tokens em vez de valores hardcoded.',
      inputSchema: z.object({
        category: z
          .enum(['colors', 'spacing', 'borders', 'shadows', 'typography', 'motion', 'z-index', 'all'])
          .optional()
          .default('all')
          .describe('Categoria de tokens a retornar'),
        brand: z
          .enum(['default', 'tray', 'bagy', 'rede'])
          .optional()
          .describe(
            'Filtrar por brand específica. "default" retorna tokens sem brand, omitir retorna todos. Brands disponíveis: tray (azul), bagy (rosa), rede (laranja)'
          ),
        format: z
          .enum(['structured', 'css'])
          .optional()
          .default('structured')
          .describe('"structured" retorna lista organizada, "css" retorna o arquivo CSS bruto completo'),
      }),
    },
    async ({ category, brand, format }): Promise<CallToolResult> => {
      if (format === 'css') {
        const cssText = await getTokensAsText();
        return {
          content: [
            {
              type: 'text',
              text: `# Tokens CSS do Design System\n\n\`\`\`css\n${cssText}\n\`\`\``,
            },
          ],
        };
      }

      const tokens = await getTokensByCategory(category as TokenCategory, brand as BrandName | undefined);

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

      const grouped = new Map<string, typeof tokens>();
      for (const token of tokens) {
        const key = token.category;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push(token);
      }

      const lines: string[] = [];
      lines.push(`# Tokens de Design${category !== 'all' ? ` — ${category}` : ''}${brand ? ` (brand: ${brand})` : ''}`);
      lines.push(`\nTotal: ${tokens.length} tokens\n`);
      lines.push('> **Regra**: Sempre use variáveis CSS `--s-*` em vez de valores hardcoded.\n');

      for (const [cat, catTokens] of grouped) {
        const desc = categoryDescriptions[cat];
        lines.push(`\n## ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        if (desc) lines.push(`*${desc}*\n`);

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
