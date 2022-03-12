<script setup lang="ts">
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import { ref, watchEffect } from 'vue'
import indexOf from 'lodash/indexOf'

export default {
	name: 'RowExclude',
	components: { FormCheckbox },
	props: {
		rows: {
			type: Array,
			default() {
				return []
			}
		},
		modelValue: {
			type: Array,
			default() {
				return []
			}
		}
	},
	setup(props, { emit }) {
		const includes = ref([])

		const onClickRowExclude = (item) => {
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
			const excludes = []
			props.rows.map((item) => {
				if (indexOf(includes.value, item.id) == -1) {
					excludes.push(item.id)
				}
			})
			emit('update:modelValue', excludes)
		}

		const updateIncludes = () => {
			if (props.rows && props.modelValue) {
				includes.value = []
				props.rows.map((item) => {
					if (indexOf(props.modelValue, item.id) == -1) {
						includes.value.push(item.id)
					}
				})
			}
		}

		watchEffect(() => {
			props.modelValue && props.rows
			updateIncludes()
		})

		return {
			includes,
			onClickRowExclude
		}
	}
}
</script>

<template>
	<div class="selectable-list">
		<div class="selectable-list-item" v-for="item in rows" :key="item.id" @click.prevent="onClickRowExclude(item)">
			<form-checkbox v-model="includes" :value="item.id" switch> {{ item.name }} </form-checkbox>
		</div>
	</div>
</template>

<style lang="scss">
@import './RowExclude.scss';
</style>
