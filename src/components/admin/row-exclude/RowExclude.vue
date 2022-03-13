<script setup lang="ts">
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import { ref } from 'vue'
import { indexOf } from 'lodash'

interface Props {
	rows: any
	modelValue: any
}

interface ItemInterface {
	id: number
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	rows: [],
	modelValue: []
})

const includes = ref<number[]>([])

const onClickRowExclude = (item: ItemInterface) => {
	if (indexOf(includes.value, item.id) != -1) {
		includes.value = includes.value.filter((id) => {
			return id != item.id
		})
	} else {
		includes.value.push(item.id)
	}
	updateExcludes()
}

const updateExcludes = () => {
	const excludes: Array<number> = []
	props.rows.map((item: ItemInterface) => {
		if (indexOf(includes.value, item.id) == -1) {
			excludes.push(item.id)
		}
	})
	emit('update:modelValue', excludes)
}

const updateIncludes = () => {
	if (props.rows && props.modelValue) {
		includes.value = []
		props.rows.map((item: ItemInterface) => {
			if (indexOf(props.modelValue, item.id) == -1) {
				includes.value.push(item.id)
			}
		})
	}
}
</script>

<template>
	<div class="selectable-list">
		<div class="selectable-list-item" v-for="item in rows" :key="item.id" @click.prevent="onClickRowExclude(item)">
			<FormCheckbox v-model="includes" :value="item.id" switch> {{ item.name }} </FormCheckbox>
		</div>
	</div>
</template>

<style lang="scss">
@import './RowExclude.scss';
</style>
