import UiBreadcrumb from './Breadcrumb.vue'
import UiBreadcrumbItem from './BreadcrumbItem.vue'

export default {
  install(app) {
    app.component(UiBreadcrumb.name, UiBreadcrumb)
    app.component(UiBreadcrumbItem.name, UiBreadcrumbItem)
  }
}

export { UiBreadcrumb, UiBreadcrumbItem }
