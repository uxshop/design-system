#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const DOCS_DIR = path.join(__dirname, '../docs/components/ui');

const MISSING_COMPONENTS = [
  'alert', 'badge', 'breadcrumb', 'callout-card', 'card', 'card-info-link',
  'color-thumb', 'dialog', 'feedback-message', 'form-autocomplete', 'form-checkbox',
  'form-currency', 'form-datepicker', 'form-helper', 'form-label', 'form-layout',
  'form-radio', 'form-range', 'form-richtext', 'form-select', 'form-textarea',
  'form-textfield', 'grid', 'highlight-card', 'icon', 'list-group', 'progress',
  'progress-indeterminate', 'rating-star', 'select-item-card', 'stack', 'stats-item',
  'timeline', 'toast', 'youtube-player'
];

function pascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function titleCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function extractPropsFromTypes(typesPath) {
  if (!fs.existsSync(typesPath)) return [];

  const content = fs.readFileSync(typesPath, 'utf-8');
  const props = [];

  // Find interface definition
  const interfaceMatch = content.match(/export interface \w+Props\s*{([^}]+)}/s);
  if (!interfaceMatch) return [];

  const interfaceBody = interfaceMatch[1];

  // Extract each prop with JSDoc
  const propLines = interfaceBody.split('\n');
  let currentDoc = '';

  for (let i = 0; i < propLines.length; i++) {
    const line = propLines[i].trim();

    // Collect JSDoc comments
    if (line.startsWith('/**') || line.includes('*')) {
      currentDoc += line + ' ';
      continue;
    }

    // Parse prop definition: name?: type | name: type
    const propMatch = line.match(/^\s*(\w+)\??:\s*(.+?);/);
    if (propMatch) {
      const propName = propMatch[1];
      const fullType = propMatch[2];
      const isRequired = !line.includes('?');

      // Extract type (everything before | or undefined)
      let type = fullType.replace(/\s*\|\s*undefined\s*/, '').trim();
      if (type.includes('|')) {
        type = type.split('|')[0].trim();
      }

      // Clean up JSDoc
      const description = currentDoc
        .replace(/\/\*\*|\*\/|\/\/\*/g, '')
        .replace(/\*\s*/g, '')
        .replace(/\n\s*/g, ' ')
        .replace(/@deprecated.*$/i, '')
        .trim() || '[TODO: Add description]';

      props.push({
        name: propName,
        type: type,
        required: isRequired ? 'Yes' : 'No',
        default: '-',
        description: description.substring(0, 100) + (description.length > 100 ? '...' : '')
      });

      currentDoc = '';
    }
  }

  return props;
}

function extractEmitsFromVue(vuePath) {
  if (!fs.existsSync(vuePath)) return [];

  const content = fs.readFileSync(vuePath, 'utf-8');
  const events = [];

  // Find defineEmits call
  const emitsMatch = content.match(/defineEmits\s*\(\s*\[([^\]]+)\]/);
  if (!emitsMatch) return [];

  const emitsStr = emitsMatch[1];
  const eventNames = emitsStr.match(/['"]([^'"]+)['"]/g) || [];

  eventNames.forEach(name => {
    events.push({
      name: name.replace(/['\"]/g, ''),
      description: '[TODO: Add description]'
    });
  });

  return events;
}

function extractSlotsFromVue(vuePath) {
  if (!fs.existsSync(vuePath)) return [];

  const content = fs.readFileSync(vuePath, 'utf-8');
  const slots = [];

  // Find all <slot> tags
  const slotRegex = /<slot[^>]*name=["']?(\w+)["']?[^>]*>/g;
  let match;

  while ((match = slotRegex.exec(content)) !== null) {
    slots.push({
      name: match[1],
      description: '[TODO: Add description]'
    });
  }

  // If no named slots found, check for default slot
  if (slots.length === 0 && content.includes('<slot')) {
    slots.push({
      name: 'default',
      description: '[TODO: Add description]'
    });
  }

  return slots;
}

function generateMarkdown(componentName, props, slots, events) {
  const title = titleCase(componentName);
  let md = `# ${title} Component\n\n`;

  md += `## Purpose\n[TODO: Add purpose]\n\n`;
  md += `## Status\n✅ Stable — Safe for new projects\n\n`;
  md += `## Import\n\`\`\`ts\nimport { ${pascalCase(componentName)} } from '@tray-tecnologia/design-system';\n\`\`\`\n\n`;

  if (props.length > 0) {
    md += `## Props\n\n| Prop | Type | Required | Default | Description |\n`;
    md += `|------|------|----------|---------|-------------|\n`;
    props.forEach(prop => {
      md += `| ${prop.name} | ${prop.type} | ${prop.required} | ${prop.default} | ${prop.description} |\n`;
    });
    md += `\n`;
  }

  if (slots.length > 0) {
    md += `## Slots\n\n| Slot | Description |\n`;
    md += `|------|-------------|\n`;
    slots.forEach(slot => {
      md += `| ${slot.name} | ${slot.description} |\n`;
    });
    md += `\n`;
  }

  if (events.length > 0) {
    md += `## Events\n\n`;
    events.forEach(event => {
      md += `- \`@${event.name}\` — ${event.description}\n`;
    });
    md += `\n`;
  }

  md += `## Usage Examples\n[TODO: Add examples]\n\n`;
  md += `## Styling\n[TODO: Add styling notes]\n\n`;
  md += `## A11y Notes\n[TODO: Add accessibility notes]\n\n`;
  md += `## Related Components\n[TODO: Add related components]\n`;

  return md;
}

function findComponentFile(componentDir, componentName) {
  const files = fs.readdirSync(componentDir).filter(f => f.endsWith('.vue'));

  // First try: exact pascal case match
  const exact = pascalCase(componentName);
  let found = files.find(f => f === `${exact}.vue`);
  if (found) return path.join(componentDir, found);

  // Second try: any capitalized version of the name
  found = files.find(f => f.toLowerCase().replace(/\.vue$/, '') === componentName);
  if (found) return path.join(componentDir, found);

  // Third try: skip subcomponents (Item, Header, Footer, Body, Bar, List, etc)
  found = files.find(f =>
    !['Item', 'Header', 'Footer', 'Body', 'Bar', 'List', 'Row', 'Col', 'Container'].some(s => f.includes(s))
  );
  if (found) return path.join(componentDir, found);

  // Last resort: use first .vue file
  return files.length > 0 ? path.join(componentDir, files[0]) : null;
}

function generateDocs() {
  console.log(`Processing ${MISSING_COMPONENTS.length} components...\n`);

  MISSING_COMPONENTS.forEach(componentName => {
    const componentDir = path.join(COMPONENTS_DIR, componentName);
    const vuePath = findComponentFile(componentDir, componentName);
    const typesPath = path.join(componentDir, 'types.ts');

    if (!vuePath) {
      console.warn(`⚠ Skipping ${componentName}: .vue file not found`);
      return;
    }

    const props = extractPropsFromTypes(typesPath);
    const slots = extractSlotsFromVue(vuePath);
    const events = extractEmitsFromVue(vuePath);

    const markdown = generateMarkdown(componentName, props, slots, events);
    const docPath = path.join(DOCS_DIR, `${componentName}.md`);

    fs.writeFileSync(docPath, markdown, 'utf-8');
    console.log(`✓ ${componentName}: ${props.length} props, ${slots.length} slots, ${events.length} events`);
  });

  console.log('\n✓ Documentation generation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    generateDocs();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

export { extractPropsFromTypes, extractEmitsFromVue, extractSlotsFromVue };
