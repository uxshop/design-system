# Form Checkbox Component

## Purpose
Checkbox input for boolean values. Can be grouped for multi-select. Supports indeterminate state for partial selection.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormCheckbox } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| modelValue | any | No | - | [TODO: Add description] |
| value | any | No | - | [TODO: Add description] |
| switch | boolean | No | - | [TODO: Add description] |
| label | string | No | - | [TODO: Add description] |
| id | string | No | - | [TODO: Add description] |
| name | string | No | - | [TODO: Add description] |
| tabindex | string | No | - | [TODO: Add description] |
| required | boolean | No | - | [TODO: Add description] |
| indeterminate | boolean | No | - | [TODO: Add description] |
| noEvents | boolean | No | - | [TODO: Add description] |
| disabled | boolean | No | - | [TODO: Add description] |

## Slots

| Slot | Description |
|------|-------------|
| default | [TODO: Add description] |

## Events

- `@update:modelValue` — [TODO: Add description]
- `@update` — [TODO: Add description]

## Usage Examples

### Single Checkbox
\`\`\`vue
<template>
  <FormCheckbox
    v-model="agreeToTerms"
    label="I agree to the terms and conditions"
  />
</template>

<script setup>
import { FormCheckbox } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Checkbox Group
\`\`\`vue
<template>
  <div>
    <FormCheckbox
      v-for="option in options"
      :key="option.id"
      :value="option.id"
      :label="option.label"
    />
  </div>
</template>
\`\`\`

## Styling
Square checkbox with rounded corners. Blue when checked. Indeterminate state shown with dash. Label text to the right of checkbox. Disabled state appears grayed out.

## A11y Notes
Input type='checkbox' with proper label association. Indeterminate state has aria-checked='mixed'. Keyboard accessible with Space to toggle. Focus ring visible.

## Related Components
- [FormRadio](#form-radio) — Mutually exclusive options
- [FormLayout](#form-layout) — Form organization
