# Spinner Component

## Purpose
Loading indicator spinner. Used to show that content is being loaded or processed.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Spinner } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | number | No | 24 | Spinner size in pixels |
| color | string | No | 'currentColor' | Spinner color (CSS value) |
| border | number | No | 2 | Border width in pixels |

## Slots
None

## Events
None

## Usage Examples

### Basic Spinner
```vue
<template>
  <Spinner />
</template>

<script setup>
import { Spinner } from '@tray-tecnologia/design-system';
</script>
```

### Custom Size and Color
```vue
<template>
  <div>
    <Spinner :size="16" />
    <Spinner :size="32" color="#FF0000" />
    <Spinner :size="48" color="var(--ds-color-primary)" />
  </div>
</template>
```

### In Loading State
```vue
<template>
  <div v-if="isLoading" class="loading-container">
    <Spinner :size="32" />
    <p>Loading...</p>
  </div>
</template>
```

## Styling

### CSS Classes
- `.ui-spinner` — Spinner element
- `.ui-spinner-ring` — Rotating ring

### Theme Variables
Use CSS custom properties to control colors via theme.

## A11y Notes
- Use alongside text "Loading..." or similar
- Announce loading state to screen readers
- Provide alternative content description
- Not focusable (decorative animation)

## Related Components
- [Button](./button.md) — Has built-in loading state with spinner

## Deprecations
None. This component is stable.
