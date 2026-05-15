# Stats Item Component

## Purpose
Displays a statistical metric with value, label, and optional change indicator. Used in dashboards and summary cards.

## Usage Examples

### Basic Stat
\`\`\`vue
<template>
  <StatsItem
    label="Revenue"
    :value="125000"
  />
</template>

<script setup>
import { StatsItem } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Trend
\`\`\`vue
<template>
  <StatsItem
    label="Users"
    :value="15240"
    :trend="8.5"
  />
</template>
\`\`\`

## Styling
Large number value with smaller label below. Optional up/down trend indicator (green/red). Unit suffix optional. Background can be colored.

## A11y Notes
Value and label clearly separated. Trend direction indicated visually (color + icon) and textually. Numeric precision appropriate. Currency/percentage formatting accessible.

## Related Components
- [Card](#card) — Content container
- [Badge](#badge) — Status label
