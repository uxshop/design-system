<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{}>()

const classList = ref<string[]>([])
</script>

<template>
	<div class="table-list-row" :class="classList">
		<slot />
	</div>
</template>
