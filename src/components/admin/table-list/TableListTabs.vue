<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { each, isObject } from 'lodash'
import { slugify } from '../../../filters'
import CustomScroll from '../../ui/custom-scroll/CustomScroll.vue'

interface TabInterface {
	name: string
	view: string
	filter: Record<string, any>
}

interface FilterInterface {
	name: string
	view: string
	filter: Record<string, any>
}

const props = defineProps<{
	presetFilters?: Record<string, any>
	queryParams?: Record<string, any>
}>()

const emit = defineEmits<{
	(e: 'resetQueryParams'): void
	(e: 'setQueryParams', val: any): void
}>()

const tabs = ref<FilterInterface[]>([])
const currentTab = ref<TabInterface | null>(null)

const setPresetFilter = (item: Record<string, any>) => {
	emit('resetQueryParams')

	if (item.view) {
		emit('setQueryParams', {
			selectedView: item.view
		})
	}

	if (item.id) {
		// this.$delete(this.$parent.queryParams, 'selectedView')
		// this.$set(this.$parent.queryParams, 'customFilterId', item.id)
	}
}

const resetFilters = () => {
	// this.$parent.resetQueryParams()
	// this.$parent.queryParams.selectedView = 'all'
	// this.$parent.term = null
}

const getCustomFilters = async () => {
	tabs.value = []

	each(props.presetFilters, (item: FilterInterface | string) => {
		if (isObject(item)) {
			item.view = slugify(item.name)
			tabs.value.push(item)
		}

		if (item == 'active') {
			tabs.value.push({ name: 'Ativo', view: 'ativo', filter: { active: 1 } })
			tabs.value.push({ name: 'Inativo', view: 'inativo', filter: { active: 0 } })
		}
	})

	// this.$api('/custom-filters')
	// 	.get({ resource: this.$parent.config.model.name })
	// 	.then((res) => {
	// 		tabs.value.push(...res.data)
	// 		this.getCurrentTab()
	// 	})
}

onMounted(() => {
	getCustomFilters()
})
</script>

<template>
	<CustomScroll
		class="table-list-tabs scroll-area"
		:settings="{
			maxScrollbarLength: 80,
			useBothWheelAxes: true,
			suppressScrollY: true
		}"
	>
		<div class="table-list-tabs-item" :class="{ '-active': currentTab == null }" @click="resetFilters">Todos</div>
		<div
			class="table-list-tabs-item"
			@click="setPresetFilter(item)"
			v-for="item in tabs"
			:class="{ '-active': item == currentTab }"
			:key="item.name"
		>
			{{ item.name }}
		</div>
	</CustomScroll>
</template>

<style lang="scss">
@import '../../../scss/mixins.scss';

.table-list-tabs {
	display: flex;
	position: relative;
	background: inherit;
	height: 62px;
	overflow: hidden;

	.table-list-tabs-item {
		display: inline-flex;
		position: relative;
		white-space: nowrap;
		color: var(--body-color);
		padding: 20px;
		cursor: pointer;
		font-weight: var(--font-weight-semi);
		align-items: center;
		opacity: 0.7;
		z-index: 88;

		&::after {
			content: '';
			height: 0;
			background: transparet;
			width: 100%;
			position: absolute;
			bottom: 0;
			display: block;
			left: 0;
			transition: height 0.2s;
		}

		&:hover {
			color: var(--primary);
			opacity: 1;

			&::after {
				background: var(--primary);
				height: 3px;
			}
		}

		&.-active {
			pointer-events: none;
			opacity: 1;
			font-weight: var(--font-weight-bold);
		}

		&.-active::after {
			background: var(--secondary);
			height: 3px;
		}

		&.-disabled {
			color: var(--text-muted);
		}
	}

	@include mobile {
		height: auto;
		padding-bottom: 20px;
		margin: 0 -20px;
		padding-left: 20px;

		.table-list-tabs-item {
			border-radius: 30px;
			padding: 10px 20px;
			height: 30px;
			&:after {
				display: none;
			}
		}

		.table-list-tabs-item.active {
			background: var(--primary);
			color: #fff;
		}
	}

	.ps .ps__rail-x {
		max-height: 4px;
		&:hover {
			background: rgba(0, 0, 0, 0.2) !important;
		}
	}

	.ps__rail-x > .ps__thumb-x {
		max-height: 0;
	}

	.ps__rail-x:hover > .ps__thumb-x {
		height: 0;
	}
}
</style>
