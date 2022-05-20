<script setup lang="ts">
import { ref } from 'vue'
import Link from '../link/Link.vue'
import Avatar from '../avatar/Avatar.vue'
import Col from '../grid/col/Col.vue'
import Row from '../grid/row/Row.vue'
import Icon from '../icon/Icon.vue'
import { computed } from 'vue'

const props = defineProps<{
	modelValue?: any[]
	inputMessage?: boolean
}>()

const classList = ref<string[]>([])

const myComponent = (item: any) => {
	return {
		template: item.textRaw
	}
}
</script>

<template>
	<div class="ui-timeline ui-timeline-avatar">
		<div class="ui-timeline-input" v-if="inputMessage">
			<Row alignV="center">
				<Col>
					<Avatar size="40"></Avatar>
				</Col>
				<Col>
					<!-- <form action="" @submit.prevent="onSavePost" autocomplete="off">
						<div class="form-inner-button">
							<b-form-input required v-model="note" placeholder="Escreva um comentário..."></b-form-input>
							<b-button variant="dark" type="submit"> Postar </b-button>
						</div>
					</form> -->
				</Col>
			</Row>
		</div>
		<ul class="ui-timeline-list">
			<li class="ui-timeline-item" v-for="(item, key) in modelValue" :key="key">
				<div class="ui-timeline-item-wrapper">
					<div class="ui-timeline-item-content">
						<div class="ui-timeline-info">
							<div class="ui-timeline-item-title-wrapper">
								<component
									v-if="item.title"
									:is="item.titleTo ? Link : 'div'"
									:to="item.titleTo"
									class="ui-timeline-item-title">
									{{ item.title }}
								</component>
							</div>

							<div class="ui-timeline-item-text">
								<component v-if="item.textRaw" :is="myComponent(item)" />
								{{ item.text }}
							</div>

							<small class="ui-timeline-item-date">{{ item.date }}</small>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
@import './Timeline.scss';
</style>
