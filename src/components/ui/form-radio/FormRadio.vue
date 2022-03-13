<script setup lang="ts">
import { getCurrentInstance } from 'vue'

interface Props {
	modelValue?: any
	value?: any
	label?: string
	name?: string
	required?: boolean
	size?: string
	tabindex?: string | number
}

withDefaults(defineProps<Props>(), {
	value: true
})

const uid = `ui-form-radio-${getCurrentInstance()?.uid}`

const emit = defineEmits(['update:modelValue'])

const update = (val: any) => {
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
				v-model="modelValue"
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
