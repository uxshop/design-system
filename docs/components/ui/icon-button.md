# IconButton Component

## Purpose
Icon-only button variant. Used for compact UI controls without text labels.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { IconButton } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| icon | string | Yes | - | Icon name |
| variant | string | No | 'default' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Button size |
| disabled | boolean | No | false | Disable button |
| loading | boolean | No | false | Show spinner |

## Slots
| Slot | Description |
|------|-------------|
| default | Custom icon element |

## Events
| Event | Description |
|-------|-------------|
| click | Button clicked |

## Usage Examples

### Basic Icon Button
```vue
<template>
  <IconButton icon="settings" @click="openSettings" />
</template>
```

### With Variant
```vue
<template>
  <div>
    <IconButton icon="trash" variant="danger" />
    <IconButton icon="download" variant="primary" />
  </div>
</template>
```

## Styling
- `.ui-icon-button` — Icon button
- `.ui-icon-button.-sm` — Small
- `.ui-icon-button.-md` — Medium
- `.ui-icon-button.-lg` — Large

## A11y Notes
- Must have `aria-label` for screen reader
- Icon meaningful and clear
- Keyboard accessible (Enter/Space)
- Focus indicator visible
- Disabled state announced

## Related Components
- [Button](./button.md) — Text button variant
- [Icon](./icon.md) — Icon component

## Deprecations
None. This component is stable.
