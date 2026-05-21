# Sidebar Header Component

## Purpose
Header section displayed at the top of the sidebar. Renders a clickable logo (as an `<img>` or inline SVG) on the left and optional icon buttons — quick search and notifications — on the right. It is the recommended replacement for the deprecated `Topbar` component in modern admin layouts.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { SidebarHeader } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| height | string | No | `'32px'` | CSS height of the logo element |
| logoImage | string | No | — | URL of the logo image; renders an `<img>` tag |
| logoSvg | string | No | — | Raw SVG string for the logo; rendered via `v-html` |
| actionsConfig | `{ notification: { show: boolean; nameClass: string }; quickSearch: { show: boolean } }` | Yes | — | Controls visibility and CSS class of the notification icon and quick search icon |

## Events

- `@onQuickSearchClick` — Emitted when the search icon button is clicked; use to open a quick search modal or panel
- `@onLogoClick` — Emitted when the logo area is clicked; use to navigate to the home route

## Usage Examples

### With image logo and both actions enabled
```vue
<script setup lang="ts">
import { SidebarHeader } from '@tray-tecnologia/design-system';

const actionsConfig = {
  notification: { show: true, nameClass: 'has-notifications' },
  quickSearch: { show: true },
};
</script>

<template>
  <SidebarHeader
    logo-image="/assets/logo.svg"
    height="36px"
    :actions-config="actionsConfig"
    @on-logo-click="router.push({ name: 'home' })"
    @on-quick-search-click="openSearch" />
</template>
```

### With inline SVG logo and notifications hidden
```vue
<template>
  <SidebarHeader
    :logo-svg="svgString"
    :actions-config="{ notification: { show: false, nameClass: '' }, quickSearch: { show: true } }"
    @on-logo-click="goHome" />
</template>
```

## Styling
- Root class: `sidebar-header-container`; logo wrapper: `.logo`; icon cluster: `.sidebar-header-container-icons`.
- Logo height is controlled via the `height` prop using a CSS `v-bind` binding.
- In dark mode (`[data-theme='dark']`), the logo automatically inverts to white via `filter: brightness(0) invert(1)`.

## A11y Notes
- The logo `<img>` should include a meaningful `alt` attribute at the integration level (pass via `logoImage` context or wrap in a slot).
- The quick search and notification buttons inherit accessible labels from `IconButton`; verify icon names are descriptive.

## Related Components
- [`Sidebar`](./sidebar.md) — `SidebarHeader` is placed in the `logo` slot of `Sidebar`
- [`Layout`](./layout.md) — outer shell that hosts `Sidebar`
- [`QuickSearch`](./quick-search.md) — typically opened in response to `@onQuickSearchClick`
