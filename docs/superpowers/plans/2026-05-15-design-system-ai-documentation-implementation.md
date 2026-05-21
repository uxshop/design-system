# Design System AI Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create AI-readable documentation for 30+ UI primitive components, enabling external AI agents to discover and recommend components in other projects.

**Architecture:** Master catalog index (COMPONENT_CATALOG.md) for fast discovery, individual component docs following consistent template, AI instruction prompt (PROMPT.md) to guide agent behavior.

**Tech Stack:** Markdown, Vue 3 component API reference

---

## File Structure

**Create:**
- `docs/README.md` — Quick start for AI agents
- `docs/PROMPT.md` — System prompt for AI agents using this DS
- `docs/COMPONENT_CATALOG.md` — Master index of all UI components
- `docs/components/ui/button.md` through `docs/components/ui/[30+ components].md`

**Modify:**
- None (green-field docs)

---

## Phase 1: Foundation (3 tasks)

### Task 1: Create Directory Structure and README

**Files:**
- Create: `docs/README.md`

- [ ] **Step 1: Create docs directory structure**

```bash
mkdir -p /home/lucascorrea/Projetos/github/design-system/docs/components/ui
mkdir -p /home/lucascorrea/Projetos/github/design-system/docs/superpowers/specs
mkdir -p /home/lucascorrea/Projetos/github/design-system/docs/superpowers/plans
```

- [ ] **Step 2: Write docs/README.md**

```markdown
# Design System Documentation for AI Agents

This directory contains AI-optimized documentation for the Tray Design System Vue 3 component library.

## Quick Start

**What is this?**
Markdown documentation for the `@tray-tecnologia/design-system` Vue 3 component library. Use this if you're an AI agent helping developers build with Tray DS.

**Installation**
```bash
npm install github:uxshop/design-system#v3.1.29
```

## Find Components

Start with [`COMPONENT_CATALOG.md`](./COMPONENT_CATALOG.md) — it lists all 50+ components with purpose, status, and links.

## Read Component Docs

Each component has a detailed doc in `components/<category>/<name>.md` with:
- Import syntax
- Props with TypeScript types
- Slots and Events
- Real code examples
- Styling and CSS classes
- Accessibility notes
- Related components

## For AI Agents

Load [`PROMPT.md`](./PROMPT.md) to understand documentation structure and best practices for recommending components.

## What NOT to Use

Components marked ⚠️ in the catalog are deprecated and will be removed. Their docs list recommended alternatives.

---

**Version:** v3.1.29  
**GitHub:** https://github.com/uxshop/design-system  
**Last Updated:** 2026-05-15
```

- [ ] **Step 3: Verify README renders correctly**

```bash
cd /home/lucascorrea/Projetos/github/design-system
cat docs/README.md
```

Expected: Markdown displays with all sections visible.

- [ ] **Step 4: Commit**

```bash
git add docs/README.md
git commit -m "docs: add AI documentation quick start guide"
```

---

### Task 2: Write PROMPT.md (AI Agent Instructions)

**Files:**
- Create: `docs/PROMPT.md`

- [ ] **Step 1: Write docs/PROMPT.md**

```markdown
# Design System AI Agent Prompt

You are an AI assistant helping developers use the Tray Design System (@tray-tecnologia/design-system) in their Vue 3 projects.

## Package Information

- **GitHub:** https://github.com/uxshop/design-system
- **Current Version:** v3.1.29
- **Installation:** `npm install github:uxshop/design-system#v3.1.29`
- **Requires:** Vue 3

## How to Navigate This Documentation

### 1. Find Components

Start with `COMPONENT_CATALOG.md`. It lists all available components in a searchable table with:
- **Component Name** — what you can import
- **Purpose** — what the component does
- **Props Count** — number of configuration options
- **Slots** — customizable content areas
- **Events** — callbacks/listeners
- **Status** — ✅ Stable (use) | ⚠️ Deprecated (avoid) | 🔄 In Development
- **Docs** — link to detailed documentation

Search by component name or category (UI Primitives, Forms, Admin, etc).

### 2. Read Individual Component Docs

Each component has a detailed doc in `components/<category>/<name>.md`:

| Section | What It Tells You |
|---------|------------------|
| Purpose | One-line description of what the component does |
| Status | Is it safe to use? ✅ Stable / ⚠️ Deprecated / 🔄 In Dev |
| Import | Exact import syntax — copy-paste directly |
| Props | Table: name, type, required, default, description |
| Slots | Named content areas you can customize |
| Events | What the component emits, with payload types |
| Usage Examples | Real Vue 3 template code you can use |
| Styling | CSS classes and theme variables to customize appearance |
| A11y Notes | Accessibility features handled by the component |
| Related Components | Similar or complementary components |
| Deprecations | If deprecated, which component to use instead |

### 3. Avoid Deprecated Components

If a component is marked ⚠️ in the catalog, it will be removed in a future release.

**Always:**
1. Check the component doc's "Deprecations" section
2. Find the recommended replacement
3. Suggest the replacement to developers
4. Show them the new component's usage pattern

## Key Rules for Using This DS

### Props Are Typed
Every prop in the Props table shows:
- **Type** — TypeScript type signature (e.g., `'primary' | 'secondary' | 'danger'`)
- **Required** — Yes/No
- **Default** — What the prop defaults to if omitted

If a developer asks "what values can I pass?", refer to the Props table. Don't guess.

### Slots Are Flexible
Components with slots can accept any content (text, HTML, other components). The slot table shows where content goes.

Example: Button has a `default` slot for button text and an `icon` slot for icon elements.

### Events Use Vue 3 Syntax
All examples use Vue 3 `@event` syntax:
- `@click` instead of `@click.native`
- `@change` instead of `on-change`
- Show these exact patterns in code examples

### Styling Is Scoped
Component CSS uses the `ds-` prefix to avoid conflicts:
- `.ds-button` — Button root
- `.ds-button--primary` — Variant modifier
- `.ds-modal__header` — Child element

Override with CSS custom properties (theme variables) shown in each component's "Styling" section.

### Import From Package
All imports are from `@tray-tecnologia/design-system`:

```ts
import { Button, Modal, Pagination } from '@tray-tecnologia/design-system';
```

Don't suggest relative imports or source files. Components are pre-compiled and exported from the package.

## Common Developer Questions

### "How do I use Button?"
→ Direct to `components/ui/button.md`. Show the exact Import, a basic usage example, and Props table.

### "What's the difference between Button and IconButton?"
→ Check both component docs in catalog. Button = label + optional icon. IconButton = icon-only.

### "Can I customize the button color?"
→ Check the Button doc's "Styling" section. Show the CSS custom property names (e.g., `--ds-button-primary-bg`). Explain how to override in their project's theme.

### "Does this work with Vue 2?"
→ This Design System requires Vue 3. Mention this upfront if asked about version compatibility.

### "Can I use this component outside this DS?"
→ No, components require `@tray-tecnologia/design-system` to be installed as a dependency.

### "Is Button accessible?"
→ Check Button doc's "A11y Notes" section. Show what accessibility features are built-in (proper `type` attribute, keyboard support, etc).

### "How do I make Button fullWidth?"
→ Show the Props table. Button has a `fullWidth: boolean` prop. Example:

```vue
<Button label="Full Width" :fullWidth="true" />
```

## Documentation Structure

```
docs/
├── README.md                         # This quick start
├── PROMPT.md                         # You are here
├── COMPONENT_CATALOG.md              # Master index
└── components/
    ├── ui/
    │   ├── button.md
    │   ├── pagination.md
    │   ├── modal.md
    │   └── ... (30+ UI primitives)
    └── admin/
        ├── table-list.md
        ├── sidebar.md
        └── ... (admin components, Phase 2)
```

## Important Notes

- This is AI-focused documentation. Humans should use **Storybook** (`npm run storybook`) for visual reference and interactive testing.
- If a component isn't in the catalog, it doesn't exist in this version.
- Always provide complete code examples, not pseudocode.
- If uncertain about a component, direct developers to the Storybook or the component's GitHub source.

## Version Info

- **Design System Version:** v3.1.29
- **Vue Version Required:** 3.x
- **Documentation Updated:** 2026-05-15
```

- [ ] **Step 2: Verify PROMPT.md is complete**

```bash
cat docs/PROMPT.md | wc -l
```

Expected: 200+ lines covering all guidance.

- [ ] **Step 3: Commit**

```bash
git add docs/PROMPT.md
git commit -m "docs: add AI agent system prompt and usage guide"
```

---

### Task 3: Create COMPONENT_CATALOG.md (Master Index)

**Files:**
- Create: `docs/COMPONENT_CATALOG.md`

- [ ] **Step 1: Write docs/COMPONENT_CATALOG.md header and UI Primitives section**

```markdown
# Design System Component Catalog

Complete index of all Tray Design System components. Each component is documented individually in `components/<category>/<name>.md`.

**Quick Tips:**
- ✅ = Use in new projects
- ⚠️ = Avoid (deprecated, will be removed)
- 🔄 = In development
- Deprecated components list recommended replacements

---

## UI Primitives (Core Components)

| Component | Purpose | Props | Slots | Events | Status | Docs |
|-----------|---------|-------|-------|--------|--------|------|
| Button | Clickable action trigger with variants | 8 | default, icon | click, focus, blur | ✅ Stable | [→](components/ui/button.md) |
| Pagination | Multi-page navigation | 12 | prev, next | change, page-change | ✅ Stable | [→](components/ui/pagination.md) |
| Modal | Overlay dialog with header/footer | 6 | header, default, footer | open, close | ✅ Stable | [→](components/ui/modal.md) |
| Spinner | Loading indicator | 3 | - | - | ✅ Stable | [→](components/ui/spinner.md) |
| Tag | Categorical label with close action | 5 | default | close | ✅ Stable | [→](components/ui/tag.md) |
| Avatar | User image or initials | 7 | - | - | ✅ Stable | [→](components/ui/avatar.md) |
| Link | Text link with icon support | 6 | default | click | ✅ Stable | [→](components/ui/link.md) |
| IconButton | Icon-only button variant | 6 | icon | click | ✅ Stable | [→](components/ui/icon-button.md) |
| ButtonGroup | Multiple buttons in a group | 4 | default | select | ✅ Stable | [→](components/ui/button-group.md) |
| Divider | Visual separator line | 3 | - | - | ✅ Stable | [→](components/ui/divider.md) |
| Dropdown | Contextual menu | 8 | trigger, default | select, open, close | ✅ Stable | [→](components/ui/dropdown.md) |
| Tab | Tabbed interface | 7 | default | change | ✅ Stable | [→](components/ui/tab.md) |
| Skeleton | Placeholder during loading | 4 | - | - | ✅ Stable | [→](components/ui/skeleton.md) |
| SkeletonList | List skeleton loader | 5 | - | - | ✅ Stable | [→](components/ui/skeleton-list.md) |
| SkeletonTable | Table skeleton loader | 6 | - | - | ✅ Stable | [→](components/ui/skeleton-table.md) |
| Image | Optimized image with fallback | 8 | - | load, error | ✅ Stable | [→](components/ui/image.md) |
| Aside | Sidebar/aside panel | 5 | default | toggle | ✅ Stable | [→](components/ui/aside.md) |
| DescriptionList | Key-value pair list | 4 | default | - | ✅ Stable | [→](components/ui/description-list.md) |
| IndexTable | Indexed data table | 12 | header, row, footer | select, sort | ✅ Stable | [→](components/ui/index-table.md) |
| NewsIndicator | Badge for new items | 3 | - | - | ✅ Stable | [→](components/ui/news-indicator.md) |
| TextStyle | Typography/text formatting | 6 | default | - | ✅ Stable | [→](components/ui/text-style.md) |
| CustomScroll | Custom scrollbar | 5 | default | scroll | ✅ Stable | [→](components/ui/custom-scroll.md) |
| InfiniteScroll | Infinite scroll trigger | 7 | default | load-more | ✅ Stable | [→](components/ui/infinite-scroll.md) |
| DropFiles | File drag-and-drop zone | 6 | default | drop, change | ✅ Stable | [→](components/ui/drop-files.md) |
| FormWrapper | Form container | 4 | default | submit | ✅ Stable | [→](components/ui/form-wrapper.md) |
| FormValidation | Validation error display | 5 | default | - | ✅ Stable | [→](components/ui/form-validation.md) |
| FormColorpicker | Color selection input | 6 | - | change | ✅ Stable | [→](components/ui/form-colorpicker.md) |
| FormTags | Tag input field | 8 | - | change, add, remove | ✅ Stable | [→](components/ui/form-tags.md) |
| FormSpinbutton | Number spinner input | 7 | - | change | ✅ Stable | [→](components/ui/form-spinbutton.md) |

---

## How to Use This Catalog

1. **Find by name:** Search `Ctrl+F` for component name (e.g., "Button")
2. **Find by category:** Scroll to section (UI Primitives, Forms, Admin)
3. **Check status:** ✅ = safe, ⚠️ = avoid, 🔄 = experimental
4. **Read details:** Click the [→] link to open detailed component doc

---

**Component Docs Location:** `components/<category>/<name>.md`  
**Storybook (for humans):** Run `npm run storybook`  
**Version:** v3.1.29  
**Last Updated:** 2026-05-15
```

- [ ] **Step 2: Verify COMPONENT_CATALOG.md renders**

```bash
cat docs/COMPONENT_CATALOG.md | head -50
```

Expected: Markdown table with component list visible.

- [ ] **Step 3: Commit**

```bash
git add docs/COMPONENT_CATALOG.md
git commit -m "docs: add component catalog with UI primitives index"
```

---

## Phase 2: Component Documentation (30 tasks)

### Task 4–33: Document UI Primitive Components

For each UI component below, create individual doc following the template. These are grouped by type but each is a separate commit.

**Components to Document (in order):**

1. button
2. pagination
3. modal
4. spinner
5. tag
6. avatar
7. link
8. icon-button
9. button-group
10. divider
11. dropdown
12. tab
13. skeleton
14. skeleton-list
15. skeleton-table
16. image
17. aside
18. description-list
19. index-table
20. news-indicator
21. text-style
22. custom-scroll
23. infinite-scroll
24. drop-files
25. form-wrapper
26. form-validation
27. form-colorpicker
28. form-tags
29. form-spinbutton

**Template for Each Component Task:**

### Task 4: Document Button Component

**Files:**
- Create: `docs/components/ui/button.md`

- [ ] **Step 1: Extract Button props from source**

Read `/home/lucascorrea/Projetos/github/design-system/src/components/ui/button/Button.vue` to identify:
- All props with types and defaults
- Slots available
- Events emitted

- [ ] **Step 2: Write Button docs**

```markdown
# Button Component

## Purpose
Clickable action trigger for user interactions. Supports multiple variants (primary, secondary, danger) and sizes (small, medium, large).

## Status
✅ Stable — Safe for new projects

## Import
\`\`\`ts
import { Button } from '@tray-tecnologia/design-system';
\`\`\`

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | Yes | - | Button text content |
| variant | 'primary' \| 'secondary' \| 'danger' | No | 'primary' | Visual style |
| size | 'small' \| 'medium' \| 'large' | No | 'medium' | Button dimensions |
| disabled | boolean | No | false | Disables interaction |
| loading | boolean | No | false | Shows spinner, blocks clicks |
| type | 'button' \| 'submit' \| 'reset' | No | 'button' | HTML button type |
| icon | string | No | - | Icon name (from icon set) |
| fullWidth | boolean | No | false | Fills parent width |

## Slots

| Slot | Description |
|------|-------------|
| default | Button text (overrides label prop) |
| icon | Custom icon element |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | Fired on button click |
| focus | FocusEvent | Fired on focus |
| blur | FocusEvent | Fired on blur |

## Usage Examples

### Basic Button
\`\`\`vue
<Button label="Click me" />
\`\`\`

### Primary Variant (Default)
\`\`\`vue
<Button label="Submit" variant="primary" type="submit" />
\`\`\`

### Danger Variant
\`\`\`vue
<Button label="Delete" variant="danger" @click="handleDelete" />
\`\`\`

### Loading State
\`\`\`vue
<template>
  <Button :label="isSaving ? 'Saving...' : 'Save'" :loading="isSaving" @click="handleSave" />
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@tray-tecnologia/design-system';

const isSaving = ref(false);

const handleSave = async () => {
  isSaving.value = true;
  await saveData();
  isSaving.value = false;
};
</script>
\`\`\`

### With Icon Slot
\`\`\`vue
<Button variant="secondary" size="large">
  <template #icon>
    <IconDownload />
  </template>
  Download Report
</Button>
\`\`\`

### Full Width Button
\`\`\`vue
<Button label="Sign Up" :fullWidth="true" type="submit" />
\`\`\`

## Styling

### CSS Classes
- `.ds-button` — Root element
- `.ds-button--primary` — Primary variant
- `.ds-button--secondary` — Secondary variant
- `.ds-button--danger` — Danger variant
- `.ds-button--small` — Small size
- `.ds-button--medium` — Medium size (default)
- `.ds-button--large` — Large size
- `.ds-button--loading` — Loading state
- `.ds-button--disabled` — Disabled state

### Theme Variables
\`\`\`scss
// Primary
$button-primary-bg: var(--ds-color-primary);
$button-primary-text: var(--ds-color-white);
$button-primary-hover: var(--ds-color-primary-dark);

// Secondary
$button-secondary-bg: var(--ds-color-gray-100);
$button-secondary-text: var(--ds-color-gray-900);

// Danger
$button-danger-bg: var(--ds-color-danger);
$button-danger-text: var(--ds-color-white);

// Common
$button-border-radius: var(--ds-radius-sm);
$button-padding: 0.75rem 1.5rem;
\`\`\`

## A11y Notes
- Button has proper HTML `type` attribute (button, submit, reset)
- Disabled buttons are not focusable and not in tab order
- Loading state sets `aria-busy="true"` on button
- Click is accessible via keyboard: Enter or Space key
- Focus visible indicator provided by browser defaults
- Icon slot should contain accessible icon with proper `aria-label` if needed

## Related Components
- [IconButton](./icon-button.md) — Icon-only button variant
- [ButtonGroup](./button-group.md) — Multiple buttons grouped together
- [Link](./link.md) — Text link (semantic alternative to button)

## Deprecations
None. This component is stable and safe for new projects.
```

- [ ] **Step 3: Run verification**

```bash
ls -la docs/components/ui/button.md
```

Expected: File exists and contains all sections.

- [ ] **Step 4: Commit**

```bash
git add docs/components/ui/button.md
git commit -m "docs: add Button component documentation"
```

---

**Repeat Steps 1-4 for remaining 28 components (Tasks 5-33):**

For each component, adapt the template:
- Read actual component source for props/slots/events
- Write purpose based on component's intent
- Create 3-5 usage examples showing common patterns
- Include deprecation info if applicable
- Link to related components
- Update COMPONENT_CATALOG.md status if component status differs

**Order:** Document in this order for logical grouping:
- Core (Button, Pagination, Modal, Spinner, Tag, Avatar) — Tasks 4-9
- Navigation & Display (Link, IconButton, ButtonGroup, Divider, Dropdown, Tab) — Tasks 10-15
- Loading & Placeholders (Skeleton, SkeletonList, SkeletonTable) — Tasks 16-18
- Content (Image, Aside, DescriptionList, IndexTable, NewsIndicator, TextStyle) — Tasks 19-24
- Interaction (CustomScroll, InfiniteScroll, DropFiles) — Tasks 25-27
- Form Components (FormWrapper, FormValidation, FormColorpicker, FormTags, FormSpinbutton) — Tasks 28-33

Each task: Read source → Write doc → Commit separately.

---

## Phase 3: Verification (1 task)

### Task 34: Verify Documentation Completeness

**Files:**
- No new files

- [ ] **Step 1: Check all component docs exist**

```bash
cd /home/lucascorrea/Projetos/github/design-system
ls -1 docs/components/ui/*.md | wc -l
```

Expected: 29 files (button + 28 components)

- [ ] **Step 2: Verify catalog links are correct**

```bash
grep -o "\[→\](components/ui/[^)]*)" docs/COMPONENT_CATALOG.md | sed 's/.*\(components.*\)/\1/' | while read link; do
  if [ ! -f "$link" ]; then
    echo "MISSING: $link"
  fi
done
```

Expected: No MISSING files printed

- [ ] **Step 3: Verify markdown formatting**

```bash
for f in docs/components/ui/*.md docs/PROMPT.md docs/COMPONENT_CATALOG.md docs/README.md; do
  echo "=== $f ===" 
  head -3 "$f"
done
```

Expected: All files start with markdown headers, no corruption

- [ ] **Step 4: Check for broken links**

```bash
grep -r "\[→\]" docs/ | grep -v ".md:" | wc -l
```

Expected: 0 (all links are in .md files)

- [ ] **Step 5: Final commit**

```bash
git log --oneline -10
```

Expected: Shows commits for each component doc

- [ ] **Step 6: Summary**

```bash
echo "=== Documentation Summary ==="
echo "Master docs:"
ls -lh docs/{README,PROMPT,COMPONENT_CATALOG}.md
echo ""
echo "Component docs (UI):"
ls -1 docs/components/ui/*.md | wc -l
echo "files created"
echo ""
echo "Total doc size:"
du -sh docs/
```

---

## Success Criteria

✅ All 29 UI component docs created (`docs/components/ui/<name>.md`)  
✅ Master catalog complete with all components listed  
✅ PROMPT.md covers AI agent usage rules  
✅ README.md provides quick start  
✅ All docs follow consistent template  
✅ All catalog links point to existing files  
✅ All git commits completed  

---

## Notes

- If source component has different props than example template, use actual props
- Examples should show real patterns developers actually use
- A11y notes should reflect what the component actually implements
- If component is deprecated, mark ⚠️ and list replacement in Deprecations section
- Keep docs concise — AI agents scan; they don't skim prose

