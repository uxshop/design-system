import type { ComponentOptions } from 'vue'
import Table from './Table.vue'
import TableCell from './TableCell.vue'
import TableRow from './TableRow.vue'
import TableHeadCell from '././TableHeadCell.vue'

export default {
	install(app: ComponentOptions, { prefix }: { prefix: string }) {
		app.component(`${prefix}Table`, Table)
		app.component(`${prefix}TableCell`, TableCell)
		app.component(`${prefix}TableRow`, TableRow)
		app.component(`${prefix}TableHeadCell`, TableHeadCell)
	}
}
