import UiAside from './Aside.vue'

export default {
  install(app) {
    app.component(UiAside.name, UiAside)
  }
}

export { UiAside }
