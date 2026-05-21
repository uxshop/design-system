# Platform Select Component

## Purpose
A tab-based selector that lets users switch between multiple platforms (e.g., sales channels, integrations). Each platform is rendered as a `TabItem` with an icon and label. Platforms can optionally display a `Badge` for status indicators such as "Beta" or "Em breve". Disabled platforms receive a CSS class that visually mutes them. The active tab is initialised from the first platform that has `active: true`, falling back to the first item in the list.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PlatformSelect } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| platformsList | IPlatform[] | Yes | - | Array of platform objects defining the tabs. Each item requires `name`, `key`, `active`, and `url`; `icon`, `badgeStatus`, and `disabled` are optional. |
| badgeConfig | Partial<BadgeConfigType> | No | - | Overrides the default badge appearance for `'beta'` and `'comingSoon'` statuses. Merged with defaults: `beta` → highlight variant; `comingSoon` → default variant. |

### IPlatform shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Display label for the tab. |
| key | string | Yes | Unique identifier used as the tab index. |
| active | boolean | Yes | Whether this platform is the initially active tab. |
| url | string | Yes | URL associated with the platform (used by the consumer). |
| icon | IconType | No | Material icon name displayed above the label. |
| badgeStatus | `'beta' \| 'comingSoon'` | No | Shows a badge on the tab when set. |
| disabled | boolean | No | Applies a `-item-disabled` class to visually mute the tab. |

## Events

- `@change:platform` — Emitted when a tab is clicked, with the full `IPlatform` object as the payload.

## Usage Examples

```vue
<script setup lang="ts">
import { PlatformSelect } from '@tray-tecnologia/design-system';
import type { IPlatform } from '@tray-tecnologia/design-system';

const platforms: IPlatform[] = [
  { name: 'Loja Online', key: 'store', active: true, url: '/store', icon: 'storefront' },
  { name: 'Marketplace', key: 'marketplace', active: false, url: '/marketplace', icon: 'shopping_bag', badgeStatus: 'beta' },
  { name: 'App', key: 'app', active: false, url: '/app', icon: 'phone_android', badgeStatus: 'comingSoon', disabled: true },
];

function onPlatformChange(platform: IPlatform) {
  console.log('Switched to:', platform.name);
}
</script>

<template>
  <PlatformSelect
    :platforms-list="platforms"
    @change:platform="onPlatformChange" />
</template>
```

### Custom badge labels

```vue
<template>
  <PlatformSelect
    :platforms-list="platforms"
    :badge-config="{ beta: { variant: 'warning', label: 'Novo' } }"
    @change:platform="onPlatformChange" />
</template>
```

## Styling
- Root renders a `Tab` component with class `tab-container`.
- Each `TabItem` has class `tab-item-btn` and gains `-item-disabled` when `disabled` is true.
- Icon, badge, and label are wrapped in `tab-item-container` and `badge-container` divs for layout control.

## A11y Notes
- Tab navigation is inherited from the `Tab` / `TabItem` components, which should implement `role="tablist"` and `role="tab"` semantics.
- Disabled platforms are visually muted via CSS only — add `aria-disabled="true"` and a click guard in the parent if keyboard users must be blocked.
- Badge labels ("Beta", "Em breve") are visible text, so they are read by screen readers alongside the tab label.

## Related Components
- `Tab` / `TabItem` — the underlying tab primitives used for rendering.
- `Badge` — used to display status labels on individual platforms.
- `Icon` — used to render the platform icon inside each tab.
