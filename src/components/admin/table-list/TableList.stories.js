import vueRouter from 'storybook-vue3-router'
import UiTableList from './TableList.vue'
import UiTableListItem from './TableListItem.vue'
import UiTableListHeader from './TableListHeader.vue'
import UiImage from '../../ui/image/Image.vue'
import TableListData from './__mocks__/TableListData'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/TableList',
	component: UiTableList,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { UiTableList, UiTableListItem, UiTableListHeader, UiImage },
	setup() {
		return { args }
	},
	template: `
    <ui-table-list v-bind="args">
      <template #head>
				<ui-table-list-header>Logo</ui-table-list-header>
				<ui-table-list-header>Nome</ui-table-list-header>
				<ui-table-list-header>Criado em</ui-table-list-header>
			</template>
      <template #default="{ item }">
        <ui-table-list-item width="1">
          <ui-image src="https://picsum.photos/id/11/500/300" />
        </ui-table-list-item>
        <ui-table-list-item>{{ item.name }}</ui-table-list-item>
        <ui-table-list-item class="date">{{ item.created_at }}</ui-table-list-item>   
      </template>
    </ui-table-list>
  `
})

export const Default = Template.bind({})
Default.args = {
	config: {
		placeholder: 'placeholder...',
		actions: ['remove'],
		sortable: ['name', 'created_at', 'updated_at'],
		presetFilters: [
			{
				name: 'Aguardando pagamento',
				filter: {
					payment_status: 'pending'
				}
			},
			{
				name: 'Aguardando atendimento',
				filter: {
					fulfillment_status: 'unfulfilled'
				}
			}
		],
		filters: {
			active: {
				name: 'Status',
				type: 'radio',
				filters: [
					{
						name: 'Ativo',
						value: 1
					},
					{
						name: 'Inativos',
						value: 0
					}
				]
			}
		},
		service: {
			get: () => {
				return TableListData
			}
		}
	}
}

Default.decorators = [vueRouter()]
