import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getTokensByCategory } from '../parsers/css-token-parser';

export function registerCreateComponentPrompt(server: McpServer): void {
  server.registerPrompt(
    'create-component',
    {
      title: 'Criar componente usando o Design System',
      description:
        'Guia completo de como criar um novo componente Vue que usa o design system corretamente: tokens, nomenclatura, padrões de props/emits, temas e brand.',
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

## Stack obrigatória
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

## Tokens de Espaçamento (use SEMPRE em vez de px hardcoded)

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
/* Exemplos de tokens semânticos de cor: */
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

## Padrões de nomenclatura CSS

- Componentes UI: classe base \`ui-{nome}\` (ex: \`ui-button\`, \`ui-modal\`)
- Componentes Admin: classe base \`admin-{nome}\`
- Modificadores: prefixo \`-\` (ex: \`-primary\`, \`-sm\`, \`-disabled\`, \`-loading\`)
- Elementos internos: \`ui-{nome}-{elemento}\` (ex: \`ui-button-label\`, \`ui-modal-body\`)

## Variantes disponíveis (type Variant)

\`\`\`typescript
type Variant = 'primary' | 'success' | 'danger' | 'link' | 'plain' | 'default'
\`\`\`

## Tamanhos disponíveis (type Size)

\`\`\`typescript
type Size = 'sm' | 'md' | 'lg'
\`\`\`

## Tipos globais disponíveis

\`\`\`typescript
import type { Size, Variant, Spacing, Alignment, Target, InputMode } from '@tray-tecnologia/design-system'
\`\`\`

## Dark mode

O dark mode é aplicado automaticamente via \`[data-theme=dark]\`. Os tokens já tem overrides definidos:
\`\`\`scss
// NÃO faça isso:
.my-component { background: #ffffff; }

// FAÇA isso (o token se adapta automaticamente):
.my-component { background: var(--s-color-fill-default); }
\`\`\`

## Brand (multi-empresa)

Cores de destaque mudam por \`data-company\`:
- \`tray\` → azul (\`--b-color-base: #1c89f3\`)
- \`bagy\` → rosa (\`--b-color-base: #FA3D8B\`)
- \`rede\` → laranja (\`--b-color-base: #d97706\`)

Use \`var(--b-color-base)\` para cor de destaque que se adapta à empresa.
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
            role: 'user' as const,
            content: { type: 'text' as const, text: content },
          },
        ],
      };
    }
  );
}
