<script setup lang="ts">
import { isObject } from 'lodash'

defineProps<{
	value: string | object
}>()

const stringifyValue = (val: string | object) => {
	if (isObject(val)) {
		return JSON.stringify(val)
	}

	return val
}
</script>

<template>
	<option :value="stringifyValue(value)">
		<slot />
	</option>
</template>
