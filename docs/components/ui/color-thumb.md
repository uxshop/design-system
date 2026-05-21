# Color Thumb Component

## Purpose
Thumbnail preview of a color value. Used in color pickers, design system showcases, or color selection lists.

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { ColorThumb } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| hexadecimal | string | No | - | [TODO: Add description] |
| hexadecimalSecondary | string | No | - | [TODO: Add description] |
| image | string | No | - | [TODO: Add description] |
| size | Size | No | - | [TODO: Add description] |
| width | number | No | - | [TODO: Add description] |

## Usage Examples

### Basic Color Display
```vue
<template>
  <ColorThumb hexadecimal="#FF5733" />
</template>

<script setup>
import { ColorThumb } from '@tray-tecnologia/design-system';
</script>
```

### Color Palette List
```vue
<template>
  <div class="flex gap-4">
    <ColorThumb
      v-for="color in palette"
      :key="color.name"
      :hexadecimal="color.hex"
    />
  </div>
</template>
```

## Styling
Color displayed as solid square with rounded corners. Size controlled by `size` prop (sm, md, lg). Optional width customization. Accepts hex color values.

## A11y Notes
If clickable, provide focus ring and aria-label. Use descriptive labels if displayed near color thumbs. Ensure adequate spacing for click targets.

## Related Components
- [Form Colorpicker](#form-colorpicker) — Interactive color selection
- [Badge](#badge) — For status colors
