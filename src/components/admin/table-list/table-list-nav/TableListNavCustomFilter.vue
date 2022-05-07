<script setup lang="ts">
import Dropdown from '../../../ui/dropdown/Dropdown.vue'
import Button from '../../../ui/button/Button.vue'
// export default {
// 	components: { FormTextfield, Icon },

// 	props: {
// 		currentTab: Object,
// 		queryParams: Object,
// 		omitFilters: Object,
// 		tabs: Array
// 	},
// 	data() {
// 		return {
// 			max: 5,
// 			reg: {
// 				name: null
// 			}
// 		}
// 	},
// 	computed: {
// 		isLoading() {
// 			return this.$store.getters.isLoading
// 		},
// 		disableButton() {
// 			if (this.queryParams.customFilterId) {
// 				return false
// 			}
// 			if (_keys(this.omitFilters).length && this.queryParams.selectedView == 'all') {
// 				return false
// 			}
// 			return true
// 		},
// 		checkTabSave() {
// 			if (this.queryParams.customFilterId) {
// 				return false
// 			}
// 			return true
// 		}
// 	},
// 	methods: {
// 		onShowDropdown() {
// 			if (this.currentTab && this.currentTab.id) {
// 				this.reg = {
// 					name: this.currentTab.name,
// 					id: this.currentTab.id,
// 					filter: this.currentTab.filter
// 				}
// 			} else if (_filter(this.tabs, 'id').length >= this.max) {
// 				this.$refs.dropdown.hide(true)
// 				this.$refs.dialog.open()
// 			}
// 		},
// 		onHideDropdown() {
// 			this.reg = {}
// 		},
// 		onRemoveTab() {
// 			this.$refs.dropdown.hide(true)
// 			this.$api('/custom-filters/:id')
// 				.delete({
// 					id: this.currentTab.id
// 				})
// 				.then(() => {
// 					this.$growl.open('Filtro deletado com sucesso')
// 					this.$emit('remove-tab', this.currentTab)
// 				})
// 				.catch((err) => {
// 					console.log(err)
// 				})
// 		},
// 		onSubmitFilter() {
// 			const api = this.$api('/custom-filters/:id')
// 			const filters = _omit(this.queryParams, this.$parent.omitFiltersValues)
// 			if (this.currentTab && this.currentTab.id) {
// 				this.reg.filter = filters
// 				api
// 					.put({ id: this.currentTab.id }, _pick(this.reg, ['name', 'filter']))
// 					.then(() => {
// 						this.$refs.dropdown.hide(true)
// 						this.$set(this.currentTab, 'name', this.reg.name)
// 						this.$growl.open('Nome do filtro editado com sucesso')
// 					})
// 					.catch((err) => {
// 						this.$refs.dropdown.hide(true)
// 						console.log(err)
// 					})
// 			} else {
// 				api
// 					.post({
// 						resource: this.$parent.config.model.name,
// 						name: this.reg.name,
// 						filter: filters
// 					})
// 					.then((res) => {
// 						this.$growl.open('Filtro cadastrado com sucesso')
// 						this.$emit('add-tab', res)
// 					})
// 					.catch((err) => {
// 						console.log(err)
// 					})
// 			}
// 		}
// 	}
// }
</script>

<template>
	<span class="table-list-nav-item -custom-filter">
		<Dropdown right ref="dropdown" _disabled="disableButton">
			<template #button-content>
				<Button label="Salvar filtro" leadingIcon="star" size="sm" />
			</template>
			<!-- <form class="p-2" @submit.prevent="onSubmitFilter" autocomplete="off">
				<form-textfield
					placeholder="Nome do filtro"
					size="sm"
					style="min-width: 25rem"
					autofocus
					v-model="reg.name"
					required />
				<small class="d-block px-2">Os filtros são salvos como uma nova aba no topo desta lista.</small>
				<div class="row align-items-center mt-3">
					<div class="col">
						<ui-button variant="danger" size="sm" @click="onRemoveTab" v-if="currentTab && currentTab.id">
							Remover
						</ui-button>
					</div>
					<div class="col-auto">
						<ui-button variant="success" type="submit" :disabled="isLoading">Salvar</ui-button>
					</div>
				</div>
			</form> -->
		</Dropdown>
		<!-- <base-dialog ref="dialog" type="confirm" destruct-label="Entendi" destruct-variant="primary" title="Atenção">
			Você só pode ter <b>{{ max }}</b> filtros por sessão.
		</base-dialog> -->
	</span>
</template>
