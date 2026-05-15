# Breadcrumb Component

## Purpose
Navigation breadcrumb trail showing user location within site hierarchy. Each segment is a clickable link.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Breadcrumb } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| to | Record<string, unknown> | Yes | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Usage Examples

### Basic Breadcrumb
```vue
<template>
  <Breadcrumb :to="{ name: 'home' }">
    Home
  </Breadcrumb>
</template>

<script setup>
import { Breadcrumb } from '@tray-tecnologia/design-system';
</script>
```

### Breadcrumb Trail
```vue
<template>
  <div class="flex items-center gap-2">
    <Breadcrumb :to="{ name: 'home' }">Home</Breadcrumb>
    <span>/</span>
    <Breadcrumb :to="{ name: 'products' }">Products</Breadcrumb>
    <span>/</span>
    <span>Details</span>
  </div>
</template>
```

## Styling
Breadcrumb uses `/` as separator by default. Links inherit text color from theme. Current item (last) is bold and non-interactive. Customize separator with CSS variable `--breadcrumb-separator`.

## A11y Notes
Use `aria-label='breadcrumb'` on wrapper. Current item has `aria-current='page'`. Each link uses standard `<a>` or `<router-link>` tag with proper href for keyboard navigation.

## Related Components
- [Link](#link) — Individual navigation links
- [Navigation](#navigation) — Full navigation components
