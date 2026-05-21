# User Profile Card Component

## Purpose
A dropdown-based user profile widget designed for admin navigation bars and headers. It displays a user avatar (or initials fallback), an optional caption, and an optional label above the button. Clicking the button opens a `Dropdown` menu populated from the `dropdown` prop array, which supports navigation links (`to`), external links (`href`), action buttons, and dividers. An additional `user-links` slot allows injecting extra items at the top of the dropdown.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { UserProfileCard } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| user | UserCard | Yes | - | User object with `name` (string) and optional `image.src` (avatar URL). |
| caption | string | No | - | Secondary text rendered below the user name inside the trigger button (e.g. role or store name). |
| dropdown | UserProfileCardPropsDropdownItem[] | No | - | Array of dropdown menu items. Each item can have `text`, `caption`, `icon`, `to` (router link), `href` (external link), or `onAction` (click handler). An item with no `text` renders as a divider. |
| label | string | No | - | Small label rendered above the trigger button (e.g. "Loja atual"). |
| dropUp | boolean | No | `false` | When `true`, the dropdown opens upward instead of downward. |

## Slots

| Slot | Description |
|------|-------------|
| user-links | Injected at the top of the dropdown, before the `dropdown` prop items. Useful for custom user-specific links. |

## Usage Examples

```vue
<script setup lang="ts">
import { UserProfileCard } from '@tray-tecnologia/design-system';

const user = {
  name: 'Maria Silva',
  image: { src: 'https://example.com/avatar.jpg' },
};

const menuItems = [
  { text: 'Minha conta', to: '/account', icon: 'person' },
  { text: 'Configurações', to: '/settings', icon: 'settings' },
  { text: '' }, // divider
  { text: 'Sair', onAction: () => logout(), icon: 'logout' },
];
</script>

<template>
  <!-- Basic usage -->
  <UserProfileCard :user="user" :dropdown="menuItems" caption="Administrador" />

  <!-- With label and drop-up -->
  <UserProfileCard :user="user" :dropdown="menuItems" label="Conta" drop-up />

  <!-- With injected slot links -->
  <UserProfileCard :user="user">
    <template #user-links>
      <a href="/profile">Ver perfil</a>
    </template>
  </UserProfileCard>
</template>
```

## Styling
Styled via `UserProfileCard.scss` and `UserButton.scss`. The dropdown items use design-system tokens (`--s-typography-label-medium`, `--s-color-content-default`, `--s-spacing-quark`). The trigger button avatar falls back to styled initials when no image is provided.

## A11y Notes
The underlying `Dropdown` component handles `aria-expanded` and keyboard navigation. The trigger button should always receive a visible label through the user name or `caption`. Icons in menu items are decorative and paired with visible text.

## Related Components
- `Dropdown` / `DropdownItem` / `DropdownItemButton` / `DropdownDivider` — used internally for the menu
- `UserButton` — the avatar trigger button, also exported from the same module
