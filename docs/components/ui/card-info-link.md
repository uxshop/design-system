# Card Info Link Component

## Purpose
Interactive card styled as a link, typically used in product/feature showcases. Navigates to detail page on click.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { CardInfoLink } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| iconName | string | Yes | - | [TODO: Add description] |
| title | string | No | - | [TODO: Add description] |
| description | string | No | - | [TODO: Add description] |
| highlighted | boolean | No | - | [TODO: Add description] |
| linkLabel | string | No | - | [TODO: Add description] |
| href | string | No | - | [TODO: Add description] |
| routeName | string | No | - | [TODO: Add description] |

## Events

- `@onClickCard` — [TODO: Add description]

## Usage Examples

### Feature Card
```vue
<template>
  <CardInfoLink
    title="Advanced Analytics"
    description="Real-time insights and custom reports"
    href="/features/analytics"
    icon-name="chart"
  />
</template>

<script setup>
import { CardInfoLink } from '@tray-tecnologia/design-system';
</script>
```

### In Feature Grid
```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <CardInfoLink
      v-for="feature in features"
      :key="feature.id"
      :title="feature.name"
      :description="feature.desc"
      :href="feature.url"
      :icon-name="feature.icon"
    />
  </div>
</template>
```

## Styling
On hover, applies subtle lift effect and color change. Icon and title use semantic colors. Border-radius matches design tokens (lg by default).

## A11y Notes
Component renders as `<a>` tag for semantics. Title should be descriptive. Icon is decorative (aria-hidden). Entire card is clickable with proper focus states.

## Related Components
- [Card](#card) — Static container
- [Link](#link) — Individual text links
- [Grid](#grid) — Multi-column layouts
