import Aside from './Aside.vue'

export default {
	install(app) {
		app.component(Aside.name, Aside)
	}
}

export { Aside }
