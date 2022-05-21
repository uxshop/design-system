<script setup lang="ts">
import { ref } from 'vue'
import Skeleton from '../skeleton/Skeleton.vue'

interface Props {
	cols?: string | number
	rows?: string | number
	hideHeader?: boolean
	noBorder?: boolean
	withAction?: boolean | string | number
	withAvatar?: boolean
	width?: string
	lines?: string | number
	padding?: string
}

const props = withDefaults(defineProps<Props>(), {
	cols: 5,
	rows: 3,
	padding: '12px'
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
				<th v-if="withAvatar"></th>
				<th v-for="c in Number(cols)" :key="c">
					<Skeleton />
				</th>
				<th width="1" v-for="c in Number(withAction)" :key="c"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in Number(rows)" :key="r">
				<td width="1" v-if="withAvatar">
					<Skeleton width="40px" height="40px" style="border-radius: 100%" />
				</td>
				<td v-for="c in Number(cols)" :key="c">
					<Skeleton width="85%" />
					<Skeleton width="40%" height="10px" v-if="Number(lines) > 1" />
				</td>
				<td width="1" v-for="c in Number(withAction)" :key="c">
					<Skeleton width="32px" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="scss">
@import './SkeletonTable.scss';
.ui-skeleton-table th,
.ui-skeleton-table td {
	padding: v-bind('padding');
}
</style>
