<script setup lang="ts">
import FormTextfield from '../../../ui/form-textfield/FormTextfield.vue'
import type { ITableListState } from '../types/ITableListState'

export interface Props {
	state: ITableListState
	placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Procurar registros'
})

const onSubmit = () => {
	props.state.setQueryParams({
		q: props.state.term,
		page: 1
	})
}

let timerT: ReturnType<typeof setTimeout>

const update = (e = null) => {
	clearTimeout(timerT)
	timerT = setTimeout(
		() => {
			props.state.setQueryParams({
				q: props.state.term,
				page: 1
			})
		},
		e ? 750 : 0
	)
}

const onClear = () => {
	props.state.term = null
	update()
}
</script>

<template>
	<span class="table-list-nav-item table-search">
		<form autocomplete="off" @submit.prevent="onSubmit">
			<div class="table-search-input">
				<FormTextfield
					leadingIcon="search"
					clearable
					@clear="onClear"
					v-model="state.term"
					id="term"
					:placeholder="placeholder"
					last />
			</div>
		</form>
	</span>
</template>

<style lang="scss">
@import './TableListNav.scss';
</style>
