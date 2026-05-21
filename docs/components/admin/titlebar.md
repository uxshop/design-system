# Titlebar Component

## Purpose
Page-level heading bar that renders a title, an optional back-arrow button, and one or more action buttons. A single secondary action is rendered as a standalone button; two or more are collapsed into a "Mais ações" dropdown on desktop or an icon-only dropdown on mobile. The primary action uses the `highlight` button variant by default. The component is responsive: on viewports ≤ 768 px wide, button labels are hidden when a `leadingIcon` is present.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Titlebar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string \| null | No | — | Heading text displayed in the title bar |
| to | Record<string, any> | No | — | Router target (passed through to nav elements) |
| backlink | { to: string } | No | — | When provided, adds an `arrow_back` button that navigates to the named route |
| primaryAction | ActionButton | No | — | Primary CTA button; defaults to `highlight` variant |
| secondaryActions | ActionButton[] | No | — | Secondary actions; one renders as a button, two or more render as a dropdown |
| groupActions | { name: string; actions: ActionButton[] } | No | — | Grouped set of actions for advanced layouts |

## Slots

| Slot | Description |
|------|-------------|
| titlebar-subtitle | Optional content rendered below the title text (e.g., a status badge or description) |

## Usage Examples

### Title with primary and secondary actions
```vue
<script setup lang="ts">
import { Titlebar } from '@tray-tecnologia/design-system';

const primary = { label: 'Create', onAction: () => {} };
const secondary = [
  { label: 'Export', leadingIcon: 'download', onAction: () => {} },
  { label: 'Import', leadingIcon: 'upload', onAction: () => {} },
];
</script>

<template>
  <Titlebar
    title="Products"
    :primary-action="primary"
    :secondary-actions="secondary" />
</template>
```

### Title with back link and subtitle slot
```vue
<template>
  <Titlebar title="Edit Product" :backlink="{ to: 'products' }">
    <template #titlebar-subtitle>
      <span class="badge">Draft</span>
    </template>
  </Titlebar>
</template>
```

## Styling
- Root class: `titlebar`; content region: `titlebar-content`; actions region: `titlebar-actions`.
- Primary action wraps in `titlebar-actions-primary`; secondary wraps in `titlebar-actions-secondary`.
- Styles live in `Titlebar.scss`; responsive breakpoint is 768 px.

## A11y Notes
- The title is rendered as an `<h2>` — ensure it sits within a correct heading hierarchy on the page.
- The back-link button includes a visible `arrow_back` icon provided by the `Button` component.
- On mobile, buttons with a `leadingIcon` hide their label; ensure the icon is descriptive enough or add `aria-label` via `class` on the action object.

## Related Components
- [`Page`](./page.md) — renders `Titlebar` automatically via its `title`/action props
- [`Button`](../ui/button.md) — used internally for primary and secondary action buttons
- [`Dropdown`](../ui/dropdown.md) — used internally when there are two or more secondary actions
