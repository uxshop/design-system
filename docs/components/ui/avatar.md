# Avatar Component

## Purpose
Display user image or initials. Used in user profiles, comments, and team displays.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Avatar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| src | string | No | - | Image URL |
| alt | string | No | '' | Image alt text |
| name | string | No | - | Name for initials fallback |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Avatar size |
| shape | 'circle' \| 'square' | No | 'circle' | Avatar shape |
| color | string | No | - | Background color for initials |

## Slots

| Slot | Description |
|------|-------------|
| default | Custom content (overrides image/initials) |

## Events
None

## Usage Examples

### With Image
```vue
<template>
  <Avatar src="https://example.com/user.jpg" alt="John Doe" />
</template>
```

### With Initials
```vue
<template>
  <Avatar name="John Doe" size="lg" />
</template>
```

### Square Shape
```vue
<template>
  <Avatar 
    name="Jane Smith" 
    shape="square" 
    color="var(--ds-color-primary)"
  />
</template>
```

## Styling

### CSS Classes
- `.ui-avatar` — Avatar element
- `.ui-avatar.-circle` — Circle shape
- `.ui-avatar.-square` — Square shape
- `.ui-avatar.-sm` — Small size
- `.ui-avatar.-md` — Medium size
- `.ui-avatar.-lg` — Large size

## A11y Notes
- Image has proper alt text
- Initials are readable with sufficient contrast
- Color not sole indicator of user
- Works with screen readers

## Related Components
- [Image](./image.md) — Image component
- [Button](./button.md) — User profile button

## Deprecations
None. This component is stable.
