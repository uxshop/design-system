<script setup lang="ts">
import { ref } from 'vue'
import UiSkeleton from '../skeleton/Skeleton.vue'

interface Props {
	cols?: string | number
	rows?: string | number
	hideHeader?: boolean
	width?: string
}

const props = withDefaults(defineProps<Props>(), {
	cols: 5,
	rows: 3
})

const style = ref<{
	width?: string
}>({})

if (props.width) {
	style.value.width = `${props.width}`
}
</script>

<template>
	<table class="ui-table ui-skeleton-table" :style="style">
		<thead v-if="!hideHeader">
			<tr>
				<th v-for="c in cols" :key="c">
					<ui-skeleton />
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in rows" :key="r">
				<td v-for="c in cols" :key="c">
					<ui-skeleton width="85%" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss">
@import './SkeletonTable.scss';
</style>
