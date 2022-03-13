<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

defineProps<{
	variant?: string
	right?: boolean
	left?: boolean
}>()

const show = ref(false)

const uid = `ui-dropdown-${getCurrentInstance()?.uid}`

const listener = () => {
	setTimeout(() => {
		show.value = false
		window.removeEventListener('keydown', listener, false)
		window.removeEventListener('mousedown', listener, false)
	}, 100)
}

const toggleDropdown = () => {
	if (!show.value) {
		window.addEventListener('mousedown', listener, false)
		window.addEventListener('keydown', listener, false)
	}

	show.value = !show.value
}
</script>

<template>
	<div class="ui-dropdown" :class="{ '-open': show, '-left': left, '-right': right }" :id="uid">
		<div class="ui-dropdown-button" @click="toggleDropdown">
			<slot name="button-content" />
		</div>
		<div class="ui-dropdown-menu">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './Dropdown.scss';
</style>
>
