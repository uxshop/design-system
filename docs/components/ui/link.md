# Link Component

## Purpose
Text link with optional icon support. Semantic alternative to Button for navigation.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Link } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| href | string | Yes | - | Link URL |
| label | string | No | - | Link text |
| icon | string | No | - | Icon name |
| external | boolean | No | false | Open in new tab |
| underline | boolean | No | true | Show underline |
| disabled | boolean | No | false | Disable link |
| target | '_blank' \| '_self' | No | - | Link target |

## Slots
| Slot | Description |
|------|-------------|
| default | Link text (overrides label) |

## Events
| Event | Description |
|-------|-------------|
| click | Link clicked |

## Usage Examples

### Basic Link
```vue
<template>
  <Link href="/about" label="About Us" />
</template>
```

### With Icon
```vue
<template>
  <Link href="/docs" label="Documentation" icon="book" />
</template>
```

### External Link
```vue
<template>
  <Link href="https://example.com" external label="Visit Site" />
</template>
```

## Styling
- `.ui-link` — Link element
- `.ui-link.-underline` — Underline variant
- `.ui-link.-disabled` — Disabled state

## A11y Notes
- Uses semantic `<a>` tag
- External links announced
- Keyboard accessible (Tab, Enter)
- Focus visible indicator provided
- Disabled state conveyed to screen readers

## Related Components
- [Button](./button.md) — Button alternative
- [RouterLink](./router-link.md) — Vue Router integration

## Deprecations
None. This component is stable.
