<script setup lang="ts">
import { clone, cloneDeep, each } from 'lodash-es'
import { ref, watch } from 'vue'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'
import Icon from '../../ui/icon/Icon.vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Button from '../../ui/button/Button.vue'
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import { VueEternalLoading, type LoadAction } from '@ts-pro/vue-eternal-loading'
import type { IApiResource } from '../../../types/IApiResource'
import Spinner from '../../ui/spinner/Spinner.vue'
import { zerofill } from '../../../filters'
import BrowserSelectDefaultVue from './snippets/BrowserSelectDefault.vue'
import BrowserSelectBrandVue from './snippets/BrowserSelectBrand.vue'
import BrowserSelectCustomerVue from './snippets/BrowserSelectCustomer.vue'
import Aside from '../../ui/aside/Aside.vue'
import BrowserSelectCategoryVue from './snippets/BrowserSelectCategory.vue'
import TextStyle from '../../ui/text-style/TextStyle.vue'

export interface Props {
	service: {
		get(params: never): Promise<IApiResource>
	}
	type?:
		| 'product'
		| 'brand'
		| 'category'
		| 'landing'
		| 'customer'
		| 'customer_group'
		| 'variant'
		| 'feature'
		| 'default'
	selectOne?: boolean
	selecteds?: number[]
	baseParams?: never
	searchBy?: string | null
	identifier?: string
	limit?: string | number
	title?: string
	modelValue?: any
}

const templates = {
	default: BrowserSelectDefaultVue,
	customer: BrowserSelectCustomerVue,
	brand: BrowserSelectBrandVue,
	category: BrowserSelectCategoryVue
}

type TypeItem = Record<string, unknown>

const emit = defineEmits(['update'])
const props = withDefaults(defineProps<Props>(), {
	selecteds: () => [],
	type: 'default',
	identifier: 'id',
	title: 'Buscar',
	limit: 0
})

const TIMER_INSTANT_SEARCH = 500

const term = ref()
const params = ref({ q: null, page: 1 })
const isInitial = ref(false)
const rows = ref<TypeItem[]>([])
const ids = ref(clone(props.selecteds))
const fetching = ref(true)
const typing = ref(false)
const aside = ref(false)
const memoryList = ref([])

const onEmptyTerm = () => {
	term.value = ''
	rows.value = []
}

const apply = () => {
	emit('update', { ids: ids.value, memoryList: memoryList.value })
	aside.value = false
}

const onRegisterBrandQuickly = () => {
	// this.$refs.newBrandModal.open().then((res) => {
	// 	if (res) {
	// 		pushOne(res)
	// 	}
	// })
}

const onRegisterCustomerQuickly = () => {
	// this.$refs.newCustomerModal.open().then((res) => {
	// 	if (res) {
	// 		pushOne(res)
	// 	}
	// })
}

const onCheckOne = (item: TypeItem, e: MouseEvent | KeyboardEvent) => {
	e.preventDefault()
	pushOne(item)
}

const pushOne = (item: TypeItem) => {
	memoryList.value.push(cloneDeep(item) as never)
	if (props.selectOne) {
		ids.value = [item[props.identifier]]
		apply()
	} else {
		if (ids.value.includes(item[props.identifier])) {
			ids.value = ids.value.filter((id: number) => {
				return id != item[props.identifier]
			})
		} else {
			ids.value.push(item[props.identifier])
		}
	}
}

// const load = async (context: LoadAction) => {
// 	console.log('LOAD', isComplete.value)
// }

const load = async (context: LoadAction) => {
	params.value.q = term.value
	const newParams = cloneDeep(params.value) as never
	const res = await props.service.get(newParams)
	params.value.page++

	rows.value = rows.value.concat(res.data)
	fetching.value = false

	if (res.meta.current_page == res.meta.last_page) {
		context.noMore()
	} else {
		context.loaded()
	}
}

const isSelected = (item) => {
	if (props.type === 'variants') {
		let isSelected = true
		let indeterminate = false
		each(item.variations, (variation) => {
			// Caso todas as variações estejam inclusas, marcar o checkbox do produto,
			// Se tiver variações inclusas, porém não todas, colocar marcado como indeterminado
			// Caso não tenha nenhum marcado, não colocar classe
			if (ids.value.includes(variation.id)) {
				indeterminate = true

				if (!isSelected) {
					return
				}
			} else {
				isSelected = false

				if (indeterminate) {
					return
				}
			}
		})

		return { active: isSelected, indeterminate: !isSelected ? indeterminate : false }
	} else {
		return { active: ids.value.includes(item[props.identifier]) }
	}
}

let timer: ReturnType<typeof setTimeout>

watch(
	() => term.value,
	(newVal, oldVal) => {
		clearTimeout(timer)

		if (newVal == null || oldVal == null) {
			return
		}

		if (newVal == oldVal) {
			return
		}

		typing.value = true
		timer = setTimeout(() => {
			typing.value = false
			fetching.value = true
			params.value = Object.assign(params.value, {
				q: newVal,
				page: 1
			})
			rows.value = []
			console.log('okkkk')

			isInitial.value = true
		}, TIMER_INSTANT_SEARCH)
	}
)

const getTemplate = () => {
	return templates[props.type] || templates.default
}

const open = ({ searchBy }) => {
	aside.value = true
	term.value = searchBy
}

defineExpose({
	open
})
</script>

<template>
	<Aside v-model="aside" :title="title" scrollable noCloseOnBackdrop>
		<div class="browser">
			<div class="browser-search" :class="type">
				<Row alignV="center">
					<Col>
						<div class="browser-serach-input">
							<FormTextfield v-model="term" placeholder="Procurar" autofocus last size="sm" autocomplete="off">
								<template #before>
									<div class="box-icon">
										<Spinner class="icon" size="15" border="2" v-show="typing" variant="primary" />
										<Icon class="icon" name="search" v-show="!typing" />
									</div>
								</template>
								<template #after>
									<Icon name="close" @click="onEmptyTerm" v-show="term" />
								</template>
							</FormTextfield>
						</div>
					</Col>
					<Col auto v-if="type === 'brand'">
						<Button size="sm" variant="primary" @click="onRegisterBrandQuickly">criar nova marca</Button>
					</Col>
					<Col auto v-if="type === 'customer'">
						<Button size="sm" variant="primary" @click="onRegisterCustomerQuickly">criar novo cliente</Button>
					</Col>
				</Row>
			</div>

			<!-- <EmptyData _v-show="!fetching && !rows.length" icon="youtube_searched_for" text="Nenhum registro encontrado" /> -->
			<div class="browser-search-list">
				<div
					v-for="item in rows"
					:key="String(item[identifier])"
					:class="{
						inactive: type == 'variants' && !item.active,
						disabled: limit >= 1 && limit == ids.length && !ids.includes(item[identifier])
					}"
					:tabindex="0"
					@click.stop="onCheckOne(item, $event)"
					@keyup.enter="onCheckOne(item, $event)"
					@keypress.space="onCheckOne(item, $event)"
					class="browser-list-row">
					<div class="browser-list-cell">
						<FormCheckbox :value="item.id" v-model="ids" no-events />
					</div>
					<component :is="getTemplate()" :item="item" />
				</div>
				<VueEternalLoading class="browser-search-loading" :load="load" v-model:is-initial="isInitial">
					<template #loading>
						<Spinner border="2" size="25" variant="dark" />
					</template>
					<template #no-more>
						<div class="loading-info">
							<TextStyle variant="muted">Sem mais resultados</TextStyle>
						</div>
					</template>
				</VueEternalLoading>
			</div>
		</div>

		<template #footer>
			<Button variant="primary" @click="apply"> Aplicar ({{ zerofill(ids.length) }} selecionados) </Button>
		</template>
	</Aside>
	<!-- <div class="browser">
		
		<base-modal ref="newBrandModal" title="Nova marca" inner>
			<BrandRegisterModal />
		</base-modal>

		<base-modal ref="newCustomerModal" title="Novo cliente" inner>
			<CustomerRegister />
		</base-modal>
	</div> -->
</template>

<style lang="scss">
@import './BrowserSelectModal.scss';
</style>
