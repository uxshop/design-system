import StatsGroup from '../stats/StatsGroup.vue'

export const menus = {
	products: {
		section: 'products',
		name: 'Catálogo',
		icon: 'sell',
		permissions: 'products',
		to: 'products',
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
		icon: 'account_circle',
		to: 'customers',
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
		icon: 'inbox',
		to: 'orders',
		nodes: [
			{
				name: 'Pedidos',
				to: 'orders',
				permissions: 'orders'
			},
			{
				name: 'Rascunhos',
				to: 'drafts',
				permissions: 'drafts'
			},
			{
				name: 'Carrinhos abandonados',
				to: 'checkouts',
				permissions: 'checkouts'
			}
		]
	},
	marketing: {
		section: 'marketing',
		name: 'Marketing',
		icon: 'ads_click',
		to: 'coupons',
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
		to: 'reports',
		icon: 'insights'
	},
	'online-store': {
		spacer: true,
		section: 'online-store',
		name: 'Loja virtual',
		icon: 'storefront',
		to: 'preferences',
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
		permissions: 'marketplace',
		icon: 'hub',
		to: 'marketplace'
	},
	extension: {
		section: 'extension',
		name: 'Aplicativos',
		icon: 'extension',
		to: 'extensions',
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
		icon: 'settings',
		to: 'general',
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
	}
	// idea: {
	// 	name: 'Mural de ideias',
	// 	to: 'ideas',
	// 	permissions: ''
	// },
	// support: {
	// 	name: 'Ajuda',
	// 	to: 'support',
	// 	permissions: ''
	// }
}

export const routes = [
	{ path: '/', name: 'home', component: StatsGroup },
	{ path: '/categories', name: 'categories', component: StatsGroup },
	{ path: '/products', name: 'products', component: StatsGroup },
	{ path: '/kits', name: 'kits', component: StatsGroup },
	{ path: '/colors', name: 'colors', component: StatsGroup },
	{ path: '/options', name: 'options', component: StatsGroup },
	{ path: '/features', name: 'features', component: StatsGroup },
	{ path: '/brands', name: 'brands', component: StatsGroup },
	{ path: '/stocks', name: 'stocks', component: StatsGroup },
	{ path: '/customers', name: 'customers', component: StatsGroup },
	{ path: '/grupos', name: 'customers.groups', component: StatsGroup },
	{ path: '/orders', name: 'orders', component: StatsGroup },
	{ path: '/drafts', name: 'drafts', component: StatsGroup },
	{ path: '/checkouts', name: 'checkouts', component: StatsGroup },
	{ path: '/coupons', name: 'coupons', component: StatsGroup },
	{ path: '/freight', name: 'freight', component: StatsGroup },
	{ path: '/buy_and_get', name: 'buy_and_get', component: StatsGroup },
	{ path: '/mailing', name: 'mailing', component: StatsGroup },
	{ path: '/variation_request', name: 'variation_request', component: StatsGroup },
	{ path: '/preferences', name: 'preferences', component: StatsGroup },
	{ path: '/themes', name: 'themes', component: StatsGroup },
	{ path: '/menus', name: 'menus', component: StatsGroup },
	{ path: '/marketplace', name: 'marketplace', component: StatsGroup },
	{ path: '/checkout', name: 'checkout', component: StatsGroup },
	{ path: '/pages', name: 'pages', component: StatsGroup },
	{ path: '/hotsites', name: 'hotsites', component: StatsGroup },
	{ path: '/posts', name: 'posts', component: StatsGroup },
	{ path: '/scripts', name: 'scripts', component: StatsGroup },
	{ path: '/myextensions', name: 'my-extensions', component: StatsGroup },
	{ path: '/extensions', name: 'extensions', component: StatsGroup },
	{ path: '/apis', name: 'apis', component: StatsGroup },
	{ path: '/payments', name: 'payments', component: StatsGroup },
	{ path: '/carriers', name: 'carriers', component: StatsGroup },
	{ path: '/warehouse', name: 'warehouse', component: StatsGroup },
	{ path: '/notifications', name: 'notifications', component: StatsGroup },
	{ path: '/users', name: 'users', component: StatsGroup },
	{ path: '/billing', name: 'billing', component: StatsGroup },
	{ path: '/redirects', name: 'redirects', component: StatsGroup },
	{ path: '/taxes', name: 'taxes', component: StatsGroup },
	{ path: '/files', name: 'files', component: StatsGroup },
	{ path: '/support', name: 'support', component: StatsGroup },
	{ path: '/reports', name: 'reports', component: StatsGroup },
	{ path: '/domains', name: 'domains', component: StatsGroup },
	{ path: '/genera', name: 'general', component: StatsGroup }
]
