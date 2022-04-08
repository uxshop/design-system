<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	distribuition?: string
	spacing?: string
	vertical?: boolean
	wrap?: boolean
}>()

const classList = ref<string[]>([])

if ((props.distribuition != 'default', props.distribuition != undefined)) {
	classList.value.push(`-distribute-${props.distribuition}`)
}

if ((props.spacing != 'default', props.spacing != undefined)) {
	classList.value.push(`-spacing-${props.spacing}`)
}

if (props.vertical == true) {
	classList.value.push('-vertical')
}

if (props.wrap == null || false) {
	classList.value.push('-no-wrap')
}
</script>
<template>
	<div class="ui-stack" :class="classList">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Stack.scss';
</style>
