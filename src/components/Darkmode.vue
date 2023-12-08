<script setup lang="ts">
import { watchEffect } from 'vue';
console.log('darkMode');


const props = defineProps<{
	theme?: 'dark' | 'light'
}>()

watchEffect(() => {
  console.log('darkMode', props);

	if (props.theme == 'dark') {
				document.documentElement.setAttribute('data-theme', 'dark')
			} else {
				document.documentElement.removeAttribute('data-theme')
			}
})
</script>

<template>
</template>
