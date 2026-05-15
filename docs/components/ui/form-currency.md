# Form Currency Component

## Purpose
Specialized number input for currency values. Auto-formats to locale settings and handles decimal places.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { FormCurrency } from '@tray-tecnologia/design-system';
```

## Usage Examples

### Basic Currency Input
\`\`\`vue
<template>
  <FormCurrency
    v-model="price"
    label="Price"
  />
</template>

<script setup>
import { FormCurrency } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Validation
\`\`\`vue
<template>
  <FormCurrency
    v-model="amount"
    label="Amount"
    :min="0"
    :max="10000"
  />
</template>
\`\`\`

## Styling
Text input with currency symbol prefix. Decimal separator based on locale. Right-aligned number. Spinner buttons for increment/decrement (optional).

## A11y Notes
Input type='text' with inputmode='decimal'. Currency symbol is decorative (aria-label describes currency). Decimal places enforced but not announced.

## Related Components
- [FormSpinbutton](#form-spinbutton) — Number spinner
- [FormTextfield](#form-textfield) — Basic text input
