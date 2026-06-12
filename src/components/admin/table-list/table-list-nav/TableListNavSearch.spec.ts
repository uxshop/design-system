import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import TableListNavSearch from './TableListNavSearch.vue'

// FormTextfield carrega dependências próprias (maska, ícones, etc.), então
// substituímos por um stub que apenas re-emite os eventos relevantes.
const FormTextfieldStub = {
  name: 'FormTextfield',
  props: ['modelValue'],
  emits: ['update:modelValue', 'update', 'clear'],
  template: '<input class="form-textfield-stub" />'
}

const mountSearch = (state: any) =>
  mount(TableListNavSearch, {
    props: { state, placeholder: 'Procurar registros' },
    global: {
      stubs: { FormTextfield: FormTextfieldStub }
    }
  })

describe('Admin / TableListNavSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Regressão: editar o termo dispara setQueryParams após o debounce (750ms)', async () => {
    const state = reactive({
      term: 'pedroeberhardt',
      setQueryParams: vi.fn()
    })

    const wrapper = mountSearch(state)
    const field = wrapper.findComponent(FormTextfieldStub)

    // FormTextfield emite update com um valor truthy (digitação) -> debounce 750ms
    field.vm.$emit('update', 'pedroeberhardt')

    // antes do debounce não deve ter chamado ainda
    expect(state.setQueryParams).not.toHaveBeenCalled()

    vi.advanceTimersByTime(750)

    expect(state.setQueryParams).toHaveBeenCalledTimes(1)
    expect(state.setQueryParams).toHaveBeenCalledWith({
      q: 'pedroeberhardt',
      page: 1
    })
  })

  it('Editar novamente dispara setQueryParams outra vez após o debounce', async () => {
    const state = reactive({
      term: 'pedro',
      setQueryParams: vi.fn()
    })

    const wrapper = mountSearch(state)
    const field = wrapper.findComponent(FormTextfieldStub)

    field.vm.$emit('update', 'pedro')
    vi.advanceTimersByTime(750)
    expect(state.setQueryParams).toHaveBeenLastCalledWith({ q: 'pedro', page: 1 })

    // segunda edição com termo diferente
    state.term = 'eberhardt'
    field.vm.$emit('update', 'eberhardt')
    vi.advanceTimersByTime(750)

    expect(state.setQueryParams).toHaveBeenCalledTimes(2)
    expect(state.setQueryParams).toHaveBeenLastCalledWith({
      q: 'eberhardt',
      page: 1
    })
  })

  it('onClear zera o termo e dispara setQueryParams', async () => {
    const state = reactive({
      term: 'pedroeberhardt',
      setQueryParams: vi.fn()
    })

    const wrapper = mountSearch(state)
    const field = wrapper.findComponent(FormTextfieldStub)

    field.vm.$emit('clear')

    // onClear chama update() sem valor -> debounce de 0ms
    vi.advanceTimersByTime(0)

    expect(state.term).toBeNull()
    expect(state.setQueryParams).toHaveBeenCalledTimes(1)
    expect(state.setQueryParams).toHaveBeenCalledWith({ q: null, page: 1 })
  })
})
