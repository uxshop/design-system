<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	distribuition?: 'center' | 'right' | 'around' | 'evenly' | 'between' | 'default'
	spacing?: string
	alignment?: 'start' | 'center' | 'end' | 'fill'
	vertical?: boolean
	wrap?: boolean
	columns?: string | number
}>()

const classList = ref<string[]>([])

if (props.distribuition != 'default' && props.distribuition != undefined) {
	classList.value.push(`-distribute-${props.distribuition}`)
}

if (props.spacing != 'default' && props.spacing != undefined) {
	classList.value.push(`-spacing-${props.spacing}`)
}

if (props.vertical == true) {
	classList.value.push('-vertical')
}

if (props.alignment) {
	classList.value.push(`-align-${props.alignment}`)
}

if (props.wrap == null && props.wrap == false) {
	classList.value.push('-no-wrap')
}

const styleList = ref<string[]>([])

if (props.columns && props.columns > 1) {
	classList.value.push('-custom-grid')
	styleList.value.push(`grid-template-columns: repeat(${props.columns}, 1fr)`)
}
</script>
<template>
	<div class="ui-stack" :class="classList" :style="styleList">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Stack.scss';
</style>
