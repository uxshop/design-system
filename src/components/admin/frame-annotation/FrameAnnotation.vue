<script setup lang="ts">
import Col from '../../ui/grid/col/Col.vue'
import Row from '../../ui/grid/row/Row.vue'
import CardAnnotation from '../card-annotation/CardAnnotation.vue'

defineProps<{
	title?: string
	annotation?: string
}>()
</script>

<template>
	<div class="ui-frame-annotation">
		<Row>
			<Col cols="4" sm="12">
				<div class="pr-4">
					<CardAnnotation :title="title">
						<slot name="annotation">
							{{ annotation }}
						</slot>
					</CardAnnotation>
				</div>
			</Col>
			<Col cols="8" sm="12">
				<slot />
			</Col>
		</Row>
	</div>
</template>

<style lang="scss">
@import './FrameAnnotation.scss';
</style>
