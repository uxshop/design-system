<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IconButton from '../../ui/icon-button/IconButton.vue'

const iconMode = ref('dark_mode')
const colorSchemeStorageName = 'ds_color_scheme'

const setDarkmode = (val: any) => {
	localStorage.setItem(colorSchemeStorageName, val)
	document.documentElement.setAttribute('data-theme', val)

	if (val == 'dark') {
		iconMode.value = 'light_mode'
	} else {
		iconMode.value = 'dark_mode'
	}
}

const toggleDarkmode = () => {
	const color = localStorage.getItem(colorSchemeStorageName) == 'dark' ? 'light' : 'dark'
	setDarkmode(color)
}

onMounted(() => {
	setDarkmode(localStorage.getItem(colorSchemeStorageName) ?? 'light')
})
</script>

<template>
	<span @click="toggleDarkmode">
		<slot>
			<IconButton :icon="iconMode" variant="plain" />
		</slot>
	</span>
</template>
