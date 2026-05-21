# Form Datepicker Component

## Purpose
Calendar-based date input. Supports single date, date range, and keyboard date entry. Popup or inline mode.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormDatepicker } from '@tray-tecnologia/design-system';
```

## Usage Examples

### Single Date Picker
\`\`\`vue
<template>
  <FormDatepicker
    v-model="selectedDate"
    label="Birth Date"
  />
</template>

<script setup>
import { FormDatepicker } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Date Range
\`\`\`vue
<template>
  <FormDatepicker
    v-model="dateRange"
    label="Check-in to Check-out"
  />
</template>
\`\`\`

## Styling
Input field with calendar icon. Popup calendar on click. Month/year navigation. Today highlighted, selected date has blue background. Disabled dates appear grayed out.

## A11y Notes
Input type='date' with aria-label. Calendar has role='application'. Month/year controls are buttons. Date cells are radio buttons. Keyboard navigation with arrow keys.

## Related Components
- [FormTextfield](#form-textfield) — Text input
- [FormSelect](#form-select) — Dropdown selection
