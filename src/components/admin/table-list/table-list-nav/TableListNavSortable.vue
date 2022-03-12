<template>
	<span class="table-list-nav-item" v-show="sortable.length">
		<ui-dropdown variant="default" right>
			<template #button-content>
				<span class="table-list-nav-btn" v-tooltip:top="`Ordenar registros`">
					<icon name="sort_by_alpha" />
				</span>
			</template>
			<ui-dropdown-item-button
				v-for="item in sortable"
				@click="onSortBy(item)"
				:key="item.sort"
				:active="queryParams.sort == item.sort"
			>
				<input type="radio" v-model="queryParams.sort" :value="item.sort" />
				<span class="ml-2">
					{{ item.name }}
				</span>
			</ui-dropdown-item-button>
		</ui-dropdown>
	</span>
</template>

<script>
import { onMounted, ref } from 'vue'
import Icon from '../../../ui/icon/Icon.vue'
export default {
	components: { Icon },
	props: {
		configSortable: {
			type: Array,
			default: () => []
		},
		queryParams: Object
	},
	emits: ['setQueryParams'],
	setup(props) {
		const sortable = ref([])
		const onSortBy = (item) => {
			emit('setQueryParams', {
				sort: item.sort,
				page: 1
			})
		}
		onMounted(() => {
			props.configSortable.map((item) => {
				if (typeof item === 'object') {
					sortable.value.push(item)
				}
				switch (item) {
					case 'created_at':
						sortable.value.push({ name: 'Criado em (antigos primeiro)', sort: 'id' })
						sortable.value.push({ name: 'Criado em (novos primeiro)', sort: '-id' })
						break
					case 'updated_at':
						sortable.value.push({ name: 'Atualizado (antigos primeiro)', sort: 'updated_at' })
						sortable.value.push({ name: 'Atualizado (novos primeiro)', sort: '-updated_at' })
						break
					case 'name':
						sortable.value.push({ name: 'Nome (A-Z)', sort: 'name' })
						sortable.value.push({ name: 'Nome (Z-A)', sort: '-name' })
						break
					case 'balance':
						sortable.value.push({ name: 'Quantidade em estoque (menores primeiro)', sort: 'balance' })
						sortable.value.push({ name: 'Quantidade em estoque (maiores primeiro)', sort: '-balance' })
						break
				}
			})
		})
		return {
			sortable,
			onSortBy
		}
	}
}
</script>
