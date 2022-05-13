import vueRouter from 'storybook-vue3-router'
import TableList from './TableList.vue'
import TableListItem from './TableListItem.vue'
import TableListHeader from './TableListHeader.vue'
import Image from '../../ui/image/Image.vue'
import TableListData from './__mocks__/TableListData'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/TableList',
	component: TableList,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { TableList, TableListItem, TableListHeader, Image },
	setup() {
		return { args }
	},
	template: `
    <TableList v-bind="args">
      <template #head>
				<TableListHeader>Logo</TableListHeader>
				<TableListHeader>Nome</TableListHeader>
				<TableListHeader>Criado em</TableListHeader>
			</template>
      <template #default="{ item }">
        <TableListItem width="1">
          <Image src="https://picsum.photos/id/11/500/300" />
        </TableListItem>
        <TableListItem>{{ item.name }}</TableListItem>
        <TableListItem class="date">{{ item.created_at }}</TableListItem>   
      </template>
    </TableList>
  `
})

const customFilterService = {
	delete: (id) => {
		console.log('deletar id');
	}
}

export const Default = Template.bind({})
Default.args = {
	config: {
		placeholder: 'placeholder...',
		actions: ['remove'],
		sortable: ['name', 'created_at', 'updated_at'],
		customFilterService: customFilterService,
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
