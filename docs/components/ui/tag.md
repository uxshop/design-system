# Tag Component

## Purpose
Categorical label or badge. Display single or multiple tags with optional close action.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Tag } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | Yes | - | Tag text |
| variant | string | No | 'default' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Tag size |
| closable | boolean | No | false | Show close button |
| disabled | boolean | No | false | Disable interactions |

## Slots

| Slot | Description |
|------|-------------|
| default | Tag text (overrides label) |
| icon | Icon element |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| close | - | Fired when close button clicked |

## Usage Examples

### Basic Tag
```vue
<template>
  <Tag label="Component" />
</template>
```

### Closable Tag
```vue
<template>
  <Tag label="Removable" closable @close="handleClose" />
</template>

<script setup>
const handleClose = () => {
  console.log('Tag closed');
};
</script>
```

### Multiple Tags
```vue
<template>
  <div class="tag-group">
    <Tag label="Vue" />
    <Tag label="JavaScript" />
    <Tag label="TypeScript" closable />
  </div>
</template>
```

## Styling

### CSS Classes
- `.ui-tag` — Tag element
- `.ui-tag.-closable` — With close button
- `.ui-tag.-sm` — Small size
- `.ui-tag.-md` — Medium size
- `.ui-tag.-lg` — Large size

## A11y Notes
- Close button has proper aria-label
- Keyboard accessible (Enter/Space closes)
- Color not sole indicator (use text + icon)
- Sufficient contrast ratio

## Related Components
- [FormTags](./form-tags.md) — Tag input field
- [Badge](./news-indicator.md) — Similar component

## Deprecations
None. This component is stable.
