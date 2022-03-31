<script setup lang="ts">
import { ref } from 'vue'

interface Props {
	name?: string
	size?: number | string
	type?: 'filled' | 'rounded' | 'outlined' | 'twotone'
}

const props = withDefaults(defineProps<Props>(), {
	type: 'outlined'
})

const classList = ref('material-icons')

const style = ref<{
	fontSize?: string
	height?: string
}>({})

if (props.type == 'filled') {
	classList.value = 'material-icons'
}

if (props.type == 'rounded') {
	classList.value = 'material-icons-round'
}

if (props.type == 'outlined') {
	classList.value = 'material-icons-outlined'
}

if (props.type == 'twotone') {
	classList.value = 'material-icons-two-tone'
}

if (props.size) {
	style.value.fontSize = `${props.size}px`
	style.value.height = `${props.size}px`
}
</script>

<template>
	<i class="ui-icon icon" :class="classList" :style="style">
		{{ name }}
	</i>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Two+Tone');

.ui-icon {
	width: auto;
	display: inline-flex;
	align-items: center;
	color: inherit;
}
</style>
