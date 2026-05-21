# Table List Component

## Purpose
**Deprecated** — use `IndexTable` instead. A full-featured, opinionated list view that wraps a data table with built-in pagination, search, tabs, filter sidebar, bulk actions, sorting, and skeleton loading. It manages its own query-param state (synced to the URL and `localStorage`), calls a service object to fetch rows, and orchestrates all inner sub-components automatically via a shared reactive `state` object.

## Status
⚠️ Deprecated — Use `IndexTable` for new projects

## Import
```ts
import { TableList } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| config | ITableListConfig | Yes | — | Configuration object that drives the entire component (service, actions, filters, pagination defaults, etc.). See `ITableListConfig` below. |
| filters | any | No | — | Additional filter definitions passed down to the filter sidebar. |
| placeholder | string | No | `''` | Placeholder text for the search input (can also be set via `config.placeholder`). |
| to | any | No | — | `router-link` `to` prop forwarded to each table row for row-level navigation. |

### ITableListConfig key fields

| Field | Type | Description |
|-------|------|-------------|
| service | object | API service with `get`, `update`, `delete` methods. |
| queryParams | object | Default query params merged with `{ sort: '-id', page: '1', limit: 25 }`. |
| actions | string[] | Row action buttons shown in bulk: `'duplicate'`, `'active'`, `'remove'`. |
| empty | string | Message shown when there are no rows and no active filters. |
| filters | any | Filter definitions rendered in the filter sidebar. |
| sortable | any | Sorting options for `TableListNavSortable`. |
| bulk | TBulkActions | Custom bulk-action buttons (label + callback). |
| hideCheckbox | boolean | Hides the row selection checkboxes. |
| hideTabsFilter | boolean | Hides the tabs filter row. |
| hideButtonFilter | boolean | Hides the filter sidebar button. |
| omitFilters | string[] | Additional query-param keys to omit from the active-filter tag display. |
| onGet | function | Callback invoked after each successful data fetch. |
| remove | function | Custom row-delete function; falls back to `service.delete`. |
| allowDuplication | boolean | Enables row duplication in bulk actions. |

## Slots

| Slot | Description |
|------|-------------|
| head | Custom header cells rendered inside the table head row. |
| default (scoped) | Row content. Receives `{ item }` — the current row object — for building each `TableListItem`. |

## Exposed Methods

| Method | Description |
|--------|-------------|
| `refresh(forceTimestamp?)` | Re-fetches data; pass `true` to append a cache-busting timestamp. |
| `unshiftItem(item)` | Prepends a row to the current list without a full re-fetch. |
| `openFilterSidebar()` | Programmatically opens the filter sidebar. |

## Usage Examples

```vue
<script setup lang="ts">
import { TableList, TableListItem } from '@tray-tecnologia/design-system';
import ProductsService from '@/services/ProductsService';

const config = {
  service: ProductsService,
  actions: ['active', 'remove'],
  empty: 'Nenhum produto cadastrado.',
  placeholder: 'Buscar produto…',
  queryParams: { sort: '-created_at', limit: 25 },
};
</script>

<template>
  <TableList :config="config">
    <template #head>
      <div class="ui-table-cell">Nome</div>
      <div class="ui-table-cell">Status</div>
    </template>

    <template #default="{ item }">
      <TableListItem>{{ item.name }}</TableListItem>
      <TableListItem auto>
        <StatusLabel :active="item.active" />
      </TableListItem>
    </template>
  </TableList>
</template>
```

### With bulk actions and custom filters

```vue
<script setup lang="ts">
import { TableList } from '@tray-tecnologia/design-system';
import OrdersService from '@/services/OrdersService';

const config = {
  service: OrdersService,
  bulk: [
    { label: 'Exportar', onAction: (ids) => exportOrders(ids) },
  ],
  filters: [
    { key: 'status', label: 'Status', type: 'select', options: [...] },
  ],
};
</script>

<template>
  <TableList :config="config">
    <template #default="{ item }">
      <div class="ui-table-cell">{{ item.order_number }}</div>
    </template>
  </TableList>
</template>
```

## Styling
- The component manages `.table-list`, `.table-list-wrapper`, and skeleton states internally.
- Horizontal scroll shadow is applied automatically via the `-scroll` class when the user scrolls the table wrapper.
- Individual row and cell layout is handled by `TableListItem` props (`auto`, `nowrap`).
- Override spacing or colours through the `TableList.scss` BEM classes if needed.

## A11y Notes
- Search and filter controls include visible labels and are keyboard-navigable.
- Row checkboxes use `FormCheckbox`, which provides proper `label`/`input` associations.
- The skeleton loading state replaces the table during the initial fetch so users are not presented with an empty region.

## Related Components
- `IndexTable` — **recommended replacement** for all new admin list pages.
- `TableListItem` — cell wrapper for row slot content.
- `TableListRow` — row-level wrapper used internally.
- `TableListNav` — toolbar area with search, pagination, and action buttons.
- `TableListNavBulk` — bulk-action controls.
- `TableListNavFilter` — filter sidebar toggle and panel.
- `TableListNavPagination` — pagination controls.
- `TableListTabs` — tab-based view filters at the top of the list.
- `TableListTags` — active filter tags shown below the toolbar.
- `Table` — lower-level table primitive used by `TableListTable`.
