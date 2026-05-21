# Design System AI Documentation Structure

**Date:** 2026-05-15  
**Scope:** Create AI-readable documentation for Tray Design System components  
**Goal:** Enable external AI agents to discover and use DS components in other projects

---

## Context

Tray Design System is a Vue 3 component library with 50+ components organized in two categories:
- **UI Primitives** (30+ components: Button, Pagination, Modal, etc)
- **Admin Components** (20+ components: TableList, Sidebar, etc)

Currently, Storybook serves human developers. Need separate AI-optimized documentation so external AI agents (Claude, etc) can answer developer questions about component usage.

**GitHub:** https://github.com/uxshop/design-system  
**Current Version:** v3.1.29  
**Installation:** `npm install github:uxshop/design-system#v3.1.29`

---

## Solution Overview

**Three-part documentation system optimized for AI discovery:**

### 1. Directory Structure

```
docs/
├── COMPONENT_CATALOG.md          # Master index (all components, searchable table)
├── README.md                      # Quick start for AI agents
├── PROMPT.md                      # AI agent instruction manual
├── components/
│   ├── ui/
│   │   ├── button.md             # Individual component docs
│   │   ├── pagination.md
│   │   ├── modal.md
│   │   └── ... (30+ UI primitive docs)
│   └── admin/
│       ├── table-list.md
│       ├── sidebar.md
│       └── ... (20+ admin component docs)
```

**Design rationale:** Flat component directory with master catalog enables fast discovery (AI scans COMPONENT_CATALOG.md first) then deep dives into individual component files. Mirrors source structure for maintainability.

### 2. COMPONENT_CATALOG.md (Master Index)

**Purpose:** Single searchable table listing all components with metadata.

**Structure:**
- Categorized sections (UI Primitives, Form Components, Admin Components, etc)
- Table columns: Component name | Purpose | Props count | Slots | Events | Status | Link
- Status indicators: ✅ Stable | ⚠️ Deprecated | 🔄 In Development
- Quick tips section for AI agent discovery patterns

**Why:** AI agents need fast lookup. A single master file lets them scan all options in one request, then fetch detailed docs as needed. Status column prevents recommending deprecated components.

### 3. Individual Component Docs (`/docs/components/<category>/<name>.md`)

**Template per component:**

| Section | Purpose | For AI |
|---------|---------|--------|
| Purpose | One-line what it does | Quick context |
| Status | Stable/Deprecated/etc | Avoid deprecated |
| Import | Exact import syntax | Copy-paste ready |
| Props | Table: name, type, required, default, description | TypeScript signatures |
| Slots | Named slots available | Know what can be customized |
| Events | Emitted events with payload | Know what listeners to attach |
| Usage Examples | Real code snippets (Vue 3 template syntax) | Exact implementation |
| Styling | CSS classes and theme variables | Know how to override appearance |
| A11y Notes | Accessibility considerations | Know what's handled |
| Related Components | Links to similar/complementary components | Discovery of alternatives |
| Deprecations | If deprecated, recommended replacement | Guide away from old code |

**Why:** Complete reference enables AI to answer developer questions without human follow-up. Organized by information type (what it is → how to use → how to style → gotchas).

### 4. PROMPT.md (AI Agent Instructions)

**Purpose:** System prompt that external AI agents should load when helping with this DS.

**Contains:**
- How to navigate the documentation structure
- Import rules (exact syntax from GitHub)
- Props/Slots/Events semantics
- Common developer questions with suggested answers
- Status rules (avoid deprecated components, suggest replacements)
- Version and installation info
- Links to all documentation locations

**Why:** Reduces context window waste. AI agents load this once, then answer questions from templates + individual docs. Prevents hallucination about non-existent components or wrong import paths.

### 5. docs/README.md (Quick Start)

**For:** First-time AI agents accessing the documentation

**Contains:**
- What this DS is (Vue 3 component library)
- Quick install command
- How to find components (point to COMPONENT_CATALOG.md)
- Where to read detailed docs
- Link to PROMPT.md for full instructions

---

## Scope & Rollout

### Phase 1: UI Primitives (Week 1)
- Document 30+ UI primitive components
- Write master COMPONENT_CATALOG.md with all UI components
- Write PROMPT.md and docs/README.md

**Why first:** UI primitives are foundational, highly reusable, most likely to be used by external developers.

### Phase 2: Admin Components (Week 2-3)
- Document 20+ admin-specific components
- Update COMPONENT_CATALOG.md to include admin section
- Mark deprecated components (TableList, Topbar, etc) with status ⚠️

### Phase 3: Maintenance (Ongoing)
- Add new component docs as new components are created
- Update existing docs when props/events/slots change
- Keep COMPONENT_CATALOG.md synchronized with source

---

## Implementation Details

### Component Doc Generation

Each component doc is manually created (not auto-generated) because:
1. Props tables require human context (why this prop, not just types)
2. Usage examples should show **real patterns**, not all possible combinations
3. Related components require human judgment (which components are actually related)
4. A11y notes require domain knowledge

**Consistency:** Use the Button example (shown in this spec) as template for all component docs.

### COMPONENT_CATALOG.md Maintenance

Table is manually maintained because:
1. Status (Stable/Deprecated) is human judgment
2. Props count needs updating only when component changes
3. Version affinity (which DS version introduced this) helps external AI agents

**Update trigger:** Each time a component is added, modified (breaking change), or deprecated.

### Integration with Storybook

- Storybook remains source of truth for humans (visual reference, interactive testing)
- Markdown docs are separate, AI-focused (no visual mockups, structured for parsing)
- No duplication: Storybook stories are human-readable; markdown docs are AI-optimized

---

## Success Criteria

1. ✅ All 30+ UI primitive components have individual docs
2. ✅ COMPONENT_CATALOG.md lists all components with status
3. ✅ External AI agents can find a component by searching catalog
4. ✅ External AI agents can answer "how do I use Button?" without hallucinating props
5. ✅ Deprecated components are clearly marked with recommended alternatives
6. ✅ Import statements are exact and copy-paste ready
7. ✅ Component relations are documented (Button → ButtonGroup, etc)

---

## Example: Button Component Doc

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
| label | string | Yes | - | Button text |
| variant | 'primary' \| 'secondary' \| 'danger' | No | 'primary' | Visual style |
| size | 'small' \| 'medium' \| 'large' | No | 'medium' | Dimensions |
| disabled | boolean | No | false | Disables interaction |
| loading | boolean | No | false | Shows spinner |
| type | 'button' \| 'submit' \| 'reset' | No | 'button' | HTML type |
| icon | string | No | - | Icon name |
| fullWidth | boolean | No | false | Fills parent |

## Slots
| Slot | Description |
|------|-------------|
| default | Button text (overrides label prop) |
| icon | Custom icon element |

## Events
| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | Fired on click |
| focus | FocusEvent | Fired on focus |
| blur | FocusEvent | Fired on blur |

## Usage Examples

### Basic
\`\`\`vue
<Button label="Click me" />
\`\`\`

### Variants
\`\`\`vue
<Button label="Primary" variant="primary" />
<Button label="Danger" variant="danger" />
\`\`\`

### Loading State
\`\`\`vue
<Button label="Save" :loading="isSaving" @click="handleSave" />
\`\`\`

### With Icon & Slot
\`\`\`vue
<Button variant="secondary" size="large">
  <template #icon>
    <IconDownload />
  </template>
  Download Report
</Button>
\`\`\`

## Styling

### CSS Classes
- .ds-button - Root
- .ds-button--primary - Primary variant
- .ds-button--small - Small size
- .ds-button--loading - Loading state

### Theme Variables
\`\`\`scss
$button-primary-bg: var(--ds-color-primary);
$button-primary-text: var(--ds-color-white);
\`\`\`

## A11y Notes
- Button has proper type attribute
- Disabled buttons not focusable
- Loading state uses aria-busy="true"
- Click accessible via keyboard (Enter/Space)

## Related Components
- [ButtonGroup](./button-group.md) — Multiple buttons
- [IconButton](./icon-button.md) — Icon-only variant

## Deprecations
None. This component is stable.
\`\`\`

---

## File Structure Summary

| File | Owner | Frequency | Content |
|------|-------|-----------|---------|
| COMPONENT_CATALOG.md | Maintainer | Per component change | Master index, status, links |
| PROMPT.md | Maintainer | Per major version | AI agent instructions |
| docs/README.md | Maintainer | Per major version | Quick start guide |
| docs/components/ui/*.md | Contributor | Per new component | Individual component docs |
| docs/components/admin/*.md | Contributor | Per new component | Individual component docs |

---

## Next Steps (Implementation)

1. Create `/docs` directory structure
2. Write `docs/COMPONENT_CATALOG.md` template (headers + 5-10 example rows)
3. Write `docs/PROMPT.md`
4. Write `docs/README.md`
5. Document all 30+ UI primitive components
6. Commit all docs
7. Document admin components (phase 2)

