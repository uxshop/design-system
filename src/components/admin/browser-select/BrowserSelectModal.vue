<script setup lang="ts">
import { ref, watch } from 'vue';
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue';
import Icon from '../../ui/icon/Icon.vue';
import Row from '../../ui/grid/row/Row.vue';
import Col from '../../ui/grid/col/Col.vue';
import Button from '../../ui/button/Button.vue';
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue';
import Spinner from '../../ui/spinner/Spinner.vue';
import { zerofill } from '../../../filters';
import BrowserSelectDefaultVue from './snippets/BrowserSelectDefault.vue';
import Aside from '../../ui/aside/Aside.vue';
import InfiniteScroll, { type IContext } from '../../ui/infinite-scroll/InfiniteScroll.vue';

import { withDefaults } from 'vue';
import type { BrowserSelectProps } from './type';

const templates = {
  default: BrowserSelectDefaultVue,
};

type TypeItem = Record<string, unknown>;

const emit = defineEmits(['update']);
const props = withDefaults(defineProps<BrowserSelectProps>(), {
  type: 'default',
  identifier: 'id',
  title: 'Buscar',
  limit: 0,
});

// const props = defineProps<BrowserSelectProps>();

const TIMER_INSTANT_SEARCH = 500;
const term = ref<string>();
const params = ref({ q: null, page: 1 });
const InfiniteScrollRef = ref();
const rows = ref<TypeItem[]>([]);
const ids = ref();
const fetching = ref(true);
const typing = ref(false);
const aside = ref(false);
const memoryList = ref([]);
let timer: ReturnType<typeof setTimeout>;

const onEmptyTerm = () => {
  term.value = '';
  rows.value = [];
};

const apply = () => {
  emit('update', { ids: ids.value, memoryList: memoryList.value });
  aside.value = false;
};

const onCheckOne = (item: TypeItem, e: MouseEvent | KeyboardEvent) => {
  e.preventDefault();
  pushOne(item);
};

const pushOne = (item: TypeItem) => {
  memoryList.value.push(structuredClone(item) as never);
  if (props.selectOne) {
    ids.value = [item[props.identifier]];
    apply();
  } else {
    if (ids.value.includes(item[props.identifier])) {
      ids.value = ids.value.filter((id: number) => {
        return id != item[props.identifier];
      });
    } else {
      ids.value.push(item[props.identifier]);
    }
  }
};

const load = async (context: IContext) => {
  const newParams: any = structuredClone(params.value) as never;
  newParams.q = term.value;
  const res = await props.service.get(newParams);
  params.value.page++;

  rows.value = rows.value.concat(res.data);
  fetching.value = false;

  if (res.meta.current_page >= res.meta.last_page) {
    context.noMore();
  } else {
    context.loaded();
  }
};

watch(
  () => term.value,
  (newVal, oldVal) => {
    clearTimeout(timer);

    if (newVal == null || oldVal == null) {
      return;
    }

    if (newVal == oldVal) {
      return;
    }

    typing.value = true;
    timer = setTimeout(() => {
      typing.value = false;
      fetching.value = true;
      params.value = Object.assign(params.value, {
        q: newVal,
        page: 1,
      });
      rows.value = [];
      InfiniteScrollRef.value.reset();
    }, TIMER_INSTANT_SEARCH);
  }
);

const getTemplate = () => {
  if (props.templateCustom) {
    return props.templateCustom;
  }
  return templates.default;
};

const resetParams = () => {
  params.value = { q: null, page: 1 };
  rows.value = [];
};

const open = ({ searchBy, selectedIds }: any) => {
  resetParams();

  aside.value = true;
  ids.value = structuredClone(selectedIds);
  term.value = searchBy;
};

defineExpose({
  open,
});
</script>

<template>
  <Aside v-model="aside" :title="title" scrollable noCloseOnBackdrop scrollable-content-id="browser-select-scrollable">
    <div class="ui-browser">
      <div class="ui-browser-search">
        <Row alignV="center">
          <Col>
            <div class="ui-browser-search-input">
              <FormTextfield v-model="term" placeholder="Procurar" autofocus last size="md" autocomplete="off">
                <template #before>
                  <div class="box-icon">
                    <Spinner class="icon" size="16" border="2" v-show="typing" variant="primary" />
                    <Icon class="icon" name="search" v-show="!typing" size="20" />
                  </div>
                </template>
                <template #after>
                  <Icon name="close" @click="onEmptyTerm" v-show="term" />
                </template>
              </FormTextfield>
            </div>
          </Col>
        </Row>
      </div>

      <div class="ui-browser-search-list">
        <div
          v-for="item in rows"
          :key="String(item[identifier])"
          :class="{ disabled: limit >= 1 && limit == ids.length && !ids.includes(item[identifier]) }"
          :tabindex="0"
          @click.stop="onCheckOne(item, $event)"
          @keyup.enter="onCheckOne(item, $event)"
          @keypress.space="onCheckOne(item, $event)"
          class="ui-browser-list-row">
          <div class="ui-browser-list-cell">
            <FormCheckbox :value="item[identifier]" v-model="ids" />
          </div>
          <component :is="getTemplate()" :item="item" modal />
        </div>
        <InfiniteScroll :load="load" ref="InfiniteScrollRef" scrollable-element-id="browser-select-scrollable" />
      </div>
    </div>

    <template #footer>
      <Button variant="primary" @click="apply">
        Aplicar ({{ ids.length < 10 ? zerofill(ids.length) : ids.length || 0 }}
        {{ ids.length == 1 ? 'selecionado' : 'selecionados' }})
      </Button>
    </template>
  </Aside>
</template>

<style lang="scss">
@import './BrowserSelectModal.scss';
</style>
