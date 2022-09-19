<script setup lang="ts">
import { ref } from 'vue'
import InfiniteLoading, { type IContext } from './components/ui/infinite-scroll/InfiniteScroll.vue'
import { easepick } from '@easepick/bundle'

console.log(easepick)

const items = ref(0)
const InfiniteLoadingRef = ref()

const load = (context: IContext) => {
	console.log('laod', items.value)

	items.value += 10

	if (items.value > 100) {
		context.noMore()
	} else {
		context.loaded()
	}
}

const reset = () => {
	items.value = 0
	InfiniteLoadingRef.value.reset()
}
</script>
<template>
	<div class="content">
		<ul>
			<li v-for="item in items">Teste - {{ item }}</li>
		</ul>
		<InfiniteLoading :load="load" spinnerSize="10" ref="InfiniteLoadingRef" />
	</div>

	<button @click="reset">teste</button>
</template>

<style lang="scss">
.content {
	max-height: 100px;
	overflow-y: auto;
	background-color: red;
}
</style>
