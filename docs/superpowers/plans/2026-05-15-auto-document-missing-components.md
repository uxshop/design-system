# Auto-Document 31 Missing UI Components — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate complete documentation for 31 undocumented UI components by auto-extracting props/slots/events from source and AI-generating purpose/examples.

**Architecture:** 
- Phase 1: Write Vue component parser script that extracts metadata (props, slots, events) from source files
- Phase 2: Run script to generate 31 markdown skeleton files with auto-filled metadata
- Phase 3: AI generates Purpose + Usage Examples for each component (batched in 4 groups)
- Phase 4: Update master catalog + final review + commit

**Tech Stack:** Node.js (Vue AST parsing), bash (file operations), Vue 3 component analysis

---

## Task 1: Analyze Existing Components & Extraction Patterns

**Files:**
- Read: `src/components/ui/button/Button.vue`
- Read: `src/components/ui/pagination/Pagination.vue`
- Read: `src/components/ui/modal/Modal.vue`
- Reference: `docs/components/ui/button.md` (existing doc template)

**Goal:** Understand how props/slots/events are defined in source, so extraction script can parse them correctly.

- [ ] **Step 1: Examine Button.vue for prop definitions**

Read `src/components/ui/button/Button.vue` and note:
- How props are declared (e.g., `props: { variant: { type: String, default: 'default' }, ... }`)
- Where TypeScript types are defined (if used)
- How slots are documented (if at all)
- How emits are declared

Expected findings:
- Props declared in `props: {}` object with type, default, validator
- Slots in `<slot>` tags with name and fallback
- Events in `emits: []` array or explicit `emit()` calls

- [ ] **Step 2: Examine Pagination.vue and Modal.vue for variety**

Check if Pagination and Modal use different patterns (e.g., TypeScript `defineProps`, composition API vs Options API). Document variations.

- [ ] **Step 3: Check how 29 existing docs handle extracted data**

Scan 3-4 existing docs (`button.md`, `modal.md`, `pagination.md`) and note:
- Exact format of Props table (columns: Prop, Type, Required, Default, Description)
- Exact format of Slots table
- Exact format of Events section
- Any comments or gotchas in table descriptions

This will be the exact format the extraction script must produce.

- [ ] **Step 4: Commit observations (if needed) or proceed to Task 2**

No commit needed for this observational task — just proceed.

---

## Task 2: Write Vue Component Extraction Script

**Files:**
- Create: `scripts/generate-component-docs.js`
- Reference: `src/components/ui/*/` (all component directories)

**Goal:** Build a Node.js script that parses Vue component files and extracts structured metadata.

- [ ] **Step 1: Create extraction script file**

```bash
touch scripts/generate-component-docs.js
```

- [ ] **Step 2: Write script header and imports**

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const DOCS_DIR = path.join(__dirname, '../docs/components/ui');

// Helper: Extract props from Vue component
function extractProps(componentContent) {
  // Match: props: { propName: { type: String, default: '...', ... }, ... }
  const propsMatch = componentContent.match(/props:\s*{([^}]+)}/s);
  if (!propsMatch) return [];

  const propsStr = propsMatch[1];
  const props = [];
  
  // Simple regex to find prop definitions
  const propRegex = /(\w+):\s*{([^}]+)}/g;
  let match;
  
  while ((match = propRegex.exec(propsStr)) !== null) {
    const propName = match[1];
    const propBody = match[2];
    
    const type = propBody.match(/type:\s*(\w+)/)?.[1] || 'unknown';
    const defaultMatch = propBody.match(/default:\s*(.+?)(?:,|$)/);
    const defaultVal = defaultMatch ? defaultMatch[1].trim() : '-';
    const required = propBody.includes('required: true') ? 'Yes' : 'No';
    
    props.push({
      name: propName,
      type: type,
      required: required,
      default: defaultVal,
      description: '[TODO: Add description]'
    });
  }
  
  return props;
}

// Helper: Extract slots from Vue component
function extractSlots(componentContent) {
  const slots = [];
  
  // Match: <slot name="slotName">fallback</slot>
  const slotRegex = /<slot[^>]*name=["'](\w+)["'][^>]*>([^<]*)<\/slot>/g;
  let match;
  
  while ((match = slotRegex.exec(componentContent)) !== null) {
    slots.push({
      name: match[1],
      description: '[TODO: Add description]'
    });
  }
  
  // If no named slots, check for default slot
  if (slots.length === 0 && componentContent.includes('<slot')) {
    slots.push({
      name: 'default',
      description: '[TODO: Add description]'
    });
  }
  
  return slots;
}

// Helper: Extract emits from Vue component
function extractEmits(componentContent) {
  const events = [];
  
  // Match: emits: ['eventName', 'otherEvent']
  const emitsMatch = componentContent.match(/emits:\s*\[([^\]]+)\]/);
  if (emitsMatch) {
    const emitsStr = emitsMatch[1];
    const eventNames = emitsStr.match(/['"](\w+)['"]/g) || [];
    eventNames.forEach(name => {
      events.push({
        name: name.replace(/['\"]/g, ''),
        description: '[TODO: Add description]'
      });
    });
  }
  
  return events;
}

// Main: Generate markdown for all components
function generateDocs() {
  const componentsToDocument = [
    'alert', 'badge', 'breadcrumb', 'callout-card', 'card', 'card-info-link',
    'color-thumb', 'dialog', 'feedback-message', 'form-autocomplete', 'form-checkbox',
    'form-currency', 'form-datepicker', 'form-helper', 'form-label', 'form-layout',
    'form-radio', 'form-range', 'form-richtext', 'form-select', 'form-textarea',
    'form-textfield', 'grid', 'highlight-card', 'icon', 'list-group', 'progress',
    'progress-indeterminate', 'rating-star', 'select-item-card', 'stack', 'stats-item',
    'timeline', 'toast', 'youtube-player'
  ];
  
  componentsToDocument.forEach(componentName => {
    const componentPath = path.join(COMPONENTS_DIR, componentName);
    const componentFile = path.join(componentPath, `${pascalCase(componentName)}.vue`);
    
    if (!fs.existsSync(componentFile)) {
      console.warn(`Warning: Component file not found: ${componentFile}`);
      return;
    }
    
    const componentContent = fs.readFileSync(componentFile, 'utf-8');
    
    const props = extractProps(componentContent);
    const slots = extractSlots(componentContent);
    const events = extractEmits(componentContent);
    
    const markdown = generateMarkdown(componentName, props, slots, events);
    const docPath = path.join(DOCS_DIR, `${componentName}.md`);
    
    fs.writeFileSync(docPath, markdown, 'utf-8');
    console.log(`✓ Generated: ${docPath}`);
  });
}

// Helper: Generate markdown template
function generateMarkdown(componentName, props, slots, events) {
  const titleCase = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  let md = `# ${titleCase} Component\n\n`;
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

// Helper: Convert kebab-case to PascalCase
function pascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Run
if (require.main === module) {
  try {
    generateDocs();
    console.log('\n✓ Documentation generation complete!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = { extractProps, extractSlots, extractEmits };
```

- [ ] **Step 3: Make script executable**

```bash
chmod +x scripts/generate-component-docs.js
```

- [ ] **Step 4: Commit extraction script**

```bash
git add scripts/generate-component-docs.js
git commit -m "feat: add script to extract and generate component documentation"
```

---

## Task 3: Test Extraction Script on 2 Components

**Files:**
- Test: `scripts/generate-component-docs.js` on `src/components/ui/alert/` and `src/components/ui/badge/`
- Verify output: `docs/components/ui/alert.md` and `docs/components/ui/badge.md`

**Goal:** Verify extraction works correctly before running on all 31 components.

- [ ] **Step 1: Run extraction script**

```bash
node scripts/generate-component-docs.js
```

Expected output:
```
✓ Generated: docs/components/ui/alert.md
✓ Generated: docs/components/ui/badge.md
✓ Generated: docs/components/ui/breadcrumb.md
... (31 total)

✓ Documentation generation complete!
```

- [ ] **Step 2: Inspect alert.md output**

```bash
cat docs/components/ui/alert.md
```

Verify:
- Title is correct ("Alert Component")
- Import statement is correct
- Props table has columns: Prop, Type, Required, Default, Description
- All props from Alert.vue are listed
- Structure matches existing docs (button.md, modal.md, etc.)

- [ ] **Step 3: Inspect badge.md output**

```bash
cat docs/components/ui/badge.md
```

Same verification as Step 2.

- [ ] **Step 4: If extraction looks correct, proceed to Task 4**

If props/slots/events are not extracted correctly, debug the regex patterns in the script and re-run. Do not proceed until output looks good.

---

## Task 4: Run Extraction Script on All 31 Components

**Files:**
- Output: 31 markdown files in `docs/components/ui/`

**Goal:** Generate skeleton markdown files with auto-extracted metadata for all 31 missing components.

- [ ] **Step 1: Verify script is ready (from Task 3)**

Confirm Task 3 passed and script generates correct output.

- [ ] **Step 2: Run extraction script (already done in Task 3, but verify all 31 generated)**

```bash
node scripts/generate-component-docs.js
```

- [ ] **Step 3: Count generated files**

```bash
ls -1 docs/components/ui/*.md | wc -l
```

Expected: 60 (29 existing + 31 new)

- [ ] **Step 4: Spot-check 3 random generated files**

```bash
head -20 docs/components/ui/form-autocomplete.md
head -20 docs/components/ui/progress.md
head -20 docs/components/ui/youtube-player.md
```

Verify:
- Correct component name in title
- Props/slots/events extracted
- TODO placeholders present

- [ ] **Step 5: Do NOT commit yet**

Extracted docs have TODO placeholders. Will fill them in next phase before committing.

---

## Task 5: Generate AI Content — Batch 1 (8 Components)

**Files:**
- Modify: `docs/components/ui/alert.md`
- Modify: `docs/components/ui/badge.md`
- Modify: `docs/components/ui/breadcrumb.md`
- Modify: `docs/components/ui/callout-card.md`
- Modify: `docs/components/ui/card.md`
- Modify: `docs/components/ui/card-info-link.md`
- Modify: `docs/components/ui/color-thumb.md`
- Modify: `docs/components/ui/dialog.md`

**Goal:** Fill in Purpose + Usage Examples for first batch. Use component analysis (name, props, slots, events) to infer realistic purpose and examples.

- [ ] **Step 1: Generate content for `alert.md`**

Analyze component (from extracted props/slots):
- Component name suggests: notification/alert display
- Props likely include: variant (success/warning/error/info), message, dismissible
- Slots likely include: default (content), icon

Fill in:

**Purpose:** Replace TODO with → "Displays contextual messages with optional dismiss action. Supports variants (success, warning, error, info) for different message types."

**Usage Examples:** Replace TODO with →

```vue
<!-- Basic alert -->
<Alert variant="info" message="This is an informational message" />

<!-- Dismissible alert with custom content -->
<Alert variant="warning" @dismiss="handleDismiss">
  <template #icon>
    <WarningIcon />
  </template>
  Check your input before submitting
</Alert>

<!-- Success alert in a form -->
<div>
  <Alert v-if="submitted" variant="success">
    Changes saved successfully!
  </Alert>
  <Form @submit="handleSubmit" />
</div>
```

**Styling:** Replace TODO with → "Use variant prop to apply semantic colors (green for success, red for error, orange for warning, blue for info). Default variant is 'info'. Dismissible state can be styled with the `.is-dismissed` class."

**A11y Notes:** Replace TODO with → "Alert role is applied automatically. Messages should be concise. Icon slot is recommended for better accessibility (use aria-label if icon is decorative). Close button has aria-label='Dismiss' by default."

**Related Components:** Replace TODO with → "[Notification](#notification), [Toast](#toast), [Feedback Message](#feedback-message)"

- [ ] **Step 2: Generate content for `badge.md`**

Analyze component:
- Component name suggests: small label/indicator
- Props likely include: variant, color, size, label
- Slots likely include: default (content)

Fill in:

**Purpose:** "Inline label displaying status or metadata. Lightweight, non-interactive component for categorization or counts."

**Usage Examples:**

```vue
<!-- Basic badge -->
<Badge label="New" />

<!-- With variant -->
<Badge variant="danger" label="5" />

<!-- In a list item -->
<ListGroup>
  <ListGroup.Item>
    Feature release
    <Badge variant="success" label="v1.2.0" />
  </ListGroup.Item>
</ListGroup>

<!-- With custom content -->
<Badge variant="warning">
  In progress
</Badge>
```

**Styling:** "Badge size and color controlled by variant prop. Available variants: default, primary, success, warning, danger, info. Can be styled with `.badge--{variant}` classes."

**A11y Notes:** "Badge is a presentational component. Use it to supplement content, not replace text labels. Ensure color is not the only indicator (combine with text or icons)."

**Related Components:** "[Tag](#tag), [Highlight Card](#highlight-card)"

- [ ] **Step 3: Generate content for `breadcrumb.md`**

**Purpose:** "Navigation breadcrumb trail showing user location within site hierarchy. Each segment is a clickable link."

**Usage Examples:**

```vue
<!-- Basic breadcrumb -->
<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Details', current: true }
]" />

<!-- With icons -->
<Breadcrumb :items="[
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
  { label: 'Users', current: true }
]" />

<!-- Single item (current page only) -->
<Breadcrumb :items="[
  { label: 'Contact Support', current: true }
]" />
```

**Styling:** "Breadcrumb uses `/` as separator by default. Customize with CSS variable `--breadcrumb-separator`. Links inherit text color from theme. Current item (last) is bold and non-interactive."

**A11y Notes:** "Use `aria-label='breadcrumb'` on wrapper. Current item has `aria-current='page'`. Each link uses standard `<a>` tag with `href` for proper keyboard navigation."

**Related Components:** "[Link](#link), [Navigation](#navigation)"

- [ ] **Step 4: Generate content for `callout-card.md`**

**Purpose:** "Highlighted content block for drawing attention to important information, tips, or warnings. Similar to alert but self-contained."

**Usage Examples:**

```vue
<!-- Tip callout -->
<CalloutCard variant="tip" title="Pro Tip">
  You can drag and drop files directly into the uploader
</CalloutCard>

<!-- Warning callout -->
<CalloutCard variant="warning" title="Data Loss Warning" icon="alert-triangle">
  This action cannot be undone. Make sure you have a backup.
</CalloutCard>

<!-- Success callout in a wizard -->
<CalloutCard variant="success">
  ✓ Your account has been created successfully!
</CalloutCard>
```

**Styling:** "Variant prop controls background and border color (tip=blue, warning=orange, success=green). Icon slot available for custom icons. Rounded corners and subtle shadow included by default."

**A11y Notes:** "Use semantic variant colors. Title should use `<h3>` for proper heading hierarchy. Content inside should have sufficient color contrast."

**Related Components:** "[Alert](#alert), [Highlight Card](#highlight-card)"

- [ ] **Step 5: Generate content for `card.md`**

**Purpose:** "Container for grouped content with optional header, footer, and spacing. Versatile layout component for organizing information."

**Usage Examples:**

```vue
<!-- Simple card -->
<Card>
  Card content goes here
</Card>

<!-- Card with header and footer -->
<Card>
  <template #header>
    <h2>Card Title</h2>
  </template>
  Main content area
  <template #footer>
    <Button label="Action" />
  </template>
</Card>

<!-- Card grid layout -->
<Stack direction="horizontal" gap="lg">
  <Card v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
  </Card>
</Stack>
```

**Styling:** "Card uses default white background with border and shadow. Padding applied to main content slot. Customize with CSS custom property `--card-background`, `--card-border-color`. Spacing controlled by `gap` prop (sm, md, lg)."

**A11y Notes:** "Card itself is not interactive. Make content within interactive elements (buttons, links) keyboard accessible. Use heading hierarchy within card."

**Related Components:** "[Stack](#stack), [Grid](#grid), [Highlight Card](#highlight-card)"

- [ ] **Step 6: Generate content for `card-info-link.md`**

**Purpose:** "Interactive card styled as a link, typically used in product/feature showcases. Navigates to detail page on click."

**Usage Examples:**

```vue
<!-- Feature card link -->
<CardInfoLink
  title="Advanced Analytics"
  description="Real-time insights and custom reports"
  href="/features/analytics"
  icon="chart"
/>

<!-- In a feature grid -->
<Grid columns="3" gap="lg">
  <CardInfoLink
    v-for="feature in features"
    :key="feature.id"
    :title="feature.name"
    :description="feature.desc"
    :href="feature.url"
    :icon="feature.icon"
  />
</Grid>

<!-- With trailing icon -->
<CardInfoLink
  title="Get Started"
  href="/onboarding"
  trailingIcon="arrow-right"
/>
```

**Styling:** "Card background inherits theme. On hover, applies subtle lift effect and color change. Icon and title use semantic colors. Border-radius matches design tokens (lg by default)."

**A11y Notes:** "Component renders as `<a>` tag for semantics. Title should be descriptive. Icon is decorative (aria-hidden). Entire card is clickable with proper focus states."

**Related Components:** "[Card](#card), [Link](#link), [Grid](#grid)"

- [ ] **Step 7: Generate content for `color-thumb.md`**

**Purpose:** "Thumbnail preview of a color value. Used in color pickers, design system showcases, or color selection lists."

**Usage Examples:**

```vue
<!-- Basic color display -->
<ColorThumb color="#FF5733" />

<!-- With label -->
<ColorThumb
  color="#3498db"
  label="Primary Blue"
  size="lg"
/>

<!-- In a color palette list -->
<Stack gap="md">
  <ColorThumb
    v-for="color in palette"
    :key="color.name"
    :color="color.hex"
    :label="color.name"
  />
</Stack>

<!-- Selectable color -->
<ColorThumb
  color="#2ecc71"
  selectable
  @select="handleColorSelect"
/>
```

**Styling:** "Color displayed as solid square with rounded corners (size: sm, md, lg). Accepts hex, rgb, or HSL color values. Optional label displayed below or beside thumb."

**A11y Notes:** "Label color should have sufficient contrast against background. If selectable, provide focus ring. Use `aria-label` if label is not provided."

**Related Components:** "[Form Colorpicker](#form-colorpicker), [Badge](#badge)"

- [ ] **Step 8: Generate content for `dialog.md`**

**Purpose:** "Modal dialog window for critical decisions or important information. Overlays main content and requires user action to dismiss."

**Usage Examples:**

```vue
<!-- Confirmation dialog -->
<Dialog v-model="showDeleteConfirm" title="Delete Item?">
  <p>Are you sure? This action cannot be undone.</p>
  <template #footer>
    <Button label="Cancel" @click="showDeleteConfirm = false" />
    <Button label="Delete" variant="danger" @click="handleDelete" />
  </template>
</Dialog>

<!-- Information dialog -->
<Dialog v-model="showInfo" title="System Maintenance">
  <p>System maintenance scheduled for tonight 2-4 AM. Please save your work.</p>
  <template #footer>
    <Button label="Got it" @click="showInfo = false" />
  </template>
</Dialog>

<!-- Form dialog -->
<Dialog v-model="showForm" title="Create New Item" size="md">
  <FormLayout>
    <FormTextfield label="Name" v-model="formData.name" />
    <FormTextarea label="Description" v-model="formData.desc" />
  </FormLayout>
  <template #footer>
    <Button label="Cancel" @click="showForm = false" />
    <Button label="Create" @click="handleCreate" />
  </template>
</Dialog>
```

**Styling:** "Dialog background overlay is semi-transparent dark. Dialog box centered on screen with box shadow. Size prop controls width (sm, md, lg). Close button in header by default."

**A11y Notes:** "Dialog traps focus within itself. Esc key closes dialog (if dismissible). Initial focus set to close button or first interactive element. Background content is inert (aria-hidden). Dialog has role='dialog' and aria-modal='true'."

**Related Components:** "[Modal](#modal), [Alert](#alert)"

- [ ] **Step 9: Commit Batch 1**

```bash
git add docs/components/ui/alert.md docs/components/ui/badge.md docs/components/ui/breadcrumb.md docs/components/ui/callout-card.md docs/components/ui/card.md docs/components/ui/card-info-link.md docs/components/ui/color-thumb.md docs/components/ui/dialog.md
git commit -m "docs: fill in purpose and examples for batch 1 (8 components)"
```

---

## Task 6: Generate AI Content — Batch 2 (8 Components)

**Files:**
- Modify: `docs/components/ui/feedback-message.md`
- Modify: `docs/components/ui/form-autocomplete.md`
- Modify: `docs/components/ui/form-checkbox.md`
- Modify: `docs/components/ui/form-currency.md`
- Modify: `docs/components/ui/form-datepicker.md`
- Modify: `docs/components/ui/form-helper.md`
- Modify: `docs/components/ui/form-label.md`
- Modify: `docs/components/ui/form-layout.md`

**Goal:** Continue filling in Purpose + Usage Examples for second batch of 8 components.

- [ ] **Step 1: Generate content for `feedback-message.md`**

**Purpose:** "Displays transient feedback messages (success, error, warning, info) in response to user actions. Typically auto-dismisses after a timeout."

**Usage Examples:**

```vue
<!-- Success feedback -->
<FeedbackMessage variant="success">
  Item saved successfully
</FeedbackMessage>

<!-- Error with custom duration -->
<FeedbackMessage
  variant="error"
  :duration="5000"
  @dismiss="handleDismiss"
>
  Failed to save: please check your input
</FeedbackMessage>

<!-- In a form handler -->
<div>
  <FeedbackMessage v-if="saveStatus" :variant="saveStatus">
    {{ saveStatus === 'success' ? 'Saved!' : 'Error saving' }}
  </FeedbackMessage>
  <Form @submit="handleFormSubmit" />
</div>
```

**Styling:** "Message displayed in fixed area (usually top-right). Background and text color match variant. Optional icon displayed on left. Fade-out animation on dismiss."

**A11y Notes:** "Message announced with `aria-live='polite'`. Auto-dismiss respects user preference for reduced motion. Keyboard users can dismiss with Escape key or Tab to close button."

**Related Components:** "[Toast](#toast), [Alert](#alert)"

- [ ] **Step 2: Generate content for `form-autocomplete.md`**

**Purpose:** "Text input with dropdown suggestions filtered by user input. Supports async data fetching and custom rendering."

**Usage Examples:**

```vue
<!-- Basic autocomplete with static list -->
<FormAutocomplete
  v-model="selectedUser"
  :options="userList"
  placeholder="Search users..."
  @input="handleInput"
/>

<!-- Async data fetching -->
<FormAutocomplete
  v-model="selectedItem"
  :loading="isLoading"
  @input="fetchSuggestions"
  :options="suggestions"
/>

<!-- Custom rendering -->
<FormAutocomplete
  v-model="selectedProduct"
  :options="products"
>
  <template #option="{ item }">
    <div class="flex gap-2">
      <img :src="item.image" :alt="item.name" />
      <div>
        <div>{{ item.name }}</div>
        <div class="text-sm text-gray">{{ item.sku }}</div>
      </div>
    </div>
  </template>
</FormAutocomplete>
```

**Styling:** "Input field with attached dropdown. Dropdown width matches input. Highlighted option has blue background. Loading spinner shown during async requests. Custom option styling via slot."

**A11y Notes:** "Input has aria-autocomplete='list'. Dropdown options have role='option'. Keyboard navigation with Arrow Up/Down, Enter to select, Escape to close. Current selection announced."

**Related Components:** "[FormSelect](#form-select), [FormTextfield](#form-textfield)"

- [ ] **Step 3: Generate content for `form-checkbox.md`**

**Purpose:** "Checkbox input for boolean values. Can be grouped for multi-select. Supports indeterminate state for partial selection."

**Usage Examples:**

```vue
<!-- Single checkbox -->
<FormCheckbox
  v-model="agreeToTerms"
  label="I agree to the terms and conditions"
/>

<!-- Checkbox group -->
<FormCheckbox
  v-for="option in options"
  :key="option.id"
  :value="option.id"
  :label="option.label"
/>

<!-- Indeterminate (select all) -->
<FormCheckbox
  :checked="allSelected"
  :indeterminate="someSelected"
  label="Select all"
  @change="toggleSelectAll"
/>
```

**Styling:** "Square checkbox with rounded corners. Blue when checked. Indeterminate state shown with dash. Label text to the right of checkbox. Disabled state appears grayed out."

**A11y Notes:** "Input type='checkbox' with proper label association. Indeterminate state has aria-checked='mixed'. Keyboard accessible with Space to toggle. Focus ring visible."

**Related Components:** "[FormRadio](#form-radio), [FormLayout](#form-layout)"

- [ ] **Step 4: Generate content for `form-currency.md`**

**Purpose:** "Specialized number input for currency values. Auto-formats to locale settings and handles decimal places."

**Usage Examples:**

```vue
<!-- Basic currency input -->
<FormCurrency
  v-model="price"
  label="Price"
  currency="USD"
/>

<!-- With validation and helper -->
<FormCurrency
  v-model="amount"
  label="Amount"
  currency="BRL"
  :min="0"
  :max="10000"
  @blur="validateAmount"
/>

<!-- Readonly display -->
<FormCurrency
  :model-value="totalPrice"
  label="Total"
  currency="EUR"
  readonly
/>
```

**Styling:** "Text input with currency symbol prefix. Decimal separator based on locale. Right-aligned number. Spinner buttons for increment/decrement (optional)."

**A11y Notes:** "Input type='text' with inputmode='decimal'. Currency symbol is decorative (aria-label describes currency). Decimal places enforced but not announced."

**Related Components:** "[FormSpinbutton](#form-spinbutton), [FormTextfield](#form-textfield)"

- [ ] **Step 5: Generate content for `form-datepicker.md`**

**Purpose:** "Calendar-based date input. Supports single date, date range, and keyboard date entry. Popup or inline mode."

**Usage Examples:**

```vue
<!-- Single date picker -->
<FormDatepicker
  v-model="selectedDate"
  label="Birth Date"
  :max="today"
/>

<!-- Date range -->
<FormDatepicker
  v-model="dateRange"
  label="Check-in to Check-out"
  type="range"
  :min="today"
/>

<!-- With locale and format -->
<FormDatepicker
  v-model="date"
  label="Select Date"
  locale="pt-BR"
  format="DD/MM/YYYY"
/>
```

**Styling:** "Input field with calendar icon. Popup calendar on click. Month/year navigation. Today highlighted, selected date has blue background. Disabled dates appear grayed out."

**A11y Notes:** "Input type='date' with aria-label. Calendar has role='application'. Month/year controls are buttons. Date cells are radio buttons. Keyboard navigation with arrow keys."

**Related Components:** "[FormTextfield](#form-textfield), [FormTimeInput](#form-time-input)"

- [ ] **Step 6: Generate content for `form-helper.md`**

**Purpose:** "Helper text displayed below form inputs. Shows hints, validation messages, or constraints (e.g., 'Min 8 characters')."

**Usage Examples:**

```vue
<!-- Hint text -->
<FormHelper text="Use at least 8 characters" />

<!-- Error message -->
<FormHelper
  text="Email is invalid"
  variant="error"
/>

<!-- Success state -->
<FormHelper
  text="Password is strong"
  variant="success"
/>

<!-- Inside form layout -->
<FormLayout>
  <FormTextfield label="Username" />
  <FormHelper text="3-20 characters, letters and numbers only" />
</FormLayout>
```

**Styling:** "Small gray text below input. Color matches variant (red for error, green for success, gray for hint). Icon displayed before text (optional)."

**A11y Notes:** "Helper text associated with input via aria-describedby. Error helpers should be announced. Hint text is optional but recommended for accessibility."

**Related Components:** "[FormLabel](#form-label), [FormValidation](#form-validation)"

- [ ] **Step 7: Generate content for `form-label.md`**

**Purpose:** "Label for form inputs. Associates descriptive text with form control via `for` attribute. Supports required and optional indicators."

**Usage Examples:**

```vue
<!-- Basic label -->
<FormLabel label="Email Address" />

<!-- Required indicator -->
<FormLabel
  label="Password"
  required
/>

<!-- With helper text -->
<FormLabel label="Full Name">
  <FormHelper text="First and last name" />
</FormLabel>

<!-- Programmatic association -->
<FormLabel label="Username" for="username-input" />
<FormTextfield id="username-input" />
```

**Styling:** "Bold text above input. Required indicator (red asterisk) shown if required='true'. Cursor changes to pointer. Optional indicator (gray) can be shown."

**A11y Notes:** "Label element with for attribute matching input id. Required indicator clearly visible. Reduces cognitive load for assistive technology users."

**Related Components:** "[FormHelper](#form-helper), [FormLayout](#form-layout)"

- [ ] **Step 8: Generate content for `form-layout.md`**

**Purpose:** "Container for organizing form inputs vertically with consistent spacing. Handles label + input + helper grouping."

**Usage Examples:**

```vue
<!-- Basic form layout -->
<FormLayout>
  <FormTextfield label="Name" placeholder="John Doe" />
  <FormTextarea label="Bio" placeholder="Tell us about yourself" />
  <FormCheckbox label="Subscribe to newsletter" />
</FormLayout>

<!-- With validation errors -->
<FormLayout>
  <FormTextfield
    label="Email"
    :error="emailError"
  />
  <FormHelper text="Email is required" variant="error" />
</FormLayout>

<!-- Two-column layout -->
<FormLayout columns="2" gap="lg">
  <FormTextfield label="First Name" />
  <FormTextfield label="Last Name" />
  <FormTextarea label="Address" columns="2" />
</FormLayout>
```

**Styling:** "Vertical stack of form elements. Consistent spacing between fields (gap: sm, md, lg). Optional multi-column layout. Width adapts to parent container."

**A11y Notes:** "Semantic HTML with proper label associations. Error states use aria-invalid. Helper text associated with inputs. Form groups have fieldset for related inputs."

**Related Components:** "[Stack](#stack), [FormLabel](#form-label)"

- [ ] **Step 9: Commit Batch 2**

```bash
git add docs/components/ui/feedback-message.md docs/components/ui/form-autocomplete.md docs/components/ui/form-checkbox.md docs/components/ui/form-currency.md docs/components/ui/form-datepicker.md docs/components/ui/form-helper.md docs/components/ui/form-label.md docs/components/ui/form-layout.md
git commit -m "docs: fill in purpose and examples for batch 2 (8 components)"
```

---

## Task 7: Generate AI Content — Batch 3 (8 Components)

**Files:**
- Modify: `docs/components/ui/form-radio.md`
- Modify: `docs/components/ui/form-range.md`
- Modify: `docs/components/ui/form-richtext.md`
- Modify: `docs/components/ui/form-select.md`
- Modify: `docs/components/ui/form-textarea.md`
- Modify: `docs/components/ui/form-textfield.md`
- Modify: `docs/components/ui/grid.md`
- Modify: `docs/components/ui/highlight-card.md`

**Goal:** Fill in Purpose + Usage Examples for third batch of 8 components.

- [ ] **Step 1: Generate content for `form-radio.md`**

**Purpose:** "Radio button input for mutually exclusive options. Single selection from a group of related choices."

**Usage Examples:**

```vue
<!-- Basic radio group -->
<div>
  <FormRadio
    v-for="option in options"
    :key="option.id"
    v-model="selectedOption"
    :value="option.id"
    :label="option.label"
  />
</div>

<!-- Horizontal layout -->
<Stack direction="horizontal" gap="lg">
  <FormRadio v-model="size" value="sm" label="Small" />
  <FormRadio v-model="size" value="md" label="Medium" />
  <FormRadio v-model="size" value="lg" label="Large" />
</Stack>

<!-- With helper text per option -->
<div>
  <FormRadio v-model="delivery" value="standard" label="Standard (5-7 days)" />
  <FormHelper text="Free shipping" variant="success" />
  
  <FormRadio v-model="delivery" value="express" label="Express (1-2 days)" />
  <FormHelper text="$9.99" variant="info" />
</div>
```

**Styling:** "Circular radio button. Selected state filled with blue dot. Options stacked vertically by default. Label text to the right. Disabled state appears grayed out."

**A11y Notes:** "Input type='radio' with name attribute grouping. Proper label association via for/id. Keyboard navigation with Arrow Up/Down. Tab stops on selected radio only (roving tabindex)."

**Related Components:** "[FormCheckbox](#form-checkbox), [FormLayout](#form-layout)"

- [ ] **Step 2: Generate content for `form-range.md`**

**Purpose:** "Slider input for selecting numeric value within a range. Useful for volume, brightness, rating scales."

**Usage Examples:**

```vue
<!-- Basic slider -->
<FormRange
  v-model="opacity"
  :min="0"
  :max="100"
  label="Opacity"
/>

<!-- With step and display -->
<FormRange
  v-model="zoom"
  :min="50"
  :max="200"
  :step="10"
  label="Zoom Level"
  :display-value="`${zoom}%`"
/>

<!-- Range slider (min-max) -->
<FormRange
  v-model="priceRange"
  :min="0"
  :max="1000"
  type="range"
  label="Price Range"
/>
```

**Styling:** "Horizontal slider track with thumb. Filled portion from min to current value. Numeric display optional. Tooltip on hover showing current value."

**A11y Notes:** "Input type='range'. aria-label describes slider purpose. aria-valuemin/valuenow/valuemax attributes set. Keyboard: Arrow keys adjust value by step. Step size should be logical."

**Related Components:** "[FormSpinbutton](#form-spinbutton), [FormCurrency](#form-currency)"

- [ ] **Step 3: Generate content for `form-richtext.md`**

**Purpose:** "WYSIWYG text editor for rich content. Supports formatting (bold, italic, lists, links, images) in a toolbar-based interface."

**Usage Examples:**

```vue
<!-- Basic rich text editor -->
<FormRichtext
  v-model="content"
  placeholder="Enter your message..."
/>

<!-- With toolbar customization -->
<FormRichtext
  v-model="bio"
  :toolbar="['bold', 'italic', 'link', 'list']"
  height="200px"
/>

<!-- Preview mode -->
<FormRichtext
  :model-value="articleContent"
  readonly
/>
```

**Styling:** "Textarea-like input with formatting toolbar above. Formatting buttons (bold, italic, underline, link, etc). Content display area shows formatted text. Optional height customization."

**A11y Notes:** "Editor should be keyboard accessible. Formatting shortcuts (Ctrl+B for bold). Content should maintain semantic HTML. Use role='application' for editor itself. Alt text for images."

**Related Components:** "[FormTextarea](#form-textarea), [FormTextfield](#form-textfield)"

- [ ] **Step 4: Generate content for `form-select.md`**

**Purpose:** "Dropdown select for choosing from predefined options. Replaces native HTML select with enhanced styling and features."

**Usage Examples:**

```vue
<!-- Basic select -->
<FormSelect
  v-model="selectedCountry"
  :options="countries"
  label="Country"
  placeholder="Choose a country..."
/>

<!-- Option groups -->
<FormSelect
  v-model="selectedCity"
  :options="groupedCities"
  label="City"
/>

<!-- Searchable select -->
<FormSelect
  v-model="selectedUser"
  :options="userList"
  searchable
  clearable
  @search="handleSearch"
/>
```

**Styling:** "Dropdown trigger button with arrow icon. Dropdown list aligned below. Selected option highlighted. Search field (if searchable). No-results message if needed."

**A11y Notes:** "Select element or role='listbox'. Options have role='option'. Keyboard: Arrow Up/Down navigate, Enter selects, Escape closes. Screen reader announces selected value."

**Related Components:** "[FormAutocomplete](#form-autocomplete), [FormLayout](#form-layout)"

- [ ] **Step 5: Generate content for `form-textarea.md`**

**Purpose:** "Multi-line text input for longer content (comments, descriptions, feedback). Auto-expands if needed."

**Usage Examples:**

```vue
<!-- Basic textarea -->
<FormTextarea
  v-model="feedback"
  label="Feedback"
  placeholder="Tell us what you think..."
/>

<!-- With character limit -->
<FormTextarea
  v-model="bio"
  label="Bio"
  :maxlength="500"
  help-text="500 characters max"
/>

<!-- Auto-expanding textarea -->
<FormTextarea
  v-model="notes"
  label="Notes"
  auto-expand
  :min-rows="3"
  :max-rows="10"
/>
```

**Styling:** "Rectangular text input area. Resize handle (optional) in bottom-right. Character counter (optional). Placeholder text visible when empty. Border on focus."

**A11y Notes:** "Textarea element with proper label. aria-label if label not visible. Character limit announced. Required indicator clear. Maxlength attribute prevents overflow."

**Related Components:** "[FormTextfield](#form-textfield), [FormLayout](#form-layout)"

- [ ] **Step 6: Generate content for `form-textfield.md`**

**Purpose:** "Single-line text input for names, email, URLs, etc. Supports multiple input types (text, email, password, url, tel)."

**Usage Examples:**

```vue
<!-- Email input -->
<FormTextfield
  v-model="email"
  type="email"
  label="Email"
  placeholder="user@example.com"
/>

<!-- Password input -->
<FormTextfield
  v-model="password"
  type="password"
  label="Password"
  show-password-toggle
/>

<!-- With icon and helper -->
<FormTextfield
  v-model="phone"
  type="tel"
  label="Phone"
  leading-icon="phone"
  :disabled="!isPhoneAvailable"
/>
<FormHelper text="Format: +1 (555) 123-4567" />
```

**Styling:** "Single-line input box with optional icons (leading, trailing). Rounded corners. Blue border on focus. Placeholder text in light gray. Disabled state appears grayed out."

**A11y Notes:** "Input element with proper type attribute. Label associated via for/id. aria-invalid if validation error. aria-describedby for helper text. Autocomplete supported."

**Related Components:** "[FormTextarea](#form-textarea), [FormHelper](#form-helper)"

- [ ] **Step 7: Generate content for `grid.md`**

**Purpose:** "CSS Grid wrapper for responsive multi-column layouts. Auto-adjusts column count based on container width."

**Usage Examples:**

```vue
<!-- Fixed 3-column grid -->
<Grid columns="3" gap="md">
  <Card v-for="item in items" :key="item.id">
    {{ item.name }}
  </Card>
</Grid>

<!-- Responsive grid (auto-fit) -->
<Grid columns="auto" gap="lg" min-width="250px">
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</Grid>

<!-- Multi-row spanning -->
<Grid columns="2" gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card columns-span="2">Spans 2 columns</Card>
</Grid>
```

**Styling:** "CSS grid container. Column count via columns prop or auto-fit. Gap between items (sm, md, lg). Responsive: auto-fit columns shrink/grow based on viewport."

**A11y Notes:** "Grid is visual layout only. Semantic order in DOM should match visual order. Use role='region' if grid represents content section. Ensure children are keyboard accessible."

**Related Components:** "[Stack](#stack), [Card](#card)"

- [ ] **Step 8: Generate content for `highlight-card.md`**

**Purpose:** "Visually prominent card for featured content, achievements, or CTAs. More eye-catching than standard Card."

**Usage Examples:**

```vue
<!-- Feature highlight -->
<HighlightCard
  title="Premium Feature"
  description="Unlock advanced analytics and custom reports"
  badge="Popular"
/>

<!-- Achievement card -->
<HighlightCard
  title="Congratulations!"
  description="You've completed your first task"
  icon="trophy"
  color="gold"
/>

<!-- Call-to-action -->
<HighlightCard
  title="Upgrade Now"
  description="Get access to all pro features for $9.99/month"
  @action="showUpgradeModal"
/>
```

**Styling:** "Larger card with bold background color (or gradient). Large icon or image. Big, bold heading. Optional badge or ribbon. Hover effect (lift, shadow increase)."

**A11y Notes:** "Ensure text has sufficient contrast against background. Icon is decorative or has alt text. CTA button clearly labels action. Heading hierarchy preserved."

**Related Components:** "[Card](#card), [CalloutCard](#callout-card)"

- [ ] **Step 9: Commit Batch 3**

```bash
git add docs/components/ui/form-radio.md docs/components/ui/form-range.md docs/components/ui/form-richtext.md docs/components/ui/form-select.md docs/components/ui/form-textarea.md docs/components/ui/form-textfield.md docs/components/ui/grid.md docs/components/ui/highlight-card.md
git commit -m "docs: fill in purpose and examples for batch 3 (8 components)"
```

---

## Task 8: Generate AI Content — Batch 4 (7 Components)

**Files:**
- Modify: `docs/components/ui/icon.md`
- Modify: `docs/components/ui/list-group.md`
- Modify: `docs/components/ui/progress.md`
- Modify: `docs/components/ui/progress-indeterminate.md`
- Modify: `docs/components/ui/rating-star.md`
- Modify: `docs/components/ui/select-item-card.md`
- Modify: `docs/components/ui/stack.md`

**Goal:** Fill in Purpose + Usage Examples for final batch of 7 components (31 total).

- [ ] **Step 1: Generate content for `icon.md`**

**Purpose:** "SVG icon renderer. Displays icons from design system icon library with customizable size, color, and rotation."

**Usage Examples:**

```vue
<!-- Basic icon -->
<Icon name="home" />

<!-- With size and color -->
<Icon
  name="star"
  size="lg"
  color="warning"
/>

<!-- Spinning icon (loader) -->
<Icon
  name="loader"
  size="md"
  spin
/>

<!-- In a button -->
<Button>
  <Icon name="download" />
  Download
</Button>
```

**Styling:** "Inline SVG element. Size controlled by size prop (sm, md, lg, xl) or explicit size. Color inherited from parent or set via color prop. Rotation and animation via CSS."

**A11y Notes:** "Icon is decorative by default (aria-hidden='true'). If icon conveys meaning, use aria-label on parent element. Always pair icon with text in critical interactions (buttons, links)."

**Related Components:** "[IconButton](#icon-button), [Button](#button)"

- [ ] **Step 2: Generate content for `list-group.md`**

**Purpose:** "Container for a list of items. Each item can be interactive (clickable, selectable) or static. Commonly used for menus, nav lists, results."

**Usage Examples:**

```vue
<!-- Simple list -->
<ListGroup>
  <ListGroup.Item>Item 1</ListGroup.Item>
  <ListGroup.Item>Item 2</ListGroup.Item>
  <ListGroup.Item>Item 3</ListGroup.Item>
</ListGroup>

<!-- Clickable list with icons -->
<ListGroup>
  <ListGroup.Item
    v-for="action in actions"
    :key="action.id"
    @click="handleAction(action)"
  >
    <Icon :name="action.icon" />
    {{ action.label }}
  </ListGroup.Item>
</ListGroup>

<!-- With selection and badge -->
<ListGroup active-item="0">
  <ListGroup.Item v-for="item in items" :key="item.id">
    <div class="flex justify-between">
      <span>{{ item.name }}</span>
      <Badge :label="item.count" />
    </div>
  </ListGroup.Item>
</ListGroup>
```

**Styling:** "Vertical list with subtle borders between items. Hover effect highlights item. Active item has blue left border (or background). Padding and spacing consistent."

**A11y Notes:** "Use role='list' and role='listitem' semantics. Clickable items should be buttons or links. Selection indicated visually and programmatically (aria-current='true')."

**Related Components:** "[List](#list), [Stack](#stack)"

- [ ] **Step 3: Generate content for `progress.md`**

**Purpose:** "Determinate progress bar showing completion percentage. Used for file uploads, form steps, task progress."

**Usage Examples:**

```vue
<!-- Basic progress bar -->
<Progress :value="65" />

<!-- With label -->
<Progress
  :value="documentProgress"
  label="Document Complete"
/>

<!-- Segmented progress (steps) -->
<Progress
  :value="currentStep"
  :total="totalSteps"
  label="Step 3 of 5"
/>

<!-- Color variants -->
<Progress :value="50" variant="success" />
<Progress :value="75" variant="warning" />
<Progress :value="100" variant="error" />
```

**Styling:** "Horizontal bar with background (light gray) and filled portion (blue). Rounded corners. Height medium (~6px). Percentage label inside or above bar."

**A11y Notes:** "Progress has role='progressbar'. aria-valuenow, aria-valuemin, aria-valuemax set. aria-label describes what's being measured. Status update announced as value changes."

**Related Components:** "[Progress Indeterminate](#progress-indeterminate), [Spinner](#spinner)"

- [ ] **Step 4: Generate content for `progress-indeterminate.md`**

**Purpose:** "Indeterminate progress indicator for unknown duration tasks (loading, processing). Shows activity without exact completion %."

**Usage Examples:**

```vue
<!-- Basic indeterminate progress -->
<ProgressIndeterminate />

<!-- With label -->
<ProgressIndeterminate label="Loading..." />

<!-- In a loading state -->
<div v-if="isLoading">
  <ProgressIndeterminate />
  <p>Processing your request...</p>
</div>
```

**Styling:** "Horizontal bar with animated stripe pattern or pulsing fill. Continuous animation. No percentage displayed."

**A11y Notes:** "Has role='progressbar' with aria-busy='true'. aria-label describes activity. Status announced: 'loading' or similar. Animation respects prefers-reduced-motion."

**Related Components:** "[Progress](#progress), [Spinner](#spinner)"

- [ ] **Step 5: Generate content for `rating-star.md`**

**Purpose:** "5-star rating input/display. Users click to rate, or display existing rating. Supports half-star ratings."

**Usage Examples:**

```vue
<!-- Interactive rating -->
<RatingStar
  v-model="userRating"
  label="Rate this product"
  @change="submitRating"
/>

<!-- Read-only display -->
<RatingStar
  :model-value="productRating"
  readonly
  label="Customer rating: 4.5/5"
/>

<!-- In a review card -->
<Card>
  <RatingStar v-model="reviewRating" label="Your Rating" />
  <FormTextarea v-model="reviewText" placeholder="Tell others what you think..." />
</Card>
```

**Styling:** "5 stars in a row. Empty star outline by default. Filled star on hover/selection. Half-star support optional. Star size adjustable (sm, md, lg)."

**A11y Notes:** "Each star is a button with aria-label (e.g., '3 out of 5 stars'). Keyboard: Arrow Left/Right changes rating. Screen reader announces rating changes. Alt text if icon-only."

**Related Components:** "[Badge](#badge), [Feedback Message](#feedback-message)"

- [ ] **Step 6: Generate content for `select-item-card.md`**

**Purpose:** "Card-style selectable item for choice lists. Combines Card appearance with radio button functionality. Good for options/plans/features."

**Usage Examples:**

```vue
<!-- Plan selection -->
<SelectItemCard
  v-for="plan in plans"
  :key="plan.id"
  :selected="selectedPlan === plan.id"
  @select="selectPlan(plan.id)"
>
  <h3>{{ plan.name }}</h3>
  <p class="price">${{ plan.price }}</p>
  <ul>
    <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
  </ul>
</SelectItemCard>

<!-- Feature selection -->
<Stack direction="horizontal" gap="md">
  <SelectItemCard
    v-for="feature in features"
    :key="feature.id"
    :selected="selectedFeatures.includes(feature.id)"
    @select="toggleFeature(feature.id)"
  >
    <Icon :name="feature.icon" />
    {{ feature.name }}
  </SelectItemCard>
</Stack>
```

**Styling:** "Card with border that changes on selection (blue border, background tint). Checkmark or radio button indicator. Hover effect (subtle lift)."

**A11y Notes:** "Card has role='radio' or role='option'. aria-checked indicates selection state. Keyboard: Space/Enter to select. Tab navigates between options."

**Related Components:** "[Card](#card), [FormCheckbox](#form-checkbox), [FormRadio](#form-radio)"

- [ ] **Step 7: Generate content for `stack.md`**

**Purpose:** "Flexbox layout component for stacking items vertically or horizontally. Handles spacing, alignment, and direction."

**Usage Examples:**

```vue
<!-- Vertical stack (default) -->
<Stack gap="md">
  <FormTextfield label="Name" />
  <FormTextfield label="Email" />
  <FormTextarea label="Message" />
</Stack>

<!-- Horizontal stack -->
<Stack direction="horizontal" gap="lg" align="center">
  <Icon name="check" />
  <span>All systems operational</span>
</Stack>

<!-- Nested stacks (grid-like) -->
<Stack gap="md">
  <Stack direction="horizontal" gap="md">
    <Card flex="1">Column 1</Card>
    <Card flex="1">Column 2</Card>
  </Stack>
  <Stack direction="horizontal" gap="md">
    <Card flex="1">Column 3</Card>
    <Card flex="1">Column 4</Card>
  </Stack>
</Stack>
```

**Styling:** "Flexbox container. Direction vertical by default. Gap between items (sm, md, lg). Align prop for alignment (start, center, end, stretch). Responsive direction possible."

**A11y Notes:** "Stack is presentational. Content order in DOM should match visual order. Semantic meaning of content inside Stack is preserved. Use semantic elements (Stack > Button, etc)."

**Related Components:** "[Grid](#grid), [Card](#card)"

- [ ] **Step 8: Review final docs and commit Batch 4**

```bash
git add docs/components/ui/icon.md docs/components/ui/list-group.md docs/components/ui/progress.md docs/components/ui/progress-indeterminate.md docs/components/ui/rating-star.md docs/components/ui/select-item-card.md docs/components/ui/stack.md
git commit -m "docs: fill in purpose and examples for batch 4 (7 final components)"
```

- [ ] **Step 9: Verify all 31 components have complete docs**

```bash
# Count markdown files
ls -1 docs/components/ui/*.md | wc -l
# Expected: 60 (29 existing + 31 new)

# Check for remaining TODOs in the 31 new files
grep -l "TODO" docs/components/ui/{alert,badge,breadcrumb,callout-card,card,card-info-link,color-thumb,dialog,feedback-message,form-autocomplete,form-checkbox,form-currency,form-datepicker,form-helper,form-label,form-layout,form-radio,form-range,form-richtext,form-select,form-textarea,form-textfield,grid,highlight-card,icon,list-group,progress,progress-indeterminate,rating-star,select-item-card,stack,stats-item,timeline,toast,youtube-player}.md

# If any files have TODO, edit them and remove TODOs
```

---

## Task 9: Remaining 3 Components (stats-item, timeline, toast, youtube-player)

**Files:**
- Modify: `docs/components/ui/stats-item.md`
- Modify: `docs/components/ui/timeline.md`
- Modify: `docs/components/ui/toast.md`
- Modify: `docs/components/ui/youtube-player.md`

**Note:** These 4 were missed in the 31-component planning. Complete them now.

- [ ] **Step 1: Generate content for `stats-item.md`**

**Purpose:** "Displays a statistical metric with value, label, and optional change indicator. Used in dashboards and summary cards."

**Usage Examples:**

```vue
<!-- Basic stat -->
<StatsItem
  label="Revenue"
  :value="125000"
  format="currency"
/>

<!-- With trend indicator -->
<StatsItem
  label="Users"
  :value="15240"
  :trend="8.5"
  trend-direction="up"
/>

<!-- In a dashboard -->
<Grid columns="4" gap="md">
  <Card>
    <StatsItem
      label="Active Sessions"
      :value="2048"
      :change="12"
      change-direction="up"
    />
  </Card>
</Grid>
```

**Styling:** "Large number value with smaller label below. Optional up/down trend indicator (green/red). Unit suffix optional. Background can be colored."

**A11y Notes:** "Value and label clearly separated. Trend direction indicated visually (color + icon) and textually. Numeric precision appropriate. Currency/percentage formatting accessible."

**Related Components:** "[Card](#card), [Badge](#badge)"

- [ ] **Step 2: Generate content for `timeline.md`**

**Purpose:** "Visual timeline showing sequence of events or milestones. Supports vertical/horizontal layout and various event states."

**Usage Examples:**

```vue
<!-- Vertical timeline -->
<Timeline>
  <Timeline.Item
    v-for="event in events"
    :key="event.id"
    :title="event.title"
    :date="event.date"
    :status="event.status"
  >
    {{ event.description }}
  </Timeline.Item>
</Timeline>

<!-- Process/workflow timeline -->
<Timeline horizontal>
  <Timeline.Item
    v-for="step in steps"
    :key="step"
    :title="step"
    :status="getStepStatus(step)"
  />
</Timeline>
```

**Styling:** "Vertical line with dots for each event. Event content beside or below dot. Status indicator (pending, active, completed) changes dot color. Horizontal orientation optional."

**A11y Notes:** "Timeline has role='region' with aria-label='timeline'. Each item has clear date/status. Events are announced in order. Keyboard navigation through events."

**Related Components:** "[List Group](#list-group), [Progress](#progress)"

- [ ] **Step 3: Generate content for `toast.md`**

**Purpose:** "Non-modal notification appearing at edge of screen (usually bottom-right). Auto-dismisses after timeout. Stacked if multiple toasts."

**Usage Examples:**

```vue
<!-- Success toast -->
<Toast variant="success" message="File uploaded successfully" />

<!-- With action button -->
<Toast
  variant="info"
  message="New message from John"
  @action="viewMessage"
  action-label="View"
/>

<!-- Programmatic toast -->
<Button @click="showToast">
  Trigger Toast
</Button>

<script setup>
function showToast() {
  // Show toast programmatically
  Toast.show({
    variant: 'warning',
    message: 'Unsaved changes',
    duration: 5000
  });
}
</script>
```

**Styling:** "Fixed position notification box (usually bottom-right). Background color matches variant. Rounded corners. Small close button (X) in corner. Fade-in/fade-out animation."

**A11y Notes:** "Toast announced with aria-live='assertive'. Auto-dismiss respects prefers-reduced-motion. Close button keyboard accessible. Focus not moved (non-modal)."

**Related Components:** "[Alert](#alert), [Feedback Message](#feedback-message)"

- [ ] **Step 4: Generate content for `youtube-player.md`**

**Purpose:** "Embedded YouTube video player component. Manages iframe embed with responsive sizing and lazy loading."

**Usage Examples:**

```vue
<!-- Basic YouTube embed -->
<YoutubePlayer video-id="dQw4w9WgXcQ" />

<!-- With title and description -->
<YoutubePlayer
  video-id="dQw4w9WgXcQ"
  title="Amazing Video"
  description="Watch this great video"
/>

<!-- Responsive with aspect ratio control -->
<YoutubePlayer
  video-id="dQw4w9WgXcQ"
  aspect-ratio="16:9"
  lazy-load
/>
```

**Styling:** "Responsive iframe maintaining aspect ratio (16:9 default). Lazy loads video on view. Optional background image before play. Play button overlay (YouTube default)."

**A11y Notes:** "Iframe has title attribute. Video content should have captions if available. Keyboard accessible (Tab to play, Space/Enter to start). Focus visible on controls."

**Related Components:** "[Image](#image), [Card](#card)"

- [ ] **Step 5: Commit final 4 components**

```bash
git add docs/components/ui/stats-item.md docs/components/ui/timeline.md docs/components/ui/toast.md docs/components/ui/youtube-player.md
git commit -m "docs: fill in purpose and examples for remaining 4 components (total 60 UI components documented)"
```

---

## Task 10: Update COMPONENT_CATALOG.md with All 60 Components

**Files:**
- Modify: `docs/components/COMPONENT_CATALOG.md`

**Goal:** Add newly documented components to the master catalog index.

- [ ] **Step 1: Review current COMPONENT_CATALOG.md structure**

```bash
head -100 docs/components/COMPONENT_CATALOG.md
```

Note the table format, status indicators, and organization by category.

- [ ] **Step 2: Add all 31 new components to the catalog**

For each of the 31 new components, add a row to the appropriate category section in the catalog table:

Example row structure (match existing format):
```
| Component | Purpose | Props | Slots | Events | Status | Link |
|-----------|---------|-------|-------|--------|--------|------|
| Alert | Displays contextual messages | 4 | 2 | 1 | ✅ Stable | [Docs](./ui/alert.md) |
```

Group by category:
- **UI Primitives - Feedback:** alert, badge, feedback-message, toast, news-indicator, rating-star
- **UI Primitives - Layout:** stack, grid, card, card-info-link, highlight-card, callout-card
- **UI Primitives - Navigation:** breadcrumb, pagination, list-group, timeline
- **UI Primitives - Form Inputs:** form-textfield, form-textarea, form-autocomplete, form-select, form-checkbox, form-radio, form-datepicker, form-currency, form-range, form-richtext, form-colorpicker, form-spinbutton, form-tags
- **UI Primitives - Form Layout/Helpers:** form-label, form-helper, form-layout, form-validation, form-wrapper
- **UI Primitives - Data Display:** progress, progress-indeterminate, skeleton, skeleton-list, skeleton-table, index-table, stats-item, color-thumb, icon, image, rating-star
- **UI Primitives - Overlay:** dialog, modal
- **UI Primitives - Other:** breadcrumb, divider, youtube-player, select-item-card, button-group

- [ ] **Step 3: Verify all 60 components are in the catalog**

```bash
# Count entries in catalog table
grep "| [A-Za-z]" docs/components/COMPONENT_CATALOG.md | wc -l

# Cross-check with actual files
ls -1 docs/components/ui/*.md | wc -l
```

Both should show 60.

- [ ] **Step 4: Commit catalog update**

```bash
git add docs/components/COMPONENT_CATALOG.md
git commit -m "docs: update catalog with all 60 UI components"
```

---

## Task 11: Final Review & Verification

**Goal:** Ensure all 31 new docs are complete, consistent, and follow the template.

- [ ] **Step 1: Verify no TODOs remain**

```bash
grep -r "TODO\|PLACEHOLDER\|\[TODO\]" docs/components/ui/{alert,badge,breadcrumb,callout-card,card,card-info-link,color-thumb,dialog,feedback-message,form-autocomplete,form-checkbox,form-currency,form-datepicker,form-helper,form-label,form-layout,form-radio,form-range,form-richtext,form-select,form-textarea,form-textfield,grid,highlight-card,icon,list-group,progress,progress-indeterminate,rating-star,select-item-card,stack,stats-item,timeline,toast,youtube-player}.md

# If output is empty, all TODOs are resolved ✓
```

- [ ] **Step 2: Spot-check 5 random docs for consistency**

```bash
# Check that each has: Purpose, Status, Import, Props, Slots, Events, Usage Examples, Styling, A11y Notes, Related Components
for file in alert badge dialog form-textfield progress; do
  echo "=== $file.md ===="
  grep -E "^## (Purpose|Status|Import|Props|Slots|Events|Usage Examples|Styling|A11y Notes|Related Components)" docs/components/ui/$file.md || echo "Missing sections!"
done
```

Expected: All sections present in each file.

- [ ] **Step 3: Verify imports are correct**

```bash
# Sample 3 imports
grep "^import" docs/components/ui/{badge,dialog,form-textfield}.md

# Should show: import { ComponentName } from '@tray-tecnologia/design-system';
```

- [ ] **Step 4: Verify example code is valid Vue 3**

```bash
# Check that examples use template syntax correctly
grep -A5 "```vue" docs/components/ui/{card,form-layout,stack}.md | head -20
```

Look for:
- `<template>` opening/closing
- `v-` directives (v-model, v-if, v-for, @click, etc)
- No syntax errors

- [ ] **Step 5: Commit final verification (if no issues found)**

```bash
git log --oneline -10
# Verify 4 commits from Tasks 5-11:
# "docs: fill in purpose and examples for batch 1 (8 components)"
# "docs: fill in purpose and examples for batch 2 (8 components)"
# "docs: fill in purpose and examples for batch 3 (8 components)"
# "docs: fill in purpose and examples for batch 4 (7 final components)" + remaining 4
# "docs: fill in purpose and examples for remaining 4 components"
# "docs: update catalog with all 60 UI components"
```

All commits present ✓

---

## Success Criteria

- [ ] All 60 UI components have documentation in `docs/components/ui/`
- [ ] 31 new docs auto-extracted and filled with purpose/examples
- [ ] No TODO/PLACEHOLDER text remaining
- [ ] All docs follow existing template exactly
- [ ] Props/slots/events extracted accurately from source
- [ ] Usage examples are realistic and follow Vue 3 syntax
- [ ] COMPONENT_CATALOG.md updated with all 60 entries
- [ ] 6 clean commits (one per batch + catalog update)
- [ ] No merge conflicts on main branch
