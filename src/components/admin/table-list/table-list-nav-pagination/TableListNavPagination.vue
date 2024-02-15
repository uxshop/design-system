<script setup lang="ts">
import type { ITableListState } from '../types/ITableListState'
import IconButton from '../../../ui/icon-button/IconButton.vue'
const props = defineProps<{
	meta: any
	state: ITableListState
}>()

const prevPage = () => {
	let page = props.state.queryParams.page
	if (page > 1) {
		props.state.setQueryParams({
			page: --page
		})
	}
}

const nextPage = () => {
	let page = props.state.queryParams.page
	if (props.meta.last_page > page) {
		props.state.setQueryParams({
			page: ++page
		})
	}
}
</script>

<template>
	<div class="table-list-pagination">
		<div class="table-list-pagination-list">
			<div class="table-list-pagination-item meta" v-show="meta.from">
				{{ meta.from }} – {{ meta.to }} {{ meta.total ? 'de ' + meta.total : '' }}
			</div>
			<div class="table-list-pagination-item prev">
				<IconButton
					size="md"
					@click="prevPage"
					icon="arrow_back"
					:disabled="1 == meta.current_page"
					class="table-list-nav-btn prev" />
			</div>
			<div class="table-list-pagination-item next">
				<IconButton
					size="md"
					@click="nextPage"
					icon="arrow_forward"
					:disabled="meta.last_page == meta.current_page || !meta.total"
					class="table-list-nav-btn next" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './TableListNavPagination.scss';
</style>
