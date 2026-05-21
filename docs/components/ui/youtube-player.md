# Youtube Player Component

## Purpose
Embedded YouTube video player component. Manages iframe embed with responsive sizing and lazy loading.

## Usage Examples

### Basic YouTube Embed
\`\`\`vue
<template>
  <YoutubePlayer video-id="dQw4w9WgXcQ" />
</template>

<script setup>
import { YoutubePlayer } from '@tray-tecnologia/design-system';
</script>
\`\`\`

### With Title
\`\`\`vue
<template>
  <YoutubePlayer
    video-id="dQw4w9WgXcQ"
    title="Amazing Video"
  />
</template>
\`\`\`

## Styling
Responsive iframe maintaining aspect ratio (16:9 default). Lazy loads video on view. Optional background image before play. Play button overlay (YouTube default).

## A11y Notes
Iframe has title attribute. Video content should have captions if available. Keyboard accessible (Tab to play, Space/Enter to start). Focus visible on controls.

## Related Components
- [Image](#image) — Static image embed
- [Card](#card) — Content container
