# Form Range Component

## Purpose
Slider input for selecting numeric value within a range. Useful for volume, brightness, rating scales.

## Usage Examples

### Basic Slider
\`\`\`vue
<template>
  <FormRange
    v-model="opacity"
    :min="0"
    :max="100"
    label="Opacity"
  />
</template>

<script setup>
import { FormRange } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Step Control
\`\`\`vue
<template>
  <FormRange
    v-model="zoom"
    :min="50"
    :max="200"
    :step="10"
    label="Zoom Level"
  />
</template>
\`\`\`

## Styling
Horizontal slider track with thumb. Filled portion from min to current value. Numeric display optional. Tooltip on hover showing current value.

## A11y Notes
Input type='range'. aria-label describes slider purpose. aria-valuemin/valuenow/valuemax attributes set. Keyboard: Arrow keys adjust value by step. Step size should be logical.

## Related Components
- [FormSpinbutton](#form-spinbutton) — Number spinner
- [FormCurrency](#form-currency) — Currency input
