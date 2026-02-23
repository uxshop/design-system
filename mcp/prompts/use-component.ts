import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { readComponentBundle } from '../parsers/component-scanner';

export function registerUseComponentPrompt(server: McpServer): void {
  server.registerPrompt(
    'use-component',
    {
      title: 'Como usar um componente do Design System',
      description:
        'Gera um guia completo e contextualizado de como usar um componente específico do design system: props, exemplos de código, subcomponentes e tokens CSS relevantes.',
      argsSchema: {
        componentName: z.string().describe('Nome do componente. Ex: Button, Modal, FormTextfield, Alert, Dropdown'),
      },
    },
    async ({ componentName }) => {
      const bundle = await readComponentBundle(componentName);

      if (!bundle) {
        return {
          messages: [
            {
              role: 'user' as const,
              content: {
                type: 'text' as const,
                text: `O componente "${componentName}" não foi encontrado no design system. Use a tool list_components para ver todos os componentes disponíveis.`,
              },
            },
          ],
        };
      }

      const sections: string[] = [];

      sections.push(`# Guia de Uso: ${bundle.name}`);
      sections.push(
        `\nVocê está trabalhando com o **${bundle.name}** do design system \`@tray-tecnologia/design-system\`.\n`
      );

      sections.push('## Import');
      sections.push(`\`\`\`typescript
import { ${bundle.name} } from '@tray-tecnologia/design-system'
\`\`\``);

      if (bundle.subcomponents.length > 0) {
        sections.push('\n## Subcomponentes disponíveis');
        sections.push(`O \`${bundle.name}\` é composto pelos seguintes subcomponentes:`);
        sections.push(bundle.subcomponents.map((s) => `- \`${s}\``).join('\n'));
        sections.push(`\n\`\`\`typescript
import { ${bundle.name}, ${bundle.subcomponents.join(', ')} } from '@tray-tecnologia/design-system'
\`\`\``);
      }

      if (bundle.props.length > 0) {
        sections.push('\n## Props disponíveis');

        const required = bundle.props.filter((p) => p.required);
        const optional = bundle.props.filter((p) => !p.required);

        if (required.length > 0) {
          sections.push('\n### Obrigatórias');
          sections.push('| Prop | Tipo |');
          sections.push('|------|------|');
          required.forEach((p) => sections.push(`| \`${p.name}\` | \`${p.type}\` |`));
        }

        if (optional.length > 0) {
          sections.push('\n### Opcionais');
          sections.push('| Prop | Tipo | Default |');
          sections.push('|------|------|---------|');
          optional.forEach((p) => sections.push(`| \`${p.name}\` | \`${p.type}\` | ${p.default ?? '—'} |`));
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
      sections.push('- Use tokens CSS `--s-*` para espaçamentos, cores e tipografia (nunca valores hardcoded)');
      sections.push('- Utilize as variantes padrão: `primary`, `success`, `danger`, `plain`, `link`, `default`');
      sections.push('- Use os tamanhos padrão via prop `size`: `sm`, `md`, `lg`');
      sections.push('- Respeite o tema: tokens se adaptam automaticamente para dark mode via `data-theme="dark"`');
      sections.push('- Respeite o brand: cores de destaque mudam por `data-company` (tray, bagy, rede)');

      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: sections.join('\n'),
            },
          },
        ],
      };
    }
  );
}
