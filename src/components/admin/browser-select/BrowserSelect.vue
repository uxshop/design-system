<script setup lang="ts">
import { ref, watch } from 'vue';
import { chunk, cloneDeep, each, find, first, isArray } from 'lodash-es';
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue';
import Button from '../../ui/button/Button.vue';
import IconButton from '../../ui/icon-button/IconButton.vue';
import Link from '../../ui/link/Link.vue';
import BrowserSelectModal from './BrowserSelectModal.vue';

export interface Props {
  modelValue: any;
  templateCustom?: any;
  id?: string;
  service: {
    get(params: any): any;
    first(id: number): any;
  };
  selectOne?: boolean;
  title?: string;
  hideList?: boolean;
  hideExcludeButton?: boolean;
  searchDisabled?: boolean;
  noFetch?: boolean;
  hideBtn?: boolean;
  size?: string | number;
  thumbSize?: string | number;
  selectType?: 'btn' | 'input';
  list?: any;
  limit?: number;
  identifier?: string;
  placeholder?: string;
  paginateListLimit?: number;
}

const emit = defineEmits(['remove', 'change', 'update:modelValue', 'update']);
const props = withDefaults(defineProps<Props>(), {
  thumbSize: 50,
  type: 'product',
  placeholder: 'Selecione',
  identifier: 'id',
  limit: 0,
  paginateListLimit: 5,
});

const searchBy = ref<string | null>(null);
const term = ref<string | null>(null);
const selectedIds = ref<number[]>([]);
const rows = ref<any[]>([]);
const memoryList = ref([]);
const paginateStart = ref(0);
const paginateLimit = ref(props.paginateListLimit);
const browserSelectModalRef = ref();

const onClickSearch = () => {
  browserSelectModalRef.value.open({
    selectedIds: selectedIds.value,
    searchBy: searchBy.value,
  });
};

const onChangeTerm = () => {
  if (term.value && term.value.length > 1) {
    searchBy.value = String(term.value);
    term.value = null;
    onClickSearch();
  }
};

const nextPage = async () => {
  paginateLimit.value += 5;
};

const onRemoveItem = (item: any) => {
  emit('remove', item);

  if (find(rows.value, { [props.identifier]: item[props.identifier] })) {
    rows.value = rows.value.filter((obj) => {
      return obj[props.identifier] != item[props.identifier];
    });
  } else {
    rows.value.push(item[props.identifier]);
  }

  selectedIds.value = rows.value.map((item) => {
    return item[props.identifier];
  });

  updateInput(selectedIds.value);
};

const updateInput = (ids: number[]) => {
  const input = formatInput(ids);
  emit('update:modelValue', input);
  emit('update', input);
};

const formatInput = (ids: number[]) => {
  if (props.selectOne) {
    return first(ids) || null;
  }
  return ids;
};

const getFromMemoryList = (newRows: unknown[]) => {
  each(selectedIds.value, (id) => {
    const item = find(memoryList.value, { [props.identifier]: id });

    if (item) {
      newRows.push(item);
    }
  });
};

const getItemsList = async () => {
  const items = [];
  const chunkSize = 25;
  const paginatedIds = chunk(selectedIds.value, chunkSize);
  for (const ids of paginatedIds) {
    const res = await props.service.get({
      ids: ids.join(','),
    });
    items.push(...res.data);
  }
  return items;
};

const fetch = async () => {
  let newRows: unknown[] = [];

  if (selectedIds.value.length) {
    getFromMemoryList(newRows);

    if (newRows.length != selectedIds.value.length) {
      if (props.selectOne) {
        const id = selectedIds.value[0];
        newRows = await props.service.first(id);
        newRows = [newRows];
      } else {
        newRows = await getItemsList();
      }
    }
  }

  rows.value = newRows;
};

const populateList = (newVal: any) => {
  if (newVal) {
    if (!isArray(newVal)) {
      newVal = [newVal];
    }

    pushToMemoryList(newVal);
  }
};

const pushToMemoryList = (items: any[]) => {
  items.map((item: any) => {
    if (item.id && !find(memoryList.value, { [props.identifier]: item[props.identifier] })) {
      //@ts-expect-error: cloneDeep
      memoryList.value.push(cloneDeep(item));
    }
  });
};

const updateByModal = ({ memoryList, ids }: any) => {
  searchBy.value = null;
  pushToMemoryList(memoryList);
  if (ids) {
    updateInput(ids);
  }
};

watch(
  () => props.list,
  (newVal) => {
    populateList(newVal);
    rows.value = props.list || [];
  },
  { deep: true, immediate: true }
);

watch(
  () => rows.value,
  (newVal) => {
    emit('change', newVal);
  }
);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal?.length || props.selectOne) {
      if (newVal == selectedIds.value) {
        return;
      }

      if (newVal) {
        selectedIds.value = isArray(newVal) ? newVal : [newVal];
      } else {
        selectedIds.value = [];
      }

      if (!memoryList.value.length) {
        populateList(props.list);
      }

      if (props.noFetch === false) {
        fetch();
      }
    }
  },
  { deep: true, immediate: true }
);

defineExpose({ onClickSearch });
</script>

<template>
  <div class="ui-browser-select">
    <div class="ui-browser-select-button" v-if="selectType == 'btn' && !hideBtn">
      <slot name="button">
        <div
          class="area-select"
          @click="onClickSearch"
          :class="{ disabled: Number(limit) > 0 && rows.length == limit }">
          <span>{{ placeholder }}</span>
        </div>
      </slot>
    </div>
    <div v-else>
      <div class="ui-browser-select-input">
        <FormTextfield
          v-model="term"
          placeholder="Procurar..."
          @keyup="onChangeTerm"
          autocomplete="off"
          :disabled="searchDisabled" />
        <Button variant="primary" @click="onClickSearch" :disabled="searchDisabled">Pesquisar</Button>
      </div>

      <div class="ui-browser-list" v-if="!hideList && rows.length">
        <div
          v-for="item in rows.slice(0, paginateLimit)"
          class="ui-browser-list-row"
          :class="{ '-no-button': hideExcludeButton }"
          :key="item[identifier]">
          <component v-if="templateCustom" :is="templateCustom" :item="item" />
          <div v-else class="browser-list-cell">
            {{ item.name }}
          </div>
          <div v-if="!hideExcludeButton" class="ui-browser-list-cell -auto">
            <IconButton variant="plain" size="sm" icon="close" @click="onRemoveItem(item)" />
          </div>
        </div>
        <div v-if="rows.length > paginateLimit" class="ui-browser-list-more">
          <Link @click="nextPage" label="Exibir mais" />
        </div>
      </div>
    </div>
  </div>

  <BrowserSelectModal
    ref="browserSelectModalRef"
    @update="updateByModal"
    :templateCustom="templateCustom"
    :service="service"
    :searchBy="searchBy"
    :selectOne="selectOne"
    :identifier="identifier"
    :limit="limit"
    :title="title" />
</template>

<style lang="scss">
@import './BrowserSelect.scss';
</style>
