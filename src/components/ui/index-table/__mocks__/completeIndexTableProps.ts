import type { IndexTableProps } from '../types';

export const completeIndexTableProps: IndexTableProps = {
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    },
    {
      label: 'Outra',
      key: 'other',
      active: false,
    },
    { label: 'Alguma', key: 'any', active: false },
  ],
  ordination: [
    {
      key: 'name',
      label: 'Nome (A-z)',
      active: false,
    },
    {
      key: 'updated',
      label: 'Atualizados',
      active: false,
    },
    {
      key: 'created_at',
      label: 'Data de criação',
      active: true,
    },
  ],
  pagination: {
    from: 1,
    to: 25,
    size: 25,
    total: 100,
    page: 1,
  },
  bulkActions: [
    { label: 'Ativar registros', key: 'activate-records' },
    { label: 'Inativar registros', key: 'inactivate-records' },
  ],
  activeFilterTags: [{ key: 'teste', label: 'Teste' }],
  isLoading: false,
};
