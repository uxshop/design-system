<template>
	<span class="table-list-nav-item hide-sm">
		<ui-dropdown
			right
			size="sm"
			no-caret
			variant="white"
			ref="dropdown"
			:disabled="disableButton"
			no-flip
			@show="onShowDropdown"
			@hide="onHideDropdown"
		>
			<template v-slot:button-content>
				<span class="d-flex-center" v-if="checkTabSave">
					<icon name="bookmark_border" />
					<span>Salvar</span>
				</span>
				<span v-else class="d-flex-center">
					<icon name="bookmark" />
					<span>Editar aba</span>
				</span>
			</template>
			<form class="p-2" @submit.prevent="onSubmitFilter" autocomplete="off">
				<form-textfield
					placeholder="Nome do filtro"
					size="sm"
					style="min-width: 25rem"
					autofocus
					v-model="reg.name"
					required
					pill
				/>
				<small class="d-block px-2">Os filtros são salvos como uma nova aba no topo desta lista.</small>
				<div class="row align-items-center mt-3">
					<div class="col">
						<ui-button variant="danger" size="sm" @click="onRemoveTab" v-if="currentTab && currentTab.id">
							Remover
						</ui-button>
					</div>
					<div class="col-auto">
						<ui-button pill variant="success" type="submit" :disabled="isLoading">Salvar</ui-button>
					</div>
				</div>
			</form>
		</ui-dropdown>
		<base-dialog ref="dialog" type="confirm" destruct-label="Entendi" destruct-variant="primary" title="Atenção">
			Você só pode ter <b>{{ max }}</b> filtros por sessão.
		</base-dialog>
	</span>
</template>

<script>
import _omit from 'lodash/omit'
import _keys from 'lodash/keys'
import _filter from 'lodash/filter'
import _pick from 'lodash/pick'
import FormTextfield from '@/components/ui/form-textfield/FormTextfield.vue'
import Icon from '@/components/ui/icon/Icon.vue'

export default {
	components: { FormTextfield, Icon },

	props: {
		currentTab: Object,
		queryParams: Object,
		omitFilters: Object,
		tabs: Array
	},
	data() {
		return {
			max: 5,
			reg: {
				name: null
			}
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters.isLoading
		},
		disableButton() {
			if (this.queryParams.customFilterId) {
				return false
			}
			if (_keys(this.omitFilters).length && this.queryParams.selectedView == 'all') {
				return false
			}
			return true
		},
		checkTabSave() {
			if (this.queryParams.customFilterId) {
				return false
			}
			return true
		}
	},
	methods: {
		onShowDropdown() {
			if (this.currentTab && this.currentTab.id) {
				this.reg = {
					name: this.currentTab.name,
					id: this.currentTab.id,
					filter: this.currentTab.filter
				}
			} else if (_filter(this.tabs, 'id').length >= this.max) {
				this.$refs.dropdown.hide(true)
				this.$refs.dialog.open()
			}
		},
		onHideDropdown() {
			this.reg = {}
		},
		onRemoveTab() {
			this.$refs.dropdown.hide(true)
			this.$api('/custom-filters/:id')
				.delete({
					id: this.currentTab.id
				})
				.then(() => {
					this.$growl.open('Filtro deletado com sucesso')
					this.$emit('remove-tab', this.currentTab)
				})
				.catch((err) => {
					console.log(err)
				})
		},
		onSubmitFilter() {
			const api = this.$api('/custom-filters/:id')
			const filters = _omit(this.queryParams, this.$parent.omitFiltersValues)
			if (this.currentTab && this.currentTab.id) {
				this.reg.filter = filters
				api
					.put({ id: this.currentTab.id }, _pick(this.reg, ['name', 'filter']))
					.then(() => {
						this.$refs.dropdown.hide(true)
						this.$set(this.currentTab, 'name', this.reg.name)
						this.$growl.open('Nome do filtro editado com sucesso')
					})
					.catch((err) => {
						this.$refs.dropdown.hide(true)
						console.log(err)
					})
			} else {
				api
					.post({
						resource: this.$parent.config.model.name,
						name: this.reg.name,
						filter: filters
					})
					.then((res) => {
						this.$growl.open('Filtro cadastrado com sucesso')
						this.$emit('add-tab', res)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
}
</script>
