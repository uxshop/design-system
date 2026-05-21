# Badge Component

## Purpose
Inline label displaying status or metadata. Lightweight, non-interactive component for categorization or counts.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Badge } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | No | - | [TODO: Add description] |
| pill | boolean | No | - | [TODO: Add description] |
| size | Size | No | - | [TODO: Add description] |
| noWrap | boolean | No | - | [TODO: Add description] |
| variant | BadgeVariants | No | - | Permite atribuir uma variação de cor ao badge. Quando definido com `custom` adiciona uma classe `-va... |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Usage Examples

### Basic Badge
```vue
<template>
  <Badge label="New" />
</template>

<script setup>
import { Badge } from '@tray-tecnologia/design-system';
</script>
```

### Badge with Variant
```vue
<template>
  <div class="flex gap-2">
    <Badge label="New" variant="primary" />
    <Badge label="5" variant="danger" />
    <Badge label="Draft" variant="warning" />
  </div>
</template>
```

### Badge in a List Item
```vue
<template>
  <ListGroup>
    <ListGroup.Item>
      Feature release
      <Badge label="v1.2.0" variant="success" />
    </ListGroup.Item>
  </ListGroup>
</template>
```

## Styling
Badge size and color controlled by variant prop and size prop. Available variants: primary, success, warning, danger, info. Can be styled with `.badge--{variant}` classes. Pill prop creates fully rounded badge.

## A11y Notes
Badge is a presentational component. Use it to supplement content, not replace text labels. Ensure color is not the only indicator (combine with text or icons). Label text should have sufficient contrast against background.

## Related Components
- [Tag](#tag) — Similar for removable labels
- [Highlight Card](#highlight-card) — For larger status displays
