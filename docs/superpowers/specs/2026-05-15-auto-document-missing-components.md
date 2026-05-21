# Auto-Document Missing UI Components

**Date:** 2026-05-15  
**Scope:** Generate documentation for 31 undocumented UI components  
**Goal:** Complete AI-readable component catalog for all 60 UI primitives

---

## Context

Design System has 60 UI components in `src/components/ui/`. Currently 29 documented, 31 missing docs.

**Missing components (31):**
alert, badge, breadcrumb, callout-card, card, card-info-link, color-thumb, dialog, feedback-message, form-autocomplete, form-checkbox, form-currency, form-datepicker, form-helper, form-label, form-layout, form-radio, form-range, form-richtext, form-select, form-textarea, form-textfield, grid, highlight-card, icon, list-group, progress, progress-indeterminate, rating-star, select-item-card, stack, stats-item, timeline, toast, youtube-player

**Existing doc template** (from 29 documented components):
- Purpose (one-liner)
- Status (✅ Stable | ⚠️ Deprecated | 🔄 In Development)
- Import
- Props table (auto-extractable from source)
- Slots table (auto-extractable from source)
- Events table (auto-extractable from source)
- Usage Examples (Vue 3 template syntax)
- Styling (CSS classes, theme vars)
- A11y Notes
- Related Components (cross-links)
- Deprecations (if applicable)

See `/docs/superpowers/specs/2026-05-15-design-system-ai-documentation-design.md` for catalog design rationale.

---

## Solution: Hybrid Extraction + AI Generation

### Phase 1: Automated Extraction Script

**Approach:** Node.js script parses Vue component source files to extract structural metadata.

**Input:** `src/components/ui/*/[component].vue`

**Extracts:**
- Props: name, type, required, default (from `props: {}` or `<script>` defineProps)
- Slots: slot names and their descriptions (from `<slot>` tags)
- Events: emitted events and payload types (from `emits: []` or `emit()` calls)
- Import path: `@tray-tecnologia/design-system`

**Output:** 31 markdown skeleton files in `docs/components/ui/[component-name].md`

Example structure:
```md
# Component Name
## Purpose
[PLACEHOLDER]

## Status
✅ Stable

## Import
import { ComponentName } from '@tray-tecnologia/design-system';

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| propName | string | yes | - | Description |

## Slots
| Slot | Description |
|------|-------------|
| slotName | Description |

## Events
- `@eventName` — Description

## Usage Examples
[PLACEHOLDER]

## Styling
[PLACEHOLDER]

## A11y Notes
[PLACEHOLDER]

## Related Components
[PLACEHOLDER]
```

**Script location:** `scripts/generate-component-docs.js`

### Phase 2: AI-Generated Content

**Purpose section:** Analyze component name + props + slots + events → infer single-line purpose. Examples:
- `<button-group>`: "Groups related buttons with shared behavior"
- `<form-checkbox>`: "Checkbox input with optional label and validation states"
- `<progress>`: "Displays task completion status as visual bar"

**Usage Examples:** Generate 2-3 realistic Vue 3 template snippets. Each shows:
- Basic usage (minimal props)
- Advanced usage (multiple props, events, slots)
- Real-world pattern (e.g., in a form)

Example for `<badge>`:
```vue
<!-- Basic -->
<Badge label="New" />

<!-- With variant -->
<Badge label="5" variant="danger" />

<!-- In a list item -->
<ListGroup>
  <ListGroup.Item>
    Item with status
    <Badge label="Draft" variant="warning" />
  </ListGroup.Item>
</ListGroup>
```

**Styling/A11y/Related Components:** Based on component type, populate common patterns:
- Form components → mention validation styling, label association, error states
- Layout components → mention flex/grid classes, responsive behaviors
- Interactive components → mention focus states, keyboard interaction, ARIA roles

### Phase 3: Integration + Catalog Update

1. Run extraction script → generates 31 skeleton docs
2. AI fills in Purpose/Examples for all 31
3. Single commit: "docs: auto-generate docs for 31 missing UI components"
4. Update `docs/components/COMPONENT_CATALOG.md` to include all 60 components

---

## Execution Workflow

```
1. Write extraction script
   ↓
2. Run script on src/components/ui/ → output 31 .md files
   ↓
3. AI generates Purpose + Examples for all 31
   ↓
4. Review all 31 for completeness + consistency
   ↓
5. Commit to branch
   ↓
6. Update COMPONENT_CATALOG.md
   ↓
7. Final review + merge
```

---

## Quality Gates

Each generated doc verified for:
- ✅ All props/slots/events extracted from source
- ✅ Purpose is clear, descriptive one-liner
- ✅ At least 2 usage examples (basic + advanced/real-world)
- ✅ Styling/A11y sections populated with relevant info
- ✅ Related components linked (cross-references)
- ✅ Format matches existing 29 docs
- ✅ No placeholders remaining (except deprecation notices if N/A)

---

## Success Criteria

- [ ] All 31 components have documentation
- [ ] Docs follow existing template exactly
- [ ] Props/slots/events auto-extracted and accurate
- [ ] Purpose/examples are clear and realistic
- [ ] COMPONENT_CATALOG.md updated with all 60 components
- [ ] Single, clean commit to `doc-ai` branch
- [ ] Zero merge conflicts with main branch

---

## Timeline

- Script development: ~30 min
- Extraction + generation: ~5 min (automated)
- Review + refinement: ~30 min
- Catalog update + commit: ~10 min

**Total:** ~75 min, mostly parallel automation
