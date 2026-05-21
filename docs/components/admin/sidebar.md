# Sidebar Component

## Purpose
Vertical navigation sidebar for admin dashboards. Renders a hierarchical menu list from a `menus` prop array, with support for nested sub-items (dropdown), "Coming soon" and "New" badges, captions, disabled states, and spacers. On mobile it also renders a `SidebarMobile` bottom navigation bar driven by the `mobileNavigationBar` prop. The component integrates with a `menu` Vue injection (`MenuProviderInterface`) for programmatic open/close of the mobile overlay.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Sidebar } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| menus | `SideBarItem[]` | Yes | — | Array of navigation items to render in the sidebar |
| isActive | `(item: SideBarItem, isOnlyChildren?: boolean) => boolean` | Yes | — | Function that returns `true` if a menu item should be marked active |
| menuOpen | boolean | No | — | Controls the open state of the sidebar (e.g., on mobile) |
| mobileNavigationBar | `SidebarMobileMenu[]` | Yes | — | Items for the bottom navigation bar on mobile |

### SideBarItem shape

| Field | Type | Description |
|-------|------|-------------|
| name | string | Display label |
| icon | IconType | Material icon name |
| to | string | Router-link destination (deprecated — prefer `href` or event) |
| href | string | External link href |
| nodes | `SideBarItem[]` | Sub-items rendered in a dropdown list |
| active | boolean | Forces active state |
| disabled | boolean | Disables the item |
| isNew | boolean | Shows a "Novo" news indicator badge |
| isComingSoon | boolean | Shows an "Em breve" badge |
| caption | string | Small caption text above the item |
| spacer | boolean | Adds a spacer gap before the item |
| dropdown | boolean | Set to `false` to prevent sub-items from rendering as a dropdown |

## Slots

| Slot | Description |
|------|-------------|
| logo | Rendered at the top of the sidebar (e.g., `SidebarHeader` with logo and action icons) |
| select-button | Rendered below the logo area (e.g., a store/tenant selector button) |
| top-content | Additional content block below the select button, above the menu list |
| footer | Content rendered at the bottom of the sidebar (e.g., user profile, help link) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| onClickItem | `(type: SideBarItemType, menuItem?: SideBarItem \| SidebarMobileMenu)` | Emitted on any menu item click; `type` is `'logo'`, `'node'`, `'sub'`, `'footer'`, or `'action'` |

## Usage Examples

```vue
<script setup lang="ts">
import { Sidebar, SidebarHeader } from '@tray-tecnologia/design-system';
import type { SideBarItem, SidebarMobileMenu } from '@tray-tecnologia/design-system';

const menus: SideBarItem[] = [
  { name: 'Dashboard', icon: 'dashboard', to: 'dashboard' },
  {
    name: 'Products',
    icon: 'inventory_2',
    nodes: [
      { name: 'List', to: 'products-list' },
      { name: 'Categories', to: 'categories' },
    ],
  },
  { name: 'Orders', icon: 'receipt_long', to: 'orders', isNew: true },
];

const mobileMenus: SidebarMobileMenu[] = [
  { icon: 'dashboard', title: 'Dashboard', type: 'node', to: 'dashboard' },
  { icon: 'menu', title: 'Menu', type: 'action' },
];

const isActive = (item: SideBarItem) => route.name === item.to;
</script>

<template>
  <Sidebar :menus="menus" :is-active="isActive" :mobile-navigation-bar="mobileMenus" @on-click-item="handleNav">
    <template #logo>
      <SidebarHeader :actions-config="actionsConfig" logo-image="/logo.png" />
    </template>
    <template #footer>
      <UserProfileCard />
    </template>
  </Sidebar>
</template>
```

## Styling
- Root element: `ui-sidebar`; menu list: `ui-sidebar-list -primary`; individual items: `ui-sidebar-item`.
- Active item receives `-active`; disabled items receive `-disabled`; spacer items receive `-spacer`.
- Sub-item links use class `ui-sidebar-link -sub`; styles defined in `Sidebar.scss`.
- An overlay div (`ui-sidebar-overlay`) is rendered for mobile, clicking it closes the menu.

## A11y Notes
- Navigation items render as `<ul>/<li>` lists; wrap the sidebar in a `<nav aria-label="Main navigation">` at the integration level.
- Disabled items have the `-disabled` class; also pass `aria-disabled="true"` on the item at the integration level if needed.
- "Em breve" and "Novo" badges are visual only; ensure screen-reader users still understand the item state.

## Related Components
- [`SidebarHeader`](./sidebar-header.md) — logo + quick action icons placed in the `logo` slot
- [`Layout`](./layout.md) — places `Sidebar` inside the `sidebar` slot
- [`HomeBar`](./home-bar.md) — welcome bar often placed above the sidebar menu in the `top-content` slot
