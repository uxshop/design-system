import type { ComponentOptions } from 'vue'
import tooltip from './directives/tooltip'

import modal from './components/ui/modal'
import breadcrumb from './components/ui/breadcrumb'
import grid from './components/ui/grid'
import card from './components/ui/card'
import dropdown from './components/ui/dropdown'
import listGroup from './components/ui/list-group'
import formSelect from './components/ui/form-select'
import pagination from './components/ui/pagination'
import tab from './components/ui/tab'

import Alert from './components/ui/alert/Alert.vue'
import Aside from './components/ui/aside/Aside.vue'
import Badge from './components/ui/badge/Badge.vue'
import Button from './components/ui/button/Button.vue'
import FormCheckbox from './components/ui/form-checkbox/FormCheckbox.vue'
import FormTextfield from './components/ui/form-textfield/FormTextfield.vue'
import FormTextarea from './components/ui/form-textarea/FormTextarea.vue'
import FormRadio from './components/ui/form-radio/FormRadio.vue'
import FormRange from './components/ui/form-range/FormRange.vue'
import FormLabel from './components/ui/form-label/FormLabel.vue'
import FormCurrency from './components/ui/form-currency/FormCurrency.vue'
import Divider from './components/ui/divider/Divider.vue'
import Select from './components/ui/form-autocomplete/FormAutocomplete.vue'
import Icon from './components/ui/icon/Icon.vue'
import FormSpinbutton from './components/ui/form-spinbutton/FormSpinbutton.vue'
import FormHelper from './components/ui/form-helper/FormHelper.vue'
import Stack from './components/ui/stack/Stack.vue'
import Spinner from './components/ui/spinner/Spinner.vue'
import Link from './components/ui/link/Link.vue'
import FormValidation from './components/ui/form-validation/FormValidation.vue'
import Avatar from './components/ui/avatar/Avatar.vue'
import Progress from './components/ui/progress/Progress.vue'
import Skeleton from './components/ui/skeleton/Skeleton.vue'
import SkeletonTable from './components/ui/skeleton-table/SkeletonTable.vue'
import SkeletonList from './components/ui/skeleton-list/SkeletonList.vue'
import Image from './components/ui/image/Image.vue'
import IconButton from './components/ui/icon-button/IconButton.vue'
import FormTags from './components/ui/form-tags/FormTags.vue'
import Tag from './components/ui/tag/Tag.vue'
import Toast from './components/ui/toast/Toast.vue'
import Dialog from './components/ui/dialog/Dialog.vue'
import TextStyle from './components/ui/text-style/TextStyle.vue'

// plus / com externos
import FormColorpicker from './components/ui/form-colorpicker/FormColorpicker.vue'
import FormRichtext from './components/ui/form-richtext/FormRichtext.vue'
import FormDatepicker from './components/ui/form-datepicker/FormDatepicker.vue'
import FormAutocomplete from './components/ui/form-autocomplete/FormAutocomplete.vue'

export default {
	install: (app: ComponentOptions) => {
		const prefix = 'Ui'

		app.directive('Tooltip', tooltip)

		app.use(modal, { prefix: prefix })
		app.use(breadcrumb, { prefix: prefix })
		app.use(grid, { prefix: prefix })
		app.use(card, { prefix: prefix })
		app.use(dropdown, { prefix: prefix })
		app.use(listGroup, { prefix: prefix })
		app.use(formSelect, { prefix: prefix })
		app.use(pagination, { prefix: prefix })
		app.use(tab, { prefix: prefix })

		app.component(`${prefix}Icon`, Icon)
		app.component(`${prefix}IconButton`, IconButton)
		app.component(`${prefix}Alert`, Alert)
		app.component(`${prefix}Aside`, Aside)
		app.component(`${prefix}Badge`, Badge)
		app.component(`${prefix}Button`, Button)
		app.component(`${prefix}FormCheckbox`, FormCheckbox)
		app.component(`${prefix}FormTextfield`, FormTextfield)
		app.component(`${prefix}FormTags`, FormTags)
		app.component(`${prefix}FormTextarea`, FormTextarea)
		app.component(`${prefix}FormRadio`, FormRadio)
		app.component(`${prefix}FormLabel`, FormLabel)
		app.component(`${prefix}FormRange`, FormRange)
		app.component(`${prefix}FormCurrency`, FormCurrency)
		app.component(`${prefix}Divider`, Divider)
		app.component(`${prefix}Select`, Select)
		app.component(`${prefix}FormSpinbutton`, FormSpinbutton)
		app.component(`${prefix}Spinner`, Spinner)
		app.component(`${prefix}Stack`, Stack)
		app.component(`${prefix}Link`, Link)
		app.component(`${prefix}FormValidation`, FormValidation)
		app.component(`${prefix}Avatar`, Avatar)
		app.component(`${prefix}Progress`, Progress)
		app.component(`${prefix}Skeleton`, Skeleton)
		app.component(`${prefix}SkeletonTable`, SkeletonTable)
		app.component(`${prefix}SkeletonList`, SkeletonList)
		app.component(`${prefix}Image`, Image)
		app.component(`${prefix}FormHelper`, FormHelper)
		app.component(`${prefix}Tag`, Tag)
		app.component(`${prefix}Toast`, Toast)
		app.component(`${prefix}Dialog`, Dialog)
		app.component(`${prefix}TextStyle`, TextStyle)

		// plus
		app.component(`${prefix}FormRichtext`, FormRichtext)
		app.component(`${prefix}FormColorpicker`, FormColorpicker)
		app.component(`${prefix}FormDatepicker`, FormDatepicker)
		app.component(`${prefix}FormAutocomplete`, FormAutocomplete)
	}
}
