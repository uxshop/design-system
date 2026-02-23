import sass from 'sass';
import type { TokenEntry, TokenCategory, BrandName } from '../types';

const tokensScssPath = new URL('../../src/scss/tokens/tokens.scss', import.meta.url).pathname;

const categoryCommentMap: Record<string, TokenCategory> = {
  'Borders Radius': 'borders',
  Borders: 'borders',
  Colors: 'colors',
  'Font Size': 'typography',
  'Font Weight': 'typography',
  Typograph: 'typography',
  'Line Height': 'typography',
  'Z-index': 'z-index',
  'Motions Duration': 'motion',
  Motions: 'motion',
  Shadows: 'shadows',
  Spacings: 'spacing',
};

function detectCategory(tokenName: string, currentCategory: TokenCategory): TokenCategory {
  if (tokenName.startsWith('--s-border-radius')) return 'borders';
  if (tokenName.startsWith('--s-border')) return 'borders';
  if (tokenName.startsWith('--s-color') || tokenName.startsWith('--b-color')) return 'colors';
  if (tokenName.startsWith('--s-font-size')) return 'typography';
  if (tokenName.startsWith('--s-font-weight')) return 'typography';
  if (tokenName.startsWith('--s-typography')) return 'typography';
  if (tokenName.startsWith('--s-line-height')) return 'typography';
  if (tokenName.startsWith('--s-index')) return 'z-index';
  if (tokenName.startsWith('--s-motion')) return 'motion';
  if (tokenName.startsWith('--s-shadow')) return 'shadows';
  if (tokenName.startsWith('--s-spacing')) return 'spacing';
  return currentCategory;
}

function detectBrand(selectorContext: string): BrandName | undefined {
  if (selectorContext.includes('data-company=tray')) return 'tray';
  if (selectorContext.includes('data-company=bagy')) return 'bagy';
  if (selectorContext.includes('data-company=rede')) return 'rede';
  return undefined;
}

function detectTheme(selectorContext: string): 'light' | 'dark' | 'both' {
  if (selectorContext.includes('data-theme=dark')) return 'dark';
  return 'light';
}

let compiledCssCache: string | null = null;
let tokensCache: TokenEntry[] | null = null;

async function compileScssToCss(): Promise<string> {
  if (compiledCssCache) return compiledCssCache;
  const result = await sass.compileAsync(tokensScssPath);
  compiledCssCache = result.css;
  return compiledCssCache;
}

export async function parseDesignTokens(): Promise<TokenEntry[]> {
  if (tokensCache) return tokensCache;

  const content = await compileScssToCss();
  const tokens: TokenEntry[] = [];

  let currentCategory: TokenCategory = 'colors';
  let currentSelectorContext = '';

  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    const selectorMatch = trimmed.match(/^([^{]+)\{$/);
    if (selectorMatch) {
      currentSelectorContext = selectorMatch[1].trim();
      continue;
    }

    if (trimmed === '}') {
      currentSelectorContext = '';
      continue;
    }

    const categoryComment = trimmed.match(/@tokens\s+(.+)/);
    if (categoryComment) {
      const label = categoryComment[1].trim();
      const mapped = Object.entries(categoryCommentMap).find(([key]) =>
        label.toLowerCase().includes(key.toLowerCase())
      );
      if (mapped) currentCategory = mapped[1];
      continue;
    }

    if (trimmed.startsWith('@tokens-end')) {
      continue;
    }

    const varMatch = trimmed.match(/^(--[\w-]+)\s*:\s*(.+?)\s*;/);
    if (!varMatch) continue;

    const [, name, rawValue] = varMatch;
    if (!name || !rawValue) continue;
    const value = rawValue.trim();
    const category = detectCategory(name, currentCategory);
    const brand = detectBrand(currentSelectorContext);
    const theme = detectTheme(currentSelectorContext);

    let group: string | undefined;
    const parts = name.replace(/^--[sb]-/, '').split('-');
    if (parts.length >= 2) {
      group = parts.slice(0, 2).join('-');
    }

    tokens.push({ name, value, category, group, theme, brand });
  }

  tokensCache = tokens;
  return tokens;
}

export async function getTokensByCategory(category: TokenCategory, brand?: BrandName): Promise<TokenEntry[]> {
  const all = await parseDesignTokens();

  return all.filter((token) => {
    if (category !== 'all' && token.category !== category) return false;
    if (brand && token.brand !== undefined && token.brand !== brand) return false;
    return true;
  });
}

export async function getTokensAsText(): Promise<string> {
  return compileScssToCss();
}
