<script setup lang="ts">
import { ref } from 'vue'
import Skeleton from '../skeleton/Skeleton.vue'

interface Props {
	cols?: string | number
	rows?: string | number
	hideHeader?: boolean
	noBorder?: boolean
	withAction?: boolean | string | number
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
	<table class="ui-table ui-skeleton-table" :style="style" :class="{ '-no-border': noBorder }">
		<thead v-if="!hideHeader">
			<tr>
				<th v-for="c in Number(cols)" :key="c">
					<Skeleton />
				</th>
				<th width="1" v-for="c in Number(withAction)" :key="c"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in Number(rows)" :key="r">
				<td v-for="c in Number(cols)" :key="c">
					<ui-skeleton width="85%" />
				</td>
				<td width="1" v-for="c in Number(withAction)" :key="c">
					<ui-skeleton width="32px" height="32px" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss">
@import './SkeletonTable.scss';
</style>
