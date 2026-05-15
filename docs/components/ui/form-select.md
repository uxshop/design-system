# Form Select Component

## Purpose
Dropdown select for choosing from predefined options. Replaces native HTML select with enhanced styling and features.

## Usage Examples

### Basic Select
\`\`\`vue
<template>
  <FormSelect
    v-model="selectedCountry"
    :options="countries"
    label="Country"
    placeholder="Choose a country..."
  />
</template>

<script setup>
import { FormSelect } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Searchable Select
\`\`\`vue
<template>
  <FormSelect
    v-model="selectedUser"
    :options="userList"
    searchable
    clearable
  />
</template>
\`\`\`

## Styling
Dropdown trigger button with arrow icon. Dropdown list aligned below. Selected option highlighted. Search field (if searchable). No-results message if needed.

## A11y Notes
Select element or role='listbox'. Options have role='option'. Keyboard: Arrow Up/Down navigate, Enter selects, Escape closes. Screen reader announces selected value.

## Related Components
- [FormAutocomplete](#form-autocomplete) — Autocomplete dropdown
- [FormLayout](#form-layout) — Form organization
