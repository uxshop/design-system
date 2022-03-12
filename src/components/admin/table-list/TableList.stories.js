import vueRouter from 'storybook-vue3-router'
import UiTableList from './TableList.vue'
import UiTableListItem from './TableListItem.vue'
import UiTableListHeader from './TableListHeader.vue'
import UiImage from '../../ui/image/Image.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/TableList',
  component: UiTableList,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiTableList, UiTableListItem, UiTableListHeader, UiImage },
  setup() {
    const getSrc = () => {
      return `https://picsum.photos/id/11/500/300`
    }
    return { args, getSrc }
  },
  template: `
    <ui-table-list v-bind="args">
      <template #head>
				<ui-table-list-header>Logo</ui-table-list-header>
				<ui-table-list-header>Nome</ui-table-list-header>
				<ui-table-list-header>Criado em</ui-table-list-header>
			</template>
      <template #default="{ item }">
        <ui-table-list-item width="1">
          <ui-image :src="getSrc(item)" />
        </ui-table-list-item>
        <ui-table-list-item>{{ item.name }}</ui-table-list-item>
        <ui-table-list-item class="date">{{ item.created_at }}</ui-table-list-item>   
      </template>
    </ui-table-list>
  `,
})

const data = { "data": [{ "id": 6759, "external_id": null, "hotsite_id": null, "name": "Sumar\u00e9 23", "slug": "sumare", "description": null, "short_description": null, "image": null, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 11, "url": "https:\/\/www.enluaze.com.br\/sumare", "active": false, "created_at": "2020-05-02 14:44:36", "updated_at": "2021-04-14 14:14:03" }, { "id": 2547, "external_id": null, "hotsite_id": null, "name": "Enluaze", "slug": "enluaze", "description": null, "short_description": null, "image": null, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 10, "url": "https:\/\/www.enluaze.com.br\/enluaze", "active": false, "created_at": "2019-12-17 14:42:07", "updated_at": "2021-04-14 14:14:04" }, { "id": 1076, "external_id": null, "hotsite_id": null, "name": "VV Carteiras", "slug": "vv-carteiras", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/vv-carteiras.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 9, "url": "https:\/\/www.enluaze.com.br\/vv-carteiras", "active": true, "created_at": "2019-08-02 09:43:13", "updated_at": "2021-04-07 01:19:14" }, { "id": 1075, "external_id": null, "hotsite_id": null, "name": "Vira Vento Exclusive", "slug": "vira-vento-exclusive", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/vira-vento-exclusive.png?v=1565705472", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 8, "url": "https:\/\/www.enluaze.com.br\/vira-vento-exclusive", "active": true, "created_at": "2019-08-02 09:43:12", "updated_at": "2021-04-07 01:19:14" }, { "id": 1074, "external_id": null, "hotsite_id": null, "name": "Lauliz", "slug": "lauliz", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/lauliz.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 7, "url": "https:\/\/www.enluaze.com.br\/lauliz", "active": true, "created_at": "2019-08-02 09:42:18", "updated_at": "2021-04-07 01:19:15" }, { "id": 1073, "external_id": null, "hotsite_id": null, "name": "Vira Vento", "slug": "vira-vento", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/vira-vento.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 6, "url": "https:\/\/www.enluaze.com.br\/vira-vento", "active": true, "created_at": "2019-08-02 09:42:18", "updated_at": "2021-04-07 01:19:15" }, { "id": 1072, "external_id": null, "hotsite_id": null, "name": "AV Cintos", "slug": "av-cintos", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/marca-avcinto.png?v=1568486271", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 5, "url": "https:\/\/www.enluaze.com.br\/av-cintos", "active": true, "created_at": "2019-08-02 09:42:17", "updated_at": "2021-04-07 01:19:17" }, { "id": 1071, "external_id": null, "hotsite_id": null, "name": "VV Cintos", "slug": "vv-cintos", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/vv-cintos.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 4, "url": "https:\/\/www.enluaze.com.br\/vv-cintos", "active": true, "created_at": "2019-08-02 09:41:33", "updated_at": "2021-04-07 01:19:18" }, { "id": 1070, "external_id": null, "hotsite_id": null, "name": "AV Carteiras", "slug": "av-carteiras", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/av-carteiras.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 3, "url": "https:\/\/www.enluaze.com.br\/av-carteiras", "active": true, "created_at": "2019-08-02 09:41:32", "updated_at": "2021-04-07 01:19:19" }, { "id": 1069, "external_id": null, "hotsite_id": null, "name": "Bellaniz", "slug": "bellaniz", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/bellaniz.png?v=1564753175", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 2, "url": "https:\/\/www.enluaze.com.br\/bellaniz", "active": true, "created_at": "2019-08-02 09:41:32", "updated_at": "2021-04-07 01:19:19" }, { "id": 1068, "external_id": null, "hotsite_id": null, "name": "Andrea Vinci", "slug": "andrea-vinci", "description": null, "short_description": null, "image": { "src": "http:\/\/api.dooca.local\/files\/3\/brands\/andrea-vinci.png?v=1564753174", "mime": null, "alt": null, "size": null }, "banner": null, "meta_title": null, "meta_keywords": null, "meta_description": null, "position": 1, "url": "https:\/\/www.enluaze.com.br\/andrea-vinci", "active": true, "created_at": "2019-08-02 09:41:31", "updated_at": "2021-04-07 01:19:20" }], "links": { "first": "http:\/\/localhost\/dooca\/api-current\/public\/brands?sort=-id&limit=25&selectedView=all&_=1634663410929&page=1", "last": "http:\/\/localhost\/dooca\/api-current\/public\/brands?sort=-id&limit=25&selectedView=all&_=1634663410929&page=1", "prev": null, "next": null }, "meta": { "current_page": 1, "from": 1, "last_page": 1, "path": "http:\/\/localhost\/dooca\/api-current\/public\/brands", "per_page": 25, "to": 11, "total": 11 } }

export const Default = Template.bind({})
Default.args = {
  config: {
    placeholder: 'placeholder...',
    actions: ['remove'],
    preset_filters: [{
      "name": "Aguardando pagamento",
      "filter": {
        "payment_status": "pending"
      }
    },
    {
      "name": "Aguardando atendimento",
      "filter": {
        "fulfillment_status": "unfulfilled"
      }
    }],
    "filters": {
      "active": {
        "name": "Status",
        "type": "radio",
        "filters": [
          {
            "name": "Ativo",
            "value": 1
          },
          {
            "name": "Inativos",
            "value": 0
          }
        ]
      }
    },
    service: {
      get: () => {
        // return { "data": [], "links": { "first": "http:\/\/localhost\/dooca\/api-current\/public\/posts?sort=-id&limit=25&selectedView=all&_=1645376212696&page=1", "last": "http:\/\/localhost\/dooca\/api-current\/public\/posts?sort=-id&limit=25&selectedView=all&_=1645376212696&page=1", "prev": null, "next": null }, "meta": { "current_page": 1, "from": null, "last_page": 1, "path": "http:\/\/localhost\/dooca\/api-current\/public\/posts", "per_page": 25, "to": null, "total": 0 } }
        return data
      }
    }
  }
}

Default.decorators = [
  vueRouter()
]
