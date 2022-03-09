<template>
	<option :value="stringifyValue(value)">
		<slot />
	</option>
</template>

<script setup lang="ts">
import { isObject } from 'lodash'

defineProps<{
	value: any
}>()

const stringifyValue = (val) => {
	if (isObject(val)) {
		return JSON.stringify(val)
	}

	return val
}
</script>
