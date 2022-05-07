<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

defineProps<{
	variant?: string
	right?: boolean
	left?: boolean
}>()

const emit = defineEmits(['show', 'hide'])
const show = ref(false)

const uid = `ui-dropdown-${getCurrentInstance()?.uid}`

const listener = () => {
	setTimeout(() => {
		window.removeEventListener('keydown', listener, false)
		window.removeEventListener('mouseup', listener, false)
		toggle(false)
	}, 100)
}

const toggle = (val) => {
	show.value = val
	if (val) {
		emit('show')
	} else {
		emit('hide')
	}
}

const toggleDropdown = () => {
	if (!show.value) {
		window.addEventListener('mouseup', listener, false)
		window.addEventListener('keydown', listener, false)
	}

	toggle(!show.value)
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
