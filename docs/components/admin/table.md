# Table Component

## Purpose
A low-level, slot-based HTML table built with `div` elements and BEM classes. Renders a responsive wrapper around a `.ui-table` container and exposes named slots for the header row and body. Use it together with `TableRow`, `TableCell`, `TableHeadCell`, and `TableBody` to compose full data tables with consistent spacing, hover states, and compact density.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Table } from '@tray-tecnologia/design-system';
```

## Props

### Table
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| hover | boolean | No | false | Adds `-hover` class to enable row hover highlight styles. |
| noPadding | boolean | No | false | Removes default cell padding via the `-no-padding` modifier. |
| tiny | boolean | No | false | Applies the `-tiny` modifier for compact row density. |

### TableRow
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| to | any | No | — | **Deprecated.** When set the row renders as a `<router-link>`. Handle navigation via events instead. |
| head | boolean | No | false | Marks the row as a header row (adds `-head` class). |

### TableCell
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| action | boolean | No | false | Shrinks the cell to fit its content (auto width). |
| drag | boolean | No | false | Styles the cell as a drag handle column. |
| handle | boolean | No | false | Adds the `-handle` class for sortable-handle styling. |
| auto | boolean | No | false | Shrinks the cell width to content (same as `action`). |
| noWrap | boolean | No | false | Prevents text wrapping inside the cell. |
| width | string \| number | No | — | Sets an explicit pixel width on the cell. |

## Slots

### Table
| Slot | Description |
|------|-------------|
| header | Content placed inside the header row (`.ui-table-row.-head`). Typically one or more `TableHeadCell` components. |
| body | Main content area of the table. Pass a `TableBody` wrapping multiple `TableRow` components. |
| default | Fallback slot rendered after the `body` slot, for simple usage without a named body. |

### TableRow
| Slot | Description |
|------|-------------|
| default | One or more `TableCell` or `TableHeadCell` elements. |

## Usage Examples

```vue
<script setup lang="ts">
import { Table, TableRow, TableCell, TableHeadCell, TableBody } from '@tray-tecnologia/design-system';

const items = [
  { id: 1, name: 'Produto A', price: 'R$ 99,90' },
  { id: 2, name: 'Produto B', price: 'R$ 149,90' },
];
</script>

<template>
  <Table hover>
    <template #header>
      <TableHeadCell>Nome</TableHeadCell>
      <TableHeadCell>Preço</TableHeadCell>
    </template>

    <template #body>
      <TableBody>
        <TableRow v-for="item in items" :key="item.id">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.price }}</TableCell>
        </TableRow>
      </TableBody>
    </template>
  </Table>
</template>
```

### Compact table with action column

```vue
<template>
  <Table tiny noPadding>
    <template #header>
      <TableHeadCell>SKU</TableHeadCell>
      <TableHeadCell action>Ações</TableHeadCell>
    </template>
    <template #body>
      <TableBody>
        <TableRow v-for="row in rows" :key="row.id">
          <TableCell>{{ row.sku }}</TableCell>
          <TableCell action>
            <Button size="sm" @click="edit(row)">Editar</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </template>
  </Table>
</template>
```

## Styling
- The root wrapper carries `table-responsive` for horizontal scroll on small screens.
- Modifier classes (`-hover`, `-no-padding`, `-tiny`) are applied to `.ui-table` via the `Table` props.
- Cell width is driven by the `width` prop on `TableCell`; pass a number (pixels) or a CSS string.
- Custom column widths and overflow behaviour should be handled through `TableCell` props rather than utility classes.

## A11y Notes
- The component uses `div`-based markup; consumers should consider adding `role="table"`, `role="row"`, and `role="cell"` when accessibility is a priority.
- `TableRow` renders with `tabindex="0"` so keyboard users can focus rows when navigating with Tab.
- Header cells should always be placed in the `header` slot so screen readers can associate them with data cells.

## Related Components
- `TableBody` — wraps the body rows inside the `body` slot.
- `TableRow` — a single row; renders as `div` or `router-link` depending on the `to` prop.
- `TableCell` — a data cell with layout modifiers (auto, drag, handle, noWrap, width).
- `TableHeadCell` — a header cell for use inside the `header` slot.
- `TableList` — deprecated higher-level list that uses `Table` internally. Prefer `IndexTable`.
- `IndexTable` — the recommended replacement for full admin list views.
