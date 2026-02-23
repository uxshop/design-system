import { readFile } from 'node:fs/promises';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const typesPath = new URL('../../src/types/Types.ts', import.meta.url).pathname;

export function registerTypesResource(server: McpServer): void {
  server.registerResource(
    'design-system-types',
    'design-system://types',
    {
      title: 'Tipos TypeScript do Design System',
      description:
        'Tipos TypeScript globais do design system: Size (sm|md|lg), Variant (primary|success|danger|link|plain|default), Spacing, Alignment, Target, InputMode, DestructVariant. Use estes tipos ao criar componentes ou ao passar props.',
      mimeType: 'text/plain',
    },
    async () => {
      const text = await readFile(typesPath, 'utf-8');
      return {
        contents: [
          {
            uri: 'design-system://types',
            mimeType: 'text/plain',
            text: `# Tipos TypeScript — @tray-tecnologia/design-system\n\n\`\`\`typescript\n${text}\n\`\`\``,
          },
        ],
      };
    }
  );
}
