# Form Radio Component

## Purpose
Radio button input for mutually exclusive options. Single selection from a group of related choices.

## Usage Examples

### Basic Radio Group
\`\`\`vue
<template>
  <div>
    <FormRadio
      v-for="option in options"
      :key="option.id"
      v-model="selectedOption"
      :value="option.id"
      :label="option.label"
    />
  </div>
</template>

<script setup>
import { FormRadio } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Horizontal Layout
\`\`\`vue
<template>
  <div class="flex gap-4">
    <FormRadio v-model="size" value="sm" label="Small" />
    <FormRadio v-model="size" value="md" label="Medium" />
    <FormRadio v-model="size" value="lg" label="Large" />
  </div>
</template>
\`\`\`

## Styling
Circular radio button. Selected state filled with blue dot. Options stacked vertically by default. Label text to the right. Disabled state appears grayed out.

## A11y Notes
Input type='radio' with name attribute grouping. Proper label association via for/id. Keyboard navigation with Arrow Up/Down. Tab stops on selected radio only (roving tabindex).

## Related Components
- [FormCheckbox](#form-checkbox) — Multiple selections
- [FormLayout](#form-layout) — Form organization
