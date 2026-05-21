# Topbar Component

## Purpose
> **Deprecated** — This component is deprecated and will be removed in a future release. Prefer composing `SidebarHeader` inside the `Layout` sidebar slot instead.

Horizontal top navigation bar for older admin layouts. Renders a mobile menu toggle, a logo slot, a breadcrumb trail (with an optional back link), a slot for extra action buttons, and a dark mode toggle. It integrates with a `menu` injection to programmatically open/close the mobile sidebar.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Topbar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| slug | string | No | — | Identifier for the current app/context |
| backlink | `{ to: string }` | No | — | When provided, renders a back arrow breadcrumb item before the home link |
| breadcrumb | `{ to: string; name: string }[]` | No | — | Array of breadcrumb items rendered after the "Início" home link |
| notifications | any | No | — | Reserved for notification data (not rendered directly in current implementation) |
| dropdown | any[] | No | `[]` | Reserved for dropdown menu items |

## Slots

| Slot | Description |
|------|-------------|
| logo-mobile | Logo element displayed inside the mobile header row |
| topbar-actions | Extra action buttons rendered in the right side of the topbar (alongside the dark mode toggle) |

## Events

- `@toggleMenu` — Emitted when the mobile menu button is clicked; also calls `menu.toggle()` if injected
- `@toggleNotification` — Emitted when the notification icon is activated
- `@changeSchemeColor` — Emitted when the dark mode toggle is switched

## Usage Examples

```vue
<script setup lang="ts">
import { Topbar } from '@tray-tecnologia/design-system';

const breadcrumb = [
  { to: 'products', name: 'Products' },
  { to: 'product-edit', name: 'Edit' },
];
</script>

<template>
  <Topbar :breadcrumb="breadcrumb" @toggle-menu="onToggleMenu" @change-scheme-color="onThemeChange">
    <template #logo-mobile>
      <img src="/logo.svg" alt="Logo" height="24" />
    </template>
    <template #topbar-actions>
      <button>Notifications</button>
    </template>
  </Topbar>
</template>
```

## Styling
- Root element id: `ui-topbar`, class: `ui-topbar`; inner wrapper: `ui-topbar-wrapper`.
- Mobile menu button uses class `ui-topbar-menu`; mobile region uses `ui-topbar-mobile`.
- Styles are in `Topbar.scss`.

## A11y Notes
- The mobile menu toggle is a `<button>` element; it should have an accessible label via `aria-label="Open menu"` at the integration level.
- Breadcrumb items use the `Breadcrumb`/`BreadcrumbItem` components which render `<nav>` and `<ol>` semantics.

## Related Components
- [`SidebarHeader`](./sidebar-header.md) — preferred replacement for the topbar in new layouts
- [`ButtonDarkmode`](./button-darkmode.md) — embedded inside Topbar for theme switching
- [`Layout`](./layout.md) — outer shell; Topbar occupies the `navbar` slot
