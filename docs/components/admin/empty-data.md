# Empty Data Component

## Purpose
An empty-state placeholder displayed when a list, table, or section has no content to show. Renders an optional icon, a short message, a supplementary caption, and one or more call-to-action buttons. Commonly used inside tables, panels, and search results to guide the user toward a next action.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { EmptyData } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| label | string | No | — | Primary message text shown when no default slot content is provided. |
| icon | string | No | — | Material icon name displayed above the message (e.g. `"search"`, `"inbox"`). |
| caption | string | No | — | Secondary descriptive text shown below the main message when no `caption` slot is provided. |
| iconType | `'outlined'` \| `'filled'` \| `'rounded'` \| `'twotone'` | No | — | Variant style for the Material icon. |
| link | boolean | No | `false` | Applies the `ui-empty-data-link` modifier class, useful when the entire empty-state area should be styled as a clickable zone. |
| actions | ActionButton | No | — | Array of action button configs rendered below the caption. Each item needs at least `label` and `onAction`. |
| noBorder | boolean | No | `false` | Removes the default border surrounding the empty-state area (omits the `-border` class). |

## Slots

| Slot | Description |
|------|-------------|
| default | Overrides the `label` prop with custom message markup. |
| caption | Overrides the `caption` prop with custom supplementary content (e.g. a link or formatted text). Only rendered when the `caption` prop is also set. |

## Usage Examples

### Minimal — label only
```vue
<script setup lang="ts">
import { EmptyData } from '@tray-tecnologia/design-system';
</script>

<template>
  <EmptyData label="Nenhum produto encontrado." />
</template>
```

### With icon, caption, and action
```vue
<template>
  <EmptyData
    icon="search_off"
    iconType="outlined"
    label="Nenhum resultado para sua busca."
    caption="Tente usar termos diferentes ou limpe os filtros aplicados."
    :actions="[{ label: 'Limpar filtros', onAction: clearFilters }]" />
</template>
```

### No border, slot-based message
```vue
<template>
  <EmptyData no-border>
    Ainda não há pedidos neste período.
    <template #caption>
      <a href="/orders/create">Criar pedido manualmente</a>
    </template>
  </EmptyData>
</template>
```

## Styling
- Root element uses `ui-empty-data`, with `-border` added when `noBorder` is false (default) and `ui-empty-data-link` when `link` is true.
- Icon, text, and caption each have dedicated wrapper classes (`ui-empty-data-icon`, `ui-empty-data-text`, `ui-empty-data-caption`, `ui-empty-data-actions`).
- Styles are defined in `EmptyData.scss`.

## A11y Notes
- Use descriptive `label` text that explains both what is missing and why, to help screen reader users understand the state.
- Action buttons receive focus naturally; ensure `onAction` handlers are keyboard-operable.
- The icon is purely decorative — it has no `aria-hidden` attribute currently, so consider adding it if the label already conveys the meaning.

## Related Components
- [`button`](/docs/components/ui/button.md) — action buttons rendered inside the empty state
- [`icon`](/docs/components/ui/icon.md) — icon displayed above the message
- [`panel-skeleton`](/docs/components/admin/panel-skeleton.md) — loading placeholder shown before content resolves
