import type { SideBarItem } from './types';

export default [
  {
    key: 'customers',
    name: 'Clientes',
    icon: 'account_circle',
    to: '',
    nodes: [
      {
        name: 'Meus clientes',
        key: 'my-customers',
        to: '',
      },
      {
        name: 'Contatos',
        key: 'mailing',
        to: '',
      },
    ],
  },
  {
    key: 'orders',
    name: 'Pedidos',
    icon: 'inbox',
    to: '',
    nodes: [
      {
        name: 'Meus pedidos',
        key: 'my-orders',
        to: '',
      },
    ],
  },
  {
    key: 'promotion',
    name: 'Promoções',
    icon: 'campaign',
    to: '',
    nodes: [
      {
        name: 'Cupons de desconto',
        key: 'discounts',
        to: '',
      },
      {
        name: 'Frete grátis',
        key: 'free-freight',
        to: '',
      },
    ],
  },
  {
    key: 'marketing',
    name: 'Marketing',
    icon: 'ads_click',
    to: '',
    nodes: [
      {
        name: 'SEO & Rastreamento',
        key: 'tracking-and-seo',
        to: '',
      },
      {
        name: 'E-mail marketing',
        key: 'campaign-mail',
        to: '',
      },
      {
        name: 'Google Shopping',
        key: 'google-shopping',
        to: '',
      },
      {
        name: 'Sacolinha do Instagram',
        key: 'facebook-catalog',
        to: '',
      },
    ],
  },
  {
    key: 'reports',
    name: 'Relatórios',
    icon: 'insights',
    to: '',
    nodes: [
      {
        name: 'Meus relatórios',
        key: 'my-reports',
        to: '',
      },
      {
        name: 'Análise de performance',
        to: '',
        key: 'performance-reports',
      },
    ],
  },
  {
    spacer: true,
    key: 'online-store',
    name: 'Loja virtual',
    icon: 'storefront',
    to: '',
    caption: 'minha loja',
    nodes: [
      {
        name: 'Editor visual',
        key: 'theme-editor-simple',
        to: '',
      },
    ],
  },
  {
    key: 'configuration',
    name: 'Configurações',
    dropdown: true,
    icon: 'settings',
    to: '',
    nodes: [
      {
        name: 'Configurações gerais',
        key: 'general-settings',
        to: '',
        icon: 'settings',
        text: 'Configure o nome da sua loja, dados de contato e endereço do seu negócio.',
      },
      {
        name: 'Usuários',
        key: 'users',
        to: '',
        icon: 'group',
        text: 'Cadastre novos usuários para sua equipe e defina as permissões de acesso.',
      },
      {
        name: 'Notificações',
        key: 'notifications',
        to: '',
        icon: 'mail',
        text: 'Configure os e-mails da sua loja e informe quem da sua equipe receberá as notificações.',
      },
    ],
  },
] as unknown as SideBarItem[];
