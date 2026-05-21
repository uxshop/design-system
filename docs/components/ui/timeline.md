# Timeline Component

## Purpose
Visual timeline showing sequence of events or milestones. Supports vertical/horizontal layout and various event states.

## Usage Examples

### Vertical Timeline
\`\`\`vue
<template>
  <Timeline>
    <Timeline.Item
      v-for="event in events"
      :key="event.id"
      :title="event.title"
      :date="event.date"
    >
      {{ event.description }}
    </Timeline.Item>
  </Timeline>
</template>

<script setup>
import { Timeline } from '@tray-tecnologia/design-system';
</script>
\`\`\`

## Styling
Vertical line with dots for each event. Event content beside or below dot. Status indicator (pending, active, completed) changes dot color. Horizontal orientation optional.

## A11y Notes
Timeline has role='region' with aria-label='timeline'. Each item has clear date/status. Events are announced in order. Keyboard navigation through events.

## Related Components
- [List Group](#list-group) — Item list
- [Progress](#progress) — Progress indicator
