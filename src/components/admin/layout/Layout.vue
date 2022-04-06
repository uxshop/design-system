<script setup lang="ts">
import { ref } from 'vue'

const scrolled = ref(false)

const onScroll = (e: UIEvent) => {
	const target = e.target as HTMLDivElement
	scrolled.value = target.scrollTop > 20
}
</script>

<template>
	<div class="ui-layout" @scroll="onScroll" id="wrapper" :class="{ '-scrolled': scrolled }">
		<div class="ui-layout-sidebar">
			<slot name="sidebar" />
		</div>
		<div class="ui-layout-navbar">
			<slot name="navbar" />
		</div>
		<!-- <not-found v-if="notFound" /> -->

		<div class="ui-layout-content">
			<router-view v-slot="{ Component }">
				<transition name="slide-fade" mode="out-in">
					<div class="ui-layout-content-page">
						<component :is="Component" />
					</div>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<style lang="scss">
@import './Layout.scss';
</style>
