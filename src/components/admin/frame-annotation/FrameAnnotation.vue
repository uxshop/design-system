<script setup lang="ts">
import Col from '../../ui/grid/col/Col.vue'
import Row from '../../ui/grid/row/Row.vue'
import CardAnnotation from '../card-annotation/CardAnnotation.vue'

defineProps<{
	title: string
}>()
</script>

<template>
	<Row>
		<Col cols="3" sm="12" class="d-sm-none">
			<CardAnnotation :title="title">
				<slot name="annotation" />
			</CardAnnotation>
		</Col>
		<Col cols="8" sm="12" offset-sm="1">
			<slot />
		</Col>
	</Row>
</template>
