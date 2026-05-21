# Stats Group Component

## Purpose
A horizontal group of stat metrics rendered as a row of `StatsItem` components. Used in dashboard summaries and report headers to display multiple KPIs (e.g. total orders, revenue, visitors) side-by-side.

> **Deprecated** — This component is marked as deprecated and will be removed in a future version. Avoid using it in new features.

## Status
⚠️ Deprecated — Do not use in new projects

## Import
```ts
import { StatsGroup } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| infos | StatsGroupPropsInfo[] | No | — | Array of stat objects to render. Each item has: `label` (string, metric name), `value` (string, metric value), `text` (string, supplementary description), and optional `primaryAction` (array of link/button configs). When omitted, the default slot is used instead. |

## Slots

| Slot | Description |
|------|-------------|
| default | Fallback slot when `infos` is not provided, or to append extra items after the auto-rendered ones. Accepts `StatsItem` components or custom markup. |

## Usage Examples

### Data-driven via `infos` prop
```vue
<script setup lang="ts">
import { StatsGroup } from '@tray-tecnologia/design-system';

const stats = [
  { label: 'Pedidos', value: '1.234', text: 'nos últimos 30 dias' },
  { label: 'Receita', value: 'R$ 45.678', text: 'nos últimos 30 dias' },
  {
    label: 'Visitantes',
    value: '8.901',
    text: 'nos últimos 30 dias',
    primaryAction: [{ text: 'Ver relatório', href: '/reports/visitors' }],
  },
];
</script>

<template>
  <StatsGroup :infos="stats" />
</template>
```

### Slot-based composition
```vue
<script setup lang="ts">
import { StatsGroup, StatsItem } from '@tray-tecnologia/design-system';
</script>

<template>
  <StatsGroup>
    <StatsItem value="42" label="Produtos ativos" text="em estoque" />
    <StatsItem value="7" label="Aguardando revisão" text="rascunhos" />
  </StatsGroup>
</template>
```

## Styling
- Root element uses the class `stats-group`; the inner wrapper uses `stats-group-wrapper`.
- Items are rendered side-by-side; layout is controlled by `StatsGroup.scss`.
- No custom CSS variables are exposed at this level.

## A11y Notes
- There is no ARIA landmark or role applied to the group container. Consider wrapping with `<section>` and a heading if the stat group represents a distinct content region.
- Individual `StatsItem` components handle their own label/value association.

## Related Components
- [`stats-item`](/docs/components/ui/stats-item.md) — individual stat metric used inside this group
