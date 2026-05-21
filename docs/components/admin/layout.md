# Layout Component

## Purpose
Root shell component for admin pages. Composes the sidebar, navbar (topbar), and main content area into a three-region shell. It listens to scroll events on the content wrapper and exposes a `-scrolled` CSS modifier when the user scrolls past 20 px, allowing the navbar to react visually. Page-level routes are rendered inside a `<router-view>` inside the content region.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Layout } from '@tray-tecnologia/design-system';
```

## Slots

| Slot | Description |
|------|-------------|
| sidebar | Content rendered inside the left sidebar region (typically the `Sidebar` component) |
| navbar | Content rendered inside the top navbar region (typically the `Topbar` or `SidebarHeader` component) |

## Usage Examples

```vue
<script setup lang="ts">
import { Layout, Sidebar, SidebarHeader } from '@tray-tecnologia/design-system';
</script>

<template>
  <Layout>
    <template #sidebar>
      <Sidebar :menus="menuItems" :is-active="isActive" :mobile-navigation-bar="mobileMenus">
        <template #logo>
          <SidebarHeader :actions-config="actionsConfig" logo-image="/logo.png" />
        </template>
      </Sidebar>
    </template>
    <template #navbar>
      <!-- optional top bar slot -->
    </template>
  </Layout>
</template>
```

## Styling
- Root element uses the class `ui-layout`; receives `-scrolled` when `scrollTop > 20`.
- Sidebar region: `ui-layout-sidebar`; navbar region: `ui-layout-navbar`; main area: `ui-layout-content`.
- Styles are defined in `Layout.scss`; adjust via CSS custom properties or SCSS overrides.

## A11y Notes
- The main content wrapper has `id="ui-layout-content"` which can be used as a skip-link target.
- Ensure each slotted region has its own landmark role (e.g., `<nav>` inside sidebar, `<header>` inside navbar).

## Related Components
- [`Sidebar`](./sidebar.md) — primary slot content for the sidebar region
- [`SidebarHeader`](./sidebar-header.md) — logo + action icons rendered at the top of the sidebar
- [`Topbar`](./topbar.md) — deprecated top navigation bar, may occupy the navbar slot
- [`Page`](./page.md) — page-level wrapper rendered inside the content region via router-view
