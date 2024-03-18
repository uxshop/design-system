<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../../ui/modal/Modal.vue'
import SelectItemCard from '../../ui/select-item-card/SelectItemCard.vue'
import type { IPlatform } from './PlatformSelectTypes'

const isOpen = ref(false)
const platforms = ref<IPlatform[]>([])

const emits = defineEmits(['onChosenPlatform'])

const selectPlatform = (item: IPlatform) => {
	emits('onChosenPlatform', item)
}

const open = (platformsAvailable: IPlatform[]) => {
	platforms.value = platformsAvailable
	isOpen.value = true
}

const close = () => {
	isOpen.value = false
}

defineExpose({ open, close })
</script>

<template>
	<Modal
		class="modal-container"
		v-model="isOpen"
		title="O que você gostaria de gerenciar?"
		caption="Selecione o módulo abaixo e tenha acesso a novos recursos.">
		<div class="items-container">
			<SelectItemCard
				v-for="item in platforms"
				:name="item.name"
				@click="selectPlatform(item)"
				:description="item.description"
				:icon="item.icon" />
		</div>
	</Modal>
</template>

<style lang="scss">
.modal-container {
	.ui-modal-content {
		padding-bottom: var(--s-spacing-small);
	}
	.items-container {
		display: flex;
		flex-direction: column;
		gap: var(--s-spacing-x-small);
	}
}
</style>
