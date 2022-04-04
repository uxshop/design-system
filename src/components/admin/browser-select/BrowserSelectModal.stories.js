import BrowserSelectModal from './BrowserSelectModal.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/BrowserSelectModal',
	component: BrowserSelectModal,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { BrowserSelectModal },
	setup() {
		return { args }
	},
	template: `
    <BrowserSelectModal v-bind="args">
      Meu BrowserSelect 
    </BrowserSelectModal>
  `
})

const service = {
	get(params) {
		console.log(params)
		return {
			data: [
				{
					id: 3,
					name: 'Padr\u00e3o',
					markup: '1.00000',
					min_purchase: '0.00',
					min_quantity: 1,
					is_default: true,
					is_selectable: false,
					customers_count: 869
				},
				{
					id: 129,
					name: 'Lojista (Compra M\u00ednima De 10 Pe\u00e7as E R$1.000,00)',
					markup: '0.62000',
					min_purchase: '1000.00',
					min_quantity: 10,
					is_default: false,
					is_selectable: false,
					customers_count: 0
				}
			],
			links: {
				first: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
				last: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
				prev: null,
				next: null
			},
			meta: {
				current_page: 1,
				from: 1,
				last_page: 1,
				path: 'http://localhost/dooca/apiv1/public/customers/groups',
				per_page: 25,
				to: 2,
				total: 2
			}
		}
	}
}

export const Default = Template.bind({})
Default.args = {
	type: 'brand',
	title: 'Marcas',
	service: service
}

export const Category = Template.bind({})
Category.args = {
	type: 'category',
	title: 'Categorias',
	service: {
		get(params) {
			console.log(params)
			return {
				data: [
					{
						id: 3,
						name: 'Feminino',
						active: true,
						breadcrumb: 'Feminino'
					},
					{
						id: 1,
						name: 'Bolsas',
						active: true,
						breadcrumb: 'Feminino > Bolsas'
					},
					{
						id: 2,
						name: 'Masculino',
						active: false,
						breadcrumb: 'Masculino'
					}
				],
				links: {
					first: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
					last: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
					prev: null,
					next: null
				},
				meta: {
					current_page: 1,
					from: 1,
					last_page: 1,
					path: 'http://localhost/dooca/apiv1/public/customers/groups',
					per_page: 25,
					to: 2,
					total: 2
				}
			}
		}
	}
}
