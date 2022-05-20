<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IconButton from '../../ui/icon-button/IconButton.vue'

const iconMode = ref('dark_mode')

const setDarkmode = (val: boolean) => {
	if (val) {
		localStorage.setItem('darkmode', '1')
		document.documentElement.setAttribute('data-theme', 'dark')
		iconMode.value = 'light_mode'
	} else {
		document.documentElement.removeAttribute('data-theme')
		localStorage.removeItem('darkmode')
		iconMode.value = 'dark_mode'
	}
}

const toggleDarkmode = () => {
	if (localStorage.getItem('darkmode') == '1') {
		setDarkmode(false)
	} else {
		setDarkmode(true)
	}
}

onMounted(() => {
	setDarkmode(localStorage.getItem('darkmode') != undefined)
})
</script>

<template>
	<span @click="toggleDarkmode">
		<slot>
			<IconButton :icon="iconMode" variant="plain" />
		</slot>
	</span>
</template>
