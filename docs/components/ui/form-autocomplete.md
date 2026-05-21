# Form Autocomplete Component

## Purpose
Text input with dropdown suggestions filtered by user input. Supports async data fetching and custom rendering.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormAutocomplete } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | any | No | - | [TODO: Add description] |
| placeholder | string | No | - | [TODO: Add description] |
| options | AutocompleteOption[] | No | - | [TODO: Add description] |
| label | string | No | - | [TODO: Add description] |
| size | Size | No | - | [TODO: Add description] |
| last | boolean | No | - | [TODO: Add description] |
| template | any | No | - | [TODO: Add description] |
| position | 'top' | No | - | [TODO: Add description] |
| config | Record<string, any> | No | - | [TODO: Add description] |
| required | boolean | No | - | [TODO: Add description] |

## Events

- `@update:modelValue` — [TODO: Add description]
- `@open` — [TODO: Add description]
- `@close` — [TODO: Add description]
- `@update` — [TODO: Add description]

## Usage Examples

### Basic Autocomplete
\`\`\`vue
<template>
  <FormAutocomplete
    v-model="selectedUser"
    :options="userList"
    placeholder="Search users..."
  />
</template>

<script setup>
import { FormAutocomplete } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Async Autocomplete
\`\`\`vue
<template>
  <FormAutocomplete
    v-model="selectedItem"
    :loading="isLoading"
    @input="fetchSuggestions"
    :options="suggestions"
  />
</template>
\`\`\`

## Styling
Input field with attached dropdown. Dropdown width matches input. Highlighted option has blue background. Loading spinner shown during async requests.

## A11y Notes
Input has aria-autocomplete='list'. Dropdown options have role='option'. Keyboard navigation with Arrow Up/Down, Enter to select, Escape to close. Current selection announced.

## Related Components
- [FormSelect](#form-select) — Static dropdown
- [FormTextfield](#form-textfield) — Basic text input
