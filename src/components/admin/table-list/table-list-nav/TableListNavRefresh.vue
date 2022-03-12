<script setup lang="ts">
import IconButton from '../../../ui/icon-button/IconButton.vue'

const emit = defineEmits(['refresh'])
let refreshTime: ReturnType<typeof setTimeout> | number
const onRefreshTable = () => {
	if (!refreshTime) {
		refreshTime = setTimeout(() => (refreshTime = 0), 2000)
		emit('refresh')
	}
}
</script>

<template>
	<span class="table-list-nav-item hide-sm" v-tooltip:top="`Atualizar`" @click="onRefreshTable">
		<IconButton class="table-list-nav-btn" icon="refresh" size="sm" />
	</span>
</template>
