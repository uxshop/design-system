<script setup lang="ts">
import Skeleton from '../skeleton/Skeleton.vue'

interface Props {
	cols?: string | number
	rows?: string | number
}

withDefaults(defineProps<Props>(), {
	cols: 5,
	rows: 3
})
</script>

<template>
	<div class="ui-skeleton-list">
		<div class="ui-skeleton-list-item" v-for="r in Number(rows)" :key="r">
			<Skeleton width="50%" height="10px" />
		</div>
	</div>
</template>

<style lang="scss">
@import './SkeletonList.scss';
</style>
