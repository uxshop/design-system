import type { ComponentOptions } from 'vue';
import Breadcrumb from './UiBreadcrumb.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';

export default {
  install(app: ComponentOptions, { prefix }: { prefix: string }) {
    app.component(`${prefix}Breadcrumb`, Breadcrumb);
    app.component(`${prefix}BreadcrumbItem`, BreadcrumbItem);
  },
};

export { Breadcrumb, BreadcrumbItem };
