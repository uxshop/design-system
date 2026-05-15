# Select Item Card Component

## Purpose
Card-style selectable item for choice lists. Combines Card appearance with radio button functionality. Good for options/plans/features.

## Usage Examples

### Plan Selection
\`\`\`vue
<template>
  <SelectItemCard
    v-for="plan in plans"
    :key="plan.id"
    :selected="selectedPlan === plan.id"
    @select="selectPlan(plan.id)"
  >
    <h3>{{ plan.name }}</h3>
    <p>${{ plan.price }}</p>
  </SelectItemCard>
</template>

<script setup>
import { SelectItemCard } from '@tray-tecnologia/design-system';
</script>
\`\`\`

## Styling
Card with border that changes on selection (blue border, background tint). Checkmark or radio button indicator. Hover effect (subtle lift).

## A11y Notes
Card has role='radio' or role='option'. aria-checked indicates selection state. Keyboard: Space/Enter to select. Tab navigates between options.

## Related Components
- [Card](#card) — Static container
- [FormCheckbox](#form-checkbox) — Checkbox input
- [FormRadio](#form-radio) — Radio input
