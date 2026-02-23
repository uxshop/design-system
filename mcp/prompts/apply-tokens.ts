import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { parseDesignTokens } from '../parsers/css-token-parser';

export function registerApplyTokensPrompt(server: McpServer): void {
  server.registerPrompt(
    'apply-tokens',
    {
      title: 'Como aplicar tokens de design corretamente',
      description:
        'Guia focado em como usar os tokens CSS do design system corretamente em estilos SCSS/CSS. Inclui todas as categorias, como tokens mudam por brand e dark mode.',
    },
    async () => {
      const allTokens = await parseDesignTokens();

      const byCategory = new Map<string, typeof allTokens>();
      for (const token of allTokens) {
        if (!byCategory.has(token.category)) byCategory.set(token.category, []);
        byCategory.get(token.category)!.push(token);
      }

      function formatTokens(tokens: typeof allTokens, limit = 15): string {
        return tokens
          .filter((t) => !t.brand && t.theme !== 'dark')
          .slice(0, limit)
          .map((t) => `  ${t.name}: ${t.value};`)
          .join('\n');
      }

      const content = `# Guia: Aplicar Tokens de Design

## Regra fundamental
**Nunca use valores hardcoded em estilos.** Use sempre variáveis CSS \`--s-*\` (tokens semânticos).

| ❌ Errado | ✅ Correto |
|-----------|-----------|
| \`padding: 16px\` | \`padding: var(--s-spacing-x-small)\` |
| \`color: #293b50\` | \`color: var(--s-color-content-default)\` |
| \`border-radius: 8px\` | \`border-radius: var(--s-border-radius-medium)\` |
| \`box-shadow: 0 4px 8px ...\` | \`box-shadow: var(--s-shadow-level-1)\` |
| \`font-weight: 600\` | \`font-weight: var(--s-font-weight-semibold)\` |
| \`transition: 300ms ease\` | \`transition: var(--s-motion-duration-fast) var(--s-motion-ease-out)\` |

---

## Espaçamentos (--s-spacing-*)

\`\`\`css
${formatTokens(byCategory.get('spacing') ?? [], 20)}
\`\`\`

**Uso:**
\`\`\`scss
.component {
  padding: var(--s-spacing-x-small);  // 16px — espaçamento interno padrão
  gap: var(--s-spacing-nano);          // 8px — gap entre elementos
  margin-bottom: var(--s-spacing-small); // 24px — margem entre seções
}
\`\`\`

---

## Cores (--s-color-*)

As cores são organizadas em grupos semânticos:

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

**Use tokens semânticos** que referenciam as cores de brand:
\`\`\`scss
.highlight {
  background: var(--s-color-fill-highlight);    // usa --b-color-base
  color: var(--s-color-content-on-color);       // branco (contraste)
}
\`\`\`

---

## Dark mode

Os tokens se adaptam automaticamente quando \`data-theme="dark"\` está no elemento pai.

\`\`\`scss
// Não precisa fazer nada especial — os tokens já têm overrides:
.component {
  background: var(--s-color-fill-default);  // branco no light, escuro no dark
  color: var(--s-color-content-default);    // escuro no light, claro no dark
}
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
