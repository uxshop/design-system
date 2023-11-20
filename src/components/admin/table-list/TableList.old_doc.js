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
				<TableListItem auto>Logo</TableListItem>
				<TableListItem>Nome</TableListItem>
				<TableListItem>Criado em</TableListItem>
			</template>
      <template #default="{ item }">
        <TableListItem auto>
          <Image src="https://picsum.photos/id/11/500/300" />
        </TableListItem>
        <TableListItem @click.prevent="javascript:;">{{ item.name }}</TableListItem>
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
		// customFilterService: customFilterService,
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
