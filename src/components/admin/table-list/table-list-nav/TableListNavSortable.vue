<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Icon from '../../../ui/icon/Icon.vue'
import Dropdown from '../../../ui/dropdown/Dropdown.vue'
import DropdownItemButton from '../../../ui/dropdown/DropdownItemButton.vue'
import FormRadio from '../../../ui/form-radio/FormRadio.vue'
import IconButton from '../../../ui/icon-button/IconButton.vue'
import Button from '../../../ui/button/Button.vue'

const props = withDefaults(
	defineProps<{
		setQueryParams(a: Record<string, any>): void
		sortable: any
		queryParams: any
	}>(),
	{
		sortable: () => []
	}
)

console.log(props)

const sortableFinal = ref<
	Array<{
		name: string
		sort: string
	}>
>([])

const onSortBy = (item: any) => {
	props.setQueryParams({
		sort: item.sort,
		page: 1
	})
}

onMounted(() => {
	props.sortable.map((item: any) => {
		if (typeof item === 'object') {
			sortableFinal.value.push(item)
		}
		switch (item) {
			case 'created_at':
				sortableFinal.value.push({ name: 'Criado em (antigos primeiro)', sort: 'id' })
				sortableFinal.value.push({ name: 'Criado em (novos primeiro)', sort: '-id' })
				break
			case 'updated_at':
				sortableFinal.value.push({ name: 'Atualizado (antigos primeiro)', sort: 'updated_at' })
				sortableFinal.value.push({ name: 'Atualizado (novos primeiro)', sort: '-updated_at' })
				break
			case 'name':
				sortableFinal.value.push({ name: 'Nome (A-Z)', sort: 'name' })
				sortableFinal.value.push({ name: 'Nome (Z-A)', sort: '-name' })
				break
			case 'balance':
				sortableFinal.value.push({ name: 'Quantidade em estoque (menores primeiro)', sort: 'balance' })
				sortableFinal.value.push({ name: 'Quantidade em estoque (maiores primeiro)', sort: '-balance' })
				break
		}
	})
})
</script>

<template>
	<span class="table-list-nav-item" v-show="sortableFinal.length">
		<Dropdown variant="default" right>
			<template #button-content>
				<span class="table-list-nav-btn">
					<!-- <IconButton icon="sort_by_alpha" size="sm" /> -->
					<Button size="sm" label="Ordenar" leadingIcon="sort_by_alpha" />
				</span>
			</template>
			<DropdownItemButton
				v-for="item in sortableFinal"
				@click="onSortBy(item)"
				:key="item.sort"
				:active="queryParams.sort == item.sort">
				<FormRadio v-model="queryParams.sort" :value="item.sort" :label="item.name" />
			</DropdownItemButton>
		</Dropdown>
	</span>
</template>
