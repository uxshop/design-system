# Page Actions Component

## Purpose
A footer action bar placed at the bottom of a page form or detail view. It separates secondary actions (left-aligned, e.g. Cancel / Delete) from a single primary action (right-aligned, always rendered with the `success` variant and `type="submit"`). Use it to provide consistent save/cancel affordances across admin pages.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { PageActions } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| primaryAction | ActionButton | No | - | The main submit button (right-aligned, `success` variant, `type="submit"`). Supports `label`, `leadingIcon`, `to`, and `onAction`. |
| secondaryActions | ActionButton[] | No | - | Zero or more secondary buttons (left-aligned). Each item can specify `label`, `variant`, and `onAction`. |

## Usage Examples

```vue
<script setup lang="ts">
import { PageActions } from '@tray-tecnologia/design-system';
import { useRouter } from 'vue-router';

const router = useRouter();

const primaryAction = {
  label: 'Salvar',
  leadingIcon: 'save',
  onAction: () => saveForm(),
};

const secondaryActions = [
  { label: 'Cancelar', variant: 'plain', onAction: () => router.back() },
  { label: 'Excluir',  variant: 'critical', onAction: () => deleteItem() },
];
</script>

<template>
  <PageActions
    :primary-action="primaryAction"
    :secondary-actions="secondaryActions" />
</template>
```

### Primary action only

```vue
<template>
  <PageActions :primary-action="{ label: 'Confirmar' }" />
</template>
```

## Styling
- Renders as a flex row with a top border (`border-top: solid 1px var(--border-color)`) and 20px padding/margin at the top.
- Secondary buttons are grouped on the left with an 8px gap between them.
- The primary button group has `margin-left: auto` to push it to the right edge.
- No width constraints — the bar stretches to its container width.

## A11y Notes
- The primary button sets `type="submit"`, so it works correctly inside a `<form>` element for keyboard-driven form submission.
- Button labels must be descriptive — avoid generic labels like "OK" without surrounding context.
- Destructive secondary actions (e.g., Delete) should use `variant="critical"` so their visual weight signals danger to all users.

## Related Components
- [`Savebar`](./savebar.md) — sticky top-of-page save bar for unsaved-changes workflows.
- [`Titlebar`](./titlebar.md) — page header that may also expose primary/secondary action buttons.
- [`Page`](./page.md) — full-page layout wrapper that hosts both a `Titlebar` and a `PageActions` area.
