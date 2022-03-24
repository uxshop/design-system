<script setup lang="ts">
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import { ref, watch, watchEffect } from 'vue'
import { indexOf } from 'lodash-es'

interface Rows {
	id: number
	name: string
}

interface Props {
	rows: Array<Rows> | null
	modelValue: number[]
}

interface IRow {
	id: number
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps<Props>()
const includes = ref<number[]>([])

const onClickRowExclude = (item: IRow) => {
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
		props.rows.map((item: IRow) => {
			if (indexOf(includes.value, item.id) == -1) {
				excludes.push(item.id)
			}
		})
		emit('update:modelValue', excludes)
	}
}

const updateIncludes = () => {
	if (props.rows) {
		includes.value = []
		props.rows.map((item: IRow) => {
			if (indexOf(props.modelValue, item.id) == -1) {
				includes.value.push(item.id)
			}
		})
	}
}

watch([() => props.modelValue, () => props.rows], () => updateIncludes(), { immediate: true })
</script>

<template>
	<div class="selectable-list">
		<div class="selectable-list-item" v-for="item in rows" :key="item.id" @click.stop="onClickRowExclude(item)">
			<span class="selectable-list-item-text">{{ item.name }}</span>
			<FormCheckbox v-model="includes" :value="item.id" switch />
		</div>
	</div>
</template>

<style lang="scss">
@import './RowExclude.scss';
</style>
