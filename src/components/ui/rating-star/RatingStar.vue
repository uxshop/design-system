<script setup lang="ts">
import Icon from '../icon/Icon.vue'

export interface Props {
	modelValue: number
	size: string | number
}

const emit = defineEmits(['update:modelValue', 'update'])
const props = withDefaults(defineProps<Props>(), {
	modelValue: 1,
	size: 20
})

const getClass = (star: number) => {
	if (star > props.modelValue) {
		return 'star-border'
	}
	return 'star'
}
const onClick = (n: number) => {
	emit('update:modelValue', n)
	emit('update', n)
}
</script>

<template>
	<div class="ui-rating">
		<span :class="getClass(n)" v-for="n in 5" :key="n" @click.stop="onClick(n)">
			<Icon name="star_rate" filled type="rounded" :size="size" />
			<Icon name="star_rate" type="rounded" :size="size" />
		</span>
	</div>
</template>

<style lang="scss">
@import './RatingStar.scss';
</style>
