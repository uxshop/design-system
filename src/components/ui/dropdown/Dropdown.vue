<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, useSlots } from 'vue'

const props = defineProps<{
	dropUp?: boolean
	right?: boolean
	left?: boolean
	closeOn?: boolean
	noCloseOnClickTag?: string
	disabled?: boolean
}>()

const emit = defineEmits(['show', 'hide'])
const show = ref(false)
const uid = `ui-dropdown-${getCurrentInstance()?.uid}`
const uidMenu = `ui-dropdown-${getCurrentInstance()?.uid}-menu`
const style = ref({})
let initialHeight: number = 0

const showOnTop = computed(() => (props.dropUp ? 'translateY(calc(-120%))' : 'unset'))

const listener = (e: MouseEvent | KeyboardEvent) => {
	if (e instanceof KeyboardEvent && e.key != 'Escape') return
	if (props.closeOn && e.target?.tagName == props.noCloseOnClickTag) return
	if (e.target?.tagName == 'INPUT') return
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
	<div class="ui-dropdown" :class="{ '-open': show, '-left': left, '-right': right }" :id="uid">
		<div class="ui-dropdown-button" @click="toggleDropdown">
			<slot name="button-content" class="ui-dropdown-menu" />
		</div>
		<div class="ui-dropdown-menu" :id="uidMenu" :style="style">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './Dropdown.scss';
.ui-dropdown {
	.ui-dropdown-menu {
		transform: v-bind(showOnTop);
	}
}
</style>
