export default {
	products: {
		section: 'products',
		name: 'Catálogo',
		permissions: 'products',
		nodes: [
			{
				name: 'Categorias',
				to: 'categories',
				permissions: 'products'
			},
			{
				name: 'Produtos',
				to: 'products',
				permissions: 'products'
			},
			{
				name: 'Kits',
				to: 'kits',
				permissions: 'products'
			},
			{
				name: 'Cores',
				to: 'colors',
				permissions: 'products'
			},
			{
				name: 'Atributos',
				to: 'options',
				permissions: 'products'
			},
			{
				name: 'Características',
				to: 'features',
				permissions: 'products'
			},
			{
				name: 'Marcas',
				to: 'brands',
				permissions: 'products'
			},
			{
				name: 'Estoques',
				to: 'stocks',
				permissions: 'products'
			}
		]
	},
	customers: {
		section: 'customers',
		name: 'Clientes',
		nodes: [
			{
				name: 'Clientes',
				to: 'customers',
				permissions: 'customers'
			},
			{
				name: 'Grupos',
				to: 'customers.groups',
				permissions: 'customer_groups'
			}
		]
	},
	orders: {
		section: 'orders',
		name: 'Pedidos',
		nodes: [
			{
				name: 'Pedidos',
				to: 'orders',
				permissions: 'orders'
			},
			{
				name: 'Rascunhos (beta)',
				to: 'drafts',
				permissions: 'drafts'
			},
			{
				name: 'Carrinhos <br/>abandonados',
				to: 'checkouts',
				permissions: 'checkouts'
			}
		]
	},
	marketings: {
		section: 'marketing',
		name: 'Marketing',
		nodes: [
			{
				name: 'Cupom de desconto',
				to: 'coupons',
				permissions: 'discounts'
			},
			{
				name: 'Frete grátis',
				to: 'freight',
				permissions: 'discounts'
			},
			{
				name: 'Compre & Ganhe',
				to: 'buy_and_get',
				permissions: 'discounts'
			},
			{
				name: 'Mailing',
				to: 'mailing',
				permissions: 'mailings'
			},
			{
				name: 'Avise-me',
				to: 'variation_request',
				permissions: 'variation_requests'
			}
		]
	},
	reports: {
		section: 'reports',
		name: 'Relatórios',
		permissions: 'reports',
		to: 'reports'
	},
	'online-store': {
		spacer: true,
		section: 'online-store',
		name: 'Loja virtual',
		nodes: [
			{
				name: 'Preferências',
				to: 'preferences',
				permissions: 'shops'
			},
			{
				name: 'Meus temas',
				to: 'themes',
				permissions: 'themes'
			},
			{
				name: 'Navegação',
				to: 'menus',
				permissions: 'menus'
			},
			{
				name: 'Checkout',
				to: 'checkout',
				permissions: 'shops'
			},
			{
				name: 'Páginas',
				to: 'pages',
				permissions: 'pages'
			},
			{
				name: 'Hotsites',
				to: 'hotsites',
				permissions: 'hotsites'
			},
			{
				name: 'Blog',
				to: 'posts',
				permissions: 'posts'
			},
			{
				name: 'Domínios',
				to: 'domains',
				permissions: 'domains'
			},
			{
				name: 'Scripts',
				to: 'scripts',
				permissions: 'scripts'
			}
		]
	},
	marketplace: {
		section: 'marketplace',
		name: 'Marketplace',
		to: 'marketplace',
		permissions: 'marketplace'
	},
	extension: {
		section: 'extension',
		name: 'Aplicativos',
		nodes: [
			{
				name: 'Meus apps',
				to: 'my-extensions',
				permissions: 'apps'
			},
			{
				name: 'Aplicativos',
				to: 'extensions',
				permissions: 'apps'
			},
			{
				name: 'API',
				to: 'apis',
				permissions: 'apps'
			}
		]
	},
	configuration: {
		last: true,
		section: 'configuration',
		name: 'Configurações',
		nodes: [
			{
				name: 'Geral',
				to: 'general',
				permissions: 'shops'
			},
			{
				name: 'Pagamentos',
				to: 'payments',
				permissions: 'payments'
			},
			{
				name: 'Formas de envio',
				to: 'carriers',
				permissions: 'carriers'
			},
			{
				name: 'Centro de distribuição',
				to: 'warehouse',
				permissions: 'warehouse'
			},
			{
				name: 'Notificações',
				to: 'notifications',
				permissions: 'notifications'
			},
			{
				name: 'Usuários',
				to: 'users',
				permissions: ''
			},
			{
				name: 'Financeiro',
				to: 'billing',
				permissions: 'billings'
			},
			{
				name: 'Redirect 301',
				to: 'redirects',
				permissions: 'redirects'
			},
			{
				name: 'Taxas adicionais',
				to: 'taxes',
				permissions: 'taxes'
			},
			{
				name: 'Arquivos',
				to: 'files',
				permissions: 'files'
			}
		]
	},
	idea: {
		name: 'Mural de ideias',
		to: 'ideas',
		permissions: ''
	},
	support: {
		name: 'Ajuda',
		to: 'support',
		permissions: ''
	}
}
