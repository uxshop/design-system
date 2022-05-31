<script lang="ts" setup>
import { ref } from 'vue'
import Icon from '../icon/Icon.vue'

export interface Props {
	to?: string | object
	href?: string | null
	label?: string | null
	external?: boolean
}
const props = withDefaults(defineProps<Props>(), { href: null })
const extras = ref<any>({})
const myComponent = props.to ? 'router-link' : 'a'
if (props.href) {
	extras.value.href = props.href
}

if (props.to) {
	extras.value.to = props.to
}

if (props.external) {
	extras.value.target = '_blank'
}
</script>

<template>
	<component :is="myComponent" class="ui-link" :class="{ '-external': external }" v-bind="extras">
		<span class="ui-link-content">
			<slot>{{ label }}</slot>
		</span>
		<Icon v-if="external" name="open_in_new" class="ui-link-icon" />
	</component>
</template>

<style lang="scss">
@import './Link.scss';
</style>
