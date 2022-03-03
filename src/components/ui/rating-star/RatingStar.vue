<script setup lang="ts">
import Icon from '../icon/Icon.vue'

const emit = defineEmits(['update:modelValue', 'change'])

interface Props {
	modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: 1
})

const getClass = (star: number) => {
	if (star > props.modelValue) {
		return 'star-border'
	}
	return 'star'
}
const onClick = (n: number) => {
	emit('update:modelValue', n)
	emit('change', n)
}
</script>

<template>
	<div class="ui-rating">
		<span :class="getClass(n)" v-for="n in 5" :key="n" @click.stop="onClick(n)">
			<icon name="star" type="solid" />
			<icon name="star_border" />
		</span>
	</div>
</template>

<style lang="scss">
@import './RatingStar.scss';
</style>
