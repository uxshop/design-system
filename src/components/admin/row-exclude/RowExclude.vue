<script setup lang="ts">
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import { ref } from 'vue'
import { indexOf } from 'lodash'

interface Rows {
	id: number
	name: string
}

interface Props {
	rows: Array<Rows> | null
	modelValue: string[]
}

interface ItemInterface {
	id: number
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps<Props>()
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
	if (props.rows) {
		const excludes: Array<number> = []
		props.rows.map((item: ItemInterface) => {
			if (indexOf(includes.value, item.id) == -1) {
				excludes.push(item.id)
			}
		})
		emit('update:modelValue', excludes)
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
