# Button Component

## Purpose
Clickable action trigger for user interactions. Supports multiple variants (default, primary, secondary, danger, success, info, plain, link) and sizes (sm, md, lg).

## Status
✅ Stable — Safe for new projects

## Import
```ts
import { Button } from '@tray-tecnologia/design-system';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | 'default' \| 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'info' \| 'plain' \| 'link' | No | 'default' | Visual style |
| label | string | No | - | Button text content |
| leadingIcon | string | No | - | Icon name (left side) |
| trailingIcon | string | No | - | Icon name (right side) |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Button dimensions |
| block | boolean | No | false | Fills parent width |
| href | string | No | - | Link URL (renders as `<a>`) |
| target | '_blank' \| '_self' | No | - | Link target attribute |
| type | 'button' \| 'submit' \| 'reset' | No | 'button' | HTML button type |
| loading | boolean | No | false | Shows spinner, blocks interaction |
| disabled | boolean | No | false | Disables interaction |
| onlyIcon | boolean | No | false | Display only icon, hide label |
| spinnerBorder | number \| string | No | 2 | Spinner border width (⚠️ deprecated) |
| to | object | No | - | Vue Router link (⚠️ deprecated, use href instead) |

## Slots

| Slot | Description |
|------|-------------|
| default | Button text content (overrides label prop) |

## Events

Vue component emits standard DOM events based on element type:
- `@click` — Fired on click
- `@focus` — Fired on focus
- `@blur` — Fired on blur

## Usage Examples

### Basic Button
```vue
<template>
  <Button label="Click me" />
</template>

<script setup>
import { Button } from '@tray-tecnologia/design-system';
</script>
```

### With Variant
```vue
<template>
  <div>
    <Button label="Default" variant="default" />
    <Button label="Primary" variant="primary" />
    <Button label="Danger" variant="danger" />
    <Button label="Success" variant="success" />
  </div>
</template>
```

### With Icon
```vue
<template>
  <div>
    <Button label="Download" variant="primary" trailingIcon="download" />
    <Button label="Back" variant="secondary" leadingIcon="arrow-left" />
  </div>
</template>
```

### Loading State
```vue
<template>
  <Button 
    label="Save" 
    :loading="isSaving" 
    @click="handleSave" 
  />
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@tray-tecnologia/design-system';

const isSaving = ref(false);

const handleSave = async () => {
  isSaving.value = true;
  try {
    await saveData();
  } finally {
    isSaving.value = false;
  }
};
</script>
```

### Icon-Only Button
```vue
<template>
  <Button 
    variant="plain" 
    leadingIcon="settings" 
    onlyIcon 
  />
</template>
```

### Block Button
```vue
<template>
  <Button label="Full Width" variant="primary" :block="true" />
</template>
```

### Link Button
```vue
<template>
  <Button 
    label="Visit Site" 
    variant="link" 
    href="https://example.com" 
    target="_blank" 
  />
</template>
```

## Styling

### CSS Classes
- `.ui-button` — Root element
- `.ui-button.-default` — Default variant
- `.ui-button.-primary` — Primary variant
- `.ui-button.-secondary` — Secondary variant
- `.ui-button.-danger` — Danger variant
- `.ui-button.-success` — Success variant
- `.ui-button.-info` — Info variant
- `.ui-button.-plain` — Plain (minimal) variant
- `.ui-button.-link` — Link variant
- `.ui-button.-sm` — Small size
- `.ui-button.-md` — Medium size (default)
- `.ui-button.-lg` — Large size
- `.ui-button.-loading` — Loading state
- `.ui-button.-disabled` — Disabled state
- `.ui-button.-block` — Block/full width
- `.ui-button.-icon` — Has leading icon
- `.ui-button.-only-icon` — Icon-only mode

### Theme Variables
Check your Design System theme configuration for button-related CSS custom properties. Common variables include button colors, padding, border-radius, and transitions.

## A11y Notes
- Button uses semantic HTML button element (or `<a>` tag if `href` provided)
- Disabled buttons are not focusable and announced as disabled
- Loading state should be perceivable visually and by screen readers
- Icon buttons use icon names that should be meaningful
- Target `_blank` links announce the new window behavior
- Keyboard accessible: Enter/Space triggers click

## Related Components
- [IconButton](./icon-button.md) — Icon-only button variant
- [ButtonGroup](./button-group.md) — Multiple buttons grouped
- [Link](./link.md) — Text link alternative

## Deprecations
- **to** prop — Use `href` for links instead
- **spinnerBorder** prop — Will be removed in future versions
