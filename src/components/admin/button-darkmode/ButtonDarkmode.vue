<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IconButton from '../../ui/icon-button/IconButton.vue'

const iconMode = ref('dark_mode')
const colorScheme = 'adm_color_scheme'
const system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const setDarkmode = (val: any) => {
	localStorage.setItem(colorScheme, val)
	document.documentElement.setAttribute('data-theme', val)

	if (val == 'dark') {
		iconMode.value = 'light_mode'
	} else {
		iconMode.value = 'dark_mode'
	}
}

const toggleDarkmode = () => {
	const color = localStorage.getItem(colorScheme) == 'dark' ? 'light' : 'dark'
	setDarkmode(color)
}

onMounted(() => {
	setDarkmode(localStorage.getItem(colorScheme) ?? system)
})
</script>

<template>
	<span @click="toggleDarkmode">
		<slot>
			<IconButton :icon="iconMode" variant="plain" />
		</slot>
	</span>
</template>
