<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
	variant?: 'white' | 'dark'
	right?: boolean
	left?: boolean
	disabled?: boolean
	closeOn?: boolean
}>()

const emit = defineEmits(['show', 'hide'])
const show = ref(false)
const uid = `ui-dropdown-${getCurrentInstance()?.uid}`
const uidMenu = `ui-dropdown-${getCurrentInstance()?.uid}-menu`
const style = ref({})
let initialHeight: number = 0

const listener = (e: MouseEvent | KeyboardEvent) => {
	let noClose = e.target.tagName == 'INPUT'
	if (props.closeOn) hide()

	if (e.target.dataset?.close != true) {
		e.path?.map((item: Element) => {
			if (item.className == 'ui-dropdown-menu') {
				noClose = true
			}
		})
	}

	if (noClose) return

	hide()
}

const toggle = (val: boolean) => {
	show.value = val
	if (val) {
		emit('show')
		nextTick(checkPositions)
	} else {
		emit('hide')
	}
}

const checkPositions = () => {
	const dropdownMenuEl = document.getElementById(uidMenu)
	const rectMenu = dropdownMenuEl?.getBoundingClientRect()
	const documentHeight = document.documentElement.clientHeight

	if (!initialHeight) initialHeight = rectMenu?.height

	const calcHeight = documentHeight - rectMenu?.top - 10
	const height = initialHeight < calcHeight ? initialHeight : calcHeight

	style.value.height = `${height}px`
}

const toggleDropdown = (e) => {
	if (props.disabled) {
		e.preventDefault()
		e.stopPropagation()
		return
	}

	if (!show.value) {
		window.addEventListener('mouseup', listener, false)
		window.addEventListener('keydown', listener, false)
		window.addEventListener('wheel', checkPositions, false)
	}

	toggle(!show.value)
}

const hide = () => {
	setTimeout(() => {
		window.removeEventListener('wheel', checkPositions, false)
		window.removeEventListener('keydown', listener, false)
		window.removeEventListener('mouseup', listener, false)
		toggle(false)
	}, 100)
}

defineExpose({
	hide
})
</script>

<template>
	<div class="ui-dropdown" :class="{ '-open': show, '-left': left, '-right': right, '-disbled': disabled }" :id="uid">
		<div class="ui-dropdown-button" @click="toggleDropdown">
			<slot name="button-content" />
		</div>
		<div class="ui-dropdown-menu" :id="uidMenu" :style="style">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './Dropdown.scss';
</style>
