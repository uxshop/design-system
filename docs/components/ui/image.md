# Image Component

## Purpose
Optimized image with fallback and lazy loading support.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Image } from '@tray-tecnologia/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | Image URL |
| alt | string | - | Alt text |
| lazy | boolean | true | Lazy load image |
| fallback | string | - | Fallback image URL |

## Events
| Event | Description |
|-------|-------------|
| load | Image loaded |
| error | Load error |

## Styling
- `.ui-image` — Image element
- `.ui-image.-lazy` — Lazy loaded

## A11y Notes
- Alt text is required
- Descriptive alt for meaningful images
- Empty alt for decorative images

## Related Components
- [Avatar](./avatar.md) — User image variant

## Deprecations
None. This component is stable.
