<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../icon/Icon.vue'
import type { IVariant } from 'src/types/ITypes'

export interface Props {
	label?: string
	variant?: IVariant
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default'
})

const emit = defineEmits(['remove'])
const classList = ref<string[]>([])

const onRemove = () => {
	emit('remove')
}

if (props.variant) {
	classList.value.push(`-variant-${props.variant}`)
}
</script>

<template>
	<span class="ui-tag" :class="classList">
		<slot>{{ label }}</slot>
		<Icon name="close" class="ui-tag-close" @click="onRemove" />
	</span>
</template>

<style lang="scss">
@import './Tag.scss';
</style>
