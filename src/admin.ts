import type { ComponentOptions } from 'vue'

import Layout from './components/admin/layout/Layout.vue'
import Apexchart from './components/admin/apexchart/Apexchart.vue'
import Titlebar from './components/admin/titlebar/Titlebar.vue'
import EmptyData from './components/admin/empty-data/EmptyData.vue'
import FrameAnnotation from './components/admin/frame-annotation/FrameAnnotation.vue'
import FormRegister from './components/admin/form-register/FormRegister.vue'
import CardAnnotation from './components/admin/card-annotation/CardAnnotation.vue'
import Sidebar from './components/admin/sidebar/Sidebar.vue'
import TableList from './components/admin/table-list/TableList.vue'
import PageHelperVideo from './components/admin/page-helper-video/PageHelperVideo.vue'
import PageHelper from './components/admin/page-helper/PageHelper.vue'
import ButtonAction from './components/admin/button-action/ButtonAction.vue'
import RowExclude from './components/admin/row-exclude/RowExclude.vue'
import CardActive from './components/admin/card-active/CardActive.vue'
import StatsGroup from './components/admin/stats/StatsGroup.vue'
import Codemirror from './components/admin/codemirror/Codemirror.vue'
import Savebar from './components/admin/savebar/Savebar.vue'
import Topbar from './components/admin/topbar/Topbar.vue'
import Seo from './components/admin/seo/Seo.vue'
import CardSeo from './components/admin/card-seo/CardSeo.vue'

import table from './components/admin/table/index'

const prefix = 'Ui'

export default {
	install: (app: ComponentOptions) => {
		app.use(table, { prefix: prefix })

		app.component(`${prefix}Layout`, Layout)
		app.component(`${prefix}Titlebar`, Titlebar)
		app.component(`${prefix}EmptyData`, EmptyData)
		app.component(`${prefix}Apexchart`, Apexchart)
		app.component(`${prefix}FrameAnnotation`, FrameAnnotation)
		app.component(`${prefix}FormRegister`, FormRegister)
		app.component(`${prefix}CardAnnotation`, CardAnnotation)
		app.component(`${prefix}Sidebar`, Sidebar)
		app.component(`${prefix}PageHelperVideo`, PageHelperVideo)
		app.component(`${prefix}PageHelper`, PageHelper)
		app.component(`${prefix}ButtonAction`, ButtonAction)
		app.component(`${prefix}TableList`, TableList)
		app.component(`${prefix}RowExclude`, RowExclude)
		app.component(`${prefix}CardActive`, CardActive)
		app.component(`${prefix}StatsGroup`, StatsGroup)
		app.component(`${prefix}Codemirror`, Codemirror)
		app.component(`${prefix}Savebar`, Savebar)
		app.component(`${prefix}Topbar`, Topbar)
		app.component(`${prefix}Seo`, Seo)
		app.component(`${prefix}CardSeo`, CardSeo)
	}
}
