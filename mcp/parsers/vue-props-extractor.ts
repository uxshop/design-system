import type { PropDefinition } from '../types';

function extractPropsBlock(scriptContent: string): string | null {
  const definePropsRef = scriptContent.match(/defineProps\s*<\s*(\w+)\s*>/);
  if (definePropsRef) {
    const interfaceName = definePropsRef[1];
    const namedInterfaceRegex = new RegExp(`(?:export\\s+)?interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`);
    const namedInterface = scriptContent.match(namedInterfaceRegex);
    if (namedInterface) return namedInterface[1];
  }

  const withDefaultsInline = scriptContent.match(/withDefaults\s*\(\s*defineProps\s*<\s*\{([\s\S]*?)\}\s*>\s*\(\s*\)/);
  if (withDefaultsInline) return withDefaultsInline[1];

  const inlineDefineProps = scriptContent.match(/defineProps\s*<\s*\{([\s\S]*?)\}\s*>\s*\(\s*\)/);
  if (inlineDefineProps) return inlineDefineProps[1];

  return null;
}

function extractDefaults(scriptContent: string): Record<string, string> {
  const defaults: Record<string, string> = {};

  const withDefaultsBlock = scriptContent.match(
    /withDefaults\s*\(\s*defineProps[\s\S]*?\)\s*,\s*\{([\s\S]*?)\n\s*\}\s*\)/
  );

  if (!withDefaultsBlock) return defaults;

  const block = withDefaultsBlock[1];
  const lineRegex = /^\s*(\w+)\s*:\s*(.+?)\s*(?:,\s*)?$/gm;
  let match: RegExpExecArray | null;

  while ((match = lineRegex.exec(block)) !== null) {
    defaults[match[1]] = match[2].trim();
  }

  return defaults;
}

function parsePropLine(line: string): { name: string; type: string; required: boolean } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return null;

  const propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?)\s*$/);
  if (!propMatch) return null;

  const [, name, optional, type] = propMatch;
  return {
    name,
    type: type.replace(/,$/, '').trim(),
    required: optional !== '?',
  };
}

export function extractPropsFromVue(vueContent: string): PropDefinition[] {
  const scriptMatch = vueContent.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/);
  if (!scriptMatch) return [];

  const scriptContent = scriptMatch[1];
  const propsBlock = extractPropsBlock(scriptContent);
  if (!propsBlock) return [];

  const defaults = extractDefaults(scriptContent);

  const props: PropDefinition[] = [];
  const lines = propsBlock.split('\n');

  for (const line of lines) {
    const parsed = parsePropLine(line);
    if (!parsed) continue;

    props.push({
      name: parsed.name,
      type: parsed.type,
      required: parsed.required,
      default: defaults[parsed.name],
    });
  }

  return props;
}
