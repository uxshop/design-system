import type { ComponentOptions } from 'vue';
import Pagination from './UiPagination.vue';
import PaginationItem from './PaginationItem.vue';

export default {
  install(app: ComponentOptions, { prefix }: { prefix: string }) {
    app.component(`${prefix}Pagination`, Pagination);
    app.component(`${prefix}PaginationItem`, PaginationItem);
  },
};
