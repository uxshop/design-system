# List Group Component

## Purpose
Container for a list of items. Each item can be interactive (clickable, selectable) or static. Commonly used for menus, nav lists, results.

## Usage Examples

### Simple List
\`\`\`vue
<template>
  <ListGroup>
    <ListGroup.Item>Item 1</ListGroup.Item>
    <ListGroup.Item>Item 2</ListGroup.Item>
    <ListGroup.Item>Item 3</ListGroup.Item>
  </ListGroup>
</template>

<script setup>
import { ListGroup } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### Clickable List
\`\`\`vue
<template>
  <ListGroup>
    <ListGroup.Item
      v-for="action in actions"
      :key="action.id"
      @click="handleAction(action)"
    >
      {{ action.label }}
    </ListGroup.Item>
  </ListGroup>
</template>
\`\`\`

## Styling
Vertical list with subtle borders between items. Hover effect highlights item. Active item has blue left border (or background). Padding and spacing consistent.

## A11y Notes
Use role='list' and role='listitem' semantics. Clickable items should be buttons or links. Selection indicated visually and programmatically (aria-current='true').

## Related Components
- [List](#list) — Basic list
- [Stack](#stack) — Flexible spacing
