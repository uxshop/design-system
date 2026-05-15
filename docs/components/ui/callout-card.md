# Callout Card Component

## Purpose
Highlighted content block for drawing attention to important information, tips, or warnings. Similar to alert but self-contained.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { CalloutCard } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | [TODO: Add description] |
| icon | string | No | - | [TODO: Add description] |
| primaryAction | ActionButton | No | - | [TODO: Add description] |
| justifyCardActions | string | No | - | [TODO: Add description] |
| bgColorIconPrimary | boolean | No | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| append | [TODO: Add description] |

## Usage Examples

### Tip Callout
```vue
<template>
  <CalloutCard title="Pro Tip">
    You can drag and drop files directly into the uploader
  </CalloutCard>
</template>

<script setup>
import { CalloutCard } from '@tray-tecnologia/design-system';
</script>
```

### Warning Callout
```vue
<template>
  <CalloutCard
    title="Data Loss Warning"
    icon="alert-triangle"
  >
    This action cannot be undone. Make sure you have a backup.
  </CalloutCard>
</template>
```

## Styling
Rounded corners and subtle shadow included by default. Icon slot available for custom icons. Background and border color controlled by component theme.

## A11y Notes
Use semantic variant colors. Title should use `<h3>` for proper heading hierarchy. Content inside should have sufficient color contrast.

## Related Components
- [Alert](#alert) — For dismissible messages
- [Highlight Card](#highlight-card) — For featured content
