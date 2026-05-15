# Card Component

## Purpose
Container for grouped content with optional header, footer, and spacing. Versatile layout component for organizing information.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Card } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | No | - | [TODO: Add description] |
| titleMuted | string | No | - | [TODO: Add description] |
| caption | string | No | - | [TODO: Add description] |
| dropdown | boolean | No | - | [TODO: Add description] |
| dropdownLabel | string | No | - | [TODO: Add description] |
| dropdownClosed | boolean | No | - | [TODO: Add description] |
| fullHeight | boolean | No | - | [TODO: Add description] |
| fullWidth | boolean | No | - | [TODO: Add description] |
| noBorder | boolean | No | - | [TODO: Add description] |
| noPadding | boolean | No | - | [TODO: Add description] |
| closeCaption | string | No | - | [TODO: Add description] |
| gray | boolean | No | - | [TODO: Add description] |
| last | boolean | No | - | [TODO: Add description] |
| loading | boolean | No | - | [TODO: Add description] |
| transparent | boolean | No | - | [TODO: Add description] |
| plain | boolean | No | - | [TODO: Add description] |
| actions | Action[] | No | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| header | [TODO: Add description] |
| caption | [TODO: Add description] |
| header | [TODO: Add description] |
| close | [TODO: Add description] |
| header | [TODO: Add description] |
| footer | [TODO: Add description] |

## Events

- `@toggleShowBody` — [TODO: Add description]
- `@open` — [TODO: Add description]
- `@close` — [TODO: Add description]

## Usage Examples

### Simple Card
```vue
<template>
  <Card>
    Card content goes here
  </Card>
</template>

<script setup>
import { Card } from '@tray-tecnologia/design-system';
</script>
```

### Card with Header and Footer
```vue
<template>
  <Card>
    <template #header>
      <h2>Card Title</h2>
    </template>
    Main content area
    <template #footer>
      <Button label="Action" />
    </template>
  </Card>
</template>
```

### Card Grid Layout
```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <Card v-for="item in items" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </Card>
  </div>
</template>
```

## Styling
Card uses default white background with border and shadow. Padding applied to main content slot. Customize with CSS custom property `--card-background`, `--card-border-color`. Props control appearance: `gray`, `noBorder`, `transparent`, `plain`.

## A11y Notes
Card itself is not interactive. Make content within interactive elements (buttons, links) keyboard accessible. Use heading hierarchy within card. Dropdown functionality should be keyboard operable.

## Related Components
- [Stack](#stack) — For vertical spacing
- [Grid](#grid) — For multi-column layouts
- [Highlight Card](#highlight-card) — For featured content
