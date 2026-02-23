import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { readComponentBundle } from '../parsers/component-scanner';

export function registerGetComponentBundle(server: McpServer): void {
  server.registerTool(
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
    async ({ name }): Promise<CallToolResult> => {
      const bundle = await readComponentBundle(name.trim());

      if (!bundle) {
        return {
          content: [
            {
              type: 'text',
              text: `Componente "${name}" nao encontrado. Use a tool list_components para ver todos os componentes disponíveis.`,
            },
          ],
          isError: true,
        };
      }

      const sections: string[] = [];

      sections.push(`# Componente: ${bundle.name}`);
      sections.push(`- **Categoria**: ${bundle.category}`);
      sections.push(`- **Caminho**: ${bundle.dirPath}`);

      if (bundle.subcomponents.length > 0) {
        sections.push(`- **Subcomponentes**: ${bundle.subcomponents.join(', ')}`);
      }

      sections.push('\n## Import');
      sections.push(`\`\`\`typescript\nimport { ${bundle.name} } from '@tray-tecnologia/design-system'\n\`\`\``);

      if (bundle.props.length > 0) {
        sections.push('\n## Props');
        const propsTable = [
          '| Prop | Tipo | Obrigatório | Default |',
          '|------|------|-------------|---------|',
          ...bundle.props.map(
            (p) => `| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Sim' : 'Não'} | ${p.default ?? '—'} |`
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
        sections.push('\n## Código do Componente (Vue SFC)');
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
