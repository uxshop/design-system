/**
 * E2E / interaction scenario for issue #123 — "editar o termo da busca não re-executa a pesquisa".
 *
 * MODE: vitest + @vue/test-utils (jsdom), STUB/local only.
 * WHY not Cypress: this repo's Cypress is wired for `integration` (full e2e) specs only
 * (cypress.json has just a baseUrl, there is no `cypress/component` config nor a component
 * devServer). The bug is a component-interaction defect, so scaffolding a whole Cypress
 * component harness is unwarranted. A deployed-env (hml) e2e is N/A: this is an npm
 * component library (uxshop/design-system) with no deployed storefront/homolog URL.
 *
 * This test drives the FULL fix chain end-to-end at the component level:
 *   1. real TableListNavSearch.vue (the @update wiring fix) ...
 *   2. -> setQueryParams mutates a shared queryParams ref ...
 *   3. -> a deep watcher mirroring TableList.vue (guard removed) re-fires fetchData() ...
 *   4. -> the mocked service.get() receives the NEW `q`.
 *
 * The pre-fix bug: editing the term did NOT re-execute the search. We assert the service
 * is queried again with the edited term.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, reactive, ref, watch } from 'vue'
import TableListNavSearch from './TableListNavSearch.vue'

// Avança timers falsos E libera o scheduler do Vue (watchers reagem via microtask).
// Sem o flush, a reação do watcher deep nunca roda sob fake timers.
const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms)
  await flushPromises()
}

// FormTextfield carrega dependências próprias (maska, ícones, etc.). Substituímos por um
// stub que re-emite os eventos reais (`update`, `clear`) e respeita o v-model, exatamente
// como o componente real faria ao digitar/editar.
const FormTextfieldStub = defineComponent({
  name: 'FormTextfield',
  props: { modelValue: { type: null, default: null } },
  emits: ['update:modelValue', 'update', 'clear'],
  setup(props, { emit }) {
    // Simula a digitação do usuário: atualiza o v-model e dispara `update` (truthy => debounce 750ms)
    const type = (value: string) => {
      emit('update:modelValue', value)
      emit('update', value)
    }
    return { type }
  },
  template: '<input class="form-textfield-stub" />'
})

// Harness e2e: cola o TableListNavSearch real ao mesmo contrato de estado do TableList.vue
// (queryParams ref + setQueryParams) e reproduz o watcher deep com a correção do issue #123
// (guard `newVal != oldVal` removido), encadeando até o service.get().
const buildHarness = (service: { get: ReturnType<typeof vi.fn> }) => {
  const queryParams = ref<Record<string, any>>({ sort: '-id', page: '1', limit: 25 })

  const fetchData = () => service.get({ ...queryParams.value })

  const setQueryParams = (params: Record<string, any>) => {
    queryParams.value = Object.assign({}, queryParams.value, { selectedView: 'all' }, params)
  }

  const state = reactive({
    queryParams,
    term: null as string | null,
    setQueryParams,
    fetchData
  })

  // Espelha o watcher deep corrigido de TableList.vue (sem o guard sempre-falso newVal != oldVal),
  // com o mesmo debounce de 100ms.
  let timerQ: ReturnType<typeof setTimeout>
  watch(
    () => queryParams.value,
    (newVal: any) => {
      clearTimeout(timerQ)
      timerQ = setTimeout(() => {
        if (newVal.q) state.term = newVal.q
        fetchData()
      }, 100)
    },
    { deep: true }
  )

  const Harness = defineComponent({
    setup() {
      return () =>
        h(TableListNavSearch, { state, placeholder: 'Procurar registros' })
    }
  })

  const wrapper = mount(Harness, {
    global: { stubs: { FormTextfield: FormTextfieldStub } }
  })

  return { wrapper, state, queryParams }
}

const lastQ = (service: { get: ReturnType<typeof vi.fn> }) => {
  const calls = service.get.mock.calls
  return calls.length ? calls[calls.length - 1][0]?.q : undefined
}

describe('issue #123 — editar o termo re-executa a busca (e2e/interaction)', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('digitar termo parcial executa a busca; EDITAR o termo RE-EXECUTA com o novo q', async () => {
    const service = { get: vi.fn().mockResolvedValue({ data: [], meta: {}, links: {} }) }
    const { wrapper, state } = buildHarness(service)

    const field = wrapper.findComponent(FormTextfieldStub)

    // 1) Usuário digita o termo parcial -> v-model atualiza state.term + dispara `update`
    state.term = 'pedroeberhardt'
    field.vm.$emit('update', 'pedroeberhardt')

    // antes dos 750ms do debounce de digitação, nada deve ter rodado
    expect(service.get).not.toHaveBeenCalled()

    await advance(750) // debounce do search -> setQueryParams
    await advance(100) // debounce do watcher queryParams -> fetchData

    // busca executou com o termo parcial (0 resultados é aceitável)
    expect(service.get).toHaveBeenCalledTimes(1)
    expect(lastQ(service)).toBe('pedroeberhardt')

    // 2) Usuário EDITA o termo. Pré-fix: a busca NÃO re-executava (bug do issue #123).
    state.term = 'pedro.eberhardt'
    field.vm.$emit('update', 'pedro.eberhardt')

    await advance(750)
    await advance(100)

    // RE-EXECUTOU a busca com o termo editado
    expect(service.get).toHaveBeenCalledTimes(2)
    expect(lastQ(service)).toBe('pedro.eberhardt')
  })

  it('várias edições sucessivas re-executam a busca a cada termo novo', async () => {
    const service = { get: vi.fn().mockResolvedValue({ data: [], meta: {}, links: {} }) }
    const { wrapper, state } = buildHarness(service)
    const field = wrapper.findComponent(FormTextfieldStub)

    for (const term of ['ped', 'pedro', 'pedro.eberhardt']) {
      state.term = term
      field.vm.$emit('update', term)
      await advance(750)
      await advance(100)
      expect(lastQ(service)).toBe(term)
    }

    expect(service.get).toHaveBeenCalledTimes(3)
  })
})
