# Pagination Component

## Purpose
Multi-page navigation control. Allows users to move between pages of data with previous/next controls and page selection.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Pagination } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| currentPage | number | Yes | - | Active page number (1-indexed) |
| totalPages | number | Yes | - | Total number of pages |
| maxVisible | number | No | 5 | Max page buttons to display |
| disabled | boolean | No | false | Disable pagination controls |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Button size |

## Slots

| Slot | Description |
|------|-------------|
| prev | Previous button content (override) |
| next | Next button content (override) |
| default | Page number buttons (default provided) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| change | `{ page: number }` | Fired when page changes |
| prev | - | Fired when previous clicked |
| next | - | Fired when next clicked |

## Usage Examples

### Basic Pagination
```vue
<template>
  <Pagination 
    :currentPage="page" 
    :totalPages="10" 
    @change="page = $event.page"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Pagination } from '@tray-tecnologia/design-system';

const page = ref(1);
</script>
```

### With Custom Max Visible
```vue
<template>
  <Pagination 
    :currentPage="page" 
    :totalPages="20" 
    :maxVisible="7"
    @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Pagination } from '@tray-tecnologia/design-system';

const page = ref(1);

const handlePageChange = (event) => {
  page.value = event.page;
  // Fetch data for new page
};
</script>
```

### Disabled State
```vue
<template>
  <Pagination 
    :currentPage="1" 
    :totalPages="10" 
    :disabled="isLoading"
  />
</template>
```

## Styling

### CSS Classes
- `.ui-pagination` — Root container
- `.ui-pagination-btn` — Page button
- `.ui-pagination-btn.-active` — Active page
- `.ui-pagination-btn.-disabled` — Disabled button

### Theme Variables
Check Design System theme for pagination colors, spacing, and border-radius.

## A11y Notes
- Current page is announced and marked as active
- Previous/Next buttons have clear labels
- Disabled state announced to screen readers
- All controls keyboard accessible (Tab, Enter/Space)
- Page number buttons navigable via keyboard

## Related Components
- [Button](./button.md) — Individual button control
- [IndexTable](./index-table.md) — Often used with pagination

## Deprecations
None. This component is stable.
