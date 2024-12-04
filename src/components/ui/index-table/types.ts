export interface KeyLabelDefault {
  label: string;
  key: string;
}

export interface Tab extends KeyLabelDefault {
  active: boolean;
}

export interface IndexTableTabsProps {
  /** Abas a exibir no componente */
  tabs: Tab[];
}

export interface IndexTableTabsEmits {
  /** Quando as abas estão visíveis essa ação é disparada ao clicar em uma aba  */
  (event: 'open-tab', key: string): void;
}

export interface ActionsToShow {
  select: boolean;
  reload: boolean;
  search: boolean;
  customFilters: boolean;
  filters: boolean;
  bulkActionDelete: boolean;
}

export interface IndexTablePaginationItemProps {
  from: number;
  to: number;
  page: number;
  size: number;
  total: number;
}

export interface ActionOrdination extends KeyLabelDefault {
  active: boolean;
}

export interface IndexTableOrderButtonProps {
  ordination: null | ActionOrdination[];
}

export interface IndexTableActionsProps extends IndexTableOrderButtonProps {
  show: ActionsToShow;
  /** Quando o valor null é passado libera o slot #pagination para o uso do componente desejado */
  pagination: null | IndexTablePaginationItemProps;
  /** Define quais tags de filtros estão aplicados a tabela no momento */
  activeFilterTags: KeyLabelDefault[];
  /** Define quais ações em massa serão exibidas ao selecionar itens da listagem */
  bulkActions: KeyLabelDefault[];
  isLoading: boolean;
  /** Usado para simular a aplicação de uma busca desejada na listagem, como no caso de obter a busca de query params da URL por exemplo */
  searchValue?: string;
  /** Usado para definir o valor do checkbox responsável por selecionar todos os itens. Quando `null` tem o aspecto indeterminate e quando `true` é exibido como checado */
  checkboxSelectAllValue?: boolean | null;
}

export interface IndexTableOrderButtonEmits {
  /** Ação disparada ao clicar em um botão de ordenação */
  (event: 'order-by', key: string): void;
}

export interface IndexTableActionsSlots {
  actions(): unknown;
  ['action-pagination'](): unknown;
  ['bulk-actions'](): unknown;
}

export interface IndexTablePaginationItemEmits {
  /** Ação disparada quando o componente tem a paginação padrão e clica para avançar para a próxima página */
  (event: 'next-page'): void;
  /** Ação disparada quando o componente tem a paginação padrão e clica para voltar para a página anterior */
  (event: 'previous-page'): void;
}

export interface IndexTableActionsEmits extends IndexTableOrderButtonEmits, IndexTablePaginationItemEmits {
  /** Ação disparada no clique para limpar o campo de pesquisa */
  (event: 'clear-search'): void;
  /** Ação disparada ao efetuar uma pesquisa */
  (event: 'search', word: string): void;
  /** Ação disparada no clique para recarregar a listagem */
  (event: 'reload'): void;
  /** Ação disparada no botão `Filtros`, não necessário se o mesmo estiver oculto. */
  (event: 'filters'): void;
  /** Ação disparada no botão `Salvar` do dropdown pertencente aos filtros customizados do botão `Salvar filtro`, enviando os filtros customizados ativos no momento. */
  (event: 'save-custom-filter', activeFilters: KeyLabelDefault[]): void;
  /** Ação disparada ao clicar no checkbox da seção de ações que seleciona todos os itens da listagem, não necessário se o mesmo estiver oculto. Envia o valor setado no checkbox. */
  (event: 'select-all', value: boolean | null): void;
  /** Ação disparada ao clicar no botão "Deletar" exibido ao selecionar itens da tabela */
  (event: 'delete-selected-items'): void;
  /** Ação disparada ao clicar em uma das ações em massa listadas por padrão no componente */
  (event: 'bulk-action', key: string): void;
  /** Ação disparada ao clicar no botão fechar de uma tag de filtro da listagem */
  (event: 'remove-filter', tagFilter: KeyLabelDefault): void;
}

export interface ColsToShow {
  select: boolean;
}

export interface IndexTableListProps<T> {
  /** Lista de items a serem exibidos na tabela com o tipo de objeto que for desejado */
  items: T[];
  /** Define as colunas da tabela */
  fields?: KeyLabelDefault[];
  show?: ColsToShow;
  /** Usado para definir o valor do checkbox responsável por selecionar todos os itens. Quando `null` tem o aspecto indeterminate e quando `true` é exibido como checado */
  checkboxSelectAllValue?: boolean | null;
}

export interface IndexTablePropShow extends ActionsToShow {
  tabs: boolean;
}

/** Nome do item selecionado na tabela, contendo o seu indice na tabela */
export type NameItemTableSelected = `item-${number}`;

/**
 * Emits privados usados internamente pelo componente
 */
export interface IndexTableListPrivateEmits {
  /** Quando todos itens são selecionados, emite essa ação para indicar a seleção do checkbox geral para o componente superior, serve apenas para controlar isso */
  (event: 'selected-all-items', key: boolean | null): void;
}

/**
 * Emits públicos usados externamente pelo componente
 */
export interface IndexTableListPublicEmits<T> {
  /** Quando um item é selecionado é emitida essa ação mandando a key que consiste de uma string `item-{index}` sendo index o número do índice do item na lista  */
  (event: 'selected-items', items: T[]): void;
}

export interface IndexTableListEmits<T> extends IndexTableListPrivateEmits, IndexTableListPublicEmits<T> {}

interface SlotCellProps<T> {
  item: T;
  row: number;
}

interface SlotHeadProps {
  field: KeyLabelDefault;
  label: string;
}

export interface IndexTableListSlots<T> {
  [key: `cell(${string})`]: (props: SlotCellProps<T>) => void;
  [key: `head(${string})`]: (props: SlotHeadProps) => void;
}

export interface IndexTableEmptyMessageProps {
  emptyListMessage?: string;
}

export interface IndexTableProps<T>
  extends IndexTableTabsProps,
    Omit<IndexTableActionsProps, 'show'>,
    IndexTableListProps<T> {
  /** Define quais elementos internos serão exibidos no componente */
  show?: IndexTablePropShow;
}

export interface IndexTableEmits<T> extends IndexTableTabsEmits, IndexTableActionsEmits, IndexTableListPublicEmits<T> {}

export interface IndexTableSlots<T> extends IndexTableActionsSlots, IndexTableListSlots<T> {}
