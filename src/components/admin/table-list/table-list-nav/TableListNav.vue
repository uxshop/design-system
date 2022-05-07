<script setup lang="ts">
import TableListNavLoader from '../table-list-nav-loader/TableListNavLoader.vue'

interface Props {
	config: any
	loading: boolean
	setQueryParams(a: Record<string, any>): void
	removeFilter(a: string): void
	queryParams: Record<string, any>
	selected: any
	meta: any
	rows: any
}

withDefaults(defineProps<Props>(), {
	selected: [],
	meta: {},
	rows: []
})

const emit = defineEmits([
	'checkAll',
	'refresh',
	'inactiveSelecteds',
	'activeSelecteds',
	'removeSelecteds',
	'resetQueryParams'
])

const checkAll = (val: boolean) => {
	emit('checkAll', val)
}

const resetQueryParams = (data: Record<string, any>) => {
	emit('resetQueryParams', data)
}
</script>

<template>
	<div class="table-list-nav">
		<div class="table-list-nav-wrapper">
			<div class="table-list-nav-content">
				<slot />
			</div>
			<TableListNavLoader :loading="loading" />
		</div>
	</div>
</template>

<style lang="scss">
@import './TableListNav.scss';
</style>
