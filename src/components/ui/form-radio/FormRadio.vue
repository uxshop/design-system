<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

interface Props {
	modelValue?: string | number | boolean
	value?: string | number | boolean
	label?: string
	name?: string
	required?: boolean
	size?: string
	tabindex?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	value: true
})

const emit = defineEmits(['update:modelValue'])
const uid = `ui-form-radio-${getCurrentInstance()?.uid}`
const model = computed(() => {
	return props.modelValue
})

const update = (val: string | boolean) => {
	emit('update:modelValue', val)
}
</script>

<template>
	<span>
		<label class="ui-form-radio" :for="uid">
			<input
				type="radio"
				:id="uid"
				:value="value"
				:tabindex="tabindex"
				:required="required"
				:name="name"
				v-model="model"
				@update:modelValue="update" />
			<div class="ui-form-radio-text">
				<slot />
				{{ label }}
			</div>
		</label>
	</span>
</template>

<style lang="scss">
@import './FormRadio.scss';
</style>
